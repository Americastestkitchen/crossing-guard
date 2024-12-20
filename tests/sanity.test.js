const fs = require('fs');
require('dotenv').config();

let resultData = 'Sanity Test Results';

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

// Confirm the URL gets a 200 success response
describe('URLs should get a 200 success response', () => {
  const UrlFile = fs.readFileSync('tests/sanityURLs.csv', 'utf8');
  const UrlArray = UrlFile.split('\n');
  let i;
  // Check the status and response of each URL pair in the file
  for (i = 1; i < UrlArray.length - 1; i += 1) {
    const testNumber = i;
    const fileURLs = UrlArray[i].split(',');
    const initialURL = fileURLs[0];
    const testName = `"${initialURL}" should report with a 200`;
    test(testName, async () => {
      const response = await getResponse(initialURL);
      console.log(`test_${testNumber} ${testName}`);
      if (response.status !== 200) {
        resultData += `\n\nTest ${testNumber}, status code ${response.status}\nInitial:  ${initialURL}\nActual:   ${response.finalResponse}`;
      }
      // Jest test expects
      expect(response.status).toBe(200);
    });
  }
});

// Compile results into a file after all tests have run
afterAll(() => {
  const currentDate = new Date();
  fs.appendFile(`sanity-test-result-${currentDate.getTime()}.txt`, resultData, (error) => {
    if (error) console.warn(error);
  });
});
