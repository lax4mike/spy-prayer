
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
            "name": "Deep Cover",
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

        open your eyes and look around so that you may know all of the agents of evil.

        ****** 

        Spies, close your eyes.

        ***

        {commander} Spies, extend your thumbs so that the Commander will know of you scum. 
        {commander} * Commander, open your eyes and observe the dirty thumbs of the traitors.
        {commander} ****** Spies, put your thumbs down and re-form your hand into a fist. 
        {commander} * Commander, close your eyes.

        {body-guard} * Commander, extend your thumb so that the body guard may know of you. 
        {body-guard} * Body Guard, open your eyes and observe your leader.  Protect him with your life.

        {commander} ****

        {body-guard} Commander, put your thumb down. * Body Guard, close your eyes. * 

        All players should have their eyes closed and hands in a fist in front of them. Everyone, open your eyes.
        `
};

export default resistance;


