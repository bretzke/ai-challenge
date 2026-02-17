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
        <nav className="bg-slate-900 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
                🛒 E-commerce AI
              </Link>
              <div className="flex gap-8">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  Produtos (SSR)
                </Link>
                <Link href="/about" className="hover:opacity-80 transition-opacity">
                  Sobre (SSG)
                </Link>
                <Link href="/ai-assistant" className="hover:opacity-80 transition-opacity">
                  Assistente IA (CSR)
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-[calc(100vh-200px)] py-8 bg-gray-50">{children}</main>
        <footer className="bg-slate-900 text-white text-center py-6 mt-12">
          <div className="container mx-auto px-4">
            <p>&copy; 2026 E-commerce AI Assistant. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
