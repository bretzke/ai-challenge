# E-commerce AI Assistant - Desafio Fullstack

Aplicação fullstack desenvolvida com React.js + Next.js (frontend) e C# .NET (backend), incluindo integração com IA para processamento de perguntas em linguagem natural (NL2SQL).

## 📋 Estrutura do Projeto

```
ai-challenge/
├── frontend/              # Frontend Next.js
│   ├── app/              # Páginas Next.js
│   │   ├── page.tsx      # Página SSR (Produtos)
│   │   ├── about/        # Página SSG (Sobre/FAQ)
│   │   └── ai-assistant/ # Página CSR (Assistente IA)
│   ├── components/       # Componentes React
│   └── types/            # Tipos TypeScript
├── backend/              # API .NET
│   ├── Controllers/      # Controllers da API
│   ├── Services/         # Serviços de negócio
│   ├── Models/           # Modelos de dados
│   ├── Data/             # Contexto do Entity Framework
│   └── DTOs/             # Data Transfer Objects
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ e npm/yarn
- .NET 8.0 SDK
- Git

### Backend (.NET)

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Restaure as dependências:
```bash
dotnet restore
```

3. Execute a aplicação:
```bash
dotnet run
```

A API estará disponível em `http://localhost:5000` (ou outra porta indicada no terminal).

**Swagger/API Documentation**: Acesse `http://localhost:5000/swagger` para ver a documentação interativa da API.

### Frontend (Next.js)

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Variáveis de Ambiente

Crie um arquivo `.env.local` na pasta `frontend` (opcional):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Se não configurar, o frontend usará `http://localhost:5000/api` por padrão.

## 🏗️ Arquitetura da Solução

### Frontend (Next.js)

#### 1. **Página SSR** (`/` - `frontend/app/page.tsx`)
- **Renderização**: Server-Side Rendering
- **Funcionalidade**: Lista de produtos do e-commerce
- **Integração**: Consome a API .NET para buscar produtos
- **Características**:
  - Dados são buscados no servidor a cada requisição
  - Sempre mostra dados atualizados
  - Permite CRUD completo (Create, Read, Update, Delete)

#### 2. **Página SSG** (`/about` - `frontend/app/about/page.tsx`)
- **Renderização**: Static Site Generation
- **Funcionalidade**: Página "Sobre" com FAQ
- **Características**:
  - Conteúdo 100% estático
  - Gerada no build time
  - Não consome API
  - Ideal para conteúdo que não muda frequentemente

#### 3. **Página CSR** (`/ai-assistant` - `frontend/app/ai-assistant/page.tsx`)
- **Renderização**: Client-Side Rendering
- **Funcionalidade**: Assistente de IA para perguntas em linguagem natural
- **Integração**: Consome endpoint `/api/ai/query` do backend
- **Características**:
  - Toda interação acontece no navegador
  - Usa `'use client'` do Next.js
  - Interface de chat para perguntas
  - Exibe SQL gerado e resultados

### Backend (.NET)

#### API REST
- **Framework**: ASP.NET Core 8.0
- **Banco de Dados**: SQLite (Entity Framework Core)
- **Endpoints**:
  - `GET /api/products` - Lista todos os produtos
  - `GET /api/products/{id}` - Busca produto por ID
  - `POST /api/products` - Cria novo produto
  - `PUT /api/products/{id}` - Atualiza produto
  - `DELETE /api/products/{id}` - Remove produto
  - `POST /api/ai/query` - Processa pergunta em linguagem natural

#### Integração com IA (NL2SQL)

**Arquitetura Escolhida**: A integração com IA foi implementada no **backend** através do serviço `AIService` usando **Google Gemini**.

**Justificativa**:
1. **Segurança**: SQL é gerado e executado no servidor, evitando exposição de estrutura do banco
2. **Performance**: Processamento no servidor é mais eficiente
3. **Controle**: Validação e sanitização de queries SQL são feitas antes da execução
4. **Escalabilidade**: Facilita cache e otimizações futuras

**Implementação Atual**:
- Integração com Google Gemini Pro para NL2SQL
- Geração de SQL baseada em contexto e schema do banco
- Validação rigorosa de SQL (apenas SELECT, bloqueio de comandos perigosos)
- Geração de respostas em linguagem natural usando Gemini
- Execução segura de queries usando Entity Framework

**Configuração**:
1. Obtenha uma API Key do Google Gemini em: https://makersuite.google.com/app/apikey
2. Configure no `appsettings.json` ou `appsettings.Development.json`:
```json
{
  "Gemini": {
    "ApiKey": "SUA_API_KEY_AQUI"
  }
}
```

**Segurança**:
- Validação de SQL antes da execução
- Bloqueio de comandos perigosos (INSERT, UPDATE, DELETE, DROP, etc.)
- Proteção contra SQL injection
- Apenas queries SELECT são permitidas

## 🗄️ Banco de Dados

- **Tecnologia**: SQLite
- **ORM**: Entity Framework Core
- **Migrations**: Auto-criado na primeira execução (`EnsureCreated`)
- **Dados Iniciais**: Seed automático com 5 produtos de exemplo

### Schema

```sql
Products
├── Id (int, PK)
├── Name (string)
├── Description (string)
├── Price (decimal)
├── Category (string)
├── Stock (int)
├── CreatedAt (datetime)
└── UpdatedAt (datetime)
```

## 🎯 Funcionalidades

### CRUD de Produtos
- ✅ Listar produtos (SSR)
- ✅ Criar produto
- ✅ Editar produto
- ✅ Excluir produto
- ✅ Tratamento de loading, erro e lista vazia

### Assistente de IA
- ✅ Interface de chat
- ✅ Processamento de perguntas em linguagem natural
- ✅ Geração de SQL baseado na pergunta
- ✅ Execução segura de queries
- ✅ Resposta em linguagem natural
- ✅ Exibição do SQL gerado (para debug)
- ✅ Exibição dos dados retornados

### Exemplos de Perguntas Suportadas
- "Quantos produtos temos?"
- "Qual é o produto mais caro?"
- "Liste todos os produtos da categoria Eletrônicos"
- "Quantos produtos temos em estoque?"
- "Qual é a média de preços?"
- "Mostre produtos com estoque baixo"

## 🔧 Decisões Técnicas

### Frontend
- **Next.js 14**: App Router para melhor organização
- **TypeScript**: Type safety em todo o código
- **CSS Modules**: Estilos globais simples e reutilizáveis
- **Client Components**: Apenas onde necessário (interatividade)

### Backend
- **.NET 8**: Última versão LTS
- **Entity Framework Core**: ORM para facilitar desenvolvimento
- **SQLite**: Banco leve e fácil de configurar
- **Repository Pattern**: Separação de responsabilidades através de Services
- **DTOs**: Transferência de dados tipada

### IA/NL2SQL
- **Pattern Matching**: Implementação inicial simples e funcional
- **Backend Processing**: Segurança e controle
- **Extensível**: Fácil migração para LLM real no futuro

## ⚠️ Limitações Técnicas

1. **IA Simplificada**: A implementação atual usa pattern matching básico. Para produção, recomenda-se integração com OpenAI, Azure OpenAI ou modelo especializado em NL2SQL.

2. **Segurança SQL**: Embora use Entity Framework, queries dinâmicas precisam de validação adicional em produção.

3. **CORS**: Configurado apenas para `localhost:3000`. Em produção, ajustar conforme necessário.

4. **Autenticação**: Não implementada (não era requisito do desafio).

5. **Validação**: Validações básicas implementadas. Em produção, adicionar validações mais robustas.

## 🚀 Melhorias Futuras (Diferenciais)

- [ ] Docker e Docker Compose para facilitar setup
- [ ] Testes unitários e de integração
- [ ] Integração com OpenAI GPT-4 para NL2SQL mais preciso
- [ ] Autenticação e autorização
- [ ] Paginação nas listagens
- [ ] Busca e filtros avançados
- [ ] Upload de imagens para produtos
- [ ] Cache de respostas da IA
- [ ] Logging estruturado
- [ ] Monitoramento e métricas

## 📝 Notas de Desenvolvimento

- O projeto segue boas práticas de organização de código
- Separação clara entre frontend e backend
- Componentes reutilizáveis no frontend
- Services e DTOs no backend para melhor manutenibilidade
- Código comentado onde necessário para clareza

## 👨‍💻 Autor

Desenvolvido como parte do desafio técnico fullstack.

---

**Desenvolvido com ❤️ usando Next.js e .NET**
