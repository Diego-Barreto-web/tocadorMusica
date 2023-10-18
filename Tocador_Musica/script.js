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

function updateProgressBar(){
    const barraWidth = (som.currentTime/som.duration)*100;
    barraProgresso.style.setProperty('--progress', `${barraWidth}%`);
    if (som.currentTime === som.duration){
        nextSong();
    }
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

iniciarSom();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
som.addEventListener('timeupdate', updateProgressBar);
containerProgresso.addEventListener('click', jumpTo)
shuffleButton.addEventListener('click', shuffleButtonClicked);
