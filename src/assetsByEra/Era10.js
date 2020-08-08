// The 10th era, corresponding roughly to the Atomic Age (~1945 to 1990)

import {addLog, softCap} from "../gameLogic.js";

export const resources10 = [
    ["Megacity","Civilization","A metropolitan area that encompasses tens of millions of people."],
    ["Low Earth Orbit","Earth Orbit","Orbit around Earth, below about 2000 km."],
    ["Medium Earth Orbit","Earth Orbit","Orbit around Earth, from 2000 km to geosynchronous orbit (~36000 km)"],
    ["Geosynchronous Orbit","Earth Orbit","About 36000 above Earth's surface, satellites here have an orbital period of 24 hours and can stay at a stationary point in the sky."],
    ["Exurb","Urbanization","Low density residential development, generally automobile-oriented."],
    ["Office Park","Urbanization","A large suburban development of office space."],
    ["Modern Skyscraper","Buildings","Post-World War II skyscrapers are typically built with steel or reinforced concrete frames. Examples include the Seven Sisters, the Seagram Building, the World Trade Center, and the Sears (Willis) Tower."],
    ["Space Station","Space Development","Early monolithic space stations include the Salyut and Almaz classes and Skylab. They were followed by Mir, the International Space Station, and the Tiangong series. More research and commercial stations may follow in the 2020s."],
    ["Titanium","Metals","Modern titanium production began in 1925 with the iodide process. It is a high value material for aerospace and transportation applications."],
    ["Rare Earth Elements","Metals","There are 17 elements that are classified as 'Rare Earth'. Aside from promethium, most are not particularly rare, but they are difficult to find in economical ore deposits."],
    ["Carbon Fiber","Composites","Carbon fibers are 5-10 micrometer thick fibers of mostly carbon. They are valuable in aerospace and high end textile applications, though expensive."],
    ["Silicon","Metals","Silicon is abundant in the Earth's crust and has been used in natural forms for thousands of years. The advent of silicon semiconducturs has inaugurated the Silicon Age."],
    ["Plutonium","Energy","Plutonium, atomic number 94, is found in trace quantities naturally. The first significant production occurred under the Manhattan Project."],
    ["Cermet","Composites","Cermets are composites of ceramics and metals. Development was spurred after World War II by the need for materials highly resistant to temperature and stress, particularly for jet engines."]
];

export const actions10 = [
    {
        "name":"Build Megacity",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Megacity"] += 1;
            addLog("Built 1 _Megacity_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Megacity"])},
        "canExecute":(rC) => rC["Multinational Federation"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Multinational Federation"],
        "info":(rC)=>{
            let message = ["Build a _Megacity_."];
            return message;
        }
    },
    {
        "name":"Explore Low Earth Orbit",
        "pane":"Earth Orbit",
        "effect":(modified, gameState) => {
            modified["Low Earth Orbit"] += 1;
            addLog("Explored 1 _Low Earth Orbit_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Low Earth Orbit"])},
        "canExecute":(rC, more) => rC["Multinational Federation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Multinational Federation"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Low Earth Orbit_."];
            return message;
        }
    },
    {
        "name":"Explore Medium Earth Orbit",
        "pane":"Earth Orbit",
        "effect":(modified, gameState) => {
            modified["Medium Earth Orbit"] += 1;
            addLog("Explored 1 _Medium Earth Orbit_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Medium Earth Orbit"])},
        "canExecute":(rC, more) => rC["Multinational Federation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Multinational Federation"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Medium Earth Orbit_."];
            return message;
        }
    },
    {
        "name":"Explore Geosynchronous Orbit",
        "pane":"Earth Orbit",
        "effect":(modified, gameState) => {
            modified["Geosynchronous Orbit"] += 1;
            addLog("Explored 1 _Geosynchronous Orbit_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Geosynchronous Orbit"])},
        "canExecute":(rC, more) => rC["Multinational Federation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Multinational Federation"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Geosynchronous Orbit_."];
            return message;
        }
    },
    {
        "name":"Build Exurb",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Exurb"] += 1;
            addLog("Built 1 _Exurb_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Exurb"])},
        "canExecute":(rC, more) => rC["Multinational Federation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Multinational Federation"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Exurb_."];
            return message;
        }
    },
    {
        "name":"Build Office Park",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Office Park"] += 1;
            addLog("Built 1 _Office Park_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Office Park"])},
        "canExecute":(rC, more) => rC["Multinational Federation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Multinational Federation"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Office Park_."];
            return message;
        }
    },
    {
        "name":"Build Modern Skyscraper",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Modern Skyscraper"] += 1;
            addLog("Built 1 _Modern Skyscraper_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Modern Skyscraper"])},
        "canExecute":(rC, more) => rC["Multinational Federation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Multinational Federation"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Modern Skyscraper_."];
            return message;
        }
    },
    {
        "name":"Build Space Station",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Space Station"] += 1;
            addLog("Built 1 _Space Station_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Space Station"])},
        "canExecute":(rC, more) => rC["Multinational Federation"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Multinational Federation"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Space Station_."];
            return message;
        }
    }
]
