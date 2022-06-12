/* eslint-disable no-console */
import { exec } from 'child_process';
import cron from 'node-cron';
import fs from 'fs';
import { googleDrive } from '../services';

const task = cron.schedule('0 * */1 * * *', async () => {
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  exec(
    `docker exec xs_bot_postgres pg_dumpall --schema-only -U postgres --file=dumps/dump-${dateStr}-schema.sql`,
  );
  exec(
    `docker exec xs_bot_postgres pg_dumpall --data-only -U postgres --file=dumps/dump-${dateStr}-data.sql`,
  );
  // TODO upload dumps to storage (Google drive etc.)
  console.log(2);
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
});

export { task };
