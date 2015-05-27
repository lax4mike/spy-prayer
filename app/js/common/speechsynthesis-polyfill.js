// NOT WORKING!
// because http://www.corsproxy.com is down...
// https://github.com/MikaelSoderstrom/polyfill-speechsynthesis/issues/2

(function () {
    'use strict';

    if ( !! window.SpeechSynthesisUtterance || !! window.speechSynthesis) {
        return;
    }   

    window.SpeechSynthesisUtterance = function (text) {
        return {
            lang: 'en', 
            volume: 1.0, 
            onend: function () {},
            onstart: function () {},
            text: text
        };
    };

    window.speechSynthesis = {
        speak: function (utterance) {

            try {
                if (!this.audio) { this.audio = new Audio(); }
                
                // var url = 'http://www.corsproxy.com/translate.google.com/translate_tts?&q=' + escape(utterance.text) + '&tl=' + utterance.lang;
                var url = 'http://translate.google.com/translate_tts?&q=' + escape(utterance.text) + '&tl=' + utterance.lang;
                
                console.log(url);
                
                this.audio.src = url;
                this.audio.volume = utterance.volume;
                this.audio.addEventListener('ended', utterance.onend);
                this.audio.addEventListener('play', utterance.onstart);
                this.audio.play();
            }
            catch(error){
                console.log("ERROR: ", error);
            }
        },

        cancel: function(){
            if (this.audio){
                this.audio.pause();
                this.audio.currentTime = 0;
            }
        }
    };
})();