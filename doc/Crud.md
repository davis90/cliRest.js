# Crud

Crud object make requests on the API. An object is a crud object if it implements InterfaceCrud.


## CrudInterface

### create(url, { crudConfig, data } = {}) : Promise

 Create data with REST api

 #### url
 Type: ```string```

 url use to create data

 #### options
 Type: ```object```

 ##### crudConfig
 Type: ```object```

 Options for crud object. Options can contain what you want to work with your crud implementation

 default value: undefined

 ##### data
 Type: ```object```

 Data to be created on REST api


### read: (url, { crudConfig } = {}) : Promise

 Read data with REST api

 #### url
 Type: ```string```

 url use to create data

 #### options
 Type: ```object```

 ##### crudConfig
 Type: ```object```

 Options for crud object. Options can contain what you want to work with your crud implementation

 default value: undefined

### replace: (url, { crudConfig, data } = {}) : Promise

 replace data with REST api

 #### url
 Type: ```string```

 url use to replace data

 #### options
 Type: ```object```

 ##### crudConfig
 Type: ```object```

 Options for crud object. Options can contain what you want to work with your crud implementation

 default value: undefined

 ##### data
 Type: ```object```

 Data to be replaced on REST api

### modify: (url, { crudConfig, data } = {}) : Promise

 Modify data with REST api

 #### url
 Type: ```string```

 url use to modify data

 #### options
 Type: ```object```

 ##### crudConfig
 Type: ```object```

 Options for crud object. Options can contain what you want to work with your crud implementation

 default value: undefined

 ##### data
 Type: ```object```

 Data to be modified on REST api

### delete: (url, { crudConfig } = {}) : Promise

 Delete data with REST api

 #### url
 Type: ```string```

 url use to delete data

 #### options
 Type: ```object```

 ##### crudConfig
 Type: ```object```

 Options for crud object. Options can contain what you want to work with your crud implementation

 default value: undefined
