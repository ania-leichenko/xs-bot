import { google } from 'googleapis';
import fs from 'fs';

class GoogleDrive {
  public async uploadFile({
    filePath,
    name,
    mimeType,
  }: {
    filePath: string;
    name: string;
    mimeType: string;
  }): Promise<unknown> {
    const CLIENT_ID =
      '408880928183-r2s9uafr8e7eho5b617n42mvse4hi4rm.apps.googleusercontent.com';
    const CLIENT_SECRET = 'KubrCIrZNcKPmoj6sPt1ZZPM';
    //redirect URL
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI,
    );

    oauth2Client.setCredentials({
      'access_token':
        'ya29.a0ARrdaM8HiDXe5mwh2OOGXZgv91GBCKdtysNo4iRZn-zCO81gFkTxhteLvw5CbcVxtTsjGZpWzS9cDFMke4V7B3zuCdJAvQNl9YfVT8rTj545S0Dh9dSYuvif_BLjZbV-H10oEfu5Ogg-UB2ZYZnIsHUujcDu',
      'refresh_token':
        '1//03F8lLsmaZMmxCgYIARAAGAMSNwF-L9Ir24u-nwfD7BmzNxoZYfiY_gk7LvylBlvSoi1bl72boXhhPpEBMtRav5MdGqUBnCJ6GhA',
      'scope': 'https://www.googleapis.com/auth/drive.file',
      'token_type': 'Bearer',
      'expiry_date': 1655061360923,
    });

    await oauth2Client.getRequestHeaders();

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });

    try {
      const result = await drive.files.create({
        requestBody: {
          name, //file name
          mimeType,
        },
        media: {
          mimeType,
          body: fs.createReadStream(filePath),
        },
      });
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
}

export { GoogleDrive };
