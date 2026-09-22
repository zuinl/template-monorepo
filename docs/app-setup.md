# Setup comum

As instruções desta página são comuns a todas as aplicações deste monorepositório, EXCETO: `app-root-config`.

## Pré requisitos

- A IDE oficialmente recomendada é o VS Code;
- Instalar as [extensões recomendadas](../.vscode/extensions.json);
- Instale o Vite Plus globalmente em sua máquina, seguindo a [documentação oficial](https://viteplus.dev/guide/#install-vp-globally).

## Para execução local de uma aplicação

1. Execute `vp i` (de qualquer lugar do workspace) para instalar/atualizar as dependências;

2. Para executar a aplicação localmente, use uma das 3 alternativas:
   - Execute `vp dev` na raiz do workspace. O CLI irá solicitar que você selecione qual aplicação deseja rodar;
   - Execute `vp -C apps/{nome do diretório} dev` na raiz do workspace para rodar diretamente uma aplicação;
   - Executar `vp dev` dentro do diretório da aplicação.

## Para ferramentas do processo de desenvolvimento

1. Execute `vp i` (de qualquer lugar do workspace) para instalar/atualizar as dependências;

2. Para ferramentas do processo de desenvolvimento:
   - `vp lint apps/{nome do diretório}`: lint dos arquivos da aplicação;
   - `vp fmt apps/{nome do diretório}`: verificaçã de formatação dos arquivos da aplicação;
   - `vp test apps/{nome do diretório} --coverage`: execução dos testes da aplicação
   - `vp check apps/{nome do diretório}`: execute lint, typecheck, testes e formatação ao mesmo tempo.
3. Se quiser trabalhar com o CLI dentro do diretório da aplicação:
   - Faça uso dos comandos disponíveis na seção `scripts` do `package.json` local: `pnpm run {script}`
