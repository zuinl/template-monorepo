---
name: components
description: Padrão de criação e modificação de componentes de interface no monorepo. Use ao criar componentes TSX, importar elementos visuais, consumir contexts ou decidir o que pode entrar num componente.
---

# Componentes — Camada de Interface

## Papel do componente

O componente é onde vive a **interface** que o usuário utiliza — todo o elemento gráfico principal: botões, formulários, inputs, listas, etc.

## Design System (regra rígida)

- Todo elemento gráfico padrão (botões, formulários, inputs, listas) deve ser importado de um **design system** próprio.
- ❌ **Nunca** importar esses elementos diretamente da biblioteca **MUI (Material UI)**.
- O modelo deve buscar o elemento **sempre no design system** do projeto.

### Se o elemento não existe no design system

Quando o elemento necessário não existir no design system, o modelo deve:

1. **Interromper a operação** — não improvisar.
2. **Avisar o usuário** de que o elemento não existe no design system.
3. **Orientar o usuário** a criar o elemento antes de continuar.
4. ❌ **Nunca** criar o elemento diretamente no design system por conta própria.
5. ❌ **Nunca** importar direto do MUI como atalho.
6. ✅ Pedir ao usuário que faça um **prompt à parte, exclusivo para a criação desse componente** no design system, e só então continuar.

## Proibição de funções no componente

- Componentes **nunca** podem criar funções dentro deles, **exceto** funções exclusivamente para o retorno do JSX.
- ❌ Lógica de tratamento de eventos, transformações, callbacks complexos — nada disso no componente.

## Dados dinâmicos: apenas via Context

- **Todo** dado dinâmico que o componente precisar deve ser consumido de um **context**.
- ✅ O componente **pode** instanciar um context da aplicação para extrair os dados e callbacks que precisa para funcionar.
- ❌ **Nunca** instanciar um **hook** diretamente.
- ❌ **Nunca** instanciar um **service** diretamente.

## Tipagens

- As tipagens que o componente precisar devem ser definidas em **arquivo à parte**, no **mesmo diretório** do componente.
- Objetivo: permitir **reaproveitamento** da tipagem em outros lugares, caso necessário.
- ❌ Nunca definir tipos inline dentro do arquivo TSX do componente.

## Estrutura de responsabilidade (resumo da arquitetura)

Componente (TSX — apenas visual + JSX) ↓ instancia apenas Context (orquestrador — payload único) ↓ instancia Hooks (lógica, eventos, formatação) ↓ chamam Services (API via @tanstack/react-query)

## Checklist antes de gerar um componente

1. Todos os elementos gráficos vêm do design system? (nada direto do MUI)
2. Algum elemento está faltando no design system? → interromper e orientar o usuário.
3. Existe alguma função além do retorno do JSX? → mover para hook/context.
4. Dados dinâmicos vêm de context? (nunca hook ou service direto)
5. Tipagens estão em arquivo à parte no mesmo diretório?
