'use client'

import { useState } from 'react'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sql?: string
  data?: Record<string, unknown>[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function AIAssistant() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!question.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: question,
    }

    setMessages(prev => [...prev, userMessage])
    setLoading(true)
    setQuestion('')

    try {
      const res = await fetch(`${API_URL}/ai/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) {
        throw new Error('Erro ao processar pergunta')
      }

      const data = await res.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer || 'Não foi possível gerar uma resposta.',
        sql: data.sql,
        data: data.data,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.',
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-slate-800">
          Faça uma pergunta sobre nossos produtos
        </h2>
        <p className="text-gray-600 mb-6">
          Exemplos: &quot;Quantos produtos temos em estoque?&quot;, 
          &quot;Qual é o produto mais caro?&quot;, 
          &quot;Liste todos os produtos da categoria Eletrônicos&quot;
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Digite sua pergunta aqui..."
            rows={3}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {loading ? 'Processando...' : 'Enviar Pergunta'}
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">
              Nenhuma conversa ainda. Faça sua primeira pergunta!
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-md p-6 ${
              message.role === 'user' 
                ? 'ml-auto bg-blue-50 max-w-[80%]' 
                : 'mr-auto max-w-[80%]'
            }`}
          >
            <div className="mb-3">
              <strong className={`text-base font-semibold ${
                message.role === 'user' ? 'text-blue-600' : 'text-slate-800'
              }`}>
                {message.role === 'user' ? 'Você' : 'Assistente IA'}
              </strong>
            </div>
            
            <div className="space-y-4">
              {/* Renderiza markdown para respostas da IA, texto simples para usuário */}
              {message.role === 'assistant' ? (
                <MarkdownRenderer content={message.content} />
              ) : (
                <p className="whitespace-pre-wrap text-gray-700">{message.content}</p>
              )}

              {message.sql && (
                <details className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <summary className="cursor-pointer font-semibold text-gray-700">
                    SQL Gerado
                  </summary>
                  <pre className="mt-2 text-xs overflow-auto bg-gray-800 text-green-400 p-3 rounded whitespace-pre-wrap">
                    <code>{message.sql}</code>
                  </pre>
                </details>
              )}

              {message.data && Array.isArray(message.data) && message.data.length > 0 && (
                <details className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <summary className="cursor-pointer font-semibold text-gray-700">
                    Dados Retornados ({message.data.length} registro(s))
                  </summary>
                  <div className="mt-2 overflow-auto max-h-[300px]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-200">
                            {Object.keys(message.data[0]).map(key => (
                              <th key={key} className="p-2 text-left border border-gray-300 font-semibold">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {message.data.map((row: Record<string, unknown>, idx: number) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              {Object.values(row).map((value: unknown, cellIdx: number) => (
                                <td key={cellIdx} className="p-2 border border-gray-300">
                                  {String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </details>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Processando sua pergunta...</p>
          </div>
        )}
      </div>
    </div>
  )
}
