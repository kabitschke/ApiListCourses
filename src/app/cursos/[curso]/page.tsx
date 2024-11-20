import { getCurso, getCursos } from "@/api/cursos";
import Link from "next/link";

type Props = {
  params: {
    curso: string;
  }
}

export async function generateStaticParams() {
  const cursos = await getCursos();

  return cursos.map((curso) => ({
    curso: curso.slug,
  }));
}


export default async function CursosPage({ params }: Props) {



  const curso = await getCurso(params.curso);


  return (
    <div>
      <h1>{curso.nome}</h1>
      <p>{curso.descricao}</p>
      <p>Total horas: {curso.total_horas}</p>
      <p>Total aulas: {curso.total_aulas}</p>

      <h2>Aulas</h2>

      {curso.aulas.map((aula) =>
        <ul>
          <li key={aula.id}><Link href={`/cursos/${params.curso}/${aula.slug}`}>{aula.nome}</Link></li>
        </ul>
      )}


    </div>
  )
}