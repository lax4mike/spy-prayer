import "../utils/Array.prototype.find.js";


// make sure this browser supports speech.
if (!("speechSynthesis" in window)) {
    throw new Error("Upgrade your broswer, grandma.  window.speechSynthesis is undefined");
}

if (!("SpeechSynthesisUtterance" in window)) {
    throw new Error("Upgrade your broswer, grandma.  SpeechSynthesisUtterance is undefined");
}


// create utterance object
var utterance = new SpeechSynthesisUtterance();

window.speechSynthesis.onvoiceschanged = function() {
    
    // const voices = window.speechSynthesis.getVoices()
    //     .map(function(v){
    //         return v.name;
    //     });
    // console.log(voices);
    // Android voices: ["German Germany", "English United Kingdom", "English India", "English United States", "Spanish Spain", "Spanish Mexico", "Spanish United States", "French Belgium", "French France", "Hindi India", "Indonesian Indonesia", "Italian Italy", "Japanese Japan", "Korean South Korea", "Dutch Netherlands", "Polish Poland", "Portuguese Brazil", "Portuguese Portugal", "Russian Russia"]


    // TODO, android only has one voice, so Daniel won't load.
    // look for an external voice somewhere
    var voice = window.speechSynthesis.getVoices()
        .find(v => v.name == "Daniel"); 

    utterance.voice = voice; // Note: some voices don't support altering params
};


utterance.voiceURI = "native";
utterance.volume = 1; // 0 to 1
utterance.rate = 1; // 0.1 to 10
utterance.pitch = 1; //0 to 2
utterance.lang = "en-US";



// set the utterance text and speak it
function speak(text, callback) {
    utterance.onend = callback;
    utterance.text = text;
    speechSynthesis.speak(utterance);
}

function stop(){
    speechSynthesis.cancel();
}


export { speak, stop };

