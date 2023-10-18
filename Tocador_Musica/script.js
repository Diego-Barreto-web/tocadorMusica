const nomeMusica = document.getElementById('nome-musica');
const nomeBanda = document.getElementById('nome-banda');
const som = document.getElementById('audio');
const capa = document.getElementById('capa');
const play = document.getElementById('play');
const next = document.getElementById('avancar');
const previous = document.getElementById('voltar');
const barraProgresso = document.getElementById('progresso-atual');
const containerProgresso = document.getElementById('container-progresso');

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
const playlist = [asYouWhere, boomBapFlick, cantHide];
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
    capa.src = `images/${playlist[index].file}.webp`;
    som.src = `songs/${playlist[index].file}.mp3`;
    nomeMusica.innerText = playlist[index].nomeMusica;
    nomeBanda.innerText = playlist[index].artist;
}

function previousSong(){
    if(index === 0){
        index = playlist.length -1;
    }
    else{
        index -= 1;
    }
    iniciarSom();
    playSong();
}

function nextSong(){
    if(index === playlist.length -1){
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
}

function jumpTo(event){
    const width = containerProgresso.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*som.duration;
    som.currentTime = jumpToTime;
}

iniciarSom();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
som.addEventListener('timeupdate', updateProgressBar);
containerProgresso.addEventListener('click', jumpTo)