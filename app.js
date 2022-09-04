// Variable Declaration
const textArea = document.querySelector('#text');
let voiceList = document.querySelector('#voice');
let speechButton =document.querySelector('#submit');

let synth = speechSynthesis;
let isSpeaking = true;

// Create voice speech function that speaks text that was converted
function voiceSpeech() {
    // Loop through voices in synth console log ...
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option');
        option.text = voice.name;
        voiceList.add(option);
        console.log(option);
    }
}

// Create event listener for synth
synth.addEventListener('voiceschanged', voiceSpeech);

// Create text to speech function that converts text
function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice  == voiceList.value) {
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance);
}

// Create event listener for speech button
speechButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (textArea.value != '') {
        textToSpeech(textArea.value);
    }
    if (textArea.value.length > 80) {
        if (isSpeaking) {
            synth.resume();
            isSpeaking =false;
            speechButton.innerHTML = 'Pause Speech';
        } else {
            synth.pause();
            isSpeaking = true;
            speechButton.innerHTML = 'Resume Speech';
        }
        // Set timer
        setInterval(() => {
            if (synth.speaking && !isSpeaking) {
                isSpeaking =true;
                speechButton.innerHTML = 'Convert to Speech';
            }
        })
    } else {
        speechButton.innerHTML = 'Convert to Speech';
    }
})