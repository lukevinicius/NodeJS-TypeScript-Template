import { log } from '@config/logger';

import { app } from './app';

app.listen(8000, () => {
  log.info(`🚀 Server started on port 8000`);
});
