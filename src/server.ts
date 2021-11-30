import express from 'express';

import log from './config/logger';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  log.info(`🚀 Server started on port ${PORT}`);
});
