// learn REST APIs
// or restful apis (REPRESENTATIONAL STATE TRANSFER)

// work for CSA (client server architecture)
                // when used CSA when we want client and server to be independent

// best practices for REST APIs
    // 1. use SSR rendering if sure that your client is browser and no any app because 
                          // it is fast as no fetching and processing needs to done on browser
                          // will use res.send(), res.render() for this purpose

          //use CSR if your client is cross platform means client is app, browser, alexa because
                                // it is slow as fetching and processing needs to be done
                                // will use in MERN 
                                // JSON, XML used here

    // 2. Respect HTTP methods eg GET, POST, PUT, PATCH, DELETE
          // dont do POST '/users/{:id}' for updating a user

          // dont do POST '/createUser' for creating a user
