import * as Speaker from "../common/speaker";
import config from "../config/resistance.js";
import "../utils/Array.prototype.includes.js";

/*
    This is a regular line
    {commander}  This line will only play if the commander is in the selectedCards

    *** This line will delay 3 seconds before playing
    The astericks * can be anywhere in the string
*/

function readScript(selectedCards) {

    // load the script, split by line, trim, and remove any empty elements
    var script = config.script.split("\n")
        .filter((s) => s !== "")
        .map((s) => s.trim());

    var selectedCardIds = selectedCards.map(c => c.id);

    
    script = script

        // first, filter out the lines that we don't need
        .filter(function(line){

            var match = line.match(/^{(.*?)}/); // look for eg. {commander}
            
            // if this is a regular line, push it through
            if (!match) { return true; }

            // otherwise, remove it if it depends on a card that isn't in the selectedCardsIds
            return selectedCardIds.includes(match[1]);

        })

        .map(function(line){

            // remove dependency markup, but leave the line text, eg "{commander}"
            var match = line.match(/^{(.*?)}(.*)$/);
            if (match && match[2]) { line = match[2]; }
        
            // add some dilimiters around the *'s so we can split by them later
            line = line.replace(/(\*+)/g, "{split-here}$1{split-here}");
        
            // return the line without the {commander}
            return line.trim();
        })

        // merge it all back into a string
        .join(' ')

        // then split it back out on the pause points (parts that have *'s)
        .split(/\s?{split-here}\s?/g);


    // console.log(script);
    

    function readNext(){
        var line = script.shift();

        if (!line) { return; } // we're done

        // if this line contains any *
        var delays = line.match(/^\*+$/);
        var timeout = (delays) ? delays[0].length * 1000 : 0;

        console.log(timeout, line);

        if (timeout > 0){
            setTimeout(function(){
                readNext();
            }, timeout);
        }
        else {
            Speaker.speak(line, function(){
                readNext();
            });
        }
    }

    readNext();


}

export { readScript };

