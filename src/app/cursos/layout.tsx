import { getCursos } from "@/api/cursos";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Cursos MK',
  description: 'Cursos online de Front End e UI Design.',
  keywords: ['HTML', 'CSS', 'JavaScript', 'UI Design'],
  authors: [{ name: 'André Rafael', url: 'https://andrerafael.com' }],
};



export default async function CursosLayout({ children }: { children: React.ReactNode }) {

  const cursos = await getCursos();


  return (
    <div className="flex">
      <nav style={{ marginRight: '4rem' }}>
        <h2>Cursos</h2>

        {cursos.map((curso) =>
          <ul>
            <li key={curso.id}><Link href={`/cursos/${curso.slug}`}>{curso.nome}</Link></li>
          </ul>

        )}

      </nav>

      <div>{children}</div>


    </div>

  )
}