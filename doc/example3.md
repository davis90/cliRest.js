# Example 3

create REST client with custom actions

```javascript
import 'API' from 'cliRest.js';

const api = API('http://myapi.fr'); // Create an api instance with an url

// custom action for messages Ressources
const messagesActions = {
    create: { method: 'create', url: 'user/{}/messages' },
	signalMessage: { method: 'create', url: 'signal/messages'},
    delete: { method: 'delete', url: 'user/{}/messages/{}' },
};



// add ressources messages on the API with a custom url http://myapi.fr/users/<user ID>/messages
// {} on url will be replaced by id given in function parameter
api.addRessource('messages', { actionsConfig: messagesActions });

// create a message for user with ID 1 on api with object
// POST http://myapi.fr/users/1/messages
api.messages.create(1, { data: {...}});

// signal a message with ID 1 for user with ID 1 from api
// PUT http://myapi.fr/signal/messages
api.messages.signalMessage({ idMessage: 1 });

// delete message with ID 1 for user with ID 1 from api
// DELETE http://myapi.fr/users/1/messages/1
api.messages.delete(1, 1);
```

