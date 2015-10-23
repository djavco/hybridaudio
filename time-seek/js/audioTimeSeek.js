$(document).ready(function()
{


	$('.time-seek-item').on('click', function(e) {
	        
	        var seekTime = $(e.target).attr("seekpoint");

	        var audioObject = $("#audio");
	        audioObject[0].currentTime = seekTime;
	        audioObject[0].play();
	    });

});