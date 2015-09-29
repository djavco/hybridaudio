// Filename: audioController.js
// Copyright AVCO Productions Ltd.
// Author: Daniel Jackson
// Date: 14th September 2015

define(function(require, exports, module, jquery) {

  var $ = require('jquery');

  function AudioController(mdlsRef, appCntrllr) {

    var self = this;

    this.modelsRef = mdlsRef;
    this.appControllerRef = appCntrllr;

    initAudio(self);
  }


  function initAudio(slfRf) {
    var self = slfRf;

    loadAudio(self);
  }


  function loadAudio(slfRf) {
    var self = slfRf;


    self.audioObj = $("#audio");

    self.audioObj[0].pause();
    self.audioObj[0].load();

    // Set Global Timer to Check audio state
    self.timerid = setInterval(function(){checkAndChangeSlideAndText(self)}, 50);

    self.audioObj[0].onseeked = function() {
      updateCaptionAndImage(self);
    };

  }

  function updateCaptionAndImage(slfRf) {
    var self = slfRf;

    var timeNow = self.audioObj[0].currentTime;

    // CAPTION UPDATE
    var captionNo = findCaptionNumber(timeNow, self);

    document.getElementById("transcription-line").innerHTML = self.modelsRef.captionsText[captionNo-1];

    self.modelsRef.captionNumber = captionNo + 1;
    self.modelsRef.captionNumber = captionNo;


    // SLIDE UPDATE
    var slideNo = findSlideNumber(timeNow, self);

    var slideSource = 'images/' + self.modelsRef.slideNames[slideNo-1];
    document.getElementById("img").src = slideSource;

    self.modelsRef.slideNumber = slideNo + 1;
  }


  // FIND THE CORRECT SLIDE NUMBER IN TIMELINE
  function findSlideNumber(timeNow,  slfRf)
  {
    var self = slfRf;

    var notFoundYet = true;
    var i = 0;
    var slideNo = 0;
    var slidesLength = self.modelsRef.slideInPoints.length;
    
    while(notFoundYet && i < slidesLength)
    {
      if(timeNow < self.modelsRef.slideInPoints[i+1])
      {
        slideNo = i+1;
        notFoundYet = false;
      }
      i++;
    }
    
    if(timeNow > self.modelsRef.slideInPoints[slidesLength-1])
    {
      slideNo = slidesLength-1;
    }

    return slideNo;
  }


  // FIND THE CORRECT CAPTION NUMBER IN TIMELINE
  function findCaptionNumber(timeNow, slfRf)
  {
    var self = slfRf;

    var notFoundYet = true;
    var i = 0;
    var captionNo = 0;
    var captionsLength = self.modelsRef.captionsInPoints.length;
    
    while(notFoundYet && i < captionsLength)
    {
      if(timeNow < self.modelsRef.captionsInPoints[i+1])
      {
        captionNo = i+1;
        notFoundYet = false;
      }
      i++;
    }
    
    if(timeNow > self.modelsRef.captionsInPoints[captionsLength-1])
    {
      captionNo = captionsLength-1;
    }

    return captionNo;
  }


  function checkAndChangeSlideAndText(slfRf)  {
    var self = slfRf;


    // Get Audio Position
    var timeNow = self.audioObj[0].currentTime; 

    // Check If We Need to Change Captions
    if(timeNow >= self.modelsRef.captionsInPoints[self.modelsRef.captionNumber-1])
    {
      document.getElementById("transcription-line").innerHTML = self.modelsRef.captionsText[self.modelsRef.captionNumber-1];

      self.modelsRef.captionNumber += 1;

      self.modelsRef.previousCaptionNumber = self.modelsRef.captionNumber;
    }

    // Check If We Need to Change Slides
    if(timeNow >= self.modelsRef.slideInPoints[self.modelsRef.slideNumber])
    {
      var slideSource = 'images/' + self.modelsRef.slideNames[self.modelsRef.slideNumber];
      document.getElementById("img").src = slideSource;

      self.modelsRef.slideNumber += 1;
    }

  }

  module.exports = AudioController;
  
});