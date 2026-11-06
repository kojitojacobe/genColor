# GEN COLOR

**_Gerador de paletas_**

Uma biblioteca feita em JavaScript, inspirada no Material Design, que permite gerar paletas de cores de forma dinâmica, fácil, rápida e flexível.

<div align="center">
  <img src="./public/tonal.png" alt="Imagem de apresentação, mostrando paletas geradas com Gen Color" height="300">
</div>

# SOBRE

Eu sou muito ruim em criar temas nas minhas aplicações WEB, então decidi criar uma ferramenta simples, fácil, rápida e versátil para me ajudar a criar temas e aplicá-los de forma dinâmica.

Passei alguns dias estudando sobre paletas de cores e temas para conseguir desenvolver este projeto.

Não é nada muito grandioso, apenas uma biblioteca simples, feita para me ajudar a estilizar meus sites de forma rápida e precisa.

# USO BÁSICO

A **API** é chamada de **genColor.js**. Você pode importá-la com:

```js
import genColor from 'genColor/genColor.js';
```

Agora que temos a **API**, podemos utilizá-la da seguinte forma:

Configure a paleta que deseja gerar:

```js
// Exemplo
const myThemeConf = {
    color: '#6417ff',
    mode: 'default',
    postProcessing: [],
    colorOutput: 'rgb'
};
```

Agora, passe o objeto de configuração como argumento para **genColor**:

```js
const myTheme = genColor(myThemeConf);
```

Pronto! Você tem sua primeira paleta funcional.

Agora, se inspecionarmos **myTheme**, ele nos mostrará:

```js
{
  0: [102, 26, 255],
  50: [63, 46, 255],
  100: [201, 92, 255],
  150: [213, 201, 237],
  200: [182, 177, 241],
  250: [212, 149, 243],
  300: [56, 0, 168],
  350: [16, 0, 194],
  400: [150, 0, 224],
  debug: {
    postProcessing: [],
    colorOutput: 'rgb',
    inputColor: '#6417ff',
    modeGen: 'default'
  }
}
```

Você recebe um objeto com várias cores organizadas.

Esse é o uso mais básico, mas não se limite apenas a isso! Existem algumas configurações que você pode aplicar para personalizar e embelezar seu projeto.

# EXPLICANDO OS PARÂMETROS

O objeto de configuração permite passar alguns parâmetros que ajudam a conseguir uma paleta de cores melhor.

## color:

Vamos começar pelo parâmetro **color**. Esse é o parâmetro de entrada, basicamente a cor base da sua paleta (ex.: '#8214ff').

Exemplo:

```js
color: '#8214ff',
```

Não existem muitos motivos para me aprofundar, mas quero avisar algo importante: atualmente, **color** só suporta o formato de cor HEX válido. Qualquer valor que não seja um HEX válido fará com que a **API** retorne um erro, por segurança.

# mode:

## default:

Talvez esse seja um dos parâmetros mais importantes, pois define o perfil de geração de cores da paleta.

O modo padrão é **default**. Ele gera uma paleta de cores baseada no Tonal Spot, do Material Design.

<div align="center">
  <img src="./public/tonal.png" alt="Imagem mostrando uma paleta de cores tonal gerada com Gen Color" height="300">
</div>

## monocromatic:

Este modo gera uma paleta de cores monocromáticas. Simples, né?

<div align="center">
  <img src="./public/exemplo1.png" alt="Imagem mostrando uma paleta monocromática gerada com Gen Color" height="300">
</div>

Para usar, basta configurar:

```js
mode: 'monocromatic',
```

## vibrant:

Caso queira transformar seu tema em uma salada de frutas colorida, esse modo é, sem dúvidas, o ideal!

O modo vibrant gera uma paleta de cores vibrantes:

<div align="center">
  <img src="./public/exemplo2.png" alt="Imagem mostrando uma paleta vibrante gerada com Gen Color" height="300">
</div>

Para usar:

```js
mode: 'vibrant',
```

# postProcessing:

O parâmetro **postProcessing: []** permite aplicar ajustes na paleta de cores. Atualmente, temos 3 opções.

## HDR

Este efeito tenta aumentar o contraste da imagem usando uma fórmula adaptada de Smooth Step.

Use:

```js
postProcessing: ['hdr'], // Escreva em maiúsculo, se preferir.
```

## ToneMap:

Este efeito tenta controlar a iluminação das cores utilizando a fórmula adaptada de Smooth Step.

Ele aplica ajustes sutis nas cores e limita a iluminação a um mínimo de 10 e um máximo de 90.

Use:

```js
postProcessing: ['tonemap'],
```

## Smooth:

Este efeito tenta suavizar as cores de forma dinâmica, aumentando a iluminação.

Use:

```js
postProcessing: ['smooth'],
```

## Observações:

Você pode usar mais de um efeito! Por exemplo, **['tonemap', 'smooth']**. Assim, aplicamos um efeito de suavização de cores e outro de controle.

A ordem em que os efeitos são declarados no array de configuração importa!

Fiz isso para tornar o processamento mais customizável.

Por exemplo, se você utilizar:

**['tonemap', 'hdr', 'smooth']**, os efeitos serão aplicados na seguinte ordem: primeiro Smooth, depois HDR e, por último, ToneMap.

Exemplo do processamento:

```text
tonemap(hdr(smooth(hsl)))
```

Caso não queira usar nenhum efeito, basta utilizar:

```js
postProcessing: [] // Array vazio.
```

# colorOutput:

Por último, mas não menos importante, **colorOutput** define o tipo de cor de saída, com suporte a RGB, HEX ou HSL.

Exemplo:

```js
colorOutput: 'hex'
```

Isso retornará as cores da paleta em HEX. Já as cores RGB e HSL serão retornadas no formato de Array: `[xxx, xxx, xxx]`.

# Funcionamento interno:

Um resumo do funcionamento interno seria:

```text
Entrada -> Tratamento de dados -> Conversão para RGB -> Conversão para HSL -> Configuração do objeto com cores HSL modificadas -> Etapa de pós-processamento (se habilitada) -> Resultado final
```

Obviamente, há mais etapas do que isso. Isto é apenas uma simplificação.

Caso queira descobrir o funcionamento interno, você pode ler os arquivos de configuração! Documentei cada função e estrutura interna para facilitar o entendimento, a modificação e a criação de temas personalizados e efeitos de pós-processamento.

# Vantagens:

As vantagens são:

- Fácil utilização.
- Flexível e versátil.
- Zero dependências.
- Facilidade para criar e modificar temas.
- Geração rápida de temas.
- Uso em páginas WEB e aplicações.
- Possibilidade de criar temas e efeitos personalizados.

# Onde recomendo usar:

Em aplicações nas quais seja necessário algo simples, rápido, flexível e altamente customizável.

# Ciclo de atualizações:

Pretendo lançar atualizações de balanceamento, correções e pequenas adições a cada mês, durante um ano.

# AUTOR:

Eu mesmo, **Kojito Jacobe**, desenvolvi esta biblioteca!

Fiz o projeto nos meus tempos livres e pretendo continuar atualizando-o e trazendo novas correções.

# Quer me ajudar?

Você pode me ajudar testando a biblioteca, relatando erros e sugerindo ideias!

# Tecnologias usadas:

Somente JavaScript e JSON.

O projeto é Open Source. Use da forma que desejar! XD