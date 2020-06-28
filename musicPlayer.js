let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let isPlaying=false;
let updateTimer;
let index=0;

let song=document.createElement("audio");

let track_list = [
    {
      name: "Carry on Wayward Son",
      artist: "Kansas",
      image: "music/song1.png",
      path: "music/song1.mp3"
    },
    {
      name: "Dance Monkey",
      artist: "Tones & I",
      image: "music/song2.jpg",
      path: "music/song2.mp3",
    },
    {
      name: "Shipping Lanes",
      artist: "Chad Crouch",
      image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
    },
  ];


function resetValues(){
    volume_slider.value=0;
    curr_time.textContent="00:00";
    total_duration.textContent="00:00";
}


function loadTrack(index){
    resetValues();
    clearInterval(updateTimer);

    song.src=track_list[index].path;
    song.load();
    now_playing.textContent="Playing "+track_list[index].name+" Of "+track_list[index].artist;
    track_art.style.backgroundImage="url("+track_list[index].image+")";
    track_name.textContent=track_list[index].name;
    track_artist.textContent=track_list[index].artist;
    updateTimer=setInterval(seekUpdate,1000);
      

}loadTrack(index);
function playTrack(){
    isPlaying=true;
    song.play();
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'; 
}

function pauseTrack(){
    isPlaying=false;
    song.pause();
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'; 
}

function prevTrack(){
    if(index!=0) index-=1;
    else index=track_list.length-1;

    loadTrack(index);
    playTrack();

}

function nextTrack(){
    if(index!=track_list.length-1) index+=1;
    else index=0;

    loadTrack(index);
    playTrack();

}
function playpauseTrack(){
    if(isPlaying) pauseTrack();
    else playTrack();
}

function seekTo(){
    song.currentTime=song.duration*(seek_slider.value/100);
}

function setVolume(){
    song.volume=volume_slider.value/100;
}

function seekUpdate(){
    let s=0;

    if(!isNaN(song.duration))
    {
        s=song.currentTime*(100/song.duration);
        seek_slider.value=s;


        
        let cu_m=Math.floor(song.currentTime/60);
        let cu_s=Math.floor(((song.currentTime/60)-(cu_m))*60) ;
        let du_m=Math.floor(song.duration/60);
        let du_s=Math.floor(song.duration-(du_m*60));

        if(cu_m<10) cu_m="0"+cu_m;
        if(cu_s<10) cu_s="0"+cu_s;
        if(du_m<10) du_m="0"+du_m;
        if(du_s<10) du_s="0"+du_s;

        curr_time.textContent=cu_m+":"+cu_s;
        total_duration.textContent=du_m+":"+du_s;
    }
}