import type { Metadata } from 'next';
import './globals.css';
import Menu from '@/components/menu';
import { font_body } from './fonts';

export const metadata: Metadata = {
  title: 'Origamid Next',
  description: 'Criado por Origamid',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${font_body.className} ${font_body.variable}`}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
