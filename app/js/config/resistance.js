// http://www.redmeeple.com/site/images/Rules/The_Resistance_Avalon_Rules%28EN%29.pdf
var resistance = {

    "game": "resistance",

    "teams": {
        "good": "Resistance",
        "evil": "Spies"
    },

    "cardsCollection": [
        {
            "id": "commander",
            "name": "Commander",
            "team": "good",
            "icon": "resistance",
            "icon-type": "svg",
            "description": "Knows spies, must remain hidden",
            "dependencies": ["assassin"]
        },
        {
            "id": "body-guard",
            "name": "Body Guard",
            "team": "good",
            "icon": "resistance",
            "icon-type": "svg",
            "description": "Knows Commander",
            "dependencies": ["commander"]
        },
        {
            "id": "assassin",
            "name": "Assassin",
            "team": "evil",
            "icon": "spy",
            "icon-type": "svg",
            "dependencies": ["commander"]
        },
        {
            "id": "blind-spy",
            "name": "Blind Spy",
            "team": "evil",
            "icon": "spy",
            "icon-type": "svg",
            "description": "Unknown to spies"
        },
        {
            "id": "false-commander",
            "name": "False Commander",
            "team": "evil",
            "icon": "spy",
            "icon-type": "svg",
            "description": "Appears as Commander",
            "dependencies": ["commander", "body-guard"]
        },
        {
            "id": "deep-cover",
            "name": "Deep Cover Spy",
            "team": "evil",
            "icon": "spy",
            "icon-type": "svg",
            "description": "Unknown to Commander",
            "dependencies": ["commander"]
        },
    ],

    "script": `
        Everyone close your eyes and extend your hand into a fist in front of you. 

        * Spies,  

        {blind-spy} but not the Blind Spy,

        put your thumbs up and open your eyes. Look around so that you may know all of the agents of evil. 

        * You should see #{evilThumbsCount}.

        ***** 

        {!commander} Spies, lower your thumbs and close your eyes. *

        {commander && deep-cover}  Deep Cover Spy, close your eyes and lower your thumb. *
        {commander && deep-cover}  All other spies, 

        {commander && !deep-cover} Spies,

        {commander} close your eyes, but keep your thumbs up so that the Commander will know of you scum. *

        {commander && blind-spy} Blind Spy, put up your thumb and keep your eyes closed. *

        {commander} Commander, open your eyes and observe the dirty thumbs of the traitors.
        {commander} * You should see #{commanderThumbsCount}. 
        {commander} *****
        {commander} Spies, put your thumbs down. 
        {commander} * Commander, close your eyes.

        {body-guard} * Commander 
        {false-commander} , and False Commander
        {body-guard}, extend your thumb so that the Body Guard may know of you. 

        {body-guard && !false-commander} * Body Guard, open your eyes and observe your leader.  Protect him with your life.

        {body-guard && false-commander} * Body Guard, open your eyes and observe two thumbs. One of them is your leader, the other is a filthy imposter.

        {body-guard} ***

        {body-guard && !false-commander} Commander, put your thumb down. * 
        {body-guard && false-commander} Commander, and False Commander, put your thumbs down. * 
        {body-guard} Body Guard, close your eyes. * 

        All players should have their eyes closed and hands in a fist in front of them. Everyone, open your eyes. It is now time to play, The Resistance.
        `
};

export default resistance;


