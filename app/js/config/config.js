import resistance from "./resistance.js";
import avalon from "./avalon.js";

var selectedConfig = resistance;


function loadScript(selectedCards, playerCount){
    
    // variables to be interpolated into the script
    var variables = {
        evilThumbsCount: getEvilThumbsCount(selectedCards, playerCount),
        commanderThumbsCount: getCommanderThumbsCount(selectedCards, playerCount)
    };

    // replace the #{variables} in the script
    var script = selectedConfig.script
        .replace(/\#\{([^\}\r\n]*)\}/g, function(match, p1){
            return variables[p1];
        });

    return script;
}

var evilPlayerMap = {
    5: 2,
    6: 2,
    7: 3,
    8: 3,
    9: 3,
    10: 4
};

function getEvilThumbsCount(selectedCards, playerCount){
    
    var evilThumbs = evilPlayerMap[playerCount];

    if (selectedCards.find(c => c.id === "blind-spy")){
        evilThumbs--;
    }

    return "" + evilThumbs + " thumb" + ((evilThumbs !== 1) ? "s" : "");
}

function getCommanderThumbsCount(selectedCards, playerCount){
    var evilThumbs = evilPlayerMap[playerCount];

    if (selectedCards.find(c => c.id === "deep-cover")){
        evilThumbs--;
    }

    return "" + evilThumbs + " thumb" + ((evilThumbs !== 1) ? "s" : "");
}



export default selectedConfig;

export {
    loadScript,
    evilPlayerMap
}
