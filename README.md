# Ponto Control

Este é um projeto em React com TypeScript para gerenciamento do ponto eletrônico de uma empresa. Ele se integra perfeitamente com uma API em C# para automatizar as operações de um sistema de registro de ponto eletrônico, simplificando o controle de horas trabalhadas e presenças.

## Recursos

- Cadastro de novos colaboradores.
- Registro de entrada e saída de funcionários com localização atual.
- Acompanhamento de horas trabalhadas.
- Relatório com filtragem por datas.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (recomendado)

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd nome-do-projeto
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Baixe o repositório da API no link abaixo e siga as orientações em seu README:

   [Repositório da API](https://github.com/luan952/PontoControlAPI)

5. Certifique-se de configurar a URL da API através da variável de ambiente `VITE_APP_API_URL` no arquivo `.env` caso esteja rodando a API em uma porta diferente da `7083`. Se a porta for diferente, adicione a seguinte linha ao seu arquivo `.env`:

   ```bash
   VITE_APP_API_URL=https://localhost:SUA_PORTA_DA_API
   ```

6. Para executar o projeto em modo de desenvolvimento, use o seguinte comando:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```
