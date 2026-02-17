# Versões da API Gemini

## Versão Estável: v1

✅ **Versão estável** - garantida para produção  
✅ **Suporte garantido** - sem breaking changes durante a vida útil da versão  
✅ **Recomendada para produção** - estabilidade garantida  
✅ **Mesmos recursos principais** - text generation, multi-turn, function calls, etc.

## Diferenças

| Característica             | v1 (Stable)                   | v1beta (Experimental) |
| -------------------------- | ----------------------------- | --------------------- |
| **Estabilidade**           | ✅ Garantida                  | ⚠️ Pode mudar         |
| **Breaking Changes**       | ❌ Não (exceto major version) | ⚠️ Sem aviso          |
| **Produção**               | ✅ Recomendado                | ❌ Não recomendado    |
| **Recursos Experimentais** | ❌ Não                        | ✅ Sim                |
| **Suporte**                | ✅ Garantido                  | ⚠️ Limitado           |

## Configuração

### Usar v1 (Estável) - Recomendado

```json
{
  "Gemini": {
    "ApiKey": "SUA_API_KEY",
    "Model": "gemini-pro",
    "ApiVersion": "v1"
  }
}
```

### Usar v1beta (Experimental) - Apenas para testes

```json
{
  "Gemini": {
    "ApiKey": "SUA_API_KEY",
    "Model": "gemini-pro",
    "ApiVersion": "v1beta"
  }
}
```

## Quando usar cada versão?

### Use v1 quando:

- ✅ Desenvolvendo para produção
- ✅ Precisa de estabilidade
- ✅ Não pode tolerar breaking changes
- ✅ Quer garantia de suporte

### Use v1beta quando:

- ⚠️ Testando recursos experimentais
- ⚠️ Desenvolvimento/experimentação
- ⚠️ Precisa de features mais recentes
- ⚠️ Pode tolerar mudanças inesperadas

## Mudança Implementada

O código agora:

1. **Usa v1 por padrão** (estável)
2. **Permite override** via configuração para v1beta se necessário
3. **Loga qual versão está sendo usada** para debugging

## Endpoints

- **v1**: `https://generativelanguage.googleapis.com/v1/models/{model}:generateContent`
- **v1beta**: `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`

## Referências

- [Documentação Oficial - API Versions](https://ai.google.dev/gemini-api/docs/api-versions)
- [Release Notes](https://ai.google.dev/gemini-api/docs/changelog)
