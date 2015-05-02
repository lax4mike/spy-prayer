
var resistance = {

    cardsCollection: [
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

    script: [
        {
            "text": "Everyone close your eyes and extend your hand into a fist in front of you. Spys, open your eyes and look around so that you may know know all agents of evil."
        },
        {
            "text": "Spys, close your eyes."
        },
        {
            "text": "Spys, extend your thumbs so that the Commander will know of you scum. Commander, open your eyes and see the agents of evil.",
            "dependencies": ["commander"]
        },
        {
            "text": "Spys, put your thumbs down and reform your hand into a fist. Commander, close your eyes.",
            "dependencies": ["commander"]
        },
        {
            "text": "Commander, extend your thumb.  Body Guard, open your eyes and observe your leader.  Protect him with you life.",
            "dependencies": ["commander", "body-guard"]
        },
        {
            "text": "Commander, put your thumb down.  Body Guard, close your eyes.",
            "dependencies": ["commander", "body-guard"]
        },
        {
            "text": "All players should have their eyes closed and hands in a fist in front of them. Everyone, open your eyes."
        }
    ] 
};

export default resistance;


