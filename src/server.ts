import 'dotenv/config';

import { app } from './App';

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
