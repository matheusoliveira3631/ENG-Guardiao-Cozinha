# Guardião da Cozinha

Sistema web acadêmico para gerenciamento de estoque de cozinha, desenvolvido para o curso de Engenharia de Software.

## Descrição

O Guardião da Cozinha é um sistema MVC (Model-View-Controller) para controlar:
- Produtos do estoque
- Entradas e saídas de produtos
- Relatórios de estoque

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **EJS** - Template engine para views
- **Express Session** - Gerenciamento de sessões
- **JSON** - Persistência de dados em arquivos

## Estrutura do Projeto

```
guardiao-cozinha/
├── src/
│   ├── controllers/       # Controladores HTTP
│   ├── models/           # Classes de domínio
│   ├── repositories/     # Acesso a dados (JSON)
│   ├── services/         # Lógica de negócio
│   ├── routes/           # Rotas Express
│   ├── views/            # Templates EJS (a implementar)
│   ├── utils/            # Funções auxiliares
│   ├── middlewares/      # Middlewares Express
│   ├── app.js            # Configuração do Express
│   └── server.js         # Inicialização do servidor
├── data/                 # Arquivos JSON de persistência
├── public/               # Arquivos estáticos (CSS, JS, imagens)
└── package.json
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/matheusoliveira3631/ENG-Guardiao-Cozinha.git
cd ENG-Guardiao-Cozinha
```

2. Instale as dependências:
```bash
npm install
```

## Como Executar

### Modo de Produção
```bash
npm start
```

### Modo de Desenvolvimento (com auto-reload)
```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

## Usuários de Teste

O sistema vem com três usuários pré-cadastrados em `data/usuarios.json`:

- **Administrador**
  - Email: `admin@guardiao.com`
  - Senha: `admin123`
  - Permissões: Gerenciar produtos e usuários

- **Operador**
  - Email: `operador@guardiao.com`
  - Senha: `operador123`
  - Permissões: Registrar entradas e saídas

- **Gestor**
  - Email: `gestor@guardiao.com`
  - Senha: `gestor123`
  - Permissões: Visualizar relatórios

## Arquitetura

### Padrão MVC

- **Models** (`src/models/`): Classes de domínio (Usuario, Produto, Movimentacao, etc.)
- **Views** (`src/views/`): Templates EJS (a implementar)
- **Controllers** (`src/controllers/`): Controladores HTTP que orquestram chamadas aos serviços

### Camadas Adicionais

- **Services**: Contém toda a lógica de negócio
- **Repositories**: Única camada que acessa os arquivos JSON
- **Utils**: Funções auxiliares reutilizáveis
- **Middlewares**: Autenticação, tratamento de erros, etc.

### Regras Arquiteturais

1. **Controllers** nunca acessam JSON diretamente
2. **Controllers** não contêm lógica de negócio
3. **Services** implementam todas as regras de negócio
4. **Repositories** são a única camada que lê/escreve JSON

## Próximos Passos

- [ ] Implementar views EJS
- [ ] Adicionar validações adicionais
- [ ] Implementar hash de senhas
- [ ] Criar testes unitários
- [ ] Adicionar documentação de API

## Licença

ISC
