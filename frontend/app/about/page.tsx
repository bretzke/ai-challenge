export default function AboutPage() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Sobre Nossa Loja</h1>
        <p>
          Esta página utiliza Static Site Generation (SSG) - conteúdo gerado
          estaticamente
        </p>
      </div>

      <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "1rem", color: "#2c3e50" }}>
          Bem-vindo ao E-commerce AI
        </h2>

        <p style={{ marginBottom: "1rem" }}>
          Somos uma loja online moderna que utiliza inteligência artificial para
          melhorar sua experiência de compra. Nossa missão é tornar o processo
          de compra mais simples, rápido e personalizado.
        </p>

        <h3
          style={{ marginTop: "2rem", marginBottom: "1rem", color: "#34495e" }}
        >
          Por que escolher nossa loja?
        </h3>
        <ul style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
          <li>Assistente de IA disponível 24/7 para tirar suas dúvidas</li>
          <li>Produtos de alta qualidade com garantia</li>
          <li>Entrega rápida e segura</li>
          <li>Atendimento personalizado</li>
        </ul>

        <h3
          style={{ marginTop: "2rem", marginBottom: "1rem", color: "#34495e" }}
        >
          FAQ - Perguntas Frequentes
        </h3>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ marginBottom: "0.5rem", color: "#3498db" }}>
            Como funciona o assistente de IA?
          </h4>
          <p style={{ marginBottom: "1rem" }}>
            Nosso assistente de IA permite que você faça perguntas em linguagem
            natural sobre nossos produtos e pedidos. A IA interpreta sua
            pergunta e busca as informações no banco de dados, retornando
            respostas precisas e úteis.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ marginBottom: "0.5rem", color: "#3498db" }}>
            Quais são as formas de pagamento?
          </h4>
          <p style={{ marginBottom: "1rem" }}>
            Aceitamos cartões de crédito, débito, PIX e boleto bancário. Todos
            os pagamentos são processados de forma segura através de nossos
            parceiros.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ marginBottom: "0.5rem", color: "#3498db" }}>
            Qual o prazo de entrega?
          </h4>
          <p style={{ marginBottom: "1rem" }}>
            O prazo de entrega varia conforme a região e o tipo de produto.
            Geralmente, entregas em capitais levam de 3 a 5 dias úteis. Você
            pode consultar o prazo exato no momento da compra.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ marginBottom: "0.5rem", color: "#3498db" }}>
            Posso trocar ou devolver produtos?
          </h4>
          <p style={{ marginBottom: "1rem" }}>
            Sim! Oferecemos 7 dias para troca ou devolução de produtos não
            utilizados e em perfeito estado. Entre em contato conosco através do
            assistente de IA ou pelo nosso suporte.
          </p>
        </div>

        <h3
          style={{ marginTop: "2rem", marginBottom: "1rem", color: "#34495e" }}
        >
          Contato
        </h3>
        <p>
          Entre em contato conosco através do nosso assistente de IA na página
          &quot;Assistente IA&quot; ou envie um e-mail para
          contato@ecommerceai.com.br
        </p>
      </div>
    </div>
  );
}

