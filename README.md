#JS Challenge

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-ui-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.



## Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        core/           --> core files
          controllers/  --> core controllers
            AppCtrl.js
            NavbarCtrl.js
          directives/   --> core directives
            MatrixFill.js
          filters/      --> core filters
            VersionFilter.js
          services/     --> core services
            Services.js
          templates/    --> core templates
            404.tpl.html
            main.tpl.html
            navbar.tpl.html
          state.js      --> core state
        main/           --> main files
          controllers/  --> main controllers
            AboutCtrl.js
            ContactCtrl.js
            HomeCtrl.js
          templates/    --> main templates
            home.tpl.html
            about.tpl.html
            contact.tpl.html
          state.js      --> main state

        app.js          --> application

    test/               --> test config and source files
      protractor-conf.js    --> config file for running e2e tests with Protractor
      e2e/                  --> end-to-end specs
        scenarios.js
      karma.conf.js         --> config file for running unit tests with Karma
      unit/                 --> unit level specs/tests
        controllersSpec.js      --> specs for controllers
        directivessSpec.js      --> specs for directives
        filtersSpec.js          --> specs for filters
        servicesSpec.js         --> specs for services



