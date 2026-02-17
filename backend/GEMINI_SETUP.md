# Configuração do Google Gemini

## Como Obter a API Key

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Escolha um projeto ou crie um novo
5. Copie a API Key gerada

## Configuração no Projeto

### Opção 1: appsettings.json (Desenvolvimento)

Edite `backend/appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "Gemini": {
    "ApiKey": "SUA_API_KEY_AQUI"
  }
}
```

### Opção 2: Variáveis de Ambiente (Recomendado para Produção)

No Windows (PowerShell):
```powershell
$env:Gemini__ApiKey = "SUA_API_KEY_AQUI"
```

No Linux/Mac:
```bash
export Gemini__ApiKey="SUA_API_KEY_AQUI"
```

Ou crie um arquivo `.env` na pasta `backend`:
```
Gemini__ApiKey=SUA_API_KEY_AQUI
```

### Opção 3: User Secrets (Desenvolvimento - Mais Seguro)

```bash
cd backend
dotnet user-secrets set "Gemini:ApiKey" "SUA_API_KEY_AQUI"
```

## Verificação

Após configurar, execute o backend:

```bash
cd backend
dotnet run
```

Se a API Key estiver configurada corretamente, o serviço iniciará sem erros.

## Limites e Custos

- **Gemini Pro**: Gratuito até certo limite de requisições
- Consulte: https://ai.google.dev/pricing
- Para produção, considere limites de rate e custos

## Troubleshooting

### Erro: "Gemini API Key not configured"
- Verifique se a chave está no `appsettings.json` ou variável de ambiente
- Certifique-se de que o nome da configuração está correto: `Gemini:ApiKey`

### Erro: "401 Unauthorized"
- Verifique se a API Key está correta
- Certifique-se de que a API Key está ativa no Google Cloud Console

### Erro: "429 Too Many Requests"
- Você atingiu o limite de requisições
- Aguarde alguns minutos ou verifique seu plano no Google Cloud
