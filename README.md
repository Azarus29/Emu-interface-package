# EMU-interface

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.


## Running
### Pre-requisites
You need to have the following packages already installed:
  - npm
  - bower

### Install dependencies
Run the following command in a terminal

1. `npm install grunt`
2. `bower install`
3. `npm install`

### Running the application

run `$(npm bin)/grunt serve`. Normally a page should be open on the browser. If no default browser is configured open one brower at the following url: http://localhost:9000/

### Building the library

You can "build" the javascript code to minify it and run it without a server. To do so, run the `grunt build` command. You will find all the files in the ./dist folder. 

### Using the library

In an HTML file, add the attribute `ng-app="EMUInterface"` to the body tag.
Add a `<div ng-view=""></div>` to add the views according to the routes in the app.js. 

To use the library, either using minified code or not, you will need to add a new javascript code. You will then need to call the functions in the `bufferService`, using the following javascript code `angular.element(document.body).injector().get('bufferService')`, which gives you an instance of `bufferService`.

You can read an exemple in the ./dist folder, which implements the minified code.