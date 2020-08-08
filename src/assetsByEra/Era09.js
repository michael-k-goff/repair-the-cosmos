// The ninth era, corresponding roughly to the Machine Age (~1870 to 1945)

import {addLog, softCap} from "../gameLogic.js";

export const resources09 = [
    ["Multinational Federation","Civilization","A loose union of nations covering the world of a continent."],
    ["Antarctica","New World","Open ocean."],
    ["Suburb","Urbanization","Low density development surrounding the core city. Develops around mass transit or automobiles."],
    ["Skyscraper","Buildings","A building with a steel skeleton. The first such building was the Home Insurance Building in Chicago, built in 1885."],
    ["Aluminum","Metals","Industrial production of aluminum (aluminium) began in 1886 with the Hall-Héroult process. It is widely used across industrial applications."],
    ["Uranium","Energy","Uranium is widely used in nuclear weapons and nuclear power plants. Depleted uranium is also useful as a high density penetrator."],
    ["Ammonia","Chemicals","Ammonia--chemically NH3--is critical in making fertilizers and explosive. It was synthesized from air in 1909 via the Haber-Bosch process and first produced industrially during World War I."],
    ["Methanol","Chemicals","Methanol--chemically CH3OH--is an widely used chemical. It is also of interest as an energy carrier."],
    ["Hydrogen","Chemicals","Hydrogen is the most common element in the universe, though not readily available in a free form due to its high reactivity. It came into use in the late 19th century in balloons. Hydrogen is also of great interest as a building block of a low-carbon energy system."],
    ["Plastic","Chemicals","Plastics refer to a wide range of malleable organic compounds. They are widely used and highly versatile."],
    ["Stainless Steel","Composites","Stainless steel is a chromium alloy of steel. It is resistant to rusting and has greater heat resistance than conventional steel."],
    ["Heavy Water","Energy","Heavy water is a type of water with a disproportionate amount of deuterium."],
    ["Tungsten","Metals","Tungsten gained strategic importance in the early 20th century for armaments."],
    ["Nylon","Chemicals","Nylon refers to a family of synthetic polymers that came into widespread usage in 1940."],
    ["Fiberglass","Composites","Fiberglass is a common type of fiber-reinforced plastic using glass fiber. Mass production was invented in 1932."],
    ["Reinforce Concrete","Composites","Reinforced concrete came into widespared usage in civil engineering around the turn of the 20th century."]
];

export const actions09 = [
    {
        "name":"Build Multinational Federation",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Multinational Federation"] += 1;
            addLog("Built 1 _Multinational Federation_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["Multinational Federation"])},
        "canExecute":(rC) => rC["Metropolis"]>=1,
        "visible":(rC,more) => more.actionCount["Build Metropolis"],
        "info":(rC)=>{
            let message = ["Build a _Multinational Federation_."];
            return message;
        }
    },
    {
        "name":"Explore Antarctica",
        "pane":"New World",
        "effect":(modified, gameState) => {
            modified["Antarctica"] += 1;
            addLog("Explored 1 _Antarctica_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Antarctica"])},
        "canExecute":(rC, more) => rC["Metropolis"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Metropolis"]>=1,
        "info":(rC)=>{
            let message = ["Explore _Antarctica_."];
            return message;
        }
    },
    {
        "name":"Build Suburb",
        "pane":"Urbanization",
        "effect":(modified, gameState) => {
            modified["Suburb"] += 1;
            addLog("Built 1 _Suburb_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Suburb"])},
        "canExecute":(rC, more) => rC["Metropolis"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Metropolis"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Suburb_."];
            return message;
        }
    },
    {
        "name":"Build Skyscraper",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Skyscraper"] += 1;
            addLog("Built 1 _Skyscraper_.",gameState);
        },
        "speed":(rC) => {return 0.1/(1+rC["Skyscraper"])},
        "canExecute":(rC, more) => rC["Metropolis"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Metropolis"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Skyscraper_."];
            return message;
        }
    }
]
