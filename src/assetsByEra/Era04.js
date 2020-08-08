// The fourth era, corresponding roughly to the Bronze Age (~4000 BC to 1000 BC)

import {addLog, softCap} from "../gameLogic.js";

export const resources04 = [
    ["Empire","Civilization","An empire, consisting of multiple distinct cultures. The main goal for Era 4."],
    ["Lake","Home Continent","A small, easily navigable lake."],
    ["Archipelago","Home Continent","A sequence of islands that are separated by short voyages."],
    ["Oasis","Home Continent","A good spot for a settlement in the middle of the desert."],
    ["Town","Urbanization","A small town, not far from a larger city."],
    ["Village","Urbanization","A mostly agricultural village."],
    ["Hamlet","Urbanization","A small village, little more than a few families."],
    ["Tin","Metals","The use of tin goes back to about 3000 BC, primary in bronze."],
    ["Bronze","Composites","The discovery of bronze allowed harder and more durable metal objects than previously possible."],
    ["Iron","Metals","Meteoric iron was in use by 3500 BC, but the smelting of iron was developed by the Hittites around 1500-1200 BC, inaugurating the Iron Age."],
    ["Lead","Metals","Lead deposits were worked in Asia Minor from 3000 BC, though lead was in use before then."],
    ["Brass","Composites","Brass is a composite of copper and zinc."],
    ["Glass","Composites","Glass-making is known from 3600 BC, probably first for beads."],
    ["Diamond","Minerals","A rigid allotrope of carbon."],
    ["Wax","Organic Materials","Wax is used for candles, wood coating, and other purposes."],
    ["Cacao","Food Commodities","The cacao tree is native to the Amazon basin. Consumption goes as far back as the Olmeca civilization."],
    ["Spices","Food Commodities","The spice trade was developed in the Indian subcontinent and Middle East by as early as 2000 BC. Spices are used for flavoring and coloring food and for perfume, medicine, cosmetics, and ritual functions."],
    ["Zinc","Metals","Zinc is needed to make brass."],
    ["Tobacco","Food Commodities","Cultivation of tobacco goes back to Mexico around 1400-1000 BC."],
    ["Silver","Metals","The origins of human usage of silver are unknown. Usage became widespread with the invention of cupellation, to separate silver from lead ore, in the 4th millennium BC."],
    ["Gold","Metals","Trace amounts of gold are found in Paleolithic caves. Smelting began in the 4th millennium BC."],
    ["Dye","Organic Materials","The usage of dye to color clothing dates to the Neolithic, possibly earlier. Natural dyes are typically sourced from plants, especially roots, berries, bark, leaves, and wood, and to a lesser extent from animal and mineral sources. The first synthetic dye, mauve, was invented in 1856."],
    ["Leather","Refined Organic Materials","Leather is obtained from tanning animal rawhide or skins, especially cattle."],
    ["Brick","Building Materials","Bricks are the building blocks of masonry construction, traditionally composed of fired clay."]
];

export const actions04 = [
    {
        "name":"Build Empire",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Empire"] += 1;
            addLog("Built 1 _Empire_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Empire"])},
        "canExecute":(rC) => rC["City"] >= 1,
        "visible":(rC,more) => more.actionCount["Build a City"],
        "info":(rC)=>{
            let message = ["Build an _Empire_."];
            return message;
        }
    },
    {
        "name":"Explore Lake",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Lake"] += 1;
            addLog("Explored 1 _Lake_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Lake"])},
        "canExecute":(rC, more) => rC["City"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build a City"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Lake_."];
            return message;
        }
    },
    {
        "name":"Explore Archipelago",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Archipelago"] += 1;
            addLog("Explored 1 _Archipelago_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Archipelago"])},
        "canExecute":(rC, more) => rC["City"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build a City"]>=1,
        "info":(rC)=>{
            let message = ["Explore an _Archipelago_."];
            return message;
        }
    },
    {
        "name":"Explore Oasis",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Oasis"] += 1;
            addLog("Explored 1 _Oasis_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Oasis"])},
        "canExecute":(rC, more) => rC["City"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build a City"]>=1,
        "info":(rC)=>{
            let message = ["Explore an _Oasis_."];
            return message;
        }
    },
    {
        "name":"Build Town",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Town"] += 1;
            addLog("Built 1 _Town_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Town"])},
        "canExecute":(rC, more) => rC["City"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build a City"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Town_."];
            return message;
        }
    },
    {
        "name":"Build Village",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Village"] += 1;
            addLog("Built 1 _Village_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Village"])},
        "canExecute":(rC, more) => rC["City"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build a City"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Village_."];
            return message;
        }
    },
    {
        "name":"Build Hamlet",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Hamlet"] += 1;
            addLog("Built 1 _Hamlet_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Hamlet"])},
        "canExecute":(rC, more) => rC["City"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build a City"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Hamlet_."];
            return message;
        }
    }
]
