# 🚀 Guia Rápido de Início

## Passo a Passo

### 1. PostgreSQL (Docker)

Na raiz do projeto:

```bash
docker compose up -d postgres
```

### 2. Backend (.NET)

**Antes de executar, crie o `.env` (conexão e Gemini):**

```bash
cd backend
cp .env.example .env
# Edite .env: GEMINI_API_KEY=sua_chave_aqui
# A connection string do PostgreSQL já vem no .env.example (ajuste se necessário)
```

Depois execute:

```bash
dotnet restore
dotnet run
```

A API estará em `http://localhost:5000`
Swagger em `http://localhost:5000/swagger`

### 3. Frontend (Next.js)

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará em `http://localhost:3000`

## 📍 Páginas Disponíveis

- **`/`** - Produtos (SSR) - Lista produtos e permite CRUD
- **`/about`** - Sobre (SSG) - Página estática com FAQ
- **`/ai-assistant`** - Assistente IA (CSR) - Faça perguntas em linguagem natural

## 🧪 Testando a IA

Na página `/ai-assistant`, tente perguntas como:

- "Quantos produtos temos?"
- "Qual é o produto mais caro?"
- "Liste todos os produtos da categoria Eletrônicos"
- "Quantos produtos temos em estoque?"
- "Mostre produtos com estoque baixo"

## ⚠️ Importante

- Suba o PostgreSQL com `docker compose up -d postgres` antes do backend.
- Certifique-se de que o backend está rodando antes de iniciar o frontend.
