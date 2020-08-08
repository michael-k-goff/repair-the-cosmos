// The sixth era, corresponding roughly to the Middle Ages (~AD 500 to AD 1300)

import {addLog, softCap} from "../gameLogic.js";

export const resources06 = [
    ["Duchy","Civilization","A country ruled by a duke or duchess."],
    ["Marsh","Home Continent","A marsh is a wetland dominated by herbacious plant species."],
    ["Mountain Peak","Home Continent","It wasn't easy reaching the top."],
    ["Vassal State","Politics","A vassal state is not formally part of your empire but under your control."],
    ["Peat","Energy","Peat is a natural accumulation of partially decayed organic matter."],
    ["Coal","Energy","The usage of coal for smithing began in the High Middle Ages."],
    ["Crucible Steel","Composites","Production dates to the 9th or 10th century AD. It is formed by slowly heating and cooling pure iron and carbon (typically in the form of charcoal) in a crucible."],
    ["Saltpeter","Minerals","Saltpeter was necessary in making gunpowder and fertilizers."],
    ["Potash","Minerals","Potash has been used since AD 500 for bleaching textiles and making soap and glass."]
];

export const actions06 = [
    {
        "name":"Build Duchy",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Duchy"] += 1;
            addLog("Built 1 _Duchy_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Duchy"])},
        "canExecute":(rC) => rC["Principality"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Principality"],
        "info":(rC)=>{
            let message = ["Build a _Duchy_."];
            return message;
        }
    },
    {
        "name":"Explore Marsh",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Marsh"] += 1;
            addLog("Explored 1 _Marsh_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Marsh"])},
        "canExecute":(rC, more) => rC["Principality"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Principality"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Marsh_."];
            return message;
        }
    },
    {
        "name":"Explore Mountain Peak",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Mountain Peak"] += 1;
            addLog("Explored 1 _Mountain Peak_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Mountain Peak"])},
        "canExecute":(rC, more) => rC["Principality"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Principality"]>=1,
        "info":(rC)=>{
            let message = ["Explore a _Mountain Peak_."];
            return message;
        }
    },
    {
        "name":"Control Vassal State",
        "pane":"Politics",
        "effect":(modified, gameState) => {
            modified["Vassal State"] += 1;
            addLog("Gained 1 _Vassal State_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Vassal State"])},
        "canExecute":(rC, more) => rC["Principality"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Principality"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Vassal State_."];
            return message;
        }
    }
]
