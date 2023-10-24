import express from 'express';
import { resolve } from 'path';

const app = express();

app.use(express.static(resolve(__dirname, '..', 'public')));

app.listen(3333, () => {
  console.log('Server running on PORT 3333 🔥');
});
