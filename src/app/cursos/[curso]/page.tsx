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
  const curso = await getCurso(params.curso);

  return {
    title: curso.nome,
    description: curso.descricao,
  };
}




export default async function CursosPage({ params }: PageParams) {



  const curso = await getCurso(params.curso);
  //caso não encontre o curso é redirecionado para not-found
  if (curso.error) return notFound();


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