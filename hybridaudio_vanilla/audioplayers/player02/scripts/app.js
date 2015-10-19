// This JavaScript file defines a module without any dependencies on other modules.
// The specified callback function is executed when this module is requested by
// another module
define(function (require) {

	// Modules
    var AppView = require('view/appView');
    var AppModels = require('model/appModels');
    var AppController = require('controller/appController');

    // MODEL
    var appModels = new AppModels();

    // VIEW
    var appView = new AppView(appModels);

    // CONTROLLER
    var appController = new AppController(appModels, appView);

    // Assign reference for controller to view
    appView.appControllerRef = appController;

});