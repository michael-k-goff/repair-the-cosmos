// The 12th era, corresponding roughly to the Nanotech Age in Caveman to Cosmos (~2050 to 2150)

import {addLog, softCap} from "../gameLogic.js";

export const resources12 = [
    ["Deep Space Colony","Civilization","A rotating habitat in orbit around the Sun."],
    ["Martian Planum","Mars","Flat region on Mars."],
    ["Martian Mountain","Mars","A mountain on Mars."],
    ["Martian Mare","Mars","Mares were once thought to be seas."],
    ["Martian Crater","Mars","An impact crater on Mars."],
    ["Martian Canyon","Mars","A canyon on Mars. Valles Marineris is the largest canyon system in the Solar System and might be a good colonization target."],
    ["Martian Pole","Mars","Polar regions on Mars."],
    ["Venus Clouds","Venus","Clouds in the upper region of Venus."],
    ["Megatower","Buildings","A skyscraper that is at least 1000 meters tall. It may, though not necessarily, be built with materials that are yet to come into widespread architectural usage, such as carbon nanotubes."],
    ["Ocean City","Urbanization","A city built on modular floating platforms that can traverse the oceans freely. The Seasteading Institute is one organization attempting to develop such projects."],
    ["Lunar Colony","Space Development","A city on the Moon. The colony houses a permanent population."],
    ["Martian Colony","Space Development","A city on Mars."],
    ["Venus Floating City","Space Development","A city that is suspended by buoyancy in the upper atmosphere of Venus."],
    ["Arcology","Urbanization","An arcology is a large, dense, mostly self-contained urban megastructure. No arcologies, as envisioned by the concept original Paolo Soleri, exist today, but some develoments such as the Las Vegas Strip, McMurdo Station, and Arcosanti show arcology features."],
    ["Helium-3","Energy","Helium-3 is an isotope of helium with one neutron. It is of potential interest for aneutronic fusion."],
    ["Diamond Nanothreads","Nanotechnology","Diamond or carbon nanothreads are an allotrope of carbon. Their strength might make them suitable for building a space elevator."],
    ["Nanotrusses","Building Materials","Nanotrusses are materials that are extremely light, strong, flexible, and durable. They may eventually be used as building material."]
];

export const actions12 = [
    {
        "name":"Build Deep Space Colony",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Deep Space Colony"] += 1;
            addLog("Built 1 _Deep Space Colony_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Deep Space Colony"])},
        "canExecute":(rC) => rC["Space Colony"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Space Colony"],
        "info":(rC)=>{
            let message = ["Build a _Deep Space Colony_."];
            return message;
        }
    },
    {
        "name":"Explore Martian Planum",
        "pane":"Mars",
        "effect":(modified, gameState) => {
            modified["Martian Planum"] += 1;
            addLog("Explored 1 _Martian Planum_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Martian Planum"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Martian Planum_."];
            return message;
        }
    },
    {
        "name":"Explore Martian Mountain",
        "pane":"Mars",
        "effect":(modified, gameState) => {
            modified["Martian Mountain"] += 1;
            addLog("Explored 1 _Martian Mountain_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Martian Mountain"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Martian Mountain_."];
            return message;
        }
    },
    {
        "name":"Explore Martian Mare",
        "pane":"Mars",
        "effect":(modified, gameState) => {
            modified["Martian Mare"] += 1;
            addLog("Explored 1 _Martian Mare_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Martian Mare"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Martian Mare_."];
            return message;
        }
    },
    {
        "name":"Explore Martian Crater",
        "pane":"Mars",
        "effect":(modified, gameState) => {
            modified["Martian Crater"] += 1;
            addLog("Explored 1 _Martian Crater_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Martian Crater"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Martian Crater_."];
            return message;
        }
    },
    {
        "name":"Explore Martian Canyon",
        "pane":"Mars",
        "effect":(modified, gameState) => {
            modified["Martian Canyon"] += 1;
            addLog("Explored 1 _Martian Canyon_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Martian Canyon"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Martian Canyon_."];
            return message;
        }
    },
    {
        "name":"Explore Martian Pole",
        "pane":"Mars",
        "effect":(modified, gameState) => {
            modified["Martian Pole"] += 1;
            addLog("Explored 1 _Martian Pole_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Martian Pole"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Martian Pole_."];
            return message;
        }
    },
    {
        "name":"Explore Venus Clouds",
        "pane":"Venus",
        "effect":(modified, gameState) => {
            modified["Venus Clouds"] += 1;
            addLog("Explored 1 _Venus Clouds_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Venus Clouds"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Venus Clouds_."];
            return message;
        }
    },
    {
        "name":"Build Megatower",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Megatower"] += 1;
            addLog("Built 1 _Megatower_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Megatower"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Megatower_."];
            return message;
        }
    },
    {
        "name":"Build Ocean City",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Ocean City"] += 1;
            addLog("Built 1 _Ocean City_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Ocean City"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Ocean City_."];
            return message;
        }
    },
    {
        "name":"Build Lunar Colony",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Lunar Colony"] += 1;
            addLog("Built 1 _Lunar Colony_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Lunar Colony"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Lunar Colony_."];
            return message;
        }
    },
    {
        "name":"Build Martian Colony",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Martian Colony"] += 1;
            addLog("Built 1 _Martian Colony_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Martian Colony"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Martian Colony_."];
            return message;
        }
    },
    {
        "name":"Build Venus Colony",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Venus Floating City"] += 1;
            addLog("Built 1 _Venus Floating City_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Venus Floating City"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Venus Floating City_."];
            return message;
        }
    },
    {
        "name":"Build Arcology",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Arcology"] += 1;
            addLog("Built 1 _Arcology_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Arcology"])},
        "canExecute":(rC, more) => rC["Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Arcology_."];
            return message;
        }
    }
]
