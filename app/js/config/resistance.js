// http://www.redmeeple.com/site/images/Rules/The_Resistance_Avalon_Rules%28EN%29.pdf
var resistance = {

    "cardsCollection": [
        {
            "id": "commander",
            "name": "Commander",
            "team": "resistance",
            "description": "Knows spies, must remain hidden",
            "dependencies": ["assassin"]
        },
        {
            "id": "assassin",
            "name": "Assassin",
            "team": "spy",
            "dependencies": ["commander"]
        },
        {
            "id": "body-guard",
            "name": "Body Guard",
            "team": "resistance",
            "description": "Knows Commander",
            "dependencies": ["commander"]
        },
        {
            "id": "blind-spy",
            "name": "Blind Spy",
            "team": "spy",
            "description": "Unknown to spies"
        },
        {
            "id": "deep-cover",
            "name": "Deep Cover Spy",
            "team": "spy",
            "description": "Unknown to Commander",
            "dependencies": ["commander"]
        },
        {
            "id": "false-commander",
            "name": "False Commander",
            "team": "spy",
            "description": "Appears as Commander",
            "dependencies": ["commander", "body-guard"]
        }
    ],

    "script": `
        Everyone close your eyes and extend your hand into a fist in front of you. 

        * Spies,  

        {blind-spy} but not the Blind Spy,

        put your thumbs up and open your eyes. Look around so that you may know all of the agents of evil.

        ****** 

        Spies, lower your thumbs and close your eyes.

        ***

        {commander} Spies, 
        
        {deep-cover} but not the Deep Cover Spy,

        {commander} extend your thumbs so that the Commander will know of you scum. 
        {commander} * Commander, open your eyes and observe the dirty thumbs of the traitors.
        {commander} ****** Spies, put your thumbs down and re-form your hand into a fist. 
        {commander} * Commander, close your eyes.

        {body-guard} * Commander 
        {false-commander} and False Commander
        {body-guard}, extend your thumb so that the Body Guard may know of you. 

        {body-guard} * Body Guard, open your eyes and observe your leader.  Protect him with your life.

        {commander} ****

        {body-guard} Commander
        {false-commander} and False Commander
        {body-guard}, put your thumb down. * Body Guard, close your eyes. * 

        All players should have their eyes closed and hands in a fist in front of them. Everyone, open your eyes.
        `
};

export default resistance;


