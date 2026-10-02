# CLAUDE.md — Monorepo de Microfrontends

Este arquivo contém as orientações gerais de arquitetura e comportamento para atuar neste repositório. Regras de camadas específicas (services, hooks, contexts, components) estão nas skills do projeto em `.claude/skills/`.

## 1. Escopo da aplicação (scope guard)

Antes de implementar qualquer funcionalidade, verifique se ela pertence ao contexto da aplicação atual.

- Se a solicitação do usuário tratar de algo que **não faz parte do contexto da aplicação atual** (ex: "registrar um novo pedido de compra" numa aplicação que trata apenas de cadastro de usuários):
  1. **Não implemente imediatamente.**
  2. Informe o usuário de que o escopo da aplicação atual é diferente da solicitação.
  3. Como este é um monorepo de microfrontends, **oriente o usuário a buscar outra aplicação** do monorepo onde essa funcionalidade pertence.
  4. Alternativamente, **peça confirmação explícita** caso o usuário realmente queira criar aquilo dentro da aplicação atual.
- Só prossiga após o usuário decidir entre mudar de aplicação ou confirmar a criação no escopo atual.

## 2. Criação de aplicações (proibição)

- ❌ **Nunca criar uma aplicação do zero por conta própria.**
- Se o usuário pedir a criação de uma nova aplicação no repositório:
  - **Oriente o usuário a usar o gerador de aplicações** que já existe no projeto.
  - Não escrever scaffolding manual, nem criar pastas de app manualmente.

## 3. Configurações de build (proibição)

- ❌ **Nunca personalizar as configurações de build** de nenhuma aplicação.
- Toda aplicação deve usar a **biblioteca comum** do monorepo, que já contém as configurações básicas padronizadas para o build e distribuição das aplicações.
- Se um ajuste de build parecer necessário, pare e consulte o usuário.

## 4. Referências antes de decisões (reference-first)

- **Sempre buscar referências que já existam no projeto** que sejam similares ao que o usuário está solicitando, antes de escrever qualquer código.
- O modelo só pode **tomar decisões por conta própria** quando:
  - Estiver **explicitamente autorizado nesta documentação**; ou
  - Houver **evidências óbvias** de outras aplicações/pastas do mesmo projeto que já aplicaram aquela mesma abordagem arquitetural.
- Caso contrário: ❌ não decidir sozinho — **perguntar ao usuário o que fazer**.

## Resumo das regras

| Situação                                    | Ação                                                                       |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| Pedido fora do escopo da app atual          | Informar divergência → orientar outra app do monorepo OU pedir confirmação |
| Pedido de nova aplicação                    | Proibir criação manual → apontar o gerador de aplicações existente         |
| Ajuste de build                             | Proibido → usar a biblioteca comum padronizada                             |
| Decisão arquitetural sem precedente no repo | Perguntar ao usuário — nunca decidir sozinho                               |
| Decisão com precedente claro no repo        | Seguir o precedente existente                                              |

## 5. Comandos do monorepo (Vite+ / `vp`)

Este monorepo utiliza **Vite+** como toolchain — todas as operações de desenvolvimento devem ser feitas através do comando **`vp`**, nunca diretamente via `pnpm`.

### Comandos disponíveis

| Tarefa                                    | Comando                    |
| ----------------------------------------- | -------------------------- |
| Instalação de dependências do workspace   | `vp add` (ou `vp install`) |
| Checagem de TypeScript, formatação e lint | `vp check`                 |
| Checagem com correção automática          | `vp check --fix`           |
| Execução de testes                        | `vp test`                  |

### Regras de uso

- ✅ **Sempre preferir `vp`** sobre comandos diretos do `pnpm`.
- ⚠️ **`vp test` só deve ser executado quando existirem, de fato, testes** para o arquivo ou aplicação em questão. Não rodar `vp test` em projetos/arquivos sem suíte de testes.
- ⚠️ **`vp check`** é o comando padrão para validar código — cobre lint, formatação e type check em uma única execução.

### Exceção: quando usar `pnpm`

O uso direto de `pnpm` é permitido apenas quando **estritamente necessário** (operações que o `vp` não cobre, como manipulação avançada de workspace, `pnpm-workspace.yaml`, catalogs ou overrides). Nesses casos, o modelo **deve justificar explicitamente** no contexto da resposta **o porquê** de ter optado por `pnpm` em vez de um comando do Vite+.

| Situação                                         | Ação                               |
| ------------------------------------------------ | ---------------------------------- |
| Operação coberta por `vp` (install, check, test) | Usar `vp` — sem exceção            |
| Testes inexistentes no arquivo/app               | Não rodar `vp test`                |
| Operação que só `pnpm` executa                   | Usar `pnpm` + justificar a decisão |
