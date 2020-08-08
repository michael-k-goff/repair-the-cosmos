// The seventh era, corresponding roughly to the Early Modern era (~1300 to 1700)

import {addLog, softCap} from "../gameLogic.js";

export const resources07 = [
    ["Nation","Civilization","A modern nation-state."],
    ["Ocean","New World","Open ocean."],
    ["Boreal Forest","New World","Also called Taiga, a forest dominated by coniferous species. Located in the far North."],
    ["Tropical Island","New World","A small, remote island near the equator."],
    ["Plains","New World","Wide open, New World plains."],
    ["Swamp","New World","A forested wetland."],
    ["Colony","Politics","A territory under your direct control but not considered part of the home territory. Here a colony is specifically one in the New World."],
    ["Ghetto","Urbanization","A section of a city that is reserved for ethnic or religious minorities."],
    ["Coffee","Food Commodities","Coffee drinking goes back to the 15th century. Could there have been an Industrial Revolution without coffee? I don't think so."]
];

export const actions07 = [
    {
        "name":"Build Nation",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Nation"] += 1;
            addLog("Built 1 _Nation_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Nation"])},
        "canExecute":(rC) => rC["Duchy"]>=1,
        "visible":(rC,more) => more.actionCount["Build Duchy"],
        "info":(rC)=>{
            let message = ["Build a _Nation_."];
            return message;
        }
    },
    {
        "name":"Explore Ocean",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Ocean"] += 1;
            addLog("Explored 1 _Ocean_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Ocean"])},
        "canExecute":(rC, more) => rC["Duchy"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Duchy"]>=1,
        "info":(rC)=>{
            let message = ["Explore an _Ocean_."];
            return message;
        }
    },
    {
        "name":"Explore Boreal Forest",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Boreal Forest"] += 1;
            addLog("Explored 1 _Boreal Forest_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Boreal Forest"])},
        "canExecute":(rC, more) => rC["Duchy"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Duchy"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Boreal Forest_."];
            return message;
        }
    },
    {
        "name":"Explore Tropical Island",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Tropical Island"] += 1;
            addLog("Explored 1 _Tropical Island_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Tropical Island"])},
        "canExecute":(rC, more) => rC["Duchy"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Duchy"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Tropical Island_."];
            return message;
        }
    },
    {
        "name":"Explore Plains",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Plains"] += 1;
            addLog("Explored 1 _Plains_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Plains"])},
        "canExecute":(rC, more) => rC["Duchy"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Duchy"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Plains_."];
            return message;
        }
    },
    {
        "name":"Explore Swamp",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Swamp"] += 1;
            addLog("Explored 1 _Swamp_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Swamp"])},
        "canExecute":(rC, more) => rC["Duchy"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Duchy"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Swamp_."];
            return message;
        }
    },
    {
        "name":"Build Colony",
        "pane":"Politics",
        "effect":(modified, gameState) => {
            modified["Colony"] += 1;
            addLog("Built 1 _Colony_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Colony"])},
        "canExecute":(rC, more) => rC["Duchy"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Duchy"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Colony_."];
            return message;
        }
    },
    {
        "name":"Establish Ghetto",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Ghetto"] += 1;
            addLog("Established 1 _Ghetto_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Ghetto"])},
        "canExecute":(rC, more) => rC["Duchy"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Duchy"]>=1,
        "info":(rC)=>{
            let message = ["Establish a _Ghetto_."];
            return message;
        }
    }
]
