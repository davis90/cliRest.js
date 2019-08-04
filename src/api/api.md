# ApiFactory(url, options?) : Api

To use client of api, you need to create an instance

## url
Type: ```string```

## options
Type: ```object```

Object to configure the api instance. More informations here

### crud
Type: ```object```

Object that implements crud interface. More info about crud

Default: defaultCrud

### crudConfig
Type: ```object```

Options for crud object. Options can contain what you want to work with your crud implementation

### crudConfigMerge
Type: ```function```

Function that merge crud config object. 

Default: mergeCrudConfig

# api.addRessource(ressourceName, options?) : Api

To be able to use ressources of api, you need to declare them on time.

## ressourceName
Type: ```string```

name of the ressource. The name need to valid this function isRessourceName.
Look the first and second example to see how to use it.

## options
Type: ```object```

Object to configure the ressource.

### actionsConfig
Type: ```object```

actionsConfig define what kind of actions is possible on ressources. Look the third example to see how to use it.

### crudConfig
Type: ```object```

Options for crud object for the new ressource. Options can contain what you want to work with your crud implementation. 

### ressourcePath
Type: ```string```

Ressource path is usefull when the path of data on the api is different of the name of the ressource.
ressourcePath can contain many "{}" to define an id in url. Look the second example to see how to use it.
If an actionsConfig is define, this options will be ignored.
