// The eight era, corresponding roughly to the Industrial Age (~1700 to 1870)

import {addLog, softCap} from "../gameLogic.js";

export const resources08 = [
    ["Metropolis","Civilization","A modern metropolis."],
    ["Arctic","New World","Defined as the Northern region where there is midnight sun and polar night."],
    ["Rain Forest","New World","New World jungle."],
    ["Peatland","New World","Also called a mire or quagmire. Arises from incomplete decomposition of organic matter."],
    ["Salt Flat","New World","Flat terrain covered with salt. I like self-explanatory names."],
    ["Barren Land","New World","Land with little to no vegetation."],
    ["Permafrost","New World","Land with permanently frozen ground."],
    ["Dunes","New World","Large mass of wind-blown sand."],
    ["Company Town","Urbanization","A town owned and run by a company. Typically for location-dependent facilities such as early factories, mines, etc. before fast transportation was developed."],
    ["Crude Oil","Energy","Natural deposits of petroleum have been used since ancient times. Modern drilling began in 1859 with Edwin Drake's well."],
    ["Natural Gas","Energy","Distribution of municipal natural gas began in 1836 in Philadelphia."],
    ["Lithium","Metals","Petalite, an ore from which lithium was produced, was discovered in 1800. Uses include lithium greases for aircraft, thermonuclear weapons, and aluminum smelting. Batteries are a major emerging application."],
    ["Cobalt","Metals","Cobalt has been used to color glass since the Bronze Age, but the element was discovered in 1735 by Georg Brandt. Cobalt gain new importance for energy storage."],
    ["Magnesium","Metals","Magnesium has widespread application in aerospace and metallurgy."],
    ["Manganese","Metals","Manganese has been used to produce chlorine since the mid 18th century."],
    ["Steel","Composites","Modern steelmaking began with the Bessemer process in 1855. It is a foundational invention of the Industrial Revolution."],
    ["Graphite","Minerals","Graphite has been in use since ancient times, but use expanded greatly in the 19th century. Today graphite has several important industrial uses."],
    ["Nickel","Metals","Large-scale smelting of nickel began in 1848. Nickel is used primary in stainless steel and in other alloys."],
    ["Rubber","Organic Materials","South America was the main source of rubber in the 19th century. Additional cultivation occured in the Congo Free State, India, Singapore, and Malaysia."]
];

export const actions08 = [
    {
        "name":"Build Metropolis",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Metropolis"] += 1;
            addLog("Built 1 _Metropolis_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Metropolis"])},
        "canExecute":(rC) => rC["Nation"]>=1,
        "visible":(rC,more) => more.actionCount["Build Nation"],
        "info":(rC)=>{
            let message = ["Build a _Metropolis_."];
            return message;
        }
    },
    {
        "name":"Explore Arctic",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Arctic"] += 1;
            addLog("Explored 1 _Arctic_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Arctic"])},
        "canExecute":(rC, more) => rC["Nation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Nation"]>=1,
        "info":(rC)=>{
            let message = ["Explore an _Arctic_."];
            return message;
        }
    },
    {
        "name":"Explore Rain Forest",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Rain Forest"] += 1;
            addLog("Explored 1 _Rain Forest_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Rain Forest"])},
        "canExecute":(rC, more) => rC["Nation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Nation"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Rain Forest_."];
            return message;
        }
    },
    {
        "name":"Explore Peatland",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Peatland"] += 1;
            addLog("Explored 1 _Peatland_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Peatland"])},
        "canExecute":(rC, more) => rC["Nation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Nation"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Peatland_."];
            return message;
        }
    },
    {
        "name":"Explore Salt Flat",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Salt Flat"] += 1;
            addLog("Explored 1 _Salt Flat_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Salt Flat"])},
        "canExecute":(rC, more) => rC["Nation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Nation"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Salt Flat_."];
            return message;
        }
    },
    {
        "name":"Explore Barren Land",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Barren Land"] += 1;
            addLog("Explored 1 _Barren Land_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Barren Land"])},
        "canExecute":(rC, more) => rC["Nation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Nation"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Barren Land_."];
            return message;
        }
    },
    {
        "name":"Explore Permafrost",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Permafrost"] += 1;
            addLog("Explored 1 _Permafrost_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Permafrost"])},
        "canExecute":(rC, more) => rC["Nation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Nation"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Permafrost_."];
            return message;
        }
    },
    {
        "name":"Explore Dunes",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Dunes"] += 1;
            addLog("Explored 1 _Dunes_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Dunes"])},
        "canExecute":(rC, more) => rC["Nation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Nation"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Dunes_."];
            return message;
        }
    },
    {
        "name":"Build Company Town",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Company Town"] += 1;
            addLog("Built 1 _Company Town_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Company Town"])},
        "canExecute":(rC, more) => rC["Nation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Nation"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Company Town_."];
            return message;
        }
    }
]
