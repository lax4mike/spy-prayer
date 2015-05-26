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

        Spies,  

        {blind-spy} but not the Blind Spy,

        put your thumbs up and open your eyes. Look around so that you may know all of the agents of evil. 

        You should see #{evilThumbsCount}.

        ***

        {!commander} Spies, lower your thumbs and close your eyes.


        {commander && deep-cover && !blind-spy}  Deep Cover Spy, close your eyes and lower your thumb. All other Spies, close your eyes, but keep your thumbs up

        {commander && !deep-cover && blind-spy} Everyone close your eyes. Spies, including the Blind Spy, put your thumb up
 
        {commander && deep-cover && blind-spy} Everyone close your eyes and lower your thumbs.  Spies, including the Blind Spy, but not the Deep Cover Spy, put your thumb up

        {commander && !deep-cover && !blind-spy} Spies, close your eyes, but keep your thumbs up

        {commander} so that the Commander may know of you scum.


        {commander} Commander, open your eyes and observe the dirty thumbs of the traitors.
        {commander} You should see #{commanderThumbsCount}. 
        
        {commander} ***

        {commander} Spies, put your thumbs down. 
        {commander} Commander, close your eyes.

        {body-guard} Commander, 
        {false-commander}  and the False Commander,
        {body-guard} extend your thumb so that the Body Guard may know of you. 


        {body-guard && !false-commander} * Body Guard, open your eyes and observe your leader.  Protect him with your life.

        {body-guard && false-commander} Body Guard, open your eyes and observe two thumbs. One of them is your leader, the other is a filthy imposter.

        {body-guard} ***

        {body-guard && !false-commander} Commander, put your thumb down.
        {body-guard && false-commander}  Commander, and the False Commander, put your thumbs down.

        {body-guard} Body Guard, close your eyes.

        All players should have their eyes closed and hands in a fist in front of them. Everyone, open your eyes. It is now time to play, The Resistance.
        `
};

export default resistance;


