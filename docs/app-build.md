# Build das aplicações

## Visão geral

Este monorepo utiliza micro front-ends independentes, e o processo de build foi padronizado para evitar divergências entre as aplicações. A regra principal é simples: todas as aplicações de micro front-end devem seguir a mesma biblioteca central de configuração de build.

A biblioteca central responsável por isso é a `libs/vite-common`. Essa biblioteca define o comportamento padrão de build, saída de artefatos, plugin de desenvolvimento e a lista de dependências externas.

## Biblioteca central: Vite Common

A configuração de build para os micro front-ends está centralizada em:

- `libs/vite-common/src/index.ts`
- `libs/vite-common/src/createExternalMatcher.ts`
- `libs/vite-common/src/ports.ts`

A ideia é que cada aplicação siga o mesmo padrão:

```ts
import { defineConfig } from "vite-plus";
import { APP_PORTS } from "../../libs/vite-common/src/ports";
import { createMfeConfig } from "../../libs/vite-common/src/index";
import { name } from "./package.json";

export default defineConfig(
  createMfeConfig({
    entry: "./src/main.tsx",
    port: APP_PORTS[name],
  }),
);
```

Esse padrão aparece em cada app do monorepo, ou seja, o `vite.config.ts` de cada micro front-end não define regras próprias de build; ele apenas importa a biblioteca central e passa os argumentos mínimos necessários, como entry point e porta local.

## Regra de ouro: nunca alterar build dentro de cada app

Como o build já foi centralizado na biblioteca geral, a regra é clara:

- não alterar configurações de build dentro de cada aplicação;
- usar a biblioteca comum como o único ponto de manutenção do processo de build.

Esse cuidado é importante porque todos os micro front-ends devem manter um comportamento homogêneo.

## Quando a biblioteca geral precisar mudar

Se for estritamente necessário atualizar alguma configuração global de build na biblioteca central, essa mudança deve seguir um processo mais rígido:

1. identificar exatamente o impacto no monorepo;
2. alinhar a alteração com o time de frontend e arquitetura;
3. validar o efeito em todos os micro front-ends;
4. revisar o impacto antes de mergear;
5. documentar a mudança para que o time saiba que o comportamento compartilhado foi alterado.

Em outras palavras, alterações em `libs/vite-common` não são ajustes simples de aplicação. Elas são mudanças de plataforma e devem ser tratadas como tal.

## O que não entra no build

O build da aplicação raiz, ou root config, não utiliza a mesma regra de construção dos micro front-ends. O root config é um componente de integração do ambiente de execução, enquanto os micro front-ends são produzidos como módulos independentes e empacotados para execução no runtime.

A biblioteca `vite-common` foi desenhada para os micro front-ends. O root config permanece fora desse fluxo de build centralizado e é tratado como peça de orquestração do shell de integração.

## Output do build: pasta dist por aplicação

Quando o build é executado, o artefato final é gerado na pasta `dist` do workspace, organizado por aplicação.

A biblioteca central calcula a saída em um caminho como:

```bash
dist/<nome-da-aplicacao>
```

Isso significa que cada app produz seu próprio bundle em um diretório isolado, mantendo o build do monorepo organizado e permitindo uma estratégia clara de versionamento e publicação.

O arquivo principal gerado é um módulo JavaScript no formato ES, pronto para ser consumido pelo runtime do micro front-end. O ponto importante é que a saída final da aplicação fica em `dist` dentro da própria pasta do app, e não em um bundle único compartilhado para todo o monorepo.

## Processo de hospedagem e CI/CD

O processo de build gera o artefato final em `dist`, mas a publicação e a hospedagem desse arquivo JavaScript são tratadas em outra etapa do pipeline de entrega. O CI/CD, em outra documentação, será responsável por:

- versionar o build gerado;
- empacotar a artefatia correta;
- publicar em ambiente de homologação e produção;
- apontar o runtime para a versão correta do bundle;
- garantir que os assets sejam servidos de forma estável e segura.

Ou seja, o build local apenas gera o arquivo JavaScript pronto. O versionamento e a disponibilização em produção ficam a cargo do processo de deployment e hosting, conforme documentação específica de infraestrutura e entrega contínua.

## Dependências externas

A biblioteca central também define quais dependências devem ser tratadas como externas no build. Isso é essencial para o funcionamento de micro front-ends em runtime compartilhado.

A configuração de externalização considera, por padrão, dependências como:

- `react`
- `react-dom`
- `single-spa`
- `single-spa-react`
- `@mui/*`
- `@emotion/*`

Essas bibliotecas são tratadas como dependências comuns ao ecossistema de micro front-ends e não devem ser empacotadas em cada build individual.

### Por que isso é importante

O objetivo da externalização é melhorar a performance e reduzir o tamanho do bundle gerado. Em vez de instalar e empacotar o mesmo conjunto de bibliotecas em cada micro front-end, o projeto mantém essas dependências no ambiente compartilhado do shell/root config e as disponibiliza no browser em runtime.

Em prática:

- o root config instala e disponibiliza as dependências globais;
- cada micro front-end consome essas bibliotecas de forma externa;
- o bundle gerado em `dist` não inclui novamente React, ReactDOM, Single SPA, Material UI e demais bibliotecas compartilhadas;
- o build final fica mais enxuto, com apenas as dependências mais específicas da aplicação.

Isso reduz duplicação, melhora o uso de cache e diminui o peso do JavaScript enviado ao navegador.
