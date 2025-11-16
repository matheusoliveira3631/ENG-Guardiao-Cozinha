# Estrutura Inicial - Guardião da Cozinha

## Resumo da Criação

A estrutura inicial do projeto foi criada com sucesso seguindo o padrão MVC e as instruções do projeto.

## Estrutura de Pastas Criada

```
guardiao-cozinha/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── produtoController.js
│   │   ├── movimentacaoController.js
│   │   └── relatorioController.js
│   │
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Administrador.js
│   │   ├── Operador.js
│   │   ├── Gestor.js
│   │   ├── Produto.js
│   │   ├── Movimentacao.js
│   │   └── TipoMovimentacao.js
│   │
│   ├── repositories/
│   │   ├── usuarioRepository.js
│   │   ├── produtoRepository.js
│   │   └── movimentacaoRepository.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── produtoService.js
│   │   ├── movimentacaoService.js
│   │   └── relatorioService.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── produtoRoutes.js
│   │   ├── movimentacaoRoutes.js
│   │   └── relatorioRoutes.js
│   │
│   ├── utils/
│   │   ├── fileUtils.js
│   │   └── dateUtils.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── views/
│   │   ├── auth/          (vazia - a implementar)
│   │   ├── produtos/      (vazia - a implementar)
│   │   ├── movimentacoes/ (vazia - a implementar)
│   │   └── relatorios/    (vazia - a implementar)
│   │
│   ├── app.js
│   └── server.js
│
├── data/
│   ├── usuarios.json      (3 usuários de teste incluídos)
│   ├── produtos.json      (vazio)
│   └── movimentacoes.json (vazio)
│
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/               (vazia)
│
├── package.json           (atualizado com dependências)
└── README.md              (documentação completa)
```

## Arquivos Implementados

### Models (7 arquivos)
✅ `Usuario.js` - Classe base com validação de senha
✅ `Administrador.js` - Herda de Usuario
✅ `Operador.js` - Herda de Usuario
✅ `Gestor.js` - Herda de Usuario
✅ `Produto.js` - Modelo de produto
✅ `Movimentacao.js` - Modelo de movimentação
✅ `TipoMovimentacao.js` - Enum para tipos (ENTRADA/SAIDA)

### Repositories (3 arquivos)
✅ `usuarioRepository.js` - CRUD completo de usuários
✅ `produtoRepository.js` - CRUD completo de produtos
✅ `movimentacaoRepository.js` - Criação e consultas de movimentações

### Services (4 arquivos)
✅ `authService.js` - Login de usuários
✅ `produtoService.js` - Lógica de negócio de produtos
✅ `movimentacaoService.js` - Entradas/saídas com validação de estoque
✅ `relatorioService.js` - 4 tipos de relatórios implementados

### Controllers (4 arquivos)
✅ `authController.js` - Login, logout
✅ `produtoController.js` - CRUD de produtos
✅ `movimentacaoController.js` - Entradas e saídas
✅ `relatorioController.js` - Visualização de relatórios

### Routes (4 arquivos)
✅ `authRoutes.js` - Rotas públicas de autenticação
✅ `produtoRoutes.js` - Rotas protegidas de produtos
✅ `movimentacaoRoutes.js` - Rotas protegidas de movimentações
✅ `relatorioRoutes.js` - Rotas protegidas de relatórios

### Utils & Middlewares (4 arquivos)
✅ `fileUtils.js` - readJson/writeJson para manipular arquivos
✅ `dateUtils.js` - Funções de formatação de datas
✅ `authMiddleware.js` - Verificação de autenticação e perfis
✅ `errorMiddleware.js` - Tratamento global de erros

### Main Application (2 arquivos)
✅ `app.js` - Configuração completa do Express
✅ `server.js` - Inicialização do servidor

### Data Files (3 arquivos)
✅ `usuarios.json` - 3 usuários de teste (admin, operador, gestor)
✅ `produtos.json` - Array vazio
✅ `movimentacoes.json` - Array vazio

### Public Assets (2 arquivos)
✅ `styles.css` - Estilos globais completos
✅ `main.js` - JavaScript com validações

## Funcionalidades Implementadas

### Camada de Modelo
- Classes de domínio completas
- Herança correta (Administrador, Operador, Gestor → Usuario)
- Validação de senha no modelo Usuario
- Enum para tipos de movimentação

### Camada de Repository
- Todas as operações CRUD necessárias
- Uso exclusivo de fileUtils para I/O
- Retornos consistentes (objetos ou null)
- Queries específicas (getByEmail, getByUsuario, getByProduto)

### Camada de Service
- **authService**: Login com validação
- **produtoService**: CRUD com validações de campos obrigatórios
- **movimentacaoService**: 
  - Validação de estoque em saídas
  - Atualização automática de quantidade
  - Suporte a filtros
- **relatorioService**:
  - Estoque atual
  - Produtos em baixa
  - Produtos próximos do vencimento
  - Movimentações por usuário

### Camada de Controller
- Controllers finos (sem lógica de negócio)
- Tratamento de erros
- Renderização de views
- Redirecionamentos apropriados

### Camada de Routes
- Rotas RESTful bem definidas
- Separação entre rotas públicas e protegidas
- Mapeamento correto para controllers

### Express Configuration
- View engine EJS configurado
- Pasta static configurada
- Body parsers configurados
- Express-session configurado
- Middlewares de autenticação aplicados
- Tratamento de erros global

## Regras Arquiteturais Implementadas

✅ Controllers não acessam JSON diretamente
✅ Controllers não contêm lógica de negócio
✅ Services implementam todas as validações
✅ Repositories são a única camada com I/O
✅ Uso de CommonJS (require/module.exports)
✅ Nenhuma tecnologia fora do stack definido
✅ Estrutura de pastas exata conforme especificado

## Próximos Passos

### Views EJS (Não Implementadas)
As pastas estão criadas mas vazias. Será necessário criar:
- `views/layout.ejs` - Layout base
- `views/auth/login.ejs` - Formulário de login
- `views/produtos/list.ejs` - Listagem de produtos
- `views/produtos/create.ejs` - Formulário de criação
- `views/produtos/edit.ejs` - Formulário de edição
- `views/movimentacoes/list.ejs` - Listagem de movimentações
- `views/movimentacoes/entrada.ejs` - Formulário de entrada
- `views/movimentacoes/saida.ejs` - Formulário de saída
- `views/relatorios/estoque.ejs` - Relatório de estoque
- `views/relatorios/movimentacoesUsuario.ejs` - Relatório de movimentações

## Como Testar

1. Instalar dependências (se ainda não instalou):
```bash
npm install
```

2. Iniciar o servidor:
```bash
npm run dev
```

3. Acessar: `http://localhost:3000`

4. Fazer login com um dos usuários de teste:
   - admin@guardiao.com / admin123
   - operador@guardiao.com / operador123
   - gestor@guardiao.com / gestor123

## Observações

- O sistema está completamente estruturado e funcional no backend
- Faltam apenas as views EJS para interface do usuário
- Todos os módulos seguem as especificações do projeto acadêmico
- Código está documentado com JSDoc
- Validações de negócio implementadas conforme requisitos
