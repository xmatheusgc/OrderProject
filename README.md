# Order Management System

Este é um projeto Full-Stack desenvolvido para o gerenciamento de pedidos, focado em boas práticas de arquitetura, validação de dados e orquestração de containers.

## Tecnologias Utilizadas

### Backend
- **ASP.NET Core 8**: Web API robusta para o processamento de regras de negócio.
- **Entity Framework Core**: ORM para persistência de dados.
- **SQLite**: Banco de dados leve e portátil.
- **Swagger/OpenAPI**: Documentação interativa da API.

### Frontend
- **React Router v7**: Framework para a construção da interface do usuário.
- **TanStack Query (React Query)**: Gerenciamento de estado assíncrono e cache.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **Lucide React**: Biblioteca de ícones.

### Infraestrutura
- **Docker & Docker Compose**: Orquestração completa do ambiente.
- **Monorepo**: Estrutura unificada para frontend e backend.

## Pré-requisitos

Para executar este projeto, você precisará ter instalado em sua máquina:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Configuração e Instalação

### 1. Clonar o Repositório
```bash
git clone https://github.com/xmatheusgc/OrderProject.git
cd OrderProject
```

### 2. Variáveis de Ambiente
O projeto utiliza um arquivo `.env` centralizado na raiz para configurar portas e URLs. Um modelo já está disponível no arquivo `.env.example`. Para a execução padrão, o arquivo `.env` deve conter:

```env
BACKEND_PORT=5000
ALLOWED_ORIGINS=http://localhost:5173
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:5000
```

### 3. Execução via Docker Compose
Na raiz do projeto, execute o comando abaixo para construir as imagens e subir os serviços:

```bash
docker compose up --build
```

Este comando iniciará automaticamente:
- O banco de dados SQLite (com migrações automáticas).
- A API do Backend na porta 5000.
- O Frontend na porta 5173.

## Acesso aos Serviços

Após a inicialização, os serviços estarão disponíveis nos seguintes endereços:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **API Backend**: [http://localhost:5000](http://localhost:5000)
- **Documentação Swagger**: [http://localhost:5000/swagger](http://localhost:5000/swagger)

## Notas de Implementação

### Validação de Dados
O sistema utiliza **Data Annotations** no Backend para garantir a integridade dos dados antes do processamento. Erros de validação (como valores negativos ou nomes vazios) são capturados automaticamente pelo framework, que retorna respostas padronizadas.

### Gerenciamento de Estado
O uso do **React Query** garante que a lista de pedidos esteja sempre sincronizada com o servidor, utilizando invalidação de cache inteligente após cada criação de pedido.
