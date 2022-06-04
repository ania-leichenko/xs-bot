/* eslint-disable no-console */
import { exec } from 'child_process';
import cron from 'node-cron';

const task = cron.schedule('0 1 * * * *', async () => {
  exec('yarn dumpdb');
  // TODO upload dumps to storage (Google drive etc.)

  // TODO delete files after upload
});

export { task };
