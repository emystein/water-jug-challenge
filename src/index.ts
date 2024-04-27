import express from 'express';
import { mix } from './controllers/MixController';
import bodyParser from 'body-parser';

export const app = express();
app.use(bodyParser.json());
app.set("json spaces", 2);

app.post('/mix', mix);

const PORT = process.env.PORT || 3000;

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
