// Esta página usa SSG (Static Site Generation)
// O conteúdo é gerado estaticamente no build time
// Não consome API, é 100% estático

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-slate-800">Sobre Nossa Loja</h1>
        <p className="text-gray-600 text-lg">
          Esta página utiliza Static Site Generation (SSG) - conteúdo gerado estaticamente
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Bem-vindo ao E-commerce AI
        </h2>
        
        <p className="mb-4 text-gray-700">
          Somos uma loja online moderna que utiliza inteligência artificial para melhorar 
          sua experiência de compra. Nossa missão é tornar o processo de compra mais 
          simples, rápido e personalizado.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800">
          Por que escolher nossa loja?
        </h3>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4 text-gray-700">
          <li>Assistente de IA disponível 24/7 para tirar suas dúvidas</li>
          <li>Produtos de alta qualidade com garantia</li>
          <li>Entrega rápida e segura</li>
          <li>Atendimento personalizado</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800">
          FAQ - Perguntas Frequentes
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">
              Como funciona o assistente de IA?
            </h4>
            <p className="text-gray-700 mb-4">
              Nosso assistente de IA permite que você faça perguntas em linguagem natural 
              sobre nossos produtos e pedidos. A IA interpreta sua pergunta e busca as 
              informações no banco de dados, retornando respostas precisas e úteis.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-600 mb-2">
              Quais são as formas de pagamento?
            </h4>
            <p className="text-gray-700 mb-4">
              Aceitamos cartões de crédito, débito, PIX e boleto bancário. Todos os 
              pagamentos são processados de forma segura através de nossos parceiros.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-600 mb-2">
              Qual o prazo de entrega?
            </h4>
            <p className="text-gray-700 mb-4">
              O prazo de entrega varia conforme a região e o tipo de produto. 
              Geralmente, entregas em capitais levam de 3 a 5 dias úteis. 
              Você pode consultar o prazo exato no momento da compra.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-blue-600 mb-2">
              Posso trocar ou devolver produtos?
            </h4>
            <p className="text-gray-700 mb-4">
              Sim! Oferecemos 7 dias para troca ou devolução de produtos não utilizados 
              e em perfeito estado. Entre em contato conosco através do assistente de IA 
              ou pelo nosso suporte.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-6 text-slate-800">
          Contato
        </h3>
        <p className="text-gray-700">
          Entre em contato conosco através do nosso assistente de IA na página 
          &quot;Assistente IA&quot; ou envie um e-mail para contato@ecommerceai.com.br
        </p>
      </div>
    </div>
  )
}
