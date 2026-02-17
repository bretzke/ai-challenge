# Modelos Gemini Disponíveis

## Problema: Erro 404 com modelos

Se você está recebendo erro 404, pode ser que o modelo não esteja disponível para sua API key ou região.

## Modelos para Testar

### 1. `gemini-pro` (Recomendado para começar)
- ✅ Mais estável e amplamente disponível
- ✅ Funciona com a maioria das API keys
- ⚠️ Pode ter limites de rate

### 2. `gemini-1.5-flash`
- ✅ Rápido e eficiente
- ⚠️ Pode não estar disponível em todas as regiões
- ⚠️ Requer API key mais recente

### 3. `gemini-1.5-pro`
- ✅ Mais poderoso
- ⚠️ Pode ter custos
- ⚠️ Pode não estar disponível no tier gratuito

## Como Verificar Modelos Disponíveis

### Método 1: Via API

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=SUA_API_KEY"
```

Isso retornará uma lista de todos os modelos disponíveis para sua API key.

### Método 2: Via Google AI Studio

1. Acesse: https://aistudio.google.com/
2. Veja quais modelos estão disponíveis na interface
3. Use o mesmo nome do modelo no código

## Configuração no Projeto

Edite `appsettings.Development.json`:

```json
{
  "Gemini": {
    "ApiKey": "SUA_API_KEY",
    "Model": "gemini-pro"
  }
}
```

## Solução de Problemas

### Se `gemini-pro` der 404:
1. Verifique se a API key está correta
2. Verifique se a API está habilitada no Google Cloud Console
3. Tente gerar uma nova API key
4. Verifique se há restrições de região na sua conta

### Se nenhum modelo funcionar:
1. Verifique se você tem acesso à API do Gemini
2. Algumas contas podem ter restrições regionais
3. Considere usar uma conta diferente ou verificar políticas da organização

## Métodos de Autenticação

O código agora tenta dois métodos:

1. **Header `x-goog-api-key`** (preferido)
2. **Query parameter `?key=`** (fallback)

Se ambos falharem, o problema pode ser:
- Modelo não disponível
- API key inválida
- Restrições de região/conta
