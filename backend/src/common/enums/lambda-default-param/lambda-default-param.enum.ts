enum LambdaDefaultParam {
  ROOT_FILE = 'index.js',
  ARCHITECTURE = 'x86_64',
  HANDLER = '.zip',
  RUNTIME = 'nodejs14.x',
  TIMEOUT = 10,
  MEMORY_SIZE = 150,
  SOURCE_CODE = `exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from BWS!'),
    };
    return response;
};
`,
}

export { LambdaDefaultParam };
