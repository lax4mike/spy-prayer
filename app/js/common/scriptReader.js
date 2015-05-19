import * as Speaker from "../common/speaker";
import * as config from "../config/config.js";
import "../utils/Array.prototype.includes.js";

/*
    This is a regular line
    {commander}  This line will only play if the commander is in the selectedCards
    {commander && blind-spy} This line requires both
    {!commander} This line will only play if there commander is NOT in the selectedCards
    {comamnder && !blind-spy} 
    
    *** This line will delay 3 seconds before playing
    The astericks * can be anywhere in the string
*/

// shared so readScript and stop both can access it
var script = [];

function readScript(selectedCards, playerCount, callback) {


    // load the script and interpolate any #{variables}
    script = config.loadScript(selectedCards, playerCount);

    var selectedCardIds = selectedCards.map(c => c.id);
    

    // split by line, trim, and remove any empty elements
    script = script
        .split("\n")
        .map(s => s.trim())

        // first, filter out the lines that we don't need
        .filter(function(line){

            // ignore empty lines
            if (line === "") { return false; }

            // look for eg. {commander} and {!commander} and {!commander && blind-spy}
            var match = line.match(/^{(.*?)}/); 
            
            // if this is a regular line, push it through
            if (!match) { return true; }
            
            var cardIds = match[1].split(/\s*&&\s*/); // eg. ["!commander", "blind-spy"]

            // for every card in this {}, check them against the selectedCards
            return cardIds.every(function(cardId){
                var negative = cardId.match(/^!(.*)/); // if it starts with !

                // if it's not {!...} return if it's in the selectedCards
                if (!negative){
                    return selectedCardIds.includes(cardId);
                }

                // if it is a {!...} return the opposite
                else {
                    return !selectedCardIds.includes(negative[1])
                }
            });

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

        .replace(/\s*(,|\.)\s*(?=\S)/g, "$1 ") // fix commas and periods (for merged lines)

        // then split it back out on the pause points (parts that have *'s)
        .split(/\s*{split-here}\s*/g)

        // make sure we don't have any empty lines... (might happen if the script has * * (star space star))
        .filter((s) => s !== "")

        .map(s => s.trim()); // make sure each line is trimmed (mostly just the last...)


    // console.log(script);
    
    // make the delays longer when there are more people
    var starDelay = (playerCount * 75) + 500;

    // read the next line of the script, and pause if needed
    function readNext(){
        var line = script.shift();

        // we're done
        if (!line) { 
            console.timeEnd("total prayer time"); 
            return callback();
        } 

        // if this line contains any *
        var delays = line.match(/^\*+$/);
        var timeout = (delays) ? delays[0].length * starDelay : 0;
        
        // if the delay is a single *, it's just a pause in speaking
        if (delays && delays[0].length === 1) { timeout = 1; } 

        console.log(timeout, line);

        if (timeout > 0){
            setTimeout(function(){
                readNext();
            }, timeout);
        }
        else {
            Speaker.speak(line, function(){
                console.timeEnd("speak time");
                readNext();
            });
            console.time("speak time");
        }
    }

    // start reading
    readNext();

    console.time("total prayer time");

}

function stop(){
    script = [];
    Speaker.stop();
}

export { readScript, stop };

