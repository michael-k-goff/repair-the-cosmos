// The fifth era, corresponding roughly to the Classical Age (~1000 BC to AD 500)

import {addLog, softCap} from "../gameLogic.js";

export const resources05 = [
    ["Principality","Civilization","A monarchical feudatory state."],
    ["Sea","Home Continent","A small, easily navigable lake."],
    ["Imperial Capital","Urbanization","A large city that serves as the seat of empire."],
    ["City State","Urbanization","A city that is politically independent."],
    ["Damascus Steel","Composites","Damascus Steel, also known as Wootz Steel, originated in southern India around the 6th century BC."],
    ["Sapphire","Minerals","Consists of aluminum oxide and trace amounts of other elements."],
    ["Ruby","Minerals","A pink or red gemstone, a variety of corundum (aluminum oxide)."],
    ["Concrete","Minerals","The Romans used concrete extensively, leading to an architectural revolution. Pyroclastic rock and ash contribute to the durability of Roman concrete."],
    ["Cement","Minerals","Cement is the binder used to make concrete, or with finer aggregate, mortar for masonry."],
    ["Marble","Minerals","Marble is a prize material for sculptures and fine architecture."],
    ["Paper","Refined Organic Materials","The invention of paper is attributed to Cai Lun in the 2nd century."],
    ["Tea","Food Commodities","Tea drinking goes back to Han China."],
    ["Platinum","Metals","The earliest platinum working is associated with the La Tolita Culture in South America, 600 BC to AD 200."],
    ["Pumice","Minerals","Pumice is a course textured, highly porous volcanic rock. Uses include traditioanl medicine, concrete, horticulture, and abrasive materials."]
];

export const actions05 = [
    {
        "name":"Build Principality",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Principality"] += 1;
            addLog("Built 1 _Principality_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Principality"])},
        "canExecute":(rC) => rC["Empire"]>=1,
        "visible":(rC,more) => more.actionCount["Build Empire"],
        "info":(rC)=>{
            let message = ["Build a _Principality_."];
            return message;
        }
    },
    {
        "name":"Explore Sea",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Sea"] += 1;
            addLog("Explored 1 _Sea_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Sea"])},
        "canExecute":(rC, more) => rC["Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Empire"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Sea_."];
            return message;
        }
    },
    {
        "name":"Build Imperial Capital",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Imperial Capital"] += 1;
            addLog("Built 1 _Imperial Capital_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Imperial Capital"])},
        "canExecute":(rC, more) => rC["Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Empire"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Imperial Capital_."];
            return message;
        }
    },
    {
        "name":"Build City State",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["City State"] += 1;
            addLog("Built 1 _City State_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["City State"])},
        "canExecute":(rC, more) => rC["Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Empire"]>=1,
        "info":(rC)=>{
            let message = ["Build a _City State_."];
            return message;
        }
    }
]
