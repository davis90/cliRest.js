![License](https://img.shields.io/github/license/davis90/cliRest.js.svg)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen.svg)  
[![Build Status](https://travis-ci.org/davis90/cliRest.js.svg?branch=master)](https://travis-ci.org/davis90/cliRest.js)
![Dependancies](https://img.shields.io/david/davis90/cliRest.js.svg)
![Dev dependancies](https://img.shields.io/david/dev/davis90/cliRest.js.svg)
[![Coverage Status](https://coveralls.io/repos/github/davis90/cliRest.js/badge.svg?branch=master)](https://coveralls.io/github/davis90/cliRest.js?branch=master)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/116b04b3352a44aa97f4fdc665094c72)](https://www.codacy.com/manual/davis90/cliRest.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=davis90/cliRest.js&amp;utm_campaign=Badge_Grade)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/davis90/cliRest.js.svg)

# cliRest.js

cliRest.js is a simple and basic REST client.

First, you need to create a client:

```javascript
import apiFactory from 'clirest.js';

const api = apiFactory('http://myApi.fr');

```

After you need to add ressources to your api, and use it!

```javascript
api.addRessources('clients');
api.addRessources('messages');
```

## More informations

[Api informations](doc/api.md)   
[Crud informations](doc/crud.md)   

[interfaceCrud code](src/crud/interfaceCrud.js)   
[DefaultCrud code](src/crud/defaultCrud.js)   
[MergeCrudConfig code](src/crud/mergeCrudConfig.js)   

## Examples

[First example](doc/example1.md)   
[Second example](doc/example2.md)   
[Third example](doc/example3.md)   
