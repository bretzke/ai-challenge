# Troubleshooting - Erro 404 Gemini API

## Problemas Corrigidos

### 1. **Modelo Atualizado**

- ❌ Antigo: `gemini-pro` (pode estar deprecado)
- ✅ Novo: `gemini-1.5-flash` (modelo atual e disponível no tier gratuito)

### 2. **URL da API Corrigida**

- ✅ Agora usa: `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`
- ✅ Suporta diferentes modelos configuráveis

### 3. **Melhor Tratamento de Erros**

- ✅ Logs detalhados da URL chamada
- ✅ Mensagens de erro mais informativas
- ✅ Timeout configurado (30 segundos)

## Possíveis Causas do Erro 404

### 1. **Modelo Incorreto**

Se ainda estiver usando `gemini-pro`, pode dar 404. Modelos disponíveis:

- `gemini-1.5-flash` ✅ (Recomendado - rápido e gratuito)
- `gemini-1.5-pro` ✅ (Mais poderoso, pode ter limites)
- `gemini-pro` ❌ (Pode estar deprecado)

### 2. **API Key Inválida ou Expirada**

- Verifique se a API Key está correta
- Certifique-se de que a API Key está ativa no Google AI Studio
- Regenerar uma nova API Key se necessário

### 3. **Região/Projeto do Google Cloud**

- Certifique-se de que o projeto está ativo
- Verifique se a API do Gemini está habilitada no projeto

## Como Verificar

### 1. Verificar Logs

Execute o backend e veja os logs. Agora você verá:

```
Calling Gemini API: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=...
```

### 2. Testar API Key Manualmente

Use curl para testar:

```bash
curl -X POST \
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=SUA_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Hello"
      }]
    }]
  }'
```

Se funcionar, você receberá uma resposta JSON. Se der 404, o problema pode ser:

- API Key inválida
- Modelo não disponível para sua região/conta

### 3. Verificar no Google AI Studio

1. Acesse: https://aistudio.google.com/
2. Verifique se consegue usar o modelo `gemini-1.5-flash`
3. Se não conseguir, pode ser problema de região ou conta

## Soluções

### Solução 1: Usar Modelo Diferente

No `appsettings.Development.json`, tente:

```json
{
  "Gemini": {
    "ApiKey": "SUA_API_KEY",
    "Model": "gemini-1.5-pro"
  }
}
```

### Solução 2: Verificar API Key

1. Acesse: https://makersuite.google.com/app/apikey
2. Verifique se a chave está ativa
3. Gere uma nova se necessário

### Solução 3: Habilitar API no Google Cloud

1. Acesse: https://console.cloud.google.com/
2. Vá em "APIs & Services" > "Library"
3. Procure por "Generative Language API"
4. Certifique-se de que está habilitada

## Modelos Disponíveis (2024)

| Modelo             | Descrição                   | Status                  |
| ------------------ | --------------------------- | ----------------------- |
| `gemini-1.5-flash` | Rápido, eficiente, gratuito | ✅ Recomendado          |
| `gemini-1.5-pro`   | Mais poderoso               | ✅ Disponível           |
| `gemini-pro`       | Versão antiga               | ⚠️ Pode estar deprecado |

## Configuração Atual

O projeto agora está configurado para usar `gemini-1.5-flash` por padrão, que é:

- ✅ Mais rápido
- ✅ Disponível no tier gratuito
- ✅ Suporta NL2SQL bem
- ✅ Menor latência

Se ainda tiver problemas, verifique os logs do backend para ver a mensagem de erro completa.
