---
name: services
description: Padrão de criação e modificação de services de API REST nas aplicações do monorepo. Use ao criar, alterar ou revisar qualquer chamada HTTP ou arquivo dentro da pasta services de um app.
---

# Services de API REST

## Onde criar

- Criar os services **sempre** dentro da pasta `services/` da aplicação correspondente no monorepo.

## Nomenclatura de arquivos

- Formato obrigatório: `{http-method}-{endpoint}.ts`
- `{http-method}` em minúsculas: `get`, `post`, `put`, `patch`, `delete`.
- `{endpoint}` em kebab-case, refletindo o recurso da rota.

Exemplos:

- `get-posts.ts`
- `post-users.ts`
- `delete-session.ts`

## Requisições

- Os services devem **sempre** usar `@tanstack/react-query` para realizar as chamadas à API.
- Nunca usar `fetch`, `axios` ou outra biblioteca HTTP diretamente dentro de um service.

## Contrato de retorno

Todo service deve retornar exatamente este objeto:

{ data, error, loading, mutate }

- `data` → dados retornados pela API.
- `error` → erro da requisição, quando houver.
- `loading` → estado de carregamento da requisição.
- `mutate` → função para refetch/invalidação dos dados.

## Tipagens

- As tipagens necessárias para o envio de dados ao endpoint (cabeçalhgos, body request e/ou query params) devem ser criadas em **arquivo separado**.
- Localização: pasta `types/` dentro do próprio diretório `services/` da aplicação.
- O arquivo de tipagem deve ter o mesmo nome do arquivo do service principal.
- A nomenclatura da tipagem deve serguir o padrão: `{http-method}{endpoint}Request{Type}` sendo que {Type} pode ser "Body", "Query" ou "Headers", a depender das informações fornecidas pelo usuário no prompt.
  - Exemplo: `GetPostsRequestBody`
- No mesmo arquivo, devem ser criadas as tipagens de response da endpoint a ser chamada, quando houver. Deve ser usado o padrão de nomenclatura `{http-method}{endpoint}Response{Type}`
- Uma tipagem inline no arquivo do service poderá existir para mesclar os dados necessários pela requisição (aqueles que tiverem na pasta `types`) com dados de configuração do useMutation (`onSuccess` e `onError`)

## Responsabilidade única

Dentro de um service **não deve existir nenhuma outra lógica**:

- ❌ Transformações de dados (map, reduce, formatação, parsing).
- ❌ Callbacks ou efeitos colaterais.
- ❌ Regras de negócio.
- ❌ Manipulação de estado fora do contrato de retorno.

O único papel do service é: **realizar a chamada à API e devolver os dados** no contrato `{ data, error, loading, mutate }`.

## Referências

- Sempre use como referência os arquivos dentro de `tools/app-template/src/files/src/services`. Este diretório é um template do monorepo e contém exemplos de arquivos de service para requisições GET e um exemplo de requisições POST (que deve ser referência para os tipos PUT, PATCH e DELETE também)
