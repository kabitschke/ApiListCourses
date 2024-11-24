import { Aula, getAula, getCurso, getCursos } from "@/api/cursos";
import Link from "next/link";

type PageParams = {
  params: {
    curso: string;
    aula: string;
  }
}


export async function generateStaticParams() {
  const cursos = await getCursos();
  const aulas = await Promise.all(cursos.map((curso) => getCurso(curso.slug)))
  return aulas.reduce((acumulador: Aula[], curso) => acumulador.concat(curso.aulas), [])
    .map((aula) => ({
      curso: cursos.find((curso) => curso.id === aula.curso_id)?.slug,
      aula: aula.slug,
    }));
}




export default async function AulaPage({ params }: PageParams) {

  const { aula } = await params;
  const { curso } = await params;
  const data = await getAula(curso, aula);

  return (
    <div>
      <Link href={`/cursos/${curso}`}>{curso}</Link>
      <h1>{data.nome}</h1>
      <p>{data.descricao}</p>
      <p>Tempo: {data.tempo}</p>

    </div>
  );
}