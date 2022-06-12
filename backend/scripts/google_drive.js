/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('google_drive_credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content));
});

function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
  });
}

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
    });
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// function listFiles(auth) {
//   const drive = google.drive({ version: 'v3', auth });
//   drive.files.list(
//     {
//       pageSize: 10,
//       fields: 'nextPageToken, files(id, name)',
//     },
//     (err, res) => {
//       if (err) return console.log('The API returned an error: ' + err);
//       const files = res.data.files;
//       if (files.length) {
//         console.log('Files:');
//         files.map((file) => {
//           console.log(`${file.name} (${file.id})`);
//         });
//       } else {
//         console.log('No files found.');
//       }
//     },
//   );
// }
// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// async function listFiles(auth) {
//   const service = google.drive({ version: 'v3', auth });
//   const fileMetadata = {
//     'title': 'test.txt',
//     'parents': [
//       {
//         id: '1jOqU56P3RXrf-Htd23I_APJbejdOCVUn',
//       },
//     ],
//   };
//   const media = {
//     mimeType: 'text/plain',
//     body: fs.createReadStream('test.txt'),
//   };
//   const file = await service.files.create({
//     resource: fileMetadata,
//     media: media,
//     fields: 'id',
//   });
//   console.log('File Id:', file.data.id);
//   return file.data.id;
// }

// async function searchFile(auth) {
//   const service = google.drive({ version: 'v3', auth });
//   const res = await service.files.list({
//     q: "mimeType='image/jpeg'",
//     fields: 'nextPageToken, files(id, name)',
//     spaces: 'drive',
//   });
//   console.log(res.data);
// }

// // // eslint-disable-next-line @typescript-eslint/no-unused-vars
// // async function moveFileToFolder(fileId, folderId) {
// //   // Get credentials and build service
// //   // TODO (developer) - Use appropriate auth mechanism for your app
// //   const auth = new GoogleAuth({
// //     scopes: 'https://www.googleapis.com/auth/drive',
// //   });
// //   const service = google.drive({ version: 'v3', auth });

// //   // Retrieve the existing parents to remove
// //   const file = await service.files.get({
// //     fileId: fileId,
// //     fields: 'parents',
// //   });

// //   // Move the file to the new folder
// //   const previousParents = file.data.parents
// //     .map(function (parent) {
// //       return parent.id;
// //     })
// //     .join(',');
// //   const files = await service.files.update({
// //     fileId: fileId,
// //     addParents: folderId,
// //     removeParents: previousParents,
// //     fields: 'id, parents',
// //   });
// //   console.log(files.status);
// //   return files.status;
// // }
