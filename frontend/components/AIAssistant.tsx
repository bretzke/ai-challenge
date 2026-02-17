"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sql?: string;
  data?: any;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion("");

    try {
      const res = await fetch(`${API_URL}/ai/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error("Erro ao processar pergunta");
      }

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer || "Não foi possível gerar uma resposta.",
        sql: data.sql,
        data: data.data,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>
          Faça uma pergunta sobre nossos produtos
        </h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          Exemplos: &quot;Quantos produtos temos em estoque?&quot;, &quot;Qual é
          o produto mais caro?&quot;, &quot;Liste todos os produtos da categoria
          Eletrônicos&quot;
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Digite sua pergunta aqui..."
              rows={3}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !question.trim()}
            style={{ width: "100%" }}
          >
            {loading ? "Processando..." : "Enviar Pergunta"}
          </button>
        </form>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {messages.length === 0 && (
          <div className="card" style={{ textAlign: "center", color: "#666" }}>
            <p>Nenhuma conversa ainda. Faça sua primeira pergunta!</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className="card"
            style={{
              backgroundColor: message.role === "user" ? "#e8f4f8" : "white",
              marginLeft: message.role === "user" ? "auto" : "0",
              marginRight: message.role === "user" ? "0" : "auto",
              maxWidth: "80%",
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>
              <strong
                style={{
                  color: message.role === "user" ? "#3498db" : "#2c3e50",
                }}
              >
                {message.role === "user" ? "Você" : "Assistente IA"}
              </strong>
            </div>

            <div style={{ marginBottom: "1rem" }}>{message.content}</div>

            {message.sql && (
              <details
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "#666",
                  }}
                >
                  SQL Gerado
                </summary>
                <pre
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.85rem",
                    overflow: "auto",
                  }}
                >
                  <code>{message.sql}</code>
                </pre>
              </details>
            )}

            {message.data &&
              Array.isArray(message.data) &&
              message.data.length > 0 && (
                <details
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px",
                  }}
                >
                  <summary
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#666",
                    }}
                  >
                    Dados Retornados ({message.data.length} registro(s))
                  </summary>
                  <div
                    style={{
                      marginTop: "0.5rem",
                      overflow: "auto",
                      maxHeight: "300px",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        fontSize: "0.85rem",
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: "#e9ecef" }}>
                          {Object.keys(message.data[0]).map((key) => (
                            <th
                              key={key}
                              style={{
                                padding: "0.5rem",
                                textAlign: "left",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {message.data.map((row: any, idx: number) => (
                          <tr key={idx}>
                            {Object.values(row).map(
                              (value: any, cellIdx: number) => (
                                <td
                                  key={cellIdx}
                                  style={{
                                    padding: "0.5rem",
                                    border: "1px solid #dee2e6",
                                  }}
                                >
                                  {String(value)}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              )}
          </div>
        ))}

        {loading && (
          <div className="card" style={{ textAlign: "center" }}>
            <p>Processando sua pergunta...</p>
          </div>
        )}
      </div>
    </div>
  );
}

