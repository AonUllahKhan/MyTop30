let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'images/CheatCodes.jpeg',
        name: 'Never Love You Again',
        artist: 'Cheat Codes',
        music: 'music/NeverLoveYouAgain.mp3'
    },
    {
        img: 'images/Coldplay.jpg',
        name: 'Always In My Head',
        artist: 'Coldplay',
        music: 'music/AlwaysInMyHead.mp3'
    },
    {
        img: 'images/Chvrches.jpg',
        name: 'How Not To Drown',
        artist: 'Chvrches',
        music: 'music/HowNotToDrown.mp3'
    },
    {
        img: 'images/Kygo.jpg',
        name: 'Stranger Things',
        artist: 'Kygo',
        music: 'music/StrangerThings.mp3'
    },
    {
        img: 'images/Khalid.jpg',
        name: 'Better',
        artist: 'Khalid',
        music: 'music/Better.mp3'
    },
    {
        img: 'images/Leon.jpg',
        name: 'Surround Me',
        artist: 'Leon',
        music: 'music/SurroundMe.mp3'
    },
    {
        img: 'images/TheAmazons.jpg',
        name: 'Stay With Me',
        artist: 'The Amazons',
        music: 'music/StayWithMe.mp3'
    },
    {
        img: 'images/ShamoonIsmail.jpg',
        name: 'Marijuana',
        artist: 'Shamoon Ismail',
        music: 'music/Marijuana.mp3'
    },
    {
        img: 'images/Sultan+Shepard.jpg',
        name: 'Daydreams',
        artist: 'Sultan + Shepard',
        music: 'music/Daydreams.mp3'
    },
    {
        img: 'images/NickyRomero.jpg',
        name: 'Okay',
        artist: 'Nicky Romero',
        music: 'music/Okay.mp3'
    },
    {
        img: 'images/ThePaperKites.jpg',
        name: 'Revelator Eyes',
        artist: 'The Paper Kites',
        music: 'music/RevelatorEyes.mp3'
    },
    {
        img: 'images/EdSheeran.jpg',
        name: 'Beautiful People',
        artist: 'Ed Sheeran',
        music: 'music/BeautifulPeople.mp3'
    },
    {
        img: 'images/Chvrches.jpg',
        name: 'Forever',
        artist: 'Chvrches',
        music: 'music/Forever.mp3'
    },
    {
        img: 'images/DuaLipa.jpg',
        name: 'Love Is Religion',
        artist: 'Dua Lipa',
        music: 'music/LoveIsReligion.mp3'
    },
    {
        img: 'images/Vessels.jpg',
        name: 'Deflect The Light',
        artist: 'Vessels',
        music: 'music/DeflectTheLight.mp3'
    },

    {
        img: 'images/ShamoonIsmail.jpg',
        name: 'Rung',
        artist: 'Shamoon Ismail',
        music: 'music/Rung.mp3'
    },
    {
        img: 'images/LPGiobbi.jpg',
        name: 'Forever And A Day',
        artist: 'LP Giobbi',
        music: 'music/ForeverAndADay.mp3'
    },

    {
        img: 'images/JaiWolf.jpg',
        name: 'Lose My Mind',
        artist: 'Jai Wolf',
        music: 'music/LoseMyMind.mp3'
    },
    {
        img: 'images/JohnMartin.jpg',
        name: 'Anywhere For You',
        artist: 'John Martin',
        music: 'music/AnywhereForYou.mp3'
    },
    {
        img: 'images/Leon.jpg',
        name: 'Soaked',
        artist: 'Leon',
        music: 'music/Soaked.mp3'
    },
    {
        img: 'images/BlackMarble.jpg',
        name: 'A Great Design',
        artist: 'Black Marble',
        music: 'music/AGreatDesign.mp3'
    },
    {
        img: 'images/Coldplay.jpg',
        name: 'Higher Power',
        artist: 'Coldplay',
        music: 'music/HigherPower.mp3'
    },
    {
        img: 'images/EdSheeran.jpg',
        name: 'Celestial',
        artist: 'Ed Sheeran',
        music: 'music/Celestial.mp3'
    },
    {
        img: 'images/TheWeekend.jpg',
        name: 'Blinding Lights',
        artist: 'The Weekend',
        music: 'music/BlindingLights.mp3'
    },

    {
        img: 'images/BadBunny.jpg',
        name: 'Ojitos Lindos',
        artist: 'Bad Bunny',
        music: 'music/OjitosLindos.mp3'
    },
    {
        img: 'images/Chvrches.jpg',
        name: 'Tether',
        artist: 'Chvrches',
        music: 'music/Tether.mp3'
    },
    {
        img: 'images/Leon.jpg',
        name: 'Dancer',
        artist: 'Leon',
        music: 'music/Dancer.mp3'
    },
    {
        img: 'images/TheMidnight.jpg',
        name: 'The Comeback Kid',
        artist: 'The Midnight',
        music: 'music/TheComebackKid.mp3'
    },
    {
        img: 'images/Kalax.jpg',
        name: 'Out Of Time',
        artist: 'Kalax',
        music: 'music/OutOfTime.mp3'
    },
    {
        img: 'images/LPGiobbi.jpg',
        name: 'Antibodies',
        artist: 'LP Giobbi',
        music: 'music/Antibodies.mp3'
    },

];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = " Rank" + (track_index - 30);

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}