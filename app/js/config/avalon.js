// http://www.redmeeple.com/site/images/Rules/The_Resistance_Avalon_Rules%28EN%29.pdf
var resistance = {

    "game": "avalon",

    "teams": {
        "good": "Servants of Arthur",
        "evil": "Minions of Mordred"
    },

    "cardsCollection": [
        {
            "id": "merlin",
            "name": "Merlin",
            "team": "good",
            "icon": "merlin",
            "icon-type": "png",
            "description": "Knows spies, must remain hidden",
            "dependencies": ["assassin"]
        },
        {
            "id": "percival",
            "name": "Percival",
            "team": "good",
            "icon": "percival",
            "icon-type": "png",
            "description": "Knows Merlin",
            "dependencies": ["merlin"]
        },
        {
            "id": "assassin",
            "name": "Assassin",
            "team": "evil",
            "icon": "assassin",
            "icon-type": "png",
            "dependencies": ["merlin"]
        },
        {
            "id": "morgona",
            "name": "Morgona",
            "team": "evil",
            "icon": "morgana",
            "icon-type": "png",
            "description": "Appears as Merlin",
            "dependencies": ["merlin", "percival"]
        },
        {
            "id": "mordred",
            "name": "Mordred",
            "team": "evil",
            "icon": "mordred",
            "icon-type": "png",
            "description": "Unknown to Merlin",
            "dependencies": ["merlin"]
        },
        {
            "id": "oberon",
            "name": "Oberon",
            "team": "evil",
            "icon": "oberon",
            "icon-type": "png",
            "description": "Unknown to evil"
        },
    ],

    "script": `
        Everyone close your eyes and extend your hand into a fist in front of you. 

        * Minions of Mordred,  

        {oberon} but not Oberon,

        put your thumbs up and open your eyes. Look around so that you may know all of the agents of evil. 

        * You should see #{evilThumbsCount}.

        *****

        {!merlin} Minions of Mordred, lower your thumbs and close your eyes. *

        {merlin && mordred}  Mordred, close your eyes and lower your thumb. *
        {merlin && mordred}  All other Minions of Mordred, 

        {merlin && !mordred} Minions of Mordred,
        
        {merlin} close your eyes, but keep your thumbs up so that Merlin will know of you scum. *
        {merlin} Merlin, open your eyes and observe the dirty thumbs of the traitors.
        {merlin} * You should see #{commanderThumbsCount}. 
        {merlin} *****
        {merlin} Minions of Mordred, put your thumbs down. 
        {merlin} * Merlin, close your eyes.

        {percival} * Merlin 
        {morgona} , and Morgona
        {percival}, extend your thumb so that Percival may know of you. 

        {percival && !morgona} * Percival, open your eyes and observe Merlin's white beard.  Protect him with your life.

        {percival && morgona} * Percival, open your eyes and observe two thumbs. One of them is the omniscient wizard, the other is a filthy imposter.

        {percival} ***

        {percival && !morgona} Merlin, put your thumb down. * 
        {percival && morgona} Merlin, and Morgona, put your thumbs down. * 
        {percival} Percival, close your eyes. * 

        All players should have their eyes closed and hands in a fist in front of them. Everyone, open your eyes. It is now time to play, The Resistance Avalon.
        `
};

export default resistance;


