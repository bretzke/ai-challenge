# Suporte a Markdown nas Respostas da IA

## Funcionalidade

O componente `AIAssistant` agora renderiza as respostas da IA usando **Markdown**, permitindo formatação rica de texto.

## Formatações Suportadas

### Texto Básico
- **Negrito**: `**texto**` → **texto**
- *Itálico*: `*texto*` → *texto*
- `Código inline`: `` `código` `` → `código`

### Listas
- Listas não ordenadas:
  ```markdown
  - Item 1
  - Item 2
  ```
- Listas ordenadas:
  ```markdown
  1. Primeiro
  2. Segundo
  ```

### Cabeçalhos
```markdown
# Título 1
## Título 2
### Título 3
```

### Citações
```markdown
> Esta é uma citação
```

### Links
```markdown
[Texto do link](https://exemplo.com)
```

### Tabelas
```markdown
| Coluna 1 | Coluna 2 |
|----------|----------|
| Valor 1  | Valor 2  |
```

### Blocos de Código
````markdown
```sql
SELECT * FROM Products
```
````

## Implementação

### Componente MarkdownRenderer

O componente `MarkdownRenderer` usa:
- **react-markdown**: Biblioteca para renderizar Markdown
- **remark-gfm**: Plugin para suporte a GitHub Flavored Markdown (tabelas, strikethrough, etc.)

### Estilos

Os estilos são aplicados via Tailwind CSS e classes customizadas no `globals.css`:
- Classes `.prose` para tipografia
- Estilos customizados para cada elemento Markdown
- Suporte a dark mode

## Exemplo de Uso

Quando a IA retorna uma resposta como:

```markdown
Encontrei **5 produtos** na categoria Eletrônicos:

1. Notebook Gamer - R$ 4.500,00
2. Smartphone Pro - R$ 2.500,00
3. ...

O produto mais caro é o **Notebook Gamer** com preço de `R$ 4.500,00`.
```

Será renderizado com:
- Números em negrito
- Lista numerada formatada
- Código inline para valores monetários

## Backend

O backend (`GeminiService`) foi configurado para instruir o Gemini a usar Markdown nas respostas, melhorando a legibilidade e apresentação das informações.

## Bibliotecas Utilizadas

- `react-markdown`: ^9.0.1
- `remark-gfm`: ^4.0.0
