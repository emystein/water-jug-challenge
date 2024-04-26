import express from 'express';
import bodyParser from 'body-parser';
import { mix } from './controllers/MixController';

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/mix', mix);

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

