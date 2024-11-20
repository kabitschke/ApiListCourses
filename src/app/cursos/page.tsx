import { getCursos } from "@/api/cursos";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Cursos MK',
  description: 'Cursos online de Front End e UI Design.',
  keywords: ['HTML', 'CSS', 'JavaScript', 'UI Design'],
  authors: [{ name: 'André Rafael', url: 'https://andrerafael.com' }],
};



export default async function CursosPage() {

  const cursos = await getCursos();


  return (
    <div>
      <h1>Cursos</h1>

      {cursos.map((curso) =>
        <ul>
          <li key={curso.id}><Link href={`/cursos/${curso.slug}`}>{curso.nome}</Link></li>
        </ul>

      )}

    </div>
  )
}