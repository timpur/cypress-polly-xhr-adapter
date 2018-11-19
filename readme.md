# Cypress Polly XHR Adapter

### !!! This is a temp solution. !!!

## Use:

```js
// pollyHelper.js

import { Polly } from "@pollyjs/core";
import RESTPersister from "@pollyjs/persister-rest";
import XHRAdapter from "cypress-polly-xhr-adapter";

export const startPolly = (_win, _name) => {
  XHRAdapter.setWindow(_win || window);

  const name = _name || Cypress.spec.name.replace(".js", "");
  const polly = new Polly(name, {
    adapters: [XHRAdapter],
    persister: RESTPersister,
    logging: true,
    recordFailedRequests: true,
    matchRequestsBy: {
      headers: false,
      order: false
    }
  });

  return polly;
};

export const stopPolly = polly => {
  if (!polly) throw new Error("Polly not initialised");
  cy.wrap(polly).invoke("stop");
};
```

```js
// test.js

let polly;

before(() => {
  cy.visit("http://example.com/", {
    onBeforeLoad: win => {
      polly = startPolly(win);
    }
  });
});

// it(...)

after(() => {
  stopPolly(polly);
});
```
