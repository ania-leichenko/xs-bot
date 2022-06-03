/* eslint-disable no-console */
import { exec } from 'child_process';
import cron from 'node-cron';
// import fs from 'fs';
// import { GoogleAuth } from 'google-auth-library';
// import { google } from 'googleapis';

const task = cron.schedule('0 */1 * * * *', async () => {
  exec('yarn dumpdb');
  // TODO upload dumps to storage (Google drive etc.)

  // const auth = new GoogleAuth({
  //   scopes: 'https://www.googleapis.com/auth/drive',
  // });
  // const service = google.drive({ version: 'v3', auth });
  // const fileMetadata = {
  //   'title': 'photo.jpg',
  // };
  // const media = {
  //   mimeType: 'image/jpeg',
  //   body: fs.createReadStream('photo.jpg'),
  // };
  //  const file = await service.files.create({
  //    resource: fileMetadata,
  //    media: media,
  //    fields: 'id',
  //  });
  // TODO delete files after upload
});

export { task };
