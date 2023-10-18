const nomeMusica = document.getElementById('nome-musica');
const nomeBanda = document.getElementById('nome-banda');
const som = document.getElementById('audio');
const capa = document.getElementById('capa');
const play = document.getElementById('play');
const next = document.getElementById('avancar');
const previous = document.getElementById('voltar');
const barraProgresso = document.getElementById('progresso-atual');
const containerProgresso = document.getElementById('container-progresso');
const shuffleButton = document.getElementById('embaralhar');
const repeatButton = document.getElementById('repetir');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const asYouWhere = {
    nomeMusica : 'As You Were',
    artist : 'TrackTribe',
    file: 'as_you_were'
}

const boomBapFlick = {
    nomeMusica : 'Bomm Bap Flick',
    artist : 'Quincas Moreira',
    file: 'boom_bap_flick'
}
asYouWhere
const cantHide = {
    nomeMusica : 'Can\'t Hide',
    artist : 'Otis Mcdonald',
    file: 'cant_hide'
}

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = [asYouWhere, boomBapFlick, cantHide];
let sortedPlaylist = [...originalPlaylist];
let index = 0;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    som.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    som.pause();
    isPlaying= false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else{
        playSong();
        }
}

function iniciarSom(){
    capa.src = `images/${sortedPlaylist[index].file}.webp`;
    som.src = `songs/${sortedPlaylist[index].file}.mp3`;
    nomeMusica.innerText = sortedPlaylist[index].nomeMusica;
    nomeBanda.innerText = sortedPlaylist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length -1;
    }
    else{
        index -= 1;
    }
    iniciarSom();
    playSong();
}

function nextSong(){
    if(index === sortedPlaylist.length -1){
        index = 0;
    }
    else{
        index += 1;
    }
    iniciarSom();
    playSong();
}

function updateProgress(){
    const barraWidth = (som.currentTime/som.duration)*100;
    barraProgresso.style.setProperty('--progress', `${barraWidth}%`);
    songTime.innerText = tollHHMMSS(som.currentTime);
}

function jumpTo(event){
    const width = containerProgresso.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*som.duration;
    som.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let  currentIndex = size - 1;
    while(currentIndex > 0) {
        let randomIndex = Math.floor(Math.random()*size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex-=1;
    }
}

function shuffleButtonClicked() {
    if(isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist]
        shuffleButton.classList.remove('button-active');        
    }
}

function repeatButtonClicked() {
    if (repeatOn===false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat() {
    if (repeatOn === false){
        nextSong();
    }
    else {
        playSong();
    }
}

function tollHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours*3600)/60);
    let secs = Math.floor(originalNumber - hours*3600 - min*60);

    return`${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
    totalTime.innerText = tollHHMMSS(som.duration);
}



iniciarSom();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
som.addEventListener('timeupdate', updateProgress);
som.addEventListener('ended', nextOrRepeat);
som.addEventListener('loadedmetadata', updateTotalTime);
containerProgresso.addEventListener('click', jumpTo)
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
