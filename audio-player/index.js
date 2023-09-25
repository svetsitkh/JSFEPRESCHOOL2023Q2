const songs = [
    {
      "singer": "Kola",
      "song": "Під крилом",
      "audio": "./assets/audio/kola_pid_krylom.mp3",
      "img": "./assets/img/kola_pk.jpg"
    },
    {
      "singer": "Jerry Hail",
      "song": "Мрія",
      "audio": "./assets/audio/jerry_heil_mriya.mp3",
      "img": "./assets/img/jerry_heil_m.jpg"
    },
    {
      "singer": "Maneskin",
      "song": "Gasoline",
      "audio": "./assets/audio/maneskin-gasoline.mp3",
      "img": "./assets/img/maneskin_gas.jpg"
    }
  ];

const audio = document.querySelector('audio');
const playBtn = document.querySelector('#play_btn');
const backwardBtn = document.querySelector('.backward');
const forwardBtn = document.querySelector('.forward');
const background = document.querySelector('#background');
const audioImg = document.querySelector('#audio_img');
const singer = document.querySelector('.singer');
const song = document.querySelector('.song');
const currentTimeInf = document.querySelector('.currentTime');
const durationTimeInf = document.querySelector('.durationTime');
const progressBar = document.querySelector('.progress_bar');

isPlaying = false;
currentSongIndex = 0;

function updateAudioInformation() {

    let currentTime = audio.currentTime;
    let duration = audio.duration;

    if (!isNaN(duration)) {
        let progressPercent = currentTime * (100 / duration);
        progressBar.value = progressPercent;
        progressBar.style.background = `linear-gradient(to right, #588d91 0%, #588d91 ${progressPercent}%, #c6e7e9 ${progressPercent}%, #c6e7e9 100%)`;

        let currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime - currentTimeMinutes * 60);
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration - durationMinutes * 60);

        currentTimeInf.innerHTML = `${currentTimeMinutes}:${currentTimeSeconds.toFixed().padStart(2, "0")}`;
        durationTimeInf.innerHTML = `${durationMinutes}:${durationSeconds.toFixed().padStart(2, "0")}`;
    }

    if (currentTime >= duration) {
       forwardAudio();
    }
}

audio.addEventListener('timeupdate', updateAudioInformation);

function playAudio() {
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    playBtn.classList.remove('audio_play');
    playBtn.classList.add('audio_pause');
}

function togglePlayPauseAudio() {
    if (!isPlaying) {
        isPlaying = true;
        audio.play();
        playBtn.classList.remove('audio_play');
        playBtn.classList.add('audio_pause');
    } else {
        isPlaying = false;
        audio.pause();
        playBtn.classList.remove('audio_pause');
        playBtn.classList.add('audio_play');
    }
}

playBtn.addEventListener('click', togglePlayPauseAudio);

function forwardAudio() {
    if (currentSongIndex == songs.length - 1) {
        currentSongIndex = 0;
    } else {
        currentSongIndex ++;
    }

    const currentSong = songs[currentSongIndex];
    if (isPlaying) {
        audio.pause();
    }

    background.src = currentSong.img;
    audioImg.src = currentSong.img;
    audio.src = currentSong.audio;
    singer.textContent = currentSong.singer;
    song.textContent = currentSong.song;
    playAudio();
}

function backwardAudio() {
    if (currentSongIndex == 0) {
        currentSongIndex = songs.length - 1;
    } else {
        currentSongIndex --;
    }

    const currentSong = songs[currentSongIndex];
    if (isPlaying) {
        audio.pause();
    }

    background.src = currentSong.img;
    audioImg.src = currentSong.img;
    audio.src = currentSong.audio;
    singer.textContent = currentSong.singer;
    song.textContent = currentSong.song;
    playAudio();
}

forwardBtn.addEventListener('click', forwardAudio);
backwardBtn.addEventListener('click', backwardAudio);

function updateAudioCurrentTime() {
    const newCurrentTime = audio.duration * (progressBar.value / 100);
    audio.currentTime = newCurrentTime;
  }

progressBar.addEventListener('input', updateAudioCurrentTime);