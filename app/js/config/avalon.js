// http://www.redmeeple.com/site/images/Rules/The_Resistance_Avalon_Rules%28EN%29.pdf
var avalon = {

    "cardsCollection": [
        {
            "id": "merlin",
            "name": "Merlin",
            "team": "arthur",
            "description": "Knows Minions of Mordred, must remain hidden",
            "dependencies": ["assassin"]
        },
        {
            "id": "assassin",
            "name": "Assassin",
            "team": "modred",
            "dependencies": ["merlin"]
        },
        {
            "id": "percival",
            "name": "Percival",
            "team": "arthur",
            "description": "Knows Merlin",
            "dependencies": ["merlin"]
        },
        {
            "id": "oberon",
            "name": "Oberon",
            "team": "modred",
            "description": "Unknown to Minions of Mordred"
        },
        {
            "id": "modred",
            "name": "Modred",
            "team": "modred",
            "description": "Unknown to Merlin",
            "dependencies": ["merlin"]
        },
        {
            "id": "morgana",
            "name": "Morgana",
            "team": "modred",
            "description": "Appears as Merlin",
            "dependencies": ["merlin", "percival"]
        }
    ],

    "script": `
        Everyone close your eyes and extend your hand into a fist in front of you. 

        * Minions of Mordred,  

        {oberon} but not Oberon,

        put your thumbs up and open your eyes. Look around so that you may know all of the agents of evil.

        ****** 

        Minions of Mordred, lower your thumbs and close your eyes.

        **

        {merlin} Minions of Mordred, 
        
        {modred} but not Modred himself,

        {merlin} extend your thumbs so that Merlin will know of you scum. *
        {merlin} Merlin, open your eyes and observe the dirty thumbs of the traitors. ****** 
        {merlin} * Minions of Mordred, put your thumbs down and re-form your hand into a fist. 
        {merlin} * Merlin, close your eyes.

        {percival} * Merlin 
        {morgana} and Morgana
        {percival}, extend your thumb so that Percival may know of you. 

        {percival} * Percival, open your eyes and observe your leader.  Protect him with your life.

        {merlin} ****

        {percival} Merlin
        {morgana} and Morgana
        {percival}, put your thumb down. * Percival, close your eyes. * 

        All players should have their eyes closed and hands in a fist in front of them. Everyone, open your eyes.
        `
};

export default avalon;


