# Example 1

create a simple REST client fastly

```javascript
import 'API' from 'cliRest.js';

const api = API('http://myapi.fr'); // Create an api instance with an url

// add ressources messages on the API with the url http://myapi.fr/messages
api.addRessource('messages');

// get list of messages from api
// GET http://myapi.fr/messages
api.messages.list();

// get on message from api
// GET http://myapi.fr/messages/1
api.messages.read(1) // get message with ID 1 from api

// create a message on api with object
// POST http://myapi.fr/messages
api.messages.create({ data: {...}})

// replace content of a message with ID 1 from api
// PUT http://myapi.fr/messages
api.messages.replace(1, { data: {...}})

// partial replace content of a message with ID 1 from api
// PATCH http://myapi.fr/messages
api.messages.modify(1, { data: {...}})

// delete message with ID 1 from api
// DELETE http://myapi.fr/messages/1
api.messages.delete(1);
```

