const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

//Default message
msg.text = document.querySelector('[name="text"]').value

function populateVoices(){
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('es'))
        .map(voice => 
        `<option value="${voice.name}">${voice.name} (${voice.lang}) </option>`)
        .join("")
}   

function setVoice(){
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle() //Restarts the speech
}

function toggle(startOver = true){
    speechSynthesis.cancel() //stops it from speaking
    if (startOver){
        speechSynthesis.speak(msg)//Starts again
    }
     } 

function setOption(){
    console.log(this.name, this.value)
    msg[this.name] = this.value
    toggle()
}

speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice)

options.forEach(option => option.addEventListener('change', setOption))

speakButton.addEventListener('click', toggle)
stopButton.addEventListener('click', () => toggle(false))