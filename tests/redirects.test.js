const fs = require('fs');

// Return a response from the given URL
const getResponse = async (url) => {
  const response = await fetch(url);
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
    test(`"${initialURL}" should redirect to "${expectedURL}"`, async () => {
      const response = await getResponse(initialURL);
      expect(response.status).toBe(200);
      expect(response.finalResponse).toBe(expectedURL);
    });
  }
});
