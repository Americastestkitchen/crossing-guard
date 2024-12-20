# crossing-guard

crossing-guard is a utility to assist in the testing of multiple redirects

## Setup

* Ensure Node.js is installed (version >=18.7)
* Clone the repo
* Run `npm install` to install dependencies

## Running Your Tests

### Redirects Test

- `npm test redirects`

This test checks that each URL will return a 200 and redirect to the specified URL.

The tests will read from the `redirectsURL.csv` file inside the `/tests` folder. This CSV file has two columns, `INITIAL_URL` which is the URL the user hits before the redirect and `EXPECTED_URL` which is where the user is expected to end up after being redirected.

When the tests complete, a `redirects-test-results-*.txt` file will be created that details each of the failures. All results can also be read from the terminal output.

### 200 Success Sanity Test

- `npm test sanity`

This test checks that each URL will return a 200.

The tests will read from the `sanityURL.csv` file inside the `/tests` folder. This CSV file has one column, `URL` which is the URL the user will hit.

When the tests complete, a `sanity-test-results-*.txt` file will be created that details each of the failures. All results can also be read from the terminal output.

## Environment Variables
Using environment variables will require the creation of a .env file in the root directory

| Name | Explanation |
|---|---|
| BASIC_USERNAME | Username for basic auth on our staging sites |
| BASIC_PASSWORD | Password for basic auth on our staging sites |

## ESLint
As soon as your PR is submitted, Travis CI will check the test code for styling/formatting issues. Run `npx eslint tests` to check your code locally for errors.

### Style Guide
- Indentation should be 2 spaces
- Prefer single quotes
- Comment as though students will be studying your code
- Comments above **every** method, even if you think it's obvious
- When in doubt, we mostly follow [this JS style guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-)

## Additional Resources

* [Jest docs](https://jestjs.io/docs/getting-started)
