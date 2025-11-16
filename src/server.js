const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Guardião da Cozinha rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
