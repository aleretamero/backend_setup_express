import express from 'express';

const app = express();

const teste = 'terstsetse';

console.log(teste);

app.get('/', (_req, res) => {
  res.status(200).send('Hello world!');
});

app.listen(3333, () => {
  console.log('Server running on PORT 3333 🔥');
});
