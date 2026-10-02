---
name: contexts
description: Padrão de criação e modificação de contexts no monorepo. Use ao criar contexts, conectar hooks a componentes, ou decidir onde colocar lógica entre hook, context e componente.
---

# Contexts — Camada Orquestradora

## Papel do contexto

O contexto funciona como **orquestrador** entre hooks e componentes:

- É o **único ponto de acesso dos componentes** à lógica e aos dados.
- O contexto chama e instancia **todos os hooks** necessários para aquela tela/funcionalidade.
- O contexto coleta os retornos desses hooks e **devolve num payload único** para os componentes consumirem.

## Regra de instanciação (rígida)

- ❌ Um componente **nunca** instancia diretamente um service.
- ❌ Um componente **nunca** instancia diretamente um hook.
- ✅ Um componente instancia **apenas contexts**.
- O contexto é quem chama services (via hooks) e expõe o resultado.

## Minimalismo: o contexto é só orquestrador

- O contexto deve ser **o menor possível**.
- ❌ Evitar ao máximo funções próprias e tratamento de lógica dentro do contexto.
- ✅ Tudo que for possível colocar dentro de um **hook** deve ficar no hook — o contexto então o consome de forma indireta.
- Se uma lógica precisa existir, pergunte-se: "isso pode virar um hook?" Se sim, crie o hook e consuma-o no contexto.

## Tipagem forte obrigatória

- O contexto deve ser **fortemente tipado**.
- **Não tipar manualmente** os retornos dos hooks dentro do contexto.
- Usar o utility type `ReturnType` do TypeScript, combinado com `typeof`:

type AppContextValue = ReturnType;

- Com `ReturnType<typeof hook>`, o tipo do contexto **reflete automaticamente** qualquer alteração no objeto retornado pelo hook — sem atualização manual de interface.
- Isso elimina duplicação de tipos e o risco de o contexto dessincronizar dos hooks.

## Localização do <Provider>

O provider do contexto criado deve ser injetado no arquivo `main.tsx` da aplicação em questão, para que o contexto esteja disponível globalmente para todos os componentes.

## Estrutura de responsabilidade (resumo da arquitetura)

Componente (TSX — apenas visual) ↓ instancia apenas Context (orquestrador — payload único, sem lógica) ↓ instancia Hooks (lógica, eventos, formatação) ↓ chamam Services (chamada API via @tanstack/react-query)

## Interação com o usuário

Ao criar ou alterar um contexto, antes de implementar:

1. Confirmar quais hooks o contexto deve orquestrar.
2. Confirmar se alguma lógica pedida pertence ao contexto ou deve migrar para um hook.
3. Validar com o usuário a estrutura do payload exposto antes de escrever o código.
