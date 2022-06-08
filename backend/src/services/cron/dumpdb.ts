/* eslint-disable no-console */
import { exec } from 'child_process';
import cron from 'node-cron';
import fs from 'fs';
import { googleDrive } from '../services';

const task = cron.schedule('0 * 1 * * *', async () => {
  exec('yarn dumpdb');
  // TODO upload dumps to storage (Google drive etc.)
  const dumpsPath = __dirname + '/../../../../.docker/xs_bot/postgresql/dumps/';
  const files = fs.readdirSync(dumpsPath);
  for (const file of files) {
    const filePath = dumpsPath + file;
    await googleDrive.uploadFile({
      filePath: filePath,
      name: file,
      mimeType: 'application/octet-stream',
    });
    fs.rmSync(filePath);
  }
  // TODO delete files after upload
});

export { task };
