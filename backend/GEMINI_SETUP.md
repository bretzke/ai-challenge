# Configuração do Google Gemini

## Como Obter a API Key

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Escolha um projeto ou crie um novo
5. Copie a API Key gerada

## Configuração no Projeto

### Opção 1: Arquivo .env (Recomendado)

1. Na pasta `backend`, copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e adicione sua API Key:
```env
GEMINI_API_KEY=sua_api_key_aqui
```

3. O arquivo `.env` já está no `.gitignore` e não será commitado.

### Opção 2: Variáveis de Ambiente do Sistema

No Windows (PowerShell):
```powershell
$env:GEMINI_API_KEY = "sua_api_key_aqui"
```

No Linux/Mac:
```bash
export GEMINI_API_KEY="sua_api_key_aqui"
```

### Opção 3: appsettings.json (Não Recomendado)

⚠️ **Atenção**: Não é recomendado colocar a API Key diretamente no `appsettings.json` pois pode ser commitada no Git.

Se necessário, você pode adicionar no `appsettings.Development.json`:
```json
{
  "Gemini": {
    "ApiKey": "SUA_API_KEY",
    "Model": "gemini-2.0-flash"
  }
}
```

## Ordem de Prioridade

O sistema busca a API Key na seguinte ordem:

1. **Variável de ambiente `GEMINI_API_KEY`** (mais segura)
2. `appsettings.json` → `Gemini:ApiKey`
3. Lança exceção se não encontrar

## Verificação

Após configurar, execute o backend:

```bash
cd backend
dotnet run
```

Se a API Key estiver configurada corretamente, o serviço iniciará sem erros e você verá no log:
```
Using Gemini API version: v1 with model: gemini-2.0-flash
```

## Segurança

- ✅ **Use `.env`**: Arquivo `.env` está no `.gitignore` e não será commitado
- ✅ **Não commite chaves**: Nunca commite arquivos `.env` ou `appsettings.json` com chaves reais
- ✅ **Use variáveis de ambiente**: Em produção, use variáveis de ambiente do sistema ou serviços de secrets

## Limites e Custos

- **Gemini 2.0 Flash**: Gratuito até certo limite de requisições
- Consulte: https://ai.google.dev/pricing
- Para produção, considere limites de rate e custos

## Troubleshooting

### Erro: "Gemini API Key not configured"
- Verifique se o arquivo `.env` existe na pasta `backend`
- Verifique se a variável `GEMINI_API_KEY` está definida corretamente
- Certifique-se de que não há espaços extras na chave

### Erro: "401 Unauthorized"
- Verifique se a API Key está correta
- Certifique-se de que a API Key está ativa no Google Cloud Console

### Erro: "429 Too Many Requests"
- Você atingiu o limite de requisições
- Aguarde alguns minutos ou verifique seu plano no Google Cloud
