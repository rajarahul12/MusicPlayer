const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");

const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const previousButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto",
  },
  {
    name: "jacinto-3",
    displayName: "Good Night Disco Queen",
    artist: "Jacinto",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Jacinto",
  },
];

// Check if playing
let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  playButton.classList.replace("fa-play", "fa-pause");
  playButton.setAttribute("title", "Pause");
  music.play();
}

// pause
function pauseSong() {
  isPlaying = false;
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "Play");
  music.pause();
}

// Play or pause event listeners
playButton.addEventListener("click", () =>
  isPlaying ? pauseSong() : playSong()
);

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Song number
let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// on load select first song
loadSong(songs[songIndex]);

// Update progress bar and time
function updateProgessBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update the progress bar width
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
  }
}

// Event Listeners
previousButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgessBar);
