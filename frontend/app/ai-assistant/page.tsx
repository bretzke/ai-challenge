"use client";

import AIAssistant from "@/components/AIAssistant";

export default function AIAssistantPage() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Assistente de IA</h1>
        <p>
          Esta página utiliza Client-Side Rendering (CSR) - interações acontecem
          no navegador
        </p>
      </div>

      <AIAssistant />
    </div>
  );
}

