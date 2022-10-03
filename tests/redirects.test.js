const fs = require('fs');
require('dotenv').config();

let resultData = 'Redirect Test Results';

// Return a response from the given URL
const getResponse = async (url) => {
  const headers = new Headers();
  const basicAuthCreds = `${process.env.BASIC_USERNAME}:${process.env.BASIC_PASSWORD}`;
  headers.set('Authorization', `Basic ${Buffer.from(basicAuthCreds, 'utf-8').toString('base64')}`);
  const response = await fetch(url, { method: 'GET', headers });
  const responseAsHTML = await response.text();

  return {
    status: response.status,
    html: responseAsHTML,
    finalResponse: response.url,
  };
};

// Confirm the initial/expected URLs in the file match the actual redirect
describe('URLs should redirect', () => {
  const UrlFile = fs.readFileSync('tests/sample_urls.csv', 'utf8');
  const UrlArray = UrlFile.split('\n');
  let i;
  // Check the status and response of each URL pair in the file
  for (i = 1; i < UrlArray.length - 1; i += 1) {
    const fileURLs = UrlArray[i].split(',');
    const initialURL = fileURLs[0];
    const expectedURL = fileURLs[1];
    const testName = `"${initialURL}" should redirect to "${expectedURL}"`;
    test(testName, async () => {
      const response = await getResponse(initialURL);
      console.log(testName);
      if (response.status !== 200 || response.finalResponse !== expectedURL) {
        resultData += `\n\n${testName}: \n${response.status} ${response.finalResponse === expectedURL}`;
      }
      // Jest test expects
      expect(response.status).toBe(200);
      expect(response.finalResponse).toBe(expectedURL);
    });
  }
});

// Compile results into a file after all tests have run
afterAll(() => {
  const currentDate = new Date();
  fs.appendFile(`test-result-${currentDate.getTime()}.txt`, resultData, (error) => {
    if (error) console.warn(error);
  });
});
