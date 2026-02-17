# 🚀 Guia Rápido de Início

## Passo a Passo

### 1. Backend (.NET)

**Antes de executar, configure a API Key do Gemini:**

```bash
cd backend
cp .env.example .env
# Edite o arquivo .env e adicione sua API Key: GEMINI_API_KEY=sua_chave_aqui
```

Depois execute:

```bash
dotnet restore
dotnet run
```

A API estará em `http://localhost:5000`
Swagger em `http://localhost:5000/swagger`

### 2. Frontend (Next.js)

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

Certifique-se de que o backend está rodando antes de iniciar o frontend!
