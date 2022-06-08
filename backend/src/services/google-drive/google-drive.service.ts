import { google } from 'googleapis';
import fs from 'fs';

class GoogleDrive {
  #drive;

  constructor() {
    const CLIENT_ID =
      '408880928183-r2s9uafr8e7eho5b617n42mvse4hi4rm.apps.googleusercontent.com';
    const CLIENT_SECRET = 'KubrCIrZNcKPmoj6sPt1ZZPM';
    //redirect URL
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    //refresh token
    const REFRESH_TOKEN =
      '1//036rr8nmh5BMdCgYIARAAGAMSNwF-L9IrQfkhgrZTcZOPmH6YGlQYPaRN0xY-s1qvQuX3qRQcKWkTbCjNR9p-Ql-klXblc98NxgU';

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI,
    );
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    this.#drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });
  }

  public async uploadFile({
    filePath,
    name,
    mimeType,
  }: {
    filePath: string;
    name: string;
    mimeType: string;
  }): Promise<unknown> {
    return this.#drive.files.create({
      requestBody: {
        name, //file name
        mimeType,
      },
      media: {
        mimeType,
        body: fs.createReadStream(filePath),
      },
    });
  }
}

export { GoogleDrive };
