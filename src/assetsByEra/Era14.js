// The 14th era, starting with the first interstellar colonization up through civilizations around nearby stars.

import {addLog, softCap} from "../gameLogic.js";

export const resources14 = [
    ["Dyson Sphere","Civilization","A structure that encompasses a whole star and harvests most of its energy output. A bit excessive."],
    ["Mantle","Underground","Territory beneath the Earth's crust."],
    ["Oort Cloud","Solar Space","The outermost free space that can maintain stable orbits around the Sun."],
    ["Transtellar Space","Transtellar","Territory near the surface of the Sun."],
    ["Rogue Planet","Transtellar","There may be 100,000 rogue planets, or planets not in orbit around stars, for every star in the Milky Way."],
    ["Brown Dwarf","Transtellar","A ball of hydrogen that is typically larger than Jupiter but still insufficient to sustain nuclear fusion."],
    ["Red Dwarf","Nearby Star","Red dwarfs are the smallest and most common types of star."],
    ["G-Type Star","Nearby Star","A star of about the same size and temperature as the Sun."],
    ["Red Giant","Nearby Star","A large, short-lived star."],
    ["Water Planet","Nearby Star","A planet entirely covered by ocean."],
    ["Desert Planet","Nearby Star","A dry planet."],
    ["Chthonian Planet","Nearby Star","A rocky planet very close to its host star."],
    ["Hot Jupiter","Nearby Star","A Jupiter-sized gas planet close to its host star."],
    ["Hot Neptune","Nearby Star","A Neptune-sized gas planet close to its host star."],
    ["Super Earth","Nearby Star","A rocky planet larger than Earth."],
    ["Terraformed Mars","Mars","A section of Mars that has been terraformed to Earthlike conditions."],
    ["Terraformed Venus","Venus","A section of Venus that has been terraformed to Earthlike conditions."],
    ["Ecumenopolis","Urbanization","The entirely of the Earth's surface is now an integrated city."],
    ["Spacescraper","Buildings","A building at least 100 kilometers tall, reaching into space."],
    ["Interstellar Colony","Space Develoment","A colony near a star other than the Sun. Initially it is the starship itself, parked into orbit and subsisting off the star's energy and local raw materials."],
    ["Exoplanetary Base","Space Development","An outpost on the surface of an exoplanet."],
    ["Planet Cloud","Space Development","Using orbital rings and fast space launch, the planet cloud is an integrated city of Earth's surface, orbital space, and the Moon."],
    ["Antimatter","Exotic","Antimatter is matter that is composed of antiparticles. Antimatter has use today in positron emission tomography (PET). If antimatter can be produced and stored at scale, it may be useful for interstellar travel and for weaponry."]
];

export const actions14 = [
    {
        "name":"Build Dyson Sphere",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Dyson Sphere"] += 1;
            addLog("Built 1 _Dyson Sphere_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Dyson Sphere"])},
        "canExecute":(rC) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Transtellar Colony"],
        "info":(rC)=>{
            let message = ["Build a _Dyson Sphere_."];
            return message;
        }
    },
    {
        "name":"Explore Mantle",
        "pane":"Underground",
        "effect":(modified, gameState) => {
            modified["Mantle"] += 1;
            addLog("Explored 1 _Mantle_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Mantle"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Mantle_."];
            return message;
        }
    },
    {
        "name":"Explore Oort Cloud",
        "pane":"Solar Space",
        "effect":(modified, gameState) => {
            modified["Oort Cloud"] += 1;
            addLog("Explored 1 _Oort Cloud_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Oort Cloud"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Oort Cloud_."];
            return message;
        }
    },
    {
        "name":"Explore Transtellar Space",
        "pane":"Transtellar",
        "effect":(modified, gameState) => {
            modified["Transtellar Space"] += 1;
            addLog("Explored 1 _Transtellar Space_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Transtellar Space"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Transtellar Space_."];
            return message;
        }
    },
    {
        "name":"Explore Rogue Planet",
        "pane":"Transtellar",
        "effect":(modified, gameState) => {
            modified["Rogue Planet"] += 1;
            addLog("Explored 1 _Rogue Planet_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Rogue Planet"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Rogue Planet_."];
            return message;
        }
    },
    {
        "name":"Explore Brown Dwarf",
        "pane":"Transtellar",
        "effect":(modified, gameState) => {
            modified["Brown Dwarf"] += 1;
            addLog("Explored 1 _Brown Dwarf_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Brown Dwarf"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Brown Dwarf_."];
            return message;
        }
    },
    {
        "name":"Explore Red Dwarf",
        "pane":"Nearby Star",
        "effect":(modified, gameState) => {
            modified["Red Dwarf"] += 1;
            addLog("Explored 1 _Red Dwarf_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Red Dwarf"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Red Dwarf_."];
            return message;
        }
    },
    {
        "name":"Explore G-Type Star",
        "pane":"Nearby Star",
        "effect":(modified, gameState) => {
            modified["G-Type Star"] += 1;
            addLog("Explored 1 _G-Type Star_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["G-Type Star"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _G-Type Star_."];
            return message;
        }
    },
    {
        "name":"Explore Red Giant",
        "pane":"Nearby Star",
        "effect":(modified, gameState) => {
            modified["Red Giant"] += 1;
            addLog("Explored 1 _Red Giant_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Red Giant"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Red Giant_."];
            return message;
        }
    },
    {
        "name":"Explore Water Planet",
        "pane":"Nearby Star",
        "effect":(modified, gameState) => {
            modified["Water Planet"] += 1;
            addLog("Explored 1 _Water Planet_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Water Planet"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Water Planet_."];
            return message;
        }
    },
    {
        "name":"Explore Desert Planet",
        "pane":"Nearby Star",
        "effect":(modified, gameState) => {
            modified["Desert Planet"] += 1;
            addLog("Explored 1 _Desert Planet_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Desert Planet"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Desert Planet_."];
            return message;
        }
    },
    {
        "name":"Explore Chthonian Planet",
        "pane":"Nearby Star",
        "effect":(modified, gameState) => {
            modified["Chthonian Planet"] += 1;
            addLog("Explored 1 _Chthonian Planet_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Chthonian Planet"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Chthonian Planet_."];
            return message;
        }
    },
    {
        "name":"Explore Hot Jupiter",
        "pane":"Nearby Star",
        "effect":(modified, gameState) => {
            modified["Hot Jupiter"] += 1;
            addLog("Explored 1 _Hot Jupiter_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Hot Jupiter"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Hot Jupiter_."];
            return message;
        }
    },
    {
        "name":"Explore Hot Neptune",
        "pane":"Nearby Star",
        "effect":(modified, gameState) => {
            modified["Hot Neptune"] += 1;
            addLog("Explored 1 _Hot Neptune_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Hot Neptune"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Hot Neptune_."];
            return message;
        }
    },
    {
        "name":"Explore Super Earth",
        "pane":"Nearby Star",
        "effect":(modified, gameState) => {
            modified["Super Earth"] += 1;
            addLog("Explored 1 _Super Earth_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Super Earth"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Super Earth_."];
            return message;
        }
    },
    {
        "name":"Explore Terraformed Mars",
        "pane":"Mars",
        "effect":(modified, gameState) => {
            modified["Terraformed Mars"] += 1;
            addLog("Gained 1 _Terraformed Mars_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Terraformed Mars"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Terraform 1 _Terraformed Mars_."];
            return message;
        }
    },
    {
        "name":"Explore Terraformed Venus",
        "pane":"Venus",
        "effect":(modified, gameState) => {
            modified["Terraformed Venus"] += 1;
            addLog("Gained 1 _Terraformed Venus_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Terraformed Venus"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Terraform 1 _Terraformed Venus_."];
            return message;
        }
    },
    {
        "name":"Build Spacescraper",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Spacescraper"] += 1;
            addLog("Built 1 _Spacescraper_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Spacescraper"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Spacescraper_."];
            return message;
        }
    },
    {
        "name":"Build Ecumenopolis",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Ecumenopolis"] += 1;
            addLog("Built 1 _Ecumenopolis_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Ecumenopolis"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Ecumenopolis_."];
            return message;
        }
    },
    {
        "name":"Build Interstellar Colony",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Interstellar Colony"] += 1;
            addLog("Built 1 _Interstellar Colony_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Interstellar Colony"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Interstellar Colony_."];
            return message;
        }
    },
    {
        "name":"Build Exoplanetary Base",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Exoplanetary Base"] += 1;
            addLog("Built 1 _Exoplanetary Base_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Exoplanetary Base"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Exoplanetary Base_."];
            return message;
        }
    },
    {
        "name":"Build Planet Cloud",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Planet Cloud"] += 1;
            addLog("Built 1 _Planet Cloud_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Planet Cloud"])},
        "canExecute":(rC, more) => rC["Transtellar Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Transtellar Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Planet Cloud_."];
            return message;
        }
    }
]
