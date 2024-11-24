import { getCurso, getCursos } from "@/api/cursos";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageParams = {
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
//mudança de title de acordo com nome do curso
export async function generateMetadata({ params }: PageParams) {
  // se você faz o mesmo fetch no corpo da página, o React irá usar o cache do fetch, evitando requisições duplicadas.
  const { curso } = await params;
  const data = await getCurso(curso);

  return {
    title: data.nome,
    description: data.descricao,
  };
}

export default async function CursosPage({ params }: PageParams) {
  const { curso } = await params;
  const data = await getCurso(curso);
  //caso não encontre o curso é redirecionado para not-found
  if (data.error) return notFound();


  return (
    <div>
      <h1>{data.nome}</h1>
      <p>{data.descricao}</p>
      <p>Total horas: {data.total_horas}</p>
      <p>Total aulas: {data.total_aulas}</p>

      <h2>Aulas</h2>

      {data.aulas.map((aula) =>
        <ul>
          <li key={aula.id}><Link href={`/cursos/${curso}/${aula.slug}`}>{aula.nome}</Link></li>
        </ul>
      )}


    </div>
  )
}