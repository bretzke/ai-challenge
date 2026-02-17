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
- Docker e Docker Compose (para PostgreSQL)
- Git

### Banco de Dados (PostgreSQL com Docker)

1. Na raiz do projeto, suba o PostgreSQL:

```bash
docker compose up -d postgres
```

2. O banco estará em `localhost:5432` (usuário `postgres`, senha `postgres`, database `ecommerce`).

### Backend (.NET)

1. Navegue até a pasta do backend:

```bash
cd backend
```

2. Restaure as dependências:

```bash
dotnet restore
```

3. Configure o backend via arquivo `.env`: copie `backend/.env.example` para `backend/.env`, defina `GEMINI_API_KEY` e a connection string do PostgreSQL (`DB_CONNECTION`). A conexão com o banco **não** é lida de `appsettings` — apenas do `.env`.

4. Execute a aplicação:

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
- **Banco de Dados**: PostgreSQL (Entity Framework Core, Npgsql)
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
2. Configure usando variável de ambiente (recomendado):

```bash
# Na pasta backend, copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env e adicione sua API Key
GEMINI_API_KEY=sua_api_key_aqui
```

**Opções de Configuração**:
- **Variável de ambiente `GEMINI_API_KEY`** (recomendado): Mais segura, não será commitada
- `appsettings.json` → `Gemini:ApiKey` (alternativa): Menos seguro, pode ser commitado acidentalmente
- `Model` (opcional): Modelo a usar. Padrão: `gemini-2.0-flash`

**Ordem de Prioridade**: O sistema busca a API Key primeiro na variável de ambiente `GEMINI_API_KEY`, depois no `appsettings.json`.

**Nota**: A aplicação usa a API v1 (estável) do Gemini. O modelo `gemini-2.0-flash` é o recomendado para melhor performance e precisão.

Veja mais detalhes em `backend/GEMINI_SETUP.md`.

**Segurança**:

- Validação de SQL antes da execução
- Bloqueio de comandos perigosos (INSERT, UPDATE, DELETE, DROP, etc.)
- Proteção contra SQL injection
- Apenas queries SELECT são permitidas

## 🗄️ Banco de Dados

- **Tecnologia**: PostgreSQL (Docker Compose na raiz do projeto)
- **ORM**: Entity Framework Core (Npgsql)
- **Migrations**: Auto-criado na primeira execução (`EnsureCreated`)
- **Dados Iniciais**: Seed automático com 5 produtos de exemplo

### Schema (PostgreSQL)

| Coluna     | Tipo             | Descrição                    |
|-----------|------------------|------------------------------|
| Id        | SERIAL (PK)      | ID único                     |
| Name      | VARCHAR(500)     | Nome do produto              |
| Description | TEXT           | Descrição                    |
| Price     | NUMERIC(18,2)    | Preço (valores monetários)   |
| Category  | VARCHAR(200)     | Categoria                    |
| Stock     | INTEGER          | Quantidade em estoque        |
| CreatedAt | TIMESTAMPTZ      | Data de criação (UTC)        |
| UpdatedAt | TIMESTAMPTZ      | Data de atualização (UTC)    |

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
- **Entity Framework Core**: ORM com Npgsql para PostgreSQL
- **PostgreSQL**: Banco relacional via Docker Compose; tipos adequados (NUMERIC, TIMESTAMPTZ, etc.)
- **Repository Pattern**: Separação de responsabilidades através de Services
- **DTOs**: Transferência de dados tipada

### IA/NL2SQL

- **Google Gemini**: Integração com Gemini Pro para NL2SQL e geração de respostas em linguagem natural
- **API v1 (Stable)**: Usa versão estável da API para garantir estabilidade em produção
- **Validação de SQL**: Validação rigorosa antes da execução para segurança
- **Backend Processing**: Segurança e controle total sobre queries geradas

## ⚠️ Limitações Técnicas

1. **Dependência de API Externa**: A aplicação depende da API do Google Gemini. Requer:
   - API Key válida e configurada
   - Conexão com internet estável
   - Respeito aos limites de rate da API (varia conforme o plano)
   - Possíveis custos conforme uso (consulte: https://ai.google.dev/pricing)

2. **Modelo LLM**: Usa Google Gemini 2.0 Flash, que pode ter limitações em:
   - Queries muito complexas ou ambíguas podem gerar SQL incorreto
   - Latência de resposta depende da API do Google
   - Disponibilidade do modelo pode variar por região

3. **Validação de SQL**: Embora tenha validação rigorosa (apenas SELECT, bloqueio de comandos perigosos), queries dinâmicas geradas por IA podem:
   - Requer validação adicional para casos edge em produção
   - Beneficiar-se de testes mais abrangentes
   - Necessitar de fallback para queries manuais em caso de falha

4. **CORS**: Configurado apenas para `localhost:3000`. Em produção, ajustar conforme necessário.

5. **Autenticação**: Não implementada (não era requisito do desafio). Em produção, adicionar:
   - Autenticação de usuários
   - Rate limiting por usuário
   - Logs de auditoria para queries geradas

6. **Tratamento de Erros da API**: Erros da API Gemini são tratados, mas podem ser melhorados com:
   - Retry logic para falhas temporárias
   - Cache de respostas para perguntas similares
   - Fallback para respostas padrão quando a API estiver indisponível

## 🚀 Melhorias Futuras (Diferenciais)

- [x] Docker Compose com PostgreSQL
- [ ] Testes unitários e de integração
- [ ] Retry logic e circuit breaker para chamadas à API Gemini
- [ ] Cache inteligente de respostas da IA (usando embeddings para encontrar perguntas similares)
- [ ] Autenticação e autorização
- [ ] Rate limiting por usuário/IP
- [ ] Paginação nas listagens
- [ ] Busca e filtros avançados
- [ ] Upload de imagens para produtos
- [ ] Logging estruturado com correlação de requisições
- [ ] Monitoramento e métricas (tempo de resposta, taxa de sucesso, etc.)
- [ ] Suporte a múltiplos modelos (fallback automático se um falhar)
- [ ] Histórico de conversação para contexto entre perguntas
- [ ] Validação de schema dinâmico (detectar mudanças no banco automaticamente)

## 📝 Notas de Desenvolvimento

- O projeto segue boas práticas de organização de código
- Separação clara entre frontend e backend
- Componentes reutilizáveis no frontend
- Services e DTOs no backend para melhor manutenibilidade
- Código comentado onde necessário para clareza

## 👨‍💻 Autor

Desenvolvido como parte do desafio técnico fullstack.

---
