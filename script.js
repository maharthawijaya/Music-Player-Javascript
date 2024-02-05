//Getting the Id from HTML using getElementById.
//Query selector for HTML Element such as audio.
const music = document.querySelector('audio');
const previousButton = document.getElementById('prev');
const playButton = document.getElementById('main-button');
const nextButton = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const repeatButton = document.getElementById('repeat');
const shuffleButton = document.getElementById('shuffle');

// Music Array
const songs = [
    {
        name: 'pokemon-1',
        displayName: 'Pokemon Ruby & Sapphire Music Medley',
        artist: 'Dr. Pez & VGM',
    },
    {
        name: 'pokemon-2',
        displayName: 'Pokemon Littleroot Town Theme Music',
        artist: 'Pokemon',
    },
    {
        name: 'pokemon-3',
        displayName: 'Pokemon Driftveil City Theme Music',
        artist: 'Pokemon',
    }
];

//Let is just like var. Use typeof to know what is the real variable type.
let isPlaying = false;
let repeatOnce = false;
let isShuffle = false;


function PlayMusic(){
    //Change the bool to true, replace the button to pause and the attributes, then play the music.
    isPlaying = true
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

function PauseMusic(){
    //Change the bool to false, replace the button to play and the attributes, and then pause the music.
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

//add event when 'click on playButton. And then check if isPlaying is true, the event will execute PauseMusic. if not, the event will execute the PlayMusic.
playButton.addEventListener('click', () => (isPlaying ? PauseMusic() : PlayMusic()));

let songIndex = 0;

function LoadMusic(song){
    //Change the title text to the song displayName.
    title.textContent = song.displayName;

    //Change the title text to the song displayName.
    artist.textContent = song.artist;

    //Change the source of music and image create the path.
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

function NextSong(){
    //check if it shuffle or not
    if(isShuffle){
        //if shuffle then do the random math using songs length and save it to songIndex.
        songIndex = Math.floor(Math.random() * songs.length);
    }
    else{
        //if not shuffle then increment the song index.
        songIndex++;
        //check if the song index is greater than songs length - 1.
        if(songIndex > songs.length - 1){
            //if true then songIndex back to 0.
            songIndex = 0;
        }
    }
    //load the music using songs [songindex] that we change above
    LoadMusic(songs[songIndex]);
    //then play the music
    PlayMusic();
}

function CheckRepeat(){
    //check the repeat function. The repeat can only be once
    if(repeatOnce){
        //if its repeatOnce then make the repeatOnce false. Because its only use once
        repeatOnce = false;
        //then load the current music index
        LoadMusic(songs[songIndex]);
        //and then play music
        PlayMusic();
        return;
    }
    else{
        //if not true, then go to next song
        NextSong();
    }
}

function SetRepeatOnce() {
    //if the repeat false before, then make it the opposite (true)
    repeatOnce = !repeatOnce;
    //toggle the repeatbutton to active if the bool is true
    repeatButton.classList.toggle('active', repeatOnce);
}
function SetShuffleOn(){
    //if the shuffle false before, then make it the opposite (true)
    isShuffle = !isShuffle;
    //toggle the shufflebutton to active if the bool is true
    shuffleButton.classList.toggle('active', isShuffle);
}

function PreviousSong(){
    //decrement the songindex
    songIndex--;
    //if the index after decrement less than 0
    if(songIndex < 0){
        //change the song index to the last song in array songs
        songIndex = songs.length-1;
    }
    //then load the songindex
    LoadMusic(songs[songIndex]);
    //play the music
    PlayMusic();
}

function UpdateProgressBar(e){
    if(isPlaying){
        // create variable that already exist in DOM Audio, and make it to be the sourceElement.
        // Note that this function parameter function is for audio
        // if i use currentTime, its like audio.currentTime
        const { currentTime, duration } = e.srcElement;
        
        //create progressppercent variable to store the currenttime/duration in percent
        const progressPercent = (currentTime / duration) * 100;
        //then make the progress style width same as the progress percent
        progress.style.width = `${progressPercent}%`;

        //create duration in minutes with Math.floor duration/60 because duration return second then / 60 to get the minutes
        const durationMinutes = Math.floor(duration/60);
        //then store the duration second using remainder / sisa hasil bagi
        let durationSeconds = Math.floor(duration%60);
        //check if durationseconds below 10
        if(durationSeconds < 10){
            //if its true, add the 0 in front of durationseconds
            durationSeconds = `0${durationSeconds}`;
        }
        //check if durationseconds is not null
        if(durationSeconds){
            //then change the text content to Minutes:Second example: 2:05 because minutes doesnt need 0 at front
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        
        //then create variable to store current minutes and second
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);

        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        if(currentSeconds){
            //change the currenttimeelement text to minutes:currentseconds
            currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

function SetProgressBar(e){
    //create the variable to store width of progressbar
    //In an event, "this" refers to the element that received the event. In this case progressContainer
    const width = this.clientWidth;

    //this code refer to the mouse event at where in the x position got clicked
    //documentation https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
    const clickX = e.offsetX;

    //then get the music duration
    const {duration} = music;

    //then update the music currenttime with mouseevent click X / Width then * with the music duration
    music.currentTime = (clickX/width) * duration;

}

//add event if music 'ended' then do CheckRepeat
music.addEventListener('ended', CheckRepeat);

//add event if previous button 'clicked' then do PreviousSong
previousButton.addEventListener('click', PreviousSong);

//add event if next button 'clicked' then do NextSong
nextButton.addEventListener('click', NextSong);

//add event if music do have 'timeupdate' then do UpdateProgress Bar (Current time and duration)
music.addEventListener('timeupdate', UpdateProgressBar);

//add event if repeat button 'clicked' then do SetRepeatOnce
repeatButton.addEventListener('click', SetRepeatOnce);

//add event if shuffle button 'clicked' then do SetShuffleOn
shuffleButton.addEventListener('click', SetShuffleOn);

//add event if progresscontainer if clicked then setprogressbar to the where it clicked
progressContainer.addEventListener('click', SetProgressBar);

//load the music at first
LoadMusic(songs[songIndex]);