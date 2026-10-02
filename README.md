# Vite+ Monorepo Starter

Este é um monorepositório de micro front-ends construído com a ferramenta Vite Plus como toolchain principal. A estrutura foi organizada para permitir o desenvolvimento independente de aplicações pequenas e focadas, compartilhando bibliotecas, tipos e configurações comuns entre os módulos do projeto.

## Visão geral do projeto

- O workspace é dividido em aplicações dentro da pasta `apps/`.
- Há bibliotecas compartilhadas em `libs/` para design system, eventos globais e tipos reutilizáveis.
- A aplicação raiz e o layout de integração ficam em `apps/app-root-config/`.
- O objetivo é manter cada micro front-end com autonomia de desenvolvimento, ao mesmo tempo em que aproveita padrões comuns para build, execução e organização.

## Gerador de aplicações

Este repositório também inclui um gerador de aplicações, localizado em `tools/app-template/`. Ele foi criado para acelerar a criação de novos módulos seguindo o padrão do monorepo.

Para iniciar o gerador a partir da raiz do monorepo:

```bash
vp create
```

Esse comando abre o assistente do gerador e guia a criação do novo app conforme o template já configurado no projeto. Em geral, o fluxo é:

1. Executar o comando acima na raiz do monorepo;
2. Selecionar "Application Generator";
3. Informe sempre os parâmetros no padrão "app-{name}" (nas 2x que for solicitado).
4. A aplicação será criada dentro de `/apps`. Basta customizá-la para começar a desenvolver.

> Importante: sempre que for criar uma nova aplicação, prefira usar esse gerador.

## Comandos principais do Vite Plus

O comando central do projeto é `vp`. Você encontra detalhes de como trabalhar localmente na [documentação sobre setup local](./docs/app-setup.md)

## Claude Code e skills obrigatórias

Este repositório está preparado para uso do Claude Code como agente de IA oficial do desenvolvimento. A pasta `.claude` contém as skills cadastradas para orientar boas práticas e garantir que a implementação siga os padrões do monorepo.

Essas skills devem ser utilizadas obrigatoriamente quando o usuário for criar ou alterar:

- componentes;
- hooks;
- contextos;
- serviços.

A ideia é manter a arquitetura consistente e impedir que implementações saiam do padrão já estabelecido no projeto. Sempre que for trabalhar com essas camadas, consulte a estrutura disponível em `.claude/skills` antes de escrever código.
