var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
       
       $('#play').bind('click', function() 
       {
           console.log('play');
           html5audio.play();
           this.playStream;
       });
       
       $('#stop').bind('click', function() 
       {
           console.log('stop');
           html5audio.stop();
       });      
                 
    },
    
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() 
    {
        app.receivedEvent('deviceready');
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) 
    {
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
    }
};

/*
 ==========================================================
 */
var myaudioURL         = 'http://50.7.98.106:8508/';
var myaudio            = new Audio(myaudioURL);
var isPlaying          = false;
var readyStateInterval = null;
textPosition           = document.getElementById('processInfo');

var html5audio = {
    
    play: function()
	       {
		      isPlaying = true;
		      myaudio.play();    
		      readyStateInterval = 
		          setInterval(function(){
                                if (myaudio.readyState <= 2) 
                                   {
                                    textPosition.innerHTML = 'Info: loading...';
                                   }
                                   },1000);
                                   
		myaudio.addEventListener("timeupdate", function() 
		{
                                 var s = parseInt(myaudio.currentTime % 60);
                                 var m = parseInt((myaudio.currentTime / 60) % 60);
                                 var h = parseInt(((myaudio.currentTime / 60) / 60) % 60);
                                 if (isPlaying && myaudio.currentTime > 0) 
                                 {
                                 textPosition.innerHTML = 'Info: playng - ' 
                                                          + h + ' : ' 
                                                          + m + ' : ' + s;
                                 }
                                 }, false);
                                 
		myaudio.addEventListener("error", function() {
                                 console.log('myaudio ERROR');
                                 }, false);
                                 
		myaudio.addEventListener("canplay", function() {
                                 console.log('myaudio CAN PLAY');
                                 }, false);
                                 
		myaudio.addEventListener("waiting", function() {
                                 console.log('myaudio WAITING');
                                 isPlaying = false;
                                 }, false);
                                 
		myaudio.addEventListener("playing", function() {
                                 isPlaying = true;
                                 textPosition.innerHTML = 'Info: playng...';
                                }, false);
                                
		myaudio.addEventListener("ended", function() {
                                 //console.log('myaudio ENDED');
                                 html5audio.stop();
                                 }, false);
	},
pause: function() {
    isPlaying = false;
    clearInterval(readyStateInterval);
    myaudio.pause();
    },
stop: function() {
    isPlaying = false;
    clearInterval(readyStateInterval);
    myaudio.pause();
    myaudio = null;
    myaudio = new Audio(myaudioURL);
    textPosition.innerHTML = 'Info: ';
}
};
