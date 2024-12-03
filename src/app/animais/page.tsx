import Image from "next/image";
import styles from './animais.module.css'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.origamid.online'], // Domínios permitidos para carregamento de imagens
  },
};

nextConfig; // Usando a sintaxe de ES Modules

type Animal = {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
}
export default async function AnimaisPage() {
  const respose = await fetch('https://api.origamid.online/animais');
  const animais = await respose.json() as Animal[];
  return <main><h1>Animais</h1>

    <ul className={styles.animais}>
      {
        animais.map((animal, i) => (
          <li key={animal.id}><h2>{animal.nome}</h2>
            <Image
              src={animal.imagem}
              alt={animal.descricao}
              width={2400}
              height={1600}
              quality={75}
              sizes="(max-width: 600px) 100vw, 50vw"
              priority={i < 2}
            />

          </li>
        ))
      }
    </ul>



  </main>;
}