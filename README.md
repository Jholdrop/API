# API de Contatos (Express)

API REST simples para gerenciar contatos por grupos (`alunos`, `professores`, etc.)

## Base URL

`http://localhost:3000`

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
node server.js
```

3. A API ficará disponível em:

`http://localhost:3000`

## Estrutura dos dados

O arquivo `contatos.json` segue este formato:

```json
{
  "alunos": [
    { "nome": "João Santos", "telefone": "11999999999" }
  ],
  "professores": [
    { "nome": "Ana Oliveira", "telefone": "11923456789" }
  ]
}
```

## Endpoints

### 1. Listar contatos de um grupo

- Método: `GET`
- Rota: `/contatos/:grupo`

#### Exemplo

```bash
curl http://localhost:3000/contatos/alunos
```

#### Resposta de sucesso (`200`)

```json
[
  { "nome": "João Santos", "telefone": "11999999999" }
]
```

#### Erro (`404`)

```json
{ "erro": "Grupo não encontrado" }
```

---

### 2. Adicionar contato em um grupo

- Método: `POST`
- Rota: `/contatos/:grupo`
- Body JSON obrigatório: `nome`, `telefone`

#### Exemplo

```bash
curl -X POST http://localhost:3000/contatos/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carlos","telefone":"11988887777"}'
```

#### Resposta de sucesso (`201`)

```json
{
  "mensagem": "Contato adicionado com sucesso!",
  "contato": {
    "nome": "Carlos",
    "telefone": "11988887777"
  }
}
```

#### Erros

- `404` grupo inexistente:

```json
{ "erro": "Grupo não encontrado" }
```

- `400` campos obrigatórios ausentes:

```json
{ "erro": "Nome e telefone são obrigatórios" }
```

---

### 3. Atualizar contato por índice

- Método: `PUT`
- Rota: `/contatos/:grupo/:index`
- `index` é baseado em zero (primeiro contato = `0`)
- Body JSON esperado: `nome`, `telefone`

#### Exemplo

```bash
curl -X PUT http://localhost:3000/contatos/alunos/0 \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Atualizado","telefone":"11911112222"}'
```

#### Resposta de sucesso (`200`)

```json
{
  "mensagem": "Contato atualizado com sucesso!",
  "contato": {
    "nome": "João Atualizado",
    "telefone": "11911112222"
  }
}
```

#### Erros (`404`)

```json
{ "erro": "Grupo não encontrado" }
```

ou

```json
{ "erro": "Contato não encontrado" }
```

---

### 4. Remover contato por índice

- Método: `DELETE`
- Rota: `/contatos/:grupo/:index`
- `index` é baseado em zero

#### Exemplo

```bash
curl -X DELETE http://localhost:3000/contatos/alunos/0
```

#### Resposta de sucesso (`200`)

```json
{
  "mensagem": "Contato excluído com sucesso!",
  "contato": {
    "nome": "João Santos",
    "telefone": "11999999999"
  }
}
```

#### Erros (`404`)

```json
{ "erro": "Grupo não encontrado" }
```

ou

```json
{ "erro": "Contato não encontrado" }
```

## Observações

- A API salva alterações diretamente em `contatos.json`.
- Se o arquivo JSON estiver inválido, a API pode falhar na leitura.
- O endpoint `PUT` atualmente não valida se `nome` e `telefone` foram enviados (ele apenas substitui o contato com o que vier no body).
