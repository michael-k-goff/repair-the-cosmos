// The 15th era, starting with Dyson sphere and going up through nearby galaxies.

import {addLog, softCap} from "../gameLogic.js";

export const resources15 = [
    ["Intergalactic Empire","Civilization","A unified empires that spans galaxies."],
    ["Orion Arm","Galactic Space","The Orion Arm is our sector of the Milky Way galaxy."],
    ["Milky Way","Galactic Space","Space throughout the galaxy."],
    ["Black Hole","Galactic Space","Beyond the event horizon of a black hole, nothing can escape."],
    ["Neutron Star","Galactic Space","Ultradense remnants of a large star that has exploded."],
    ["White Dwarf","Galactic Space","Remnants of a nova."],
    ["Star Cluster","Galactic Space","A dense region of gravitationally bound stars."],
    ["Nebula","Galactic Space","The remains of a supernova."],
    ["Blue Supergiant","Galactic Space","One of the largest, brightest, and hottest types of stars there is."],
    ["Galactic Core","Galactic Space","The core of the Milky Way galaxy. A supermassive black hole lurks here."],
    ["Intergalactic Space","Local Group","Space between galaxies. There are a few stars here."],
    ["Dwarf Galaxy","Local Group","A small galaxy. Small is relative."],
    ["Elliptical Galaxy","Local Group","Has an ellipsoidal shape."],
    ["Spiral Galaxy","Local Group","Has a spiral shape, like the Milky Way."],
    ["Galactic Core Base","Space Development","An outpost near the core of the Milky Way."],
    ["Artificial Planet","Space Development","A habitable planet built from raw materials."],
    ["Intergalactic Civilization","Space Development","A daughter civilization outside of the home galaxy."],
    ["AB Matter","Exotic","AB Matter is a hypothetical form of matter with complex structure formed from nucleons rather than atoms."],
    ["Computronium","Building Materials","Computronium is a hypothesized form of programmable matter."]
];

export const actions15 = [
    {
        "name":"Build Intergalactic Empire",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Intergalactic Empire"] += 1;
            addLog("Built 1 _Intergalctic Empire_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Intergalactic Empire"])},
        "canExecute":(rC) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Dyson Sphere"],
        "info":(rC)=>{
            let message = ["Build an _Intergalactic Empire_."];
            return message;
        }
    },
    {
        "name":"Explore Orion Arm",
        "pane":"Galactic Space",
        "effect":(modified, gameState) => {
            modified["Orion Arm"] += 1;
            addLog("Explored 1 _Orion Arm_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Orion Arm"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Orion Arm_."];
            return message;
        }
    },
    {
        "name":"Explore Milky Way",
        "pane":"Galactic Space",
        "effect":(modified, gameState) => {
            modified["Milky Way"] += 1;
            addLog("Explored 1 _Milky Way_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Milky Way"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Milky Way_."];
            return message;
        }
    },
    {
        "name":"Explore Black Hole",
        "pane":"Galactic Space",
        "effect":(modified, gameState) => {
            modified["Black Hole"] += 1;
            addLog("Explored 1 _Black Hole_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Black Hole"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Black Hole_."];
            return message;
        }
    },
    {
        "name":"Explore Neutron Star",
        "pane":"Galactic Space",
        "effect":(modified, gameState) => {
            modified["Neutron Star"] += 1;
            addLog("Explored 1 _Neutron Star_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Neutron Star"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Neutron Star_."];
            return message;
        }
    },
    {
        "name":"Explore White Dwarf",
        "pane":"Galactic Space",
        "effect":(modified, gameState) => {
            modified["White Dwarf"] += 1;
            addLog("Explored 1 _White Dwarf_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["White Dwarf"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _White Dwarf_."];
            return message;
        }
    },
    {
        "name":"Explore Star Cluster",
        "pane":"Galactic Space",
        "effect":(modified, gameState) => {
            modified["Star Cluster"] += 1;
            addLog("Explored 1 _Star Cluster_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Star Cluster"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Star Cluster_."];
            return message;
        }
    },
    {
        "name":"Explore Nebula",
        "pane":"Galactic Space",
        "effect":(modified, gameState) => {
            modified["Nebula"] += 1;
            addLog("Explored 1 _Nebula_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Nebula"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Nebula_."];
            return message;
        }
    },
    {
        "name":"Explore Blue Supergiant",
        "pane":"Galactic Space",
        "effect":(modified, gameState) => {
            modified["Blue Supergiant"] += 1;
            addLog("Explored 1 _Blue Supergiant_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Blue Supergiant"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Blue Supergiant_."];
            return message;
        }
    },
    {
        "name":"Explore Galactic Core",
        "pane":"Galactic Space",
        "effect":(modified, gameState) => {
            modified["Galactic Core"] += 1;
            addLog("Explored 1 _Galactic Core_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Galactic Core"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Galactic Core_."];
            return message;
        }
    },
    {
        "name":"Explore Intergalactic Space",
        "pane":"Local Group",
        "effect":(modified, gameState) => {
            modified["Intergalactic Space"] += 1;
            addLog("Explored 1 _Intergalactic Space_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Intergalactic Space"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Intergalactic Space_."];
            return message;
        }
    },
    {
        "name":"Explore Dwarf Galaxy",
        "pane":"Local Group",
        "effect":(modified, gameState) => {
            modified["Dwarf Galaxy"] += 1;
            addLog("Explored 1 _Dwarf Galaxy_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Dwarf Galaxy"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Dwarf Galaxy_."];
            return message;
        }
    },
    {
        "name":"Explore Elliptical Galaxy",
        "pane":"Local Group",
        "effect":(modified, gameState) => {
            modified["Elliptical Galaxy"] += 1;
            addLog("Explored 1 _Elliptical Galaxy_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Elliptical Galaxy"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Elliptical Galaxy_."];
            return message;
        }
    },
    {
        "name":"Explore Spiral Galaxy",
        "pane":"Local Group",
        "effect":(modified, gameState) => {
            modified["Spiral Galaxy"] += 1;
            addLog("Explored 1 _Spiral Galaxy_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Spiral Galaxy"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Spiral Galaxy_."];
            return message;
        }
    },
    {
        "name":"Build Galctic Core Base",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Galactic Core Base"] += 1;
            addLog("Built 1 _Galactic Core Base_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Galactic Core Base"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Galactic Core Base_."];
            return message;
        }
    },
    {
        "name":"Build Artificial Planet",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Artificial Planet"] += 1;
            addLog("Built 1 _Artificial Planet_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Artificial Planet"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Artificial Planet_."];
            return message;
        }
    },
    {
        "name":"Build Intergalactic Civilization",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Intergalactic Civilization"] += 1;
            addLog("Built 1 _Intergalactic Civilization_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Intergalactic Civilization"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Intergalactic Civilization_."];
            return message;
        }
    }
]
