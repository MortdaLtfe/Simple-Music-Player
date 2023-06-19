
const container = document.querySelector(".container"),
  songImg = container.querySelector(".img-area img"),
  songName = container.querySelector(".song-details .name"),
  songArtist = container.querySelector(".song-details .artist"),
  songPlayBtn = container.querySelector("#play-pause"),
  mainAudio = container.querySelector("#main-audio"),
  songPrev = container.querySelector("#prev"),
  songNext = container.querySelector("#next"),
  songRepeat = container.querySelector("#repeat-plist"),
  progArea = container.querySelector(".progress-area"),
  progBar = container.querySelector(".progress-area .progress-bar"),
  slide = container.querySelector(".slide-bar"),
  listBtn = document.querySelector("#playlist")
// --------- //
let musicIndex= 0
let isPlaying = false

window.addEventListener("load",()=>{
  loadSong(musicIndex)
})
// Change Song After Click
songNext.addEventListener("click",()=>{
  if (musicIndex < 3){
    musicIndex += 1
    loadSong(musicIndex)
    playSong()
  }
})
songPrev.addEventListener("click",()=>{
  if (musicIndex >= 1){
    musicIndex -= 1
    loadSong(musicIndex)
    playSong()
  }
})
// Play Pause Click
songPlayBtn.addEventListener("click",()=>{
  if (isPlaying == true ){
    pauseSong()
    
  }else{
    playSong()
  }
})
function NextSong(indexMusic){
  if (musicIndex < 3){
    musicIndex += 1
    loadSong(musicIndex)
    playSong()
  }
  
}
// Setup Song Name && Artist && Music && Img
function loadSong(indexNum){
  songName.innerHTML = musicList[indexNum].name
  songArtist.innerHTML = musicList[indexNum].artist
  songImg.src = musicList[indexNum].img
  mainAudio.src = musicList[indexNum].src
}

// Function Play Music And Pause 
function playSong() {
  isPlaying = true;
  songPlayBtn.querySelector("i").innerHTML = "pause";
  mainAudio.play();
}
function pauseSong() {
  isPlaying = false;
  songPlayBtn.querySelector("i").innerHTML = "play_arrow";
  mainAudio.pause(isPlaying);
}

// Change Repate Types
songRepeat.addEventListener("click", ()=>{
  switch(songRepeat.innerHTML){
    case "repeat":
      songRepeat.innerHTML = "repeat_one"
      songRepeat.setAttribute("title","Repeat Song")
      break;
    case "repeat_one":
      songRepeat.innerHTML = "shuffle"
      songRepeat.setAttribute("title", "Random Song")
      break;
    case "shuffle":
      songRepeat.innerHTML = "repeat"
      songRepeat.setAttribute("title", "Playlist looped")
  }
})

mainAudio.addEventListener("ended", ()=>{
  switch(songRepeat.innerHTML){
    case "repeat":
      NextSong(musicIndex)
      loadSong(musicIndex)
      playSong()
      break;
    case "repeat_one":
      mainAudio.currentTime = "0"
      loadSong(musicIndex)
      playSong()
      break;
    case "shuffle":
      let rand = Math.floor(Math.random() * musicList.length)
      do {
        rand = Math.floor(Math.random() * musicList.length)
      } 
      while (musicIndex == rand)
      {
        musicIndex = rand
        loadSong(musicIndex)
        playSong()        
        break;
     }
      
  }
})
// set Progress Bar 
mainAudio.addEventListener("timeupdate",(e)=>{
  const currentTime = e.target.currentTime
  const duration= e.target.duration
  let progressWidth = (currentTime/duration) * 100
  progBar.style.width = `${progressWidth}%`
  
  // Set The Time
  let thisTime = container.querySelector(".current-time"),
  maxTime = container.querySelector("#max")
  mainAudio.addEventListener("loadeddata",()=>{
    const inte = setInterval(()=>{
      const _elaps = mainAudio.currentTime
      thisTime.innerHTML = Time(_elaps)
    }, 1000)
    const _duration = mainAudio.duration
    maxTime.innerHTML = Time(_duration)
    mainAudio.addEventListener("ended", ()=>{
      clearInterval(inte)
    })
  })
})
function Time(time){
  if (time && !isNaN(time)){
    const minutes = Math.floor(time / 60) < 10 
    ? `0${Math.floor(time/60)}`
    : Math.floor(time / 60)
    const second = Math.floor(time % 60) < 10 
    ? `0${Math.floor(time % 60)}`
    : Math.floor(time % 60)
    return `${minutes}:${second}`
  }
  return "00:00"
}

progArea.addEventListener("click",(e)=>{
  const progressWidth = progArea.clientWidth
  const clickOffsetX = e.offsetX
  const songDuration = mainAudio.duration
  
  mainAudio.currentTime = (clickOffsetX / progressWidth)* songDuration
})

// Slide open && Close
var D = 0
listBtn.onclick = ()=>{
  if (D == 0){
    slide.style.transition = ".7s"
    slide.classList.add("show")
    D++
    
  }
  else if (D == 1){
    slide.style.transition = ".7s"
    slide.classList.remove("show")
    D--
  } 
}
// Setup Side bars Music
musicList.forEach((el)=>{
  let row = document.createElement("div")
  let span = document.createElement("span")
  let i = document.createElement("i")
  slide.appendChild(row).className = "row"
  row.appendChild(span)
  row.appendChild(i).className =("material-icons")
  i.innerHTML = "play_circle"
  span.innerHTML = el.name
 // Open && Close Side Bars
  row.addEventListener("click", (ele)=>{
    indexMusic = el.id
    slide.classList.remove("show")
    loadSong(indexMusic)
    playSong()
  })
  // i.addEventListener("click",(elm)=>{
  //   slide.querySelectorAll("i").forEach((elme)=>{
  //     elme.style.transition = ".5s"
  //     elme.style.color = "white"
  //     elm.target.style.color = "rgb(30 215 96)"
  //   })
  // })
})
