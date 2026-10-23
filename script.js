const music=document.getElementById('music');
const musicToggle=document.getElementById('musicToggle');
const playerToggle=document.getElementById('playerToggle');
const musicStatus=document.getElementById('musicStatus');
const videoSound=document.getElementById('videoSound');
const videos=[...document.querySelectorAll('video')];
let language='en';
const txt={
 en:{playing:'Music is playing.',paused:'Music paused.',blocked:'Tap the music button to start playback.',play:'Sound on',pause:'Pause music',videoSound:'Play runway video with sound',videoMute:'Mute runway video',start:'Trying to start music…'},
 sw:{playing:'Muziki unacheza.',paused:'Muziki umesimamishwa.',blocked:'Gusa kitufe cha muziki ili kuanza.',play:'Washa muziki',pause:'Simamisha muziki',videoSound:'Cheza video yenye sauti',videoMute:'Zima sauti ya video',start:'Inajaribu kuanza muziki…'}
};
function updateMusicUI(){
 const on=!music.paused;
 playerToggle.textContent=on?'Ⅱ':'▶';
 musicToggle.querySelector('span').textContent=on?txt[language].pause:txt[language].play;
 musicStatus.textContent=on?txt[language].playing:txt[language].paused;
}
async function playMusic(){
 try{await music.play();updateMusicUI()}
 catch(e){musicStatus.textContent=txt[language].blocked;musicToggle.querySelector('span').textContent=txt[language].play}
}
function toggleMusic(){if(music.paused)playMusic();else{music.pause();updateMusicUI()}}
musicToggle.addEventListener('click',toggleMusic);
playerToggle.addEventListener('click',toggleMusic);
music.addEventListener('play',updateMusicUI);
music.addEventListener('pause',updateMusicUI);
videoSound.addEventListener('click',()=>{
 const v=document.querySelector('.runway-video');
 if(v.muted){v.muted=false;videoSound.querySelector('span').textContent=txt[language].videoMute;videoSound.firstChild.textContent='Ⅱ '}
 else{v.muted=true;videoSound.querySelector('span').textContent=txt[language].videoSound;videoSound.firstChild.textContent='▶ '}
});
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>{
 language=btn.dataset.lang;
 document.documentElement.lang=language==='sw'?'sw':'en';
 document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b===btn));
 document.querySelectorAll('[data-en][data-sw]').forEach(el=>{el.innerHTML=el.dataset[language]});
 musicStatus.textContent=music.paused?txt[language].blocked:txt[language].playing;
 videoSound.querySelector('span').textContent=document.querySelector('.runway-video').muted?txt[language].videoSound:txt[language].videoMute;
 if(music.paused)musicToggle.querySelector('span').textContent=txt[language].play;
 else musicToggle.querySelector('span').textContent=txt[language].pause;
}));
videos.forEach(v=>{v.addEventListener('error',()=>{v.style.backgroundImage='url("images/gold_runway.png")';v.style.backgroundSize='cover';v.style.backgroundPosition='center'})});
// Try autoplay, but mobile browsers may require a tap. This is expected browser policy.
window.addEventListener('load',async()=>{try{await music.play();updateMusicUI()}catch(e){musicStatus.textContent=txt[language].blocked;musicToggle.querySelector('span').textContent=txt[language].play}});
