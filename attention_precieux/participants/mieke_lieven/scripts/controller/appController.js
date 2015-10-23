// Filename: appModels.js
// Copyright AVCO Productions Ltd.
// Author: Daniel Jackson
// Date: 25th July 2015

define(function(require, exports, module, jquery) {

  var $ = require('jquery');

  // Modules
  var AudioController = require('controller/audioController');

  function AppController(mdlsRef, vwRef) {

    var self = this;

    this.modelsRef = mdlsRef;
    this.viewRef = vwRef;

    init(self);

  }

  function init(slfRf) {
    var self = slfRf;

      if(self.audioController)
      {
        self.audioController = null;
      }

      self.audioController = new AudioController(self.modelsRef, self);
  }

  module.exports = AppController;

  
});