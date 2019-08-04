![License](https://img.shields.io/github/license/davis90/cliRest.js.svg)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen.svg)  
[![Build Status](https://travis-ci.org/davis90/cliRest.js.svg?branch=master)](https://travis-ci.org/davis90/cliRest.js)
![Dependancies](https://img.shields.io/david/davis90/cliRest.js.svg)
![Dev dependancies](https://img.shields.io/david/dev/davis90/cliRest.js.svg)
[![Coverage Status](https://coveralls.io/repos/github/davis90/cliRest.js/badge.svg?branch=master)](https://coveralls.io/github/davis90/cliRest.js?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2c4768af9a8644a29cb9d4384516cd54)](https://www.codacy.com/app/davis90/cliRest.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=davis90/cliRest.js&amp;utm_campaign=Badge_Grade)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/davis90/cliRest.js.svg)

# cliRest.js

cliRest.js is a simple and basic REST client.

First, you need to create a client:

```
import apiFactory from 'clirest.js';

const api = apiFactory('http://myApi.fr');

```

After you need to add ressources to your api, and use it!

```
api.addRessources('clients');
api.addRessources('messages');
```

## More informations

[Api informations](doc/api.md)
[Crud informations](doc/Crud.md)

[DefaultCrud code](src/crud/defaultCrud.js)
[MergeCrudConfig code](src/crud/MergeCrudConfig.js)


## Examples

```
## **Ressource**

Because API is useless without ressources link

```javascript
import 'apiFactory' from 'cliRest.js';

const api = apiFactory();
```
