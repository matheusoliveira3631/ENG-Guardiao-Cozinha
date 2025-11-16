const express = require('express');
const path = require('path');
const session = require('express-session');

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

// Importar middlewares
const { ensureAuthenticated } = require('./middlewares/authMiddleware');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const { exposeLocals } = require('./middlewares/viewMiddleware');

// Criar aplicação Express
const app = express();

// Configurar view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configurar middlewares de parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar sessões
app.use(session({
  secret: 'guardiao-cozinha-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Em produção, usar true com HTTPS
}));

// Middleware para expor variáveis comuns às views
app.use(exposeLocals);

// Rotas públicas (autenticação)
app.use('/', authRoutes);

// Rotas protegidas (requerem autenticação)
app.use('/produtos', ensureAuthenticated, produtoRoutes);
app.use('/movimentacoes', ensureAuthenticated, movimentacaoRoutes);
app.use('/relatorios', ensureAuthenticated, relatorioRoutes);

// Rota raiz redireciona para login ou produtos
app.get('/', (req, res) => {
  if (req.session && req.session.usuario) {
    res.redirect('/produtos');
  } else {
    res.redirect('/login');
  }
});

// Middleware para rotas não encontradas
app.use(notFound);

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
