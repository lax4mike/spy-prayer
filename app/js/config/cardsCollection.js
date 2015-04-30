
var cardsCollection = [
    {
        "id": "commander",
        "name": "Commander",
        "team": "Resistance",
        "description": "Knows spies, must remain hidden",
        "dependencies": ["assassin"]
    },
    {
        "id": "assassin",
        "name": "Assassin",
        "team": "Spy",
        "dependencies": ["commander"]
    },
    {
        "id": "body-guard",
        "name": "Body Guard",
        "team": "Resistance",
        "description": "Knows Commander",
        "dependencies": ["commander"]
    },
    {
        "id": "blind-spy",
        "name": "Blind Spy",
        "team": "Spy",
        "description": "Unknown to spies"
    },
    {
        "id": "deep-cover",
        "name": "Deep Cover",
        "team": "Spy",
        "description": "Unknown to Commander",
        "dependencies": ["commander"]
    },
    {
        "id": "false-commander",
        "name": "False Commander",
        "team": "Spy",
        "description": "Appears as Commander",
        "dependencies": ["commander", "body-guard"]
    }
];

export default cardsCollection;

