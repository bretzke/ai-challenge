# Versões da API Gemini

## Versão Utilizada: v1 (Estável)

A aplicação usa **exclusivamente a API v1 (estável)** do Google Gemini.

✅ **Versão estável** - garantida para produção  
✅ **Suporte garantido** - sem breaking changes durante a vida útil da versão  
✅ **Recomendada para produção** - estabilidade garantida  
✅ **Recursos completos** - text generation, multi-turn, function calls, NL2SQL, etc.

## Modelo: gemini-2.0-flash

O modelo padrão utilizado é **`gemini-2.0-flash`**:
- ✅ Versão mais recente e otimizada
- ✅ Melhor performance e precisão
- ✅ Suporte completo a NL2SQL
- ✅ Respostas rápidas e eficientes

## Configuração

### Configuração Recomendada

```json
{
  "Gemini": {
    "ApiKey": "SUA_API_KEY",
    "Model": "gemini-2.0-flash"
  }
}
```

**Nota**: A versão da API (v1) é fixa no código e não precisa ser configurada. Apenas o modelo pode ser customizado se necessário.

## Modelos Disponíveis

O modelo padrão é `gemini-2.0-flash`, mas você pode usar outros modelos se necessário:

- `gemini-2.0-flash` ✅ (Recomendado - padrão)
- `gemini-1.5-pro` (Alternativa mais poderosa)
- `gemini-1.5-flash` (Alternativa mais rápida)

## Implementação

O código:
1. **Usa v1 exclusivamente** (versão estável)
2. **Modelo padrão**: `gemini-2.0-flash`
3. **Configurável**: Modelo pode ser alterado via `appsettings.json`
4. **Loga**: Versão da API e modelo em uso para debugging

## Endpoint

- **v1**: `https://generativelanguage.googleapis.com/v1/models/{model}:generateContent`

**Exemplo com gemini-2.0-flash**:
```
https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent
```

## Referências

- [Documentação Oficial - API Versions](https://ai.google.dev/gemini-api/docs/api-versions)
- [Release Notes](https://ai.google.dev/gemini-api/docs/changelog)
