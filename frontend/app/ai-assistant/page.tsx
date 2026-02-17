'use client'

// Esta página usa CSR (Client-Side Rendering)
// Todo o código é executado no cliente
// 'use client' é necessário para usar hooks do React

import AIAssistant from '@/components/AIAssistant'

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-slate-800">Assistente de IA</h1>
        <p className="text-gray-600 text-lg">
          Esta página utiliza Client-Side Rendering (CSR) - interações acontecem no navegador
        </p>
      </div>

      <AIAssistant />
    </div>
  )
}
