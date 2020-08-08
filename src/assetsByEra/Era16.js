// The 16th era, starting FTL travel to far galaxies and going to breaking the cosmic horizon.

import {addLog, softCap} from "../gameLogic.js";

export const resources16 = [
    ["Distant Civilization","Civilization","A civilization beyond the cosmic horizon."],
    ["Virgo Supercluster","Home Supercluster","Space throughout the Virgo Supercluster."],
    ["Galaxy Group","Home Supercluster","A gravitationally bound aggregation of up to 50 galaxies. Smaller than a cluster, but still nothing to sneeze at."],
    ["Galaxy Cluster","Home Supercluster","A structure of hundreds or thousands of galaxies. Examples include the Virgo Cluster, Formax Cluster, Hercules Cluster, and Coma Cluster."],
    ["Supercluster","Observable Universe","Space throughout the Virgo Supercluster."],
    ["Void","Observable Universe","A relatively empty section of the observable universe. There are still some galaxies here, though."],
    ["Quasar","Observable Universe","A quasar (quasi-stellar object) is an extremely luminous active galactic nucleus."],
    ["Blazar","Observable Universe","An active galactic nuclear with an extremely bright relativistic jet of ionized matter."],
    ["Intercluster Civilization","Space Development","A daughter civilization beyond the home supercluster."],
    ["Neutronium","Exotic","Neutronium is a hypothetical material consisting of mostly neutrons or neutron-degenerate matter. It is extremely dense and composes the cores of neutron stars."],
    ["Magmatter","Exotic","Magmatter is a hypothetical form of matter composed of exotic particles such as monopoles."],
    ["Dark Matter","Exotic","Dark matter is hypothesized to exist due to observed gravitational effects that cannot be explained in terms of observed matter. It may have a range of distant future uses."],
    ["Mirror Matter","Exotic","Mirror matter is a speculated counterpart to ordinary matter. It would interact with ordinary matter only through the weak force and gravity."]
];

export const actions16 = [
    {
        "name":"Build Distant Civilization",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Distant Civilization"] += 1;
            addLog("Built 1 _Distant Civilization_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Distant Civilization"])},
        "canExecute":(rC) => rC["Intergalactic Empire"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Intergalactic Empire"],
        "info":(rC)=>{
            let message = ["Build a _Distant Civilization_."];
            return message;
        }
    },
    {
        "name":"Explore Virgo Supercluster",
        "pane":"Home Supercluster",
        "effect":(modified, gameState) => {
            modified["Virgo Supercluster"] += 1;
            addLog("Explored 1 _Virgo Supercluster_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Virgo Supercluster"])},
        "canExecute":(rC, more) => rC["Intergalactic Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Intergalactic Empire"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Virgo Supercluster_."];
            return message;
        }
    },
    {
        "name":"Explore Galaxy Group",
        "pane":"Home Supercluster",
        "effect":(modified, gameState) => {
            modified["Galaxy Group"] += 1;
            addLog("Explored 1 _Galaxy Group_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Galaxy Group"])},
        "canExecute":(rC, more) => rC["Intergalactic Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Intergalactic Empire"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Galaxy Group_."];
            return message;
        }
    },
    {
        "name":"Explore Galaxy Cluster",
        "pane":"Home Supercluster",
        "effect":(modified, gameState) => {
            modified["Galaxy Cluster"] += 1;
            addLog("Explored 1 _Galaxy Cluster_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Galaxy Cluster"])},
        "canExecute":(rC, more) => rC["Intergalactic Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Intergalactic Empire"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Galaxy Cluster_."];
            return message;
        }
    },
    {
        "name":"Explore Supercluster",
        "pane":"Observable Universe",
        "effect":(modified, gameState) => {
            modified["Supercluster"] += 1;
            addLog("Explored 1 _Supercluster_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Supercluster"])},
        "canExecute":(rC, more) => rC["Intergalactic Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Intergalactic Empire"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Supercluster_."];
            return message;
        }
    },
    {
        "name":"Explore Void",
        "pane":"Observable Universe",
        "effect":(modified, gameState) => {
            modified["Void"] += 1;
            addLog("Explored 1 _Void_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Void"])},
        "canExecute":(rC, more) => rC["Intergalactic Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Intergalactic Empire"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Void_."];
            return message;
        }
    },
    {
        "name":"Explore Quasar",
        "pane":"Observable Universe",
        "effect":(modified, gameState) => {
            modified["Quasar"] += 1;
            addLog("Explored 1 _Quasar_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Quasar"])},
        "canExecute":(rC, more) => rC["Intergalactic Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Intergalactic Empire"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Quasar_."];
            return message;
        }
    },
    {
        "name":"Explore Blazar",
        "pane":"Observable Universe",
        "effect":(modified, gameState) => {
            modified["Blazar"] += 1;
            addLog("Explored 1 _Blazar_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Blazar"])},
        "canExecute":(rC, more) => rC["Intergalactic Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Intergalactic Empire"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Blazar_."];
            return message;
        }
    },
    {
        "name":"Build Intercluster Civilization",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Intercluster Civilization"] += 1;
            addLog("Built 1 _Intercluster Civilization_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Intercluster Civilization"])},
        "canExecute":(rC, more) => rC["Intergalactic Empire"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Intergalactic Empire"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Intergalactic Empire_."];
            return message;
        }
    }
]
