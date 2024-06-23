const music_list = [
  {
    img: 'img/faded.png',
    name: 'Faded',
    singer: 'Alan Walker',
    music: 'music/Faded.mp3',
  },
  {
    img: 'img/stay.png',
    name: 'Stay',
    singer: 'The Kid LAROI, Justin Bieber',
    music: 'music/stay.mp3',
  },
  {
    img: 'img/withoutMe.png',
    name: 'Without Me',
    singer: 'Halsey',
    music: 'music/WithoutMe.mp3',
  },
];

const music_number = document.querySelector(".music-number");
const music_name = document.querySelector(".music-name");
const music_singer = document.querySelector(".music-singer");
const music = document.querySelector(".music");

const startTime = document.querySelector(".audio-start-time");
const endTime = document.querySelector(".audio-end-time");
const time_range = document.querySelector(".time-range");

let musicIndex = 0;
let isPlaying = false;

// Buttons
const playpause_btn = document.querySelector('.playpause-btn i');
const next_btn = document.querySelector('.next-btn i');
const prev_btn = document.querySelector('.prev-btn i');

loadMusic(musicIndex);

function loadMusic(musicIndex) {
  music.src = music_list[musicIndex].music;
  music_singer.textContent = music_list[musicIndex].singer;
  music_name.textContent = music_list[musicIndex].name;
  music_number.textContent =
    "Playing music " + (
      musicIndex + 1
    ) + " of " + music_list.length;
}

music.addEventListener('ended', () => {
  next_btn.click();
});

playpause_btn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

function playMusic() {
  music.play();
  isPlaying = true;
  playpause_btn.classList = 'fa-solid fa-circle-pause fa-3x';
}

function pauseMusic() {
  music.pause();
  isPlaying = false;
  playpause_btn.classList = 'fa-solid fa-circle-play fa-3x';
}

next_btn.addEventListener("click", () => {
  if (musicIndex < music_list.length - 1) {
    musicIndex++;
  } else {
    musicIndex = 0;
  }

  loadMusic(musicIndex);
  playMusic();
});

prev_btn.addEventListener("click", () => {
  if (musicIndex > 0) {
    musicIndex--;
  } else {
    musicIndex = music_list.length - 1;
  }

  loadMusic(musicIndex);
  playMusic();
});

function calculateTime(totalSecond) {
  const minute = Math.floor(totalSecond / 60);
  const second = Math.floor(totalSecond % 60);
  const updateSecond = second < 10 ? `0${ second }` : second;

  return `${ minute }:${ updateSecond }`;
}

music.addEventListener("loadedmetadata", () => {
  endTime.textContent = calculateTime(music.duration);
  time_range.max = Math.floor(music.duration);
});

music.addEventListener("timeupdate", () => {
  time_range.value = Math.floor(music.currentTime);
  startTime.textContent = calculateTime(time_range.value);
});

time_range.addEventListener("input", () => {
  startTime.textContent = calculateTime(time_range.value);
  music.currentTime = time_range.value;
});
