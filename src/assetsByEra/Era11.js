// The 11th era, corresponding roughly to the Information Age (~1990 to 2050)

import {addLog, softCap} from "../gameLogic.js";

export const resources11 = [
    ["Space Colony","Civilization","A rotating habitat in orbit around Earth."],
    ["Cislunar Space","Earth Orbit","Area beyond geosynchronous orbit but there objects can have stable Earth orbits."],
    ["Lunar Mare","Moon","Basaltic plains on the moon."],
    ["Lunar Crater","Moon","Impact crater that may provide good shielding for a base."],
    ["Lunar Cave","Moon","Lava tubes in the Moon can be quite large and good places for cities."],
    ["Lunar Hill","Moon","A hill on the Moon."],
    ["New Urbanist City","Urbanization","New Urbanism is a design philosophy which promotes walkability and mixed used development. Seaside, Florida is a prominent example."],
    ["Reclaimed Island","Urbanization","Land reclamation is employed to create new real estate in high value, land-constrained coastal cities, such as Hong Kong and Singapore."],
    ["Special Economic Zone","Politics","A special economic zone is a city or region with separate business and trade laws. The Shenzhen Special Economic Zone, established in 1980 as part of Deng Xiaoping's economic reforms, is a prominent example."],
    ["Charter City","Politics","A charter city is a political structure that allows a city a high degree of autonomy while still a member of a nation state."],
    ["Lunar Base","Space Development","Proposals to build a research base or colony on the Moon have yet to come to fruition. As of 2020, NASA's Project Artemis envisions a base will be established in the 2030s."],
    ["Thorium","Energy","Applications of thorium date to the late 19th century. There is hope for thorium as an Earth-abundant alternative to uranium in nuclear power, and India in particular seeks to develop a large-scale thorium cycle by 2050."],
    ["Carbon Nanotubes","Nanotechnology","Carbon nanotubes are an emerging material. They are of great interest for their electrical conductivity and tensile strength."],
    ["Graphene","Nanotechnology","Graphene is an allotrope of carbon arranged in a 2D hexagonal lattice. Potential applications include electronics, biological engineering, filtration, lightweight/strong composite materials, photovoltaics, and energy storage."],
    ["Aerogel","Nanotechnology","An aerogel is an ultralight gel in which the liquid has been replaced by gas."],
    ["Cross-laminated Timber","Composites","Cross-laminated timber is a new form of multilayered wood, of interested for low cost highrises."]
];

export const actions11 = [
    {
        "name":"Build Space Colony",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Space Colony"] += 1;
            addLog("Built 1 _Space Colony_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Space Colony"])},
        "canExecute":(rC) => rC["Megacity"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Megacity"],
        "info":(rC)=>{
            let message = ["Build a _Space Colony_."];
            return message;
        }
    },
    {
        "name":"Explore Cislunar Space",
        "pane":"Earth Orbit",
        "effect":(modified, gameState) => {
            modified["Cislunar Space"] += 1;
            addLog("Explored 1 _Cislunar Space_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Cislunar Space"])},
        "canExecute":(rC, more) => rC["Megacity"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Megacity"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Cislunar Space_."];
            return message;
        }
    },
    {
        "name":"Explore Lunar Mare",
        "pane":"Moon",
        "effect":(modified, gameState) => {
            modified["Lunar Mare"] += 1;
            addLog("Explored 1 _Lunar Mare_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Lunar Mare"])},
        "canExecute":(rC, more) => rC["Megacity"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Megacity"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Lunar Mare_."];
            return message;
        }
    },
    {
        "name":"Explore Lunar Crater",
        "pane":"Moon",
        "effect":(modified, gameState) => {
            modified["Lunar Crater"] += 1;
            addLog("Explored 1 _Lunar Crater_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Lunar Crater"])},
        "canExecute":(rC, more) => rC["Megacity"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Megacity"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Lunar Crater_."];
            return message;
        }
    },
    {
        "name":"Explore Lunar Cave",
        "pane":"Moon",
        "effect":(modified, gameState) => {
            modified["Lunar Cave"] += 1;
            addLog("Explored 1 _Lunar Cave_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Lunar Cave"])},
        "canExecute":(rC, more) => rC["Megacity"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Megacity"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Lunar Cave_."];
            return message;
        }
    },
    {
        "name":"Explore Lunar Hill",
        "pane":"Moon",
        "effect":(modified, gameState) => {
            modified["Lunar Hill"] += 1;
            addLog("Explored 1 _Lunar Hill_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Lunar Hill"])},
        "canExecute":(rC, more) => rC["Megacity"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Megacity"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Lunar Hill_."];
            return message;
        }
    },
    {
        "name":"Build New Urbanist City",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["New Urbanist City"] += 1;
            addLog("Built 1 _New Urbanist City_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["New Urbanist City"])},
        "canExecute":(rC, more) => rC["Megacity"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Megacity"]>=1,
        "info":(rC)=>{
            let message = ["Build a _New Urbanist City_."];
            return message;
        }
    },
    {
        "name":"Build SEZ",
        "pane":"Politics",
        "effect":(modified, gameState) => {
            modified["Special Economic Zone"] += 1;
            addLog("Built 1 _Special Economic Zone_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Special Economic Zone"])},
        "canExecute":(rC, more) => rC["Megacity"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Megacity"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Special Economic Zone_."];
            return message;
        }
    },
    {
        "name":"Build Charter City",
        "pane":"Politics",
        "effect":(modified, gameState) => {
            modified["Charter City"] += 1;
            addLog("Built 1 _Charter City_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Charter City"])},
        "canExecute":(rC, more) => rC["Megacity"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Megacity"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Charter City_."];
            return message;
        }
    },
    {
        "name":"Build Lunar Base",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Lunar Base"] += 1;
            addLog("Built 1 _Lunar Base_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Lunar Base"])},
        "canExecute":(rC, more) => rC["Megacity"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Megacity"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Lunar Base_."];
            return message;
        }
    }
]
