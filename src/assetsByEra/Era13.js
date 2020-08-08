// The 13th era, corresponding roughly to the Transhuman Age in Caveman to Cosmos (from 2150)

import {addLog, softCap} from "../gameLogic.js";

export const resources13 = [
    ["Transtellar Colony","Civilization","A self-sufficient civilization outside of the Solar System."],
    ["Venus Highlands","Venus","High altitude territory on the surface of Venus"],
    ["Venus Lowlands","Venus","Low altitude territory on the surface of Venus"],
    ["Ocean Floor","Underground","Location on the surface of the ocean floor."],
    ["Ocean Trench","Underground","Location in a deep oceanic trench."],
    ["Stratosphere","Sky","The portion of the atmosphere about 10-50 kilometers above Earth's surface."],
    ["Subterranean","Underground","Deep in the Earth's crust."],
    ["Mercury","Rocky Surface","The closest planet to the Sun."],
    ["Asteroid","Rocky Surface","A small object, concentrated heavily between Mars and Jupiter."],
    ["Ceres","Rocky Surface","Ceres is the largest object in the Asteroid Belt."],
    ["Jupiter Clouds","Jupiter","The largest planet in the Solar System."],
    ["Io","Jupiter","Io is a moon of Jupiter."],
    ["Europa","Jupiter","Europa is a moon of Jupiter."],
    ["Ganymede","Jupiter","Ganymede is a moon of Jupiter."],
    ["Callisto","Jupiter","Callisto is a moon of Jupiter."],
    ["Saturn Clouds","Saturn","The second largest planet in the Solar System."],
    ["Titan","Saturn","A moon of Saturn, Titan is rich in hydrocarbons."],
    ["Enceladus","Saturn","Enceladus has active geyser systems as is of great interest for astrobiology."],
    ["Uranus","Ice Giants","We're too sophisticated for a joke here."],
    ["Titania","Ice Giants","Titania is a moon of Uranus."],
    ["Oberon","Ice Giants","Oberon is a moon of Uranus."],
    ["Neptune","Ice Giants","The outermost gas planet."],
    ["Neptune Subsurface","Ice Giants","Territory beneath Neptune's surface. Might be place for a city."],
    ["Triton","Ice Giants","Triton is a moon of Neptune and might be a capture Kuiper Belt Object."],
    ["Pluto","Kuiper Belt","Pluto is a dwarf planet and one of the larget Kuiper Belt Objects."],
    ["Kuiper Belt Object","Kuiper Belt","A small, rocky object beyond Neptune."],
    ["Sednoid","Kuiper Belt","Sednoids, such as Sedna, are object which may extend well beyond the Kuiper cliff."],
    ["Planet Nine","Kuiper Belt","Planet Nine is a hypothetical super-Earth planet in the outer reaches of the solar system."],
    ["Sun","Solar Space","Territory near the surface of the Sun."],
    ["Inner Solar System","Solar Space","Free space within the Asteroid Belt."],
    ["Outer Solar System","Solar Space","Free space beyond the Asteroid Belt and within the Kuiper Belt."],
    ["Transneptunian Space","Solar Space","Free space beyond the Kuiper Belt and within the Oort Cloud"],
    ["Eperopolis","Urbanization","A continent-sized city."],
    ["O'Neill Cylinder","Space Development","A rotation space colony proposed by Gerard K. O'Neill."],
    ["Ocean Floor City","Urbanization","A city on the ocean floor."],
    ["Mars City","Space Development","A large, self-sufficient city on Mars."],
    ["Venus Surface City","Space Development","Advances in material sciences allow this city to thrive on the surface of Venus."],
    ["Stratospheric Tower","Buildings","A tower at least 10 kilometers tall, reaching the stratosphere."],
    ["Asteroid City","Space Development","A city in a hollowed out asteroid."],
    ["Kuiper Belt Outpost","Space Development","A city in the Kuiper Belt."],
    ["Plasteel","Nanotechnology","Plasteel is a hypothetical substance with the strength of steel and flexiblity of plastic."],
    ["Claytronic Atoms","Nanotechnology","Claytronics is a hypothetical concept of nanoscale computational matter."]
];

export const actions13 = [
    {
        "name":"Build Transtellar Colony",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Transtellar Colony"] += 1;
            addLog("Built 1 _Transtellar Colony_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Transtellar Colony"])},
        "canExecute":(rC) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Deep Space Colony"],
        "info":(rC)=>{
            let message = ["Build a _Transtellar Colony_."];
            return message;
        }
    },
    {
        "name":"Explore Venus Highlands",
        "pane":"Venus",
        "effect":(modified, gameState) => {
            modified["Venus Highlands"] += 1;
            addLog("Explored 1 _Venus Highlands_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Venus Highlands"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Venus Highlands_."];
            return message;
        }
    },
    {
        "name":"Explore Venus Lowlands",
        "pane":"Venus",
        "effect":(modified, gameState) => {
            modified["Venus Lowlands"] += 1;
            addLog("Explored 1 _Venus Lowlands_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Venus Lowlands"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Venus Lowlands_."];
            return message;
        }
    },
    {
        "name":"Explore Ocean Floor",
        "pane":"Underground",
        "effect":(modified, gameState) => {
            modified["Ocean Floor"] += 1;
            addLog("Explored 1 _Ocean Floor_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Ocean Floor"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Ocean Floor_."];
            return message;
        }
    },
    {
        "name":"Explore Ocean Trench",
        "pane":"Underground",
        "effect":(modified, gameState) => {
            modified["Ocean Trench"] += 1;
            addLog("Explored 1 _Ocean Trench_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Ocean Trench"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Ocean Trench_."];
            return message;
        }
    },
    {
        "name":"Explore Stratosphere",
        "pane":"Sky",
        "effect":(modified, gameState) => {
            modified["Stratosphere"] += 1;
            addLog("Explored 1 _Stratosphere_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Stratosphere"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Stratosphere_."];
            return message;
        }
    },
    {
        "name":"Explore Subterranean",
        "pane":"Underground",
        "effect":(modified, gameState) => {
            modified["Subterranean"] += 1;
            addLog("Explored 1 _Subterranean_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Subterranean"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Subterranean_."];
            return message;
        }
    },
    {
        "name":"Explore Mercury",
        "pane":"Rocky Surface",
        "effect":(modified, gameState) => {
            modified["Mercury"] += 1;
            addLog("Explored 1 _Mercury_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Mercury"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Mercury_."];
            return message;
        }
    },
    {
        "name":"Explore Asteroid",
        "pane":"Rocky Surface",
        "effect":(modified, gameState) => {
            modified["Asteroid"] += 1;
            addLog("Explored 1 _Asteroid_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Asteroid"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Asteroid_."];
            return message;
        }
    },
    {
        "name":"Explore Ceres",
        "pane":"Rocky Surface",
        "effect":(modified, gameState) => {
            modified["Ceres"] += 1;
            addLog("Explored 1 _Ceres_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Ceres"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Ceres_."];
            return message;
        }
    },
    {
        "name":"Explore Jupiter Clouds",
        "pane":"Jupiter",
        "effect":(modified, gameState) => {
            modified["Jupiter Clouds"] += 1;
            addLog("Explored 1 _Jupiter Clouds_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Jupiter Clouds"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Jupiter Clouds_."];
            return message;
        }
    },
    {
        "name":"Explore Io",
        "pane":"Jupiter",
        "effect":(modified, gameState) => {
            modified["Io"] += 1;
            addLog("Explored 1 _Io_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Io"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Io_."];
            return message;
        }
    },
    {
        "name":"Explore Europa",
        "pane":"Jupiter",
        "effect":(modified, gameState) => {
            modified["Europa"] += 1;
            addLog("Explored 1 _Europa_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Europa"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Europa_."];
            return message;
        }
    },
    {
        "name":"Explore Ganymede",
        "pane":"Jupiter",
        "effect":(modified, gameState) => {
            modified["Ganymede"] += 1;
            addLog("Explored 1 _Ganymede_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Ganymede"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Ganymede_."];
            return message;
        }
    },
    {
        "name":"Explore Callisto",
        "pane":"Jupiter",
        "effect":(modified, gameState) => {
            modified["Callisto"] += 1;
            addLog("Explored 1 _Callisto_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Callisto"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Callisto_."];
            return message;
        }
    },
    {
        "name":"Explore Saturn Clouds",
        "pane":"Saturn",
        "effect":(modified, gameState) => {
            modified["Saturn Clouds"] += 1;
            addLog("Explored 1 _Saturn Clouds_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Saturn Clouds"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Saturn Clouds_."];
            return message;
        }
    },
    {
        "name":"Explore Titan",
        "pane":"Saturn",
        "effect":(modified, gameState) => {
            modified["Titan"] += 1;
            addLog("Explored 1 _Titan_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Titan"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Titan_."];
            return message;
        }
    },
    {
        "name":"Explore Enceladus",
        "pane":"Saturn",
        "effect":(modified, gameState) => {
            modified["Enceladus"] += 1;
            addLog("Explored 1 _Enceladus_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Enceladus"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Enceladus_."];
            return message;
        }
    },
    {
        "name":"Explore Uranus",
        "pane":"Ice Giants",
        "effect":(modified, gameState) => {
            modified["Uranus"] += 1;
            addLog("Explored 1 _Uranus_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Uranus"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Uranus_."];
            return message;
        }
    },
    {
        "name":"Explore Titania",
        "pane":"Ice Giants",
        "effect":(modified, gameState) => {
            modified["Titania"] += 1;
            addLog("Explored 1 _Titania_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Titania"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Titania_."];
            return message;
        }
    },
    {
        "name":"Explore Oberon",
        "pane":"Ice Giants",
        "effect":(modified, gameState) => {
            modified["Oberon"] += 1;
            addLog("Explored 1 _Oberon_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Oberon"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Oberon_."];
            return message;
        }
    },
    {
        "name":"Explore Neptune",
        "pane":"Ice Giants",
        "effect":(modified, gameState) => {
            modified["Neptune"] += 1;
            addLog("Explored 1 _Neptune_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Neptune"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Neptune_."];
            return message;
        }
    },
    {
        "name":"Explore Neptune Subsurface",
        "pane":"Ice Giants",
        "effect":(modified, gameState) => {
            modified["Neptune Subsurface"] += 1;
            addLog("Explored 1 _Neptune Subsurface_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Neptune Subsurface"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Neptune Subsurface_."];
            return message;
        }
    },
    {
        "name":"Explore Triton",
        "pane":"Ice Giants",
        "effect":(modified, gameState) => {
            modified["Triton"] += 1;
            addLog("Explored 1 _Triton_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Triton"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Triton_."];
            return message;
        }
    },
    {
        "name":"Explore Pluto",
        "pane":"Kuiper Belt",
        "effect":(modified, gameState) => {
            modified["Pluto"] += 1;
            addLog("Explored 1 _Pluto_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Pluto"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Pluto_."];
            return message;
        }
    },
    {
        "name":"Explore Kuiper Belt Object",
        "pane":"Kuiper Belt",
        "effect":(modified, gameState) => {
            modified["Kuiper Belt Object"] += 1;
            addLog("Explored 1 _Kuiper Belt Object_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Kuiper Belt Object"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Kuiper Belt Object_."];
            return message;
        }
    },
    {
        "name":"Explore Sednoid",
        "pane":"Kuiper Belt",
        "effect":(modified, gameState) => {
            modified["Sednoid"] += 1;
            addLog("Explored 1 _Sednoid_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Sednoid"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Sednoid_."];
            return message;
        }
    },
    {
        "name":"Explore Planet Nine",
        "pane":"Kuiper Belt",
        "effect":(modified, gameState) => {
            modified["Planet Nine"] += 1;
            addLog("Explored 1 _Planet Nine_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Planet Nine"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Planet Nine_."];
            return message;
        }
    },
    {
        "name":"Explore Sun",
        "pane":"Solar Space",
        "effect":(modified, gameState) => {
            modified["Sun"] += 1;
            addLog("Explored 1 _Sun_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Sun"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Sun_."];
            return message;
        }
    },
    {
        "name":"Explore Inner Solar System",
        "pane":"Solar Space",
        "effect":(modified, gameState) => {
            modified["Inner Solar System"] += 1;
            addLog("Explored 1 _Inner Solar System_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Inner Solar System"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Inner Solar System_."];
            return message;
        }
    },
    {
        "name":"Explore Outer Solar System",
        "pane":"Solar Space",
        "effect":(modified, gameState) => {
            modified["Outer Solar System"] += 1;
            addLog("Explored 1 _Outer Solar System_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Outer Solar System"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Outer Solar System_."];
            return message;
        }
    },
    {
        "name":"Explore Transneptunian Space",
        "pane":"Solar Space",
        "effect":(modified, gameState) => {
            modified["Transneptunian Space"] += 1;
            addLog("Explored 1 _Transneptunian Space_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Transneptunian Space"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Transneptunian Space_."];
            return message;
        }
    },
    {
        "name":"Build Eperopolis",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Eperopolis"] += 1;
            addLog("Built 1 _Eperopolis_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Eperopolis"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Eperopolis_."];
            return message;
        }
    },
    {
        "name":"Build O'Neill Cylinder",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["O'Neill Cylinder"] += 1;
            addLog("Built 1 _O'Neill Cylinder_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["O'Neill Cylinder"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build an _O'Neill Cylinder_."];
            return message;
        }
    },
    {
        "name":"Build Ocean Floor City",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Ocean Floor City"] += 1;
            addLog("Built 1 _Ocean Floor City_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Ocean Floor City"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Ocean Floor City_."];
            return message;
        }
    },
    {
        "name":"Build Mars City",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Mars City"] += 1;
            addLog("Built 1 _Mars City_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Mars City"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Mars City_."];
            return message;
        }
    },
    {
        "name":"Build Venus City",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Venus Surface City"] += 1;
            addLog("Built 1 _Venus Surface City_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Venus Surface City"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Venus Surface City_."];
            return message;
        }
    },
    {
        "name":"Build Asteroid City",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Asteroid City"] += 1;
            addLog("Built 1 _Asteroid City_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Asteroid City"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build an _Asteroid City_."];
            return message;
        }
    },
    {
        "name":"Build Kuiper Belt Outpost",
        "pane":"Space Development",
        "effect":(modified, gameState) => {
            modified["Kuiper Belt Outpost"] += 1;
            addLog("Built 1 _Kuiper Belt Outpost_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Kuiper Belt Outpost"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Kuiper Belt Outpost_."];
            return message;
        }
    },
    {
        "name":"Build Stratospheric Tower",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Stratospheric Tower"] += 1;
            addLog("Built 1 _Stratospheric Tower_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Stratospheric Tower"])},
        "canExecute":(rC, more) => rC["Deep Space Colony"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Deep Space Colony"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Stratospheric Tower_."];
            return message;
        }
    }
]
