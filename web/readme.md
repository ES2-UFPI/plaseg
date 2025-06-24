# Plaseg - Plataforma de Apoio à Segurança Pública

Uma plataforma que dá apoio na construção de projetos para editais de financiamento.

## Índice

1. [Como usar](#como-usar)
2. [Funcionalidades](#funcionalidades)
3. [Aspectos Técnicos](#aspectos-técnicos)
4. [Quadro de atividades Kanban](#quadro-de-atividades-kanban)
5. [Regras de Negócio](#regras-de-negócio)
6. [Testes da aplicação front-end](#testes-da-aplicação-front-end)
7. [Referências](#referências)

## Como Usar

1. **Você precisa ter o [NodeJS](https://en.wikipedia.org/wiki/Node.js) instalado na sua máquina para fazer o setup da aplicação.**

   - Instale o Node.js na sua máquina no site oficial do [Node.js](https://nodejs.org/en).
   - No Windows/Linux/MacOS instale o pnpm:
     ```bash
     npm install pnpm -g
     ```
   - Clone a aplicação.
     ```bash
     git clone https://github.com/plaseg/plaseg
     ```
   - Vá para o diretório do projeto:
     ```bash
     cd plaseg
     ```
   - Agora instale as depedências do projeto
     ```bash
     pnpm install
     ```

2. **Execute a Aplicação:**
   - No terminal da pasta raiz, no Windows/Linux/MacOS:
     ```bash
     pnpm dev
     ```

## Funcionalidades

1. Registro de um usuário.
2. Autenticação de um usuário.
3. Recuperação de senha.
4. Pagamento.
5. Registro de uma empresa.
6. Registro de um município.
7. Listagem de editais.

## Aspectos Técnicos

- Uso do React para criar componentes dinâmicos para criar aplicações HTML dinâmicas assíncronas.
- Uso do [TypeScript](https://www.typescriptlang.org/) para adicionar tipagem estática ao JavaScript, o que ajuda a prevenir erros comuns e torna o código mais robusto e confiável.
- Mais detalhes sobre a stack escolhida em [link](https://github.com/PlaSeg/plaseg/blob/master/stack.md)

## Quadro de Atividades Kanban

Este projeto é dividido em diferentes tarefas conforme um fluxo de trabalho estruturado. Abaixo estão as tarefas salvas da equipe de front-end:

Quadro de Tarefas (Front-end) disponível em [link](https://github.com/orgs/PlaSeg/projects/2/views/1).

## Regras de Negócio

As regras de negócio estão disponívels em [link](https://docs.google.com/document/d/1RCpFobPdQLeoZfBkDB3c8gQ5A_JgcHB1hLac5pvJMK0/edit?tab=t.0).

## Testes da Aplicação

Existem vários tipos de testes de software que podem ser aplicados durante o processo de desenvolvimento para garantir a qualidade do software. Logo abaixo seguem os tipos de testes que deverão ser feitos para garantir a qualidade da nossa aplicação.

1. **Testes Unitários:**

É realizado para verificar se as unidades individuais de código (geralmente funções, métodos ou classes) funcionam corretamente. O objetivo é testar cada unidade isoladamente para identificar possíveis erros lógicos ou funcionais. Geralmente, é executado pelos desenvolvedores.

```bash
pnpm test
```

2. **Testes E2E (End-to-End)**

Os testes E2E (End-to-End) são realizados para verificar o funcionamento completo de um sistema, desde o início até o fim. O objetivo é simular o comportamento real do usuário, garantindo que todos os componentes do sistema (frontend, backend, banco de dados, etc.) funcionem corretamente em conjunto. Esses testes ajudam a identificar problemas de integração e a validar fluxos de trabalho críticos. Geralmente, são executados por desenvolvedores ou equipes de QA.

```bash
pnpm test:e2e
```

## Referências

- [Javascript](https://en.wikipedia.org/wiki/JavaScript)
- [Node](https://nodejs.org/en)
- [React](https://react.dev)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [JWT](https://jwt.io)
- [PlantUML](https://plantuml.com)
- [Editor PlantUML](https://plantuml-editor.kkeisuke.com)
