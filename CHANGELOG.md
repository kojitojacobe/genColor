# Changelog

## Atualização 1.1.0

A atualização deste mês traz algumas novidades, sem introduzir mudanças que quebrem a compatibilidade com a API existente.

## Suporte a entradas RGB e HSL

Foi adicionado suporte a cores de entrada nos formatos RGB e HSL.

**Exemplo em RGB:**

```js
const myConf = {
    color: 'rgb(98, 8, 243)',
    // Demais configurações...
};
```

**Exemplo em HSL:**

```js
const myConf = {
    color: 'hsl(263, 100%, 57%)',
    // Demais configurações...
};
```

## Novo efeito de pós-processamento: `neighbor`

Um novo efeito de pós-processamento foi adicionado: **`neighbor`**.

O nome pode parecer um pouco confuso, mas faz sentido: o `neighbor` utiliza informações das cores vizinhas da mesma paleta para realizar cálculos e gerar transições com picos menos bruscos.

Em termos mais simples, ele suaviza as transições entre as cores. Quando um pico de cor está muito alto, o efeito o reduz. Quando está muito baixo, ele o aumenta um pouco.

### Exemplo de uso

```js
postProcessing: ['neighbor'],
```

Assim como os outros efeitos, você pode combinar o `neighbor` com outros efeitos de pós-processamento.

### Recomendações

Recomendo utilizar esse efeito em modos de geração de paletas nos quais as cores mudam de maneira progressiva, como os modos **Monocromático** e **Vibrante**.

Não recomendo utilizá-lo no modo **Default (Tonal Spot)**, pois esse modo gera paletas com picos e diferenças de cor mais acentuados. O `neighbor` tenta justamente suavizar essas diferenças, o que pode produzir um resultado visual pouco agradável nesse caso.

## Balanceamento

Foram ajustados alguns valores nos arquivos responsáveis pela geração das paletas. As seguintes alterações foram realizadas:

- **Monocromático:** as cores das posições 300, 350 e 400 eram geradas com tonalidades extremamente claras. O balanceamento corrigiu esse comportamento.

- **Default (Tonal Spot):** as cores das posições 150, 200 e 250 apresentavam tonalidades excessivamente claras. Os valores foram ajustados para produzir resultados mais neutros.