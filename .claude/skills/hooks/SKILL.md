---
name: hooks
description: Padrão de criação e modificação de hooks customizados no monorepo. Use ao criar hooks, adicionar lógica a componentes, tratar eventos de UI ou chamar services via hooks.
---

# Hooks — Camada de Lógica

## Onde criar

- Criar os hooks **sempre** dentro da pasta `hooks/` da aplicação correspondente no monorepo.

## Responsabilidade dos hooks

Os hooks são responsáveis por **chamar os services** (da pasta `services/`) e por concentrar **toda a lógica** da aplicação (um hook para cada funcionalidade):

- Gerenciar os dados que os services exigem (receber, criar, tratar, transformar).
- Toda lógica relacionada à interface:
  - Formatação de dados para exibição.
  - Tratamento de eventos de clique em botões.
  - Preenchimento e submissão de formulários.
  - Eventos de teclado e mouse.

**Regra central**: qualquer ação do usuário que exija uma função JS para tratar deve ficar dentro do hook — **nunca no componente**.

## Proibição absoluta em arquivos TSX

- ❌ **Nunca** existirá um arquivo TSX contendo funções de lógica.
- O TSX é **exclusivamente** o componente (estrutura visual/JSX).
- A lógica de fato vive nos hooks.

## Escopo: um hook por funcionalidade

- Cada hook deve se limitar a **uma funcionalidade específica**.
- Hooks são relativos ao contexto de uso — cada um atende à sua própria necessidade.
- **Não reutilizar** um hook existente para atender uma tela ou componente diferente:
  - Se o usuário pedir lógica para outro componente ou outra tela, **criar um novo hook** — o hook existente não faz sentido nesse contexto.

## Interação obrigatória com o usuário

Ao receber um pedido que envolve hooks, o modelo **deve**:

1. **Perguntar ao usuário** qual hook ele quer criar/alterar e o que exatamente ele será responsável — não assumir.
2. **Questionar se a abordagem é a correta**: o hook proposto faz sentido para essa funcionalidade? Ou seria melhor um hook novo?
3. **Pedir revisão/validação do usuário** sobre a decisão e o plano de implementação **antes** de escrever qualquer código.

❌ Não implementar diretamente sem essa validação.
✅ Propor → questionar → aguardar confirmação → implementar.
