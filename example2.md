# Example 2

create  REST client with ressource custom URL

```javascript
import 'API' from 'cliRest.js';

const api = API('http://myapi.fr'); // Create an api instance with an url

// add ressources messages on the API with a custom url http://myapi.fr/users/<user ID>/messages
// {} on url will be replaced by id given in function parameter
api.addRessource('userMessages', {ressourcePath: 'users/{}/messages'});

// get list of messages from api for the user with ID 1
// GET http://myapi.fr/users/1/messages
api.userMessages.list(1);

// get the message with ID 1 for the user with ID 1 from api
// GET http://myapi.fr/users/1/messages/1
api.userMessages.read(1, 1) // get message with ID 1 from api

// create a message for user with ID 1 on api with object
// POST http://myapi.fr/users/1/messages
api.userMessages.create(1, { data: {...}})

// replace content of a message with ID 1 for user with ID 1 from api
// PUT http://myapi.fr/users/1/messages/1
api.userMessages.replace(1, 1, { data: {...}})

// partial replace content of a message with ID 1 for user with ID 1 from api
// PATCH http://myapi.fr/users/1/messages/1
api.userMessages.modify(1, 1, { data: {...}})

// delete message with ID 1 for user with ID 1 from api
// DELETE http://myapi.fr/users/1/messages/1
api.userMessages.delete(1, 1);
```

