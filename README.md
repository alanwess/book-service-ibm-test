
# Books API - CRUD de Livros com busca e paginação

---

## Sobre o Projeto

Este projeto consiste em um microserviço para gerenciamento de livros, desenvolvido em NestJS com banco de dados PostgreSQL e o ORM TypeORM. O sistema implementa as funcionalidades básicas de CRUD, busca e paginação, garantindo:

- **Integridade**: o campo SBN (identificador do livro) não pode ser alterado após criação;
- **Observabilidade**: logging estruturado via Winston com possibilidade de envio para AWS CloudWatch;
- **Testabilidade**: testes unitários e e2e com Jest e Supertest;
- **Deploy facilitado**: aplicação containerizada com Docker e Docker Compose.

Este microserviço foi desenvolvido como parte de um teste técnico para a **IBM**, considerando boas práticas em arquitetura, código limpo e escalabilidade.

---

## Funcionalidades

- Criar um novo livro (SBN, nome, descrição, autor e estoque)
- Listar livros com paginação
- Buscar livros por palavra-chave (nome, descrição ou autor)
- Visualizar detalhes de um livro específico
- Atualizar dados do livro (exceto SBN)
- Excluir um livro
- Logs estruturados para rastreamento e análise
- Testes automatizados completos

---

## Tecnologias Utilizadas

| Tecnologia        | Descrição                                 |
|-------------------|-------------------------------------------|
| NestJS            | Framework backend em Node.js               |
| TypeORM           | ORM para integração com PostgreSQL        |
| PostgreSQL        | Banco de dados relacional                  |
| Jest + Supertest  | Framework de testes unitários e E2E       |
| Docker + Compose  | Containerização e orquestração             |
| Winston           | Logging estruturado                        |
| Swagger           | Documentação (disponível em /api)          |
| AWS CloudWatch    | Persistência e análise de logs (opcional) |

---

## Configuração e Execução

### Pré-requisitos

- Docker & Docker Compose instalados;
- Node.js v18+ (para execução local sem Docker);
- Conta AWS com permissões para CloudWatch (opcional).

### Passos para rodar a API

As variaveis de exemplo estão no arquivo `.env.example` e tambem no docker-compose para a execução e testes.

AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY devem ser configurados via IAM roles em produção

1. Subir os containers:
   ```bash
   docker-compose up --build
   ```

2. Acessar a API em:  
   `http://localhost:3000/books`

---

## Testes

### Testes Unitários

Roda os testes unitários do serviço:

```bash
npm run test
```

### Testes End-to-End (E2E)

Roda os testes integrados simulando requisições HTTP:

```bash
npm run test:e2e
```

---

## Documentação dos Endpoints

| Método | Rota                 | Descrição                     | Parâmetros                |
|--------|----------------------|-------------------------------|---------------------------|
| POST   | `/books`             | Criar livro                   | Body: CreateBookDto       |
| GET    | `/books`             | Listar livros com paginação  | Query: `page`, `limit`    |
| GET    | `/books/search`      | Buscar livros por palavra    | Query: `q` (termo)        |
| GET    | `/books/:sbn`        | Ver detalhes do livro        | Path: `sbn`               |
| PUT    | `/books/:sbn`        | Atualizar livro (exceto SBN) | Path: `sbn`, Body: UpdateBookDto (sem sbn) |
| DELETE | `/books/:sbn`        | Deletar livro                | Path: `sbn`               |

---

## Observabilidade

- Logs estruturados via **Winston**;
- Suporte para envio dos logs ao **AWS CloudWatch Logs**;
- Possibilidade futura de integração com Prometheus/Grafana para métricas se desejado.

---

## Docker Compose

O projeto está preparado para rodar com Docker Compose, incluindo os seguintes serviços para:

- Banco de dados PostgreSQL;
- Aplicação NestJS containerizada.

---

## Considerações Finais

Este microserviço foi desenvolvido seguindo as seguintes boas práticas, levando em conta a estrutura padrão já fornecida pelo NestJS:

- **Separação clara** entre camadas (Controller, Service, Entity);
- **DTOs** para validação e segurança dos dados;
- **Testes Unitários e E2E** garantindo qualidade;
- **Logs estruturados** para facilitar o monitoramento em produção.

---

## Melhorias e observações

- Implementar Terraform se o deploy for em ambiente AWS
- Mudança de arquitetura futura para melhor estruturação do projeto se necessário
