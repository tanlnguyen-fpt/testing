import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  res.send({ data: 'Ok' });
});

app.listen(3000);
