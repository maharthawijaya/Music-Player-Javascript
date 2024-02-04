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

// Music
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

let isPlaying = false;
let repeatOnce = false;
let isShuffle = false;

function PlayMusic(){
    isPlaying = true
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

function PauseMusic(){
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

playButton.addEventListener('click', () => (isPlaying ? PauseMusic() : PlayMusic()));

let songIndex = 0;

function LoadMusic(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

function NextSong(){
    if(isShuffle){
        console.log(songIndex);
        songIndex = Math.floor(Math.random() * songs.length);
        console.log('After Update : ' + songIndex);
    }
    else{
        songIndex++;
        if(songIndex > songs.length - 1){
            songIndex = 0;
        }
    }
    LoadMusic(songs[songIndex]);
    PlayMusic();
}

function CheckRepeat(){
    if(repeatOnce){
        repeatOnce = false;
        LoadMusic(songs[songIndex]);
        PlayMusic();
        return;
    }
    else{
        NextSong();
    }
}

function SetRepeatOnce() {
    repeatOnce = !repeatOnce;
    repeatButton.classList.toggle('active', repeatOnce);
}
function SetShuffleOn(){
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle('active', isShuffle);
}

function PreviousSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    LoadMusic(songs[songIndex]);
    PlayMusic();
}

function UpdateProgressBar(e){
    if(isPlaying){
        const { currentTime, duration } = e.srcElement;

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        if(durationSeconds){
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        if(currentSeconds){
            currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

function SetProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;

    const {duration} = music;

    music.currentTime = (clickX/width) * duration;

}


music.addEventListener('ended', CheckRepeat);
previousButton.addEventListener('click', PreviousSong);
nextButton.addEventListener('click', NextSong);
music.addEventListener('timeupdate', UpdateProgressBar);
repeatButton.addEventListener('click', SetRepeatOnce);
shuffleButton.addEventListener('click', SetShuffleOn)
progressContainer.addEventListener('click', SetProgressBar);

LoadMusic(songs[songIndex]);