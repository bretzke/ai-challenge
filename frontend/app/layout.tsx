import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'E-commerce AI Assistant',
  description: 'E-commerce com assistente de IA para tirar dúvidas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <nav className="navbar">
          <div className="container">
            <Link href="/" className="logo">
              🛒 E-commerce AI
            </Link>
            <div className="nav-links">
              <Link href="/">Produtos (SSR)</Link>
              <Link href="/about">Sobre (SSG)</Link>
              <Link href="/ai-assistant">Assistente IA (CSR)</Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <p>&copy; 2026 E-commerce AI Assistant. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
