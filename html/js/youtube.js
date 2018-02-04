var player;
 function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    events: {
        'onStateChange': ShowMe
       }
    });
 }

 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/player_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function ShowMe() {
	    
	    

    var sStatus;
    sStatus = player.getPlayerState();

   if(sStatus === 0){
        // the video is end, do something here.

		window.location.href = '#Hola';



    }


}