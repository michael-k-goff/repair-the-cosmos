// The 17th era, corresponding roughly to the Transcendent Era in Caveman 2 Cosmos.

import {addLog, softCap} from "../gameLogic.js";

export const resources17 = [
    ["Simulation Transcendence","Civilization","A civilization that transcends reality."],
    ["Distant Space","Local Cosmic Bubble","Space beyond the cosmic horizon and within the cosmic inflationary bubble."],
    ["Distant Past","Local Cosmic Bubble","Space existing far in the past."],
    ["Distant Future","Local Cosmic Bubble","Space existing far in the future."],
    ["Distant Bubble","Multiverse","Another pocket of non-inflating space at some unquantifiable distance."],
    ["Hyperspace","Multiverse","'Space' with more than three non-compact spatial dimensions."],
    ["Branespace","Multiverse","High dimensional space as predicted by brane cosmology."],
    ["Manifold","Multiverse","Some bizarre manifold."],
    ["Time Manifold","Multiverse","A manifold of space-time with multiple time dimensions."],
    ["Parallel Universe","Multiverse","A universe like ours but different somehow."],
    ["Subdimensional Universe","Multiverse","A parallel universe that exists on a sub-Planck scale."],
    ["Megaverse","Ultimate Ensemble","A physical structure that sits above the multiverse."],
    ["Alternate Reality","Ultimate Ensemble","An unknown place with very different physical properties."],
    ["High Dimensional City","Space Development","Three spatial dimensions are so 29th century."],
    ["Quantonium","Exotic","Quantonium is an unknown material hypothesized to be connected with higher dimensions."],
    ["Unobtanium","Exotic","You can't get it, but it has the properties you want."]
];

export const actions17 = [
    {
        "name":"Transcend Reality",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Simulation Transcendence"] += 1;
            addLog("Built 1 _Simulation Transcendence_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Simulation Transcendence"])},
        "canExecute":(rC) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Distant Civilization"],
        "info":(rC)=>{
            let message = ["Build a _Simulation Transcendence_."];
            return message;
        }
    },
    {
        "name":"Explore Distant Space",
        "pane":"Local Cosmic Bubble",
        "effect":(modified, gameState) => {
            modified["Distant Space"] += 1;
            addLog("Explored 1 _Distant Space_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Distant Space"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Distant Space_."];
            return message;
        }
    },
    {
        "name":"Explore Distant Past",
        "pane":"Local Cosmic Bubble",
        "effect":(modified, gameState) => {
            modified["Distant Past"] += 1;
            addLog("Explored 1 _Distant Past_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Distant Past"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Distant Past_."];
            return message;
        }
    },
    {
        "name":"Explore Distant Future",
        "pane":"Local Cosmic Bubble",
        "effect":(modified, gameState) => {
            modified["Distant Future"] += 1;
            addLog("Explored 1 _Distant Future_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Distant Future"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Distant Future_."];
            return message;
        }
    },
    {
        "name":"Explore Distant Bubble",
        "pane":"Multiverse",
        "effect":(modified, gameState) => {
            modified["Distant Bubble"] += 1;
            addLog("Explored 1 _Distant Bubble_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Distant Bubble"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Distant Bubble_."];
            return message;
        }
    },
    {
        "name":"Explore Hyperspace",
        "pane":"Multiverse",
        "effect":(modified, gameState) => {
            modified["Hyperspace"] += 1;
            addLog("Explored 1 _Hyperspace_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Hyperspace"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Hyperspace_."];
            return message;
        }
    },
    {
        "name":"Explore Branespace",
        "pane":"Multiverse",
        "effect":(modified, gameState) => {
            modified["Branespace"] += 1;
            addLog("Explored 1 _Branespace_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Branespace"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Branespace_."];
            return message;
        }
    },
    {
        "name":"Explore Manifold",
        "pane":"Multiverse",
        "effect":(modified, gameState) => {
            modified["Manifold"] += 1;
            addLog("Explored 1 _Manifold_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Manifold"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Manifold_."];
            return message;
        }
    },
    {
        "name":"Explore Time Manifold",
        "pane":"Multiverse",
        "effect":(modified, gameState) => {
            modified["Time Manifold"] += 1;
            addLog("Explored 1 _Time Manifold_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Time Manifold"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Time Manifold_."];
            return message;
        }
    },
    {
        "name":"Explore Parallel Universe",
        "pane":"Multiverse",
        "effect":(modified, gameState) => {
            modified["Parallel Universe"] += 1;
            addLog("Explored 1 _Parallel Universe_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Parallel Universe"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Parallel Universe_."];
            return message;
        }
    },
    {
        "name":"Explore Subdimensional Universe",
        "pane":"Multiverse",
        "effect":(modified, gameState) => {
            modified["Subdimensional Universe"] += 1;
            addLog("Explored 1 _Subdimensional Universe_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Subdimensional Universe"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Subdimensional Universe_."];
            return message;
        }
    },
    {
        "name":"Explore Megaverse",
        "pane":"Ultimate Ensemble",
        "effect":(modified, gameState) => {
            modified["Megaverse"] += 1;
            addLog("Explored 1 _Megaverse_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Megaverse"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Megaverse_."];
            return message;
        }
    },
    {
        "name":"Explore Alternate Reality",
        "pane":"Ultimate Ensemble",
        "effect":(modified, gameState) => {
            modified["Alternate Reality"] += 1;
            addLog("Explored 1 _Alternate Reality_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Alternate Reality"])},
        "canExecute":(rC, more) => rC["Distant Civilization"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Distant Civilization"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Alternate Reality_."];
            return message;
        }
    },
    {
        "name":"Build High Dimensional City",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["High Dimensional City"] += 1;
            addLog("Built 1 _High Dimensional City_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["High Dimensional City"])},
        "canExecute":(rC, more) => rC["Dyson Sphere"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Dyson Sphere"]>=1,
        "info":(rC)=>{
            let message = ["Build a _High Dimensional City_."];
            return message;
        }
    }
]
