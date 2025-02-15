# Ações Simples

Bem-vindo ao **Ações Simples**, um aplicativo web projetado para facilitar o acompanhamento de investimentos ao longo dos dias e meses. Este projeto permite que os usuários monitorem e analisem seus investimentos de maneira eficiente e intuitiva.

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais: Backend e Frontend.

**Backend:**
- Node.js
- Redis
- MongoDB
- NestJS
- TypeScript

**Frontend:**
- Next.js
- TypeScript
- Node.js

## Pré-requisitos

Antes de começar, certifique-se de ter o Docker instalado em sua máquina. Você pode baixar e instalar o Docker a partir do [site oficial](https://www.docker.com/get-started).

## Como Iniciar o Projeto

Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/WilianLor/acoes-simples.git
   ```

2. **Navegue até o diretório do projeto:**
   ```bash
   cd acoes-simples
   ```

3. **Inicie os contêineres Docker:**
   ```bash
   docker-compose up
   ```
   Este comando irá baixar as imagens necessárias, construir os contêineres e iniciar o aplicativo, tenha em mente que o processo pode demorar.

4. **Acesse o aplicativo:**
   Após a conclusão do processo de build, o aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

## Credenciais de Acesso
O aplicativo funciona em tempo real e não armazena dados históricos preexistentes. Para utilizá-lo, basta cadastrar um usuário e adicionar um investimento.

Recomendamos utilizar o ativo AAPL34, pois a API da Brapi fornece um histórico de dados extenso e confiável.

Para acessar o aplicativo, sugerimos as seguintes credenciais para cadastrar, pois tem validação de senha forte:

- **E-mail:** admin@admin.com
- **Senha:** @@11Admin
