// Filename: appModels.js
// Copyright AVCO Productions Ltd.
// Author: Daniel Jackson
// Date: 25th July 2015

define(function(require, exports, module) {


	function AppModels() {

		//CAPTIONS
		this.captionsInPoints = [];
		this.captionsText = [];

		this.captionNumber = 1;
		this.previousCaptionNumber = 1;


		// SLIDES
		this.slideInPoints = [];
		this.slideNames = [];

		this.slideNumber = 1;
		this.lastCheckSeconds = 0;

		console.log("captionsInPoints = ");
    	console.log(this.captionsInPoints);

		init(this);

	}


	function init(slfRf) {
    	var self = slfRf;

    	// GET CAPTIONS
    	$.ajax({
		    type: "GET",
		    url: "data/captions.xml",
		    dataType: "xml",
		    success: function (document){ parseCaptions(document, self); }
		});

    	// GET SLIDES
		$.ajax({
	      type: "GET",
	      url: "data/SlidesInPoints.xml",
	      dataType: "xml",
	      success: function (document){ parseSlides(document, self); }
	    });

    }


    function parseSlides(document, slfRf){
    	var self = slfRf;

	    var i = 0;

	    $(document).find("slide").each(function(){

	        var timecode = $(this).attr('inpoint');
	        var seconds = convertTimeCodeToSeconds(timecode);
	        var name = $(this).text();

	        self.slideInPoints[i] = seconds;
	        self.slideNames[i] = name;

	        i += 1;
	    });

	    console.log("slideInPoints = ");
    	console.log(self.slideInPoints);

    	console.log("slideNames = ");
    	console.log(self.slideNames);
	}

   	function parseCaptions(document, slfRf) {
    	var self = slfRf;
    	
		console.log("Document = ");
		console.log(document);

	    var i = 0;

	    $(document).find("p").each(function(){

	        var timecode = $(this).attr('begin');
	        var seconds = convertTimeCodeToSeconds(timecode);
	        var content = $(this).text();

	        self.captionsInPoints[i] = seconds;
	        self.captionsText[i] = content;

	        i += 1;

	    });
	}

	// CONVERT TIMECODE STRING TO SECONDS NUMBER
	function convertTimeCodeToSeconds(timeString)
	{
	  var timeArray = timeString.split(":");
	  var hours = Number(timeArray[0]) * 60 * 60;
	  var minutes = Number(timeArray[1]) * 60;
	  var seconds = Number(timeArray[2]);
	  
	  var totalTime = hours + minutes + seconds;
	  return totalTime;
	}

	module.exports = AppModels;

  
});