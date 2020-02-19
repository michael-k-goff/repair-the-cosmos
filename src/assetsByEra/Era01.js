// The first era, corresponding roughly to the Lower Paleolithic.

import {addLog} from "../gameLogic.js";

export const resources01 = [
    ["People","Population","Your current population. The more the merrier."],
    ["Scout","Population","Scouts help you find new land."],
    ["Gatherer","Population","Gatherers are needed to get more food."],
    ["Wood Worker","Population","Specialized in carving wood implements"],
    ["Stone Worker","Population","Specialist in preparing stone tools"],
    ["Hunter","Population","The hunter is more skilled than the gatherer and also takes on more risk."],
    ["Brain Size","Population","During the Lower Paleolithic, homonid brains grew to their present size, which in Repair the Cosmos is 10."],
    ["Illness","Population","Illness is bad. If untreated, it will kill your population. It comes from harvesting certain kinds of food.",{"character":"bad"}],
    ["Infant Mortality","Population","As brain size grows, delivery becomes more challenging, and more children die in childbirth. This stat is the percentage change that a child dies in birth. It decreases, to a point, with attempted births."],

    ["Garden of Eden","Territory","You have been kicked out. Repair the Cosmos."],
    ["Savannah","Territory","A good place for hunting and scavenging."],
    ["Forest","Territory","Harder to move around here."],
    ["Hills","Territory","Food is scarcer but the hills are more defensible."],
    ["Valley","Territory","Ideal place for founding a civilization."],
    ["River","Territory","Great for fishing and trade."],
    ["Cave","Territory","If you're going to be a band of cavepeople, you need a cave."],

    ["Food","Resources","Food is your most basic resource and needed to grow your civilization."],
    ["Protein","Resources","Concentrated nutritional energy. It is essential for growing your strength and endurance."],
    ["Wild Mushrooms","Resources","Wild mushrooms are good food."],
    ["Knowledge of Mushrooms","Resources","Through some unfortunate trial and error, you are learning which mushrooms won't make you sick."],
    ["Carrion","Resources","Not the most appetizing meal, but an important source of protein early in history."],
    ["Wild Grains","Resources","Before domestication, cereals were harvested from the wild."],
    ["Wild Fruit","Resources","A rare and delicious treat."],
    ["Nuts","Resources","High protein food that doesn't fight back."],
    ["Eggs","Resources","Before animal husbandry is invented, you gather eggs from the wild."],
    ["Berries","Resources","Berries are delicious, but they will make you sick if you're not careful."],
    ["Knowledge of Berries","Resources","White and yellow, kill a fellow. Purple and blue, good for you. Red could be good, could be dead."],
    ["Wood","Resources","Go ahead and waste it. This stuff grows on trees."],
    ["Rocks","Resources","Plain old rocks."],
    ["Stone Tools","Resources","The most basic stone tools."],
    ["Herbs","Resources","Cure illness. Use them on the Population tab."],

    ["Campsite","Buildings","A campsite to rest."],
    ["Wood Shelter","Buildings","A basic shelter for resting."],
    ["Fire Pit","Buildings","Mastering fire was a major accomplishment for your people."],
    ["Grain Storage","Buildings","Store grain in caves."],

    ["Tribe","Society","An organized tribe, based on mutual interpersonal familiarity."],

    ["Brute","Military","A basic brawler."],
    ["Stone Thrower","Military","Does not live in a glass house."]
]

export const actions01 = [
    {
        "name":"Reproduce",
        "pane":"Population",
        "effect":(modified, gameState) => {
            let message1 = "";
            if (modified["People"] >= 10) {
                modified["Food"] -= 1;
                message1 = ", and you ate 1 _Food_"
            }
            let success = Math.random() > modified["Infant Mortality"]/100 ? 1:0;
            if (!modified["Infant Mortality"]) {success = 1}
            modified["People"] += success;
            let message2 = "You gained 1 _People_"+message1+"."
            if (!success && modified["Infant Mortality"] >= 31) {
                modified["Infant Mortality"] -= 1;
                addLog("_Infant Mortality_ has decreased by 1.");
                message2 = "Childbirth was unsuccessful "+message2+".";
            }
            addLog(message2,gameState);
            if (modified["People"]===10 && !modified["Savannah"]) {
                addLog("I suggest you train a _Scout_ so you can explore your surroundings.",gameState);
                addLog("Great work, your band is growing. Now it is time to specialize.",gameState);
            }
        },
        "speed":(rC) => {
            let food_speed = 1+Math.sqrt(rC["Food"]);
            let shelter_speed = 1+Math.sqrt(rC["Wood Shelter"]);
            return Math.sqrt(food_speed*shelter_speed)/rC["People"];
        },
        "canExecute":(rC) => {
            return (rC["People"]<10 || rC["Food"]>=1);
        },
        "visible":(rC)=>1,
        "info":(rC)=>{
            let message = ["Add 1 _People_ to your band. Faster with more _Food_, _Wood Shelter_."];
            if (rC["People"] >= 10 && !rC["Food"]) {
                message = message.concat(["!You need more _Food_."]);
            }
            return message;
        }
    },
    {
        "name":"Train Scout",
        "pane":"Population",
        "effect":(modified, gameState) => {
            modified["Scout"] += 1;
            addLog("Trained 1 _Scout_.",gameState);
            if (modified["Scout"] === 1) {
                addLog("Now that you have a scout, head over to the Territory tab and explore your surroundings.",gameState);
            }
        },
        "speed":(rC) => {return Math.sqrt(rC["People"])/(10+5*rC["Scout"])},
        "canExecute":(rC) => {return rC["People"] > 9+rC["Scout"] * 2},
        "visible":(rC) => rC["People"] >= 10,
        "info":(rC)=>{
            let message = ["Train _Scout_ to find more territory. Faster with more _People_."]
            if (rC["People"] <= 9+rC["Scout"] * 2) {
                message = message.concat(["You need more _People_."]);
            }
            return message;
        }
    },
    {
        "name":"Train Gatherer",
        "pane":"Population",
        "effect":(modified,gameState) => {
            modified["Gatherer"] += 1;
            addLog("Trained 1 _Gatherer_.",gameState);
        },
        "speed":(rC) => {return Math.sqrt(rC["People"])/(10+5*rC["Gatherer"])},
        "canExecute":(rC) => {return rC["People"] > 9+rC["Gatherer"] * 2},
        "visible":(rC) => rC["People"] >= 10,
        "info":(rC)=>{
            let message = ["Train _Gatherer_ to find more food. Faster with more _People_."];
            if (rC["People"] <= 9+rC["Gatherer"] * 2) {
                message = message.concat(["You need more _People_."]);
            }
            return message;
        }
    },
    {
        "name":"Train Woodworker",
        "pane":"Population",
        "effect":(modified, gameState) => {
            modified["Wood Worker"] += 1;
            addLog("Trained 1 _Wood Worker_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Wood"],0.25)/(1+rC["Wood Worker"])},
        "canExecute":(rC) => {return rC["Brain Size"]>=3 && rC["People"] > 10+rC["Wood Worker"] * 4 && rC["Wood"] > 2+rC["Wood Worker"] * 2},
        "visible":(rC) => rC["Wood"] >= 1,
        "info":(rC)=>{
            let message = ["Train _Wood Worker_ to fashion wooden tools. Faster with more _People_, _Wood_."];
            if (rC["People"] <= 10+rC["Wood Worker"] * 4) {
                message = message.concat(["You need more _People_."]);
            }
            if (rC["Wood"] <= 2+rC["Wood Worker"] * 2) {
                message = message.concat(["You need more _Wood_."]);
            }
            if (rC["Brain Size"] < 3) {
                message = message.concat(["To need to increase _Brain Size_."]);
            }
            return message;
        }
    },
    {
        "name":"Train Stoneworker",
        "pane":"Population",
        "effect":(modified, gameState) => {
            modified["Stone Worker"] += 1;
            addLog("Trained 1 _Stone Worker_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Rocks"],0.25)/(1+rC["Stone Worker"])},
        "canExecute":(rC) => {return rC["Brain Size"]>=3 && rC["People"] > 10+rC["Stone Worker"] * 4 && rC["Rocks"] > 2+rC["Stone Worker"] * 2},
        "visible":(rC) => rC["Rocks"] >= 1,
        "info":(rC)=>{
            let message = ["Train _Stone Worker_ to create and maintain _Stone Tools_. Faster with more _People_, _Rocks_."];
            if (rC["People"] <= 10+rC["Stone Worker"] * 4) {
                message = message.concat(["You need more _People_."]);
            }
            if (rC["Rocks"] <= 2+rC["Stone Worker"] * 2) {
                message = message.concat(["You need more _Rocks_."]);
            }
            if (rC["Brain Size"] < 3) {
                message = message.concat(["To need to increase _Brain Size_."]);
            }
            return message;
        }
    },
    {
        "name":"Train Hunter",
        "pane":"Population",
        "effect":(modified, gameState) => {
            modified["Hunter"] += 1;
            addLog("Trained 1 _Hunter_.",gameState);
        },
        "speed":(rC) => {return 0.05*Math.pow( rC["Gatherer"]*(rC["Wood Worker"]+rC["Stone Worker"]) , 0.25)/(1+rC["Hunter"])},
        "canExecute":(rC) => {return rC["Gatherer"] > 2+rC["Hunter"] * 2 && rC["Wood Worker"]+rC["Stone Worker"]>rC["Hunter"]},
        "visible":(rC)=>rC["Wood Worker"] || rC["Stone Worker"],
        "info":(rC)=>{
            let message = ["Train _Hunter_. Faster with more _Gatherer_, _Wood Worker_, _Stone Worker_."];
            if (rC["Gatherer"] <= 2+rC["Hunter"] * 2) {
                message = message.concat(["You need more _Gatherer_."]);
            }
            if (rC["Wood Worker"]+rC["Stone Worker"]<=rC["Hunter"]) {
                message = message.concat(["You need more _Wood Worker_ or _Stone Worker_."]);
            }
            return message;
        }
    },
    {
        "name":"Brain Expansion",
        "pane":"Population",
        "effect":(modified, gameState) => {
            modified["Brain Size"] += 1;
            modified["Protein"] -= modified["Brain Size"];
            modified["Infant Mortality"] += 9;
            addLog(`Expanded _Brain Size_ by 1, consumed ${modified["Brain Size"]} _Protein_, and gained 9 _Infant Mortality_.`,gameState);
        },
        "speed":(rC) => {
            return 0.02*rC["Protein"]/(1+rC["Brain Size"]);
        },
        "canExecute":(rC)=>rC["Brain Size"] ? (rC["Brain Size"] < 10 && rC["Protein"]>=rC["Brain Size"]+1) : rC["Protein"]>=1,
        "visible":(rC,more) => more["actionCount"]["Brain Expansion"] || rC["Protein"],
        "info":(rC)=>{
            let message = ["Evolve into hominids with larger brains. Grows faster with more _Protein_."];
            if (rC["Protein"] < (rC["Brain Size"]?rC["Brain Size"]+1 : 1)) {
                message = message.concat(["You need more _Protein_."]);
            }
            return message;
        }
    },
    {
        "name":"Succumb to Illness",
        "pane":"Population",
        "effect":(modified)=> {
            if (modified["People"] > 2) {
                modified["People"] -= 1;
            }
            modified["Illness"] -= 1;
        },
        "speed":(rC) => {return 0.020*rC["Illness"]},
        "canExecute":(rC) => rC["People"]>2 && rC["Illness"]>=1,
        "auto":1,
        "info":(rC)=>{
            return ["Kills 1 _People_. Goes faster with more _Illness_ and more _People_."];
        }
    },
    {
        "name":"Use Herbs",
        "pane":"Population",
        "effect":(modified, gameState) => {
            modified["Illness"] -= 1;
            modified["Herbs"] -= 1;
            addLog("Cured 1 _Illness_ and consumed 1 _Herbs_.",gameState);
        },
        "speed":(rC)=>0.05*rC["Herbs"],
        "canExecute":(rC) => rC["Herbs"] && rC["Illness"]>=1,
        "visible":(rC,more) => more["actionCount"]["Gather Herbs"],
        "info":(rC)=>{
            let message = ["Apply _Herbs_ to cure _Illness_."];
            if (!rC["Herbs"]) {
                message = message.concat(["You need to have an _Herbs_."]);
            }
            if (!rC["Illness"]) {
                message = message.concat(["None of your people are ill, so there is no reason."]);
            }
            return message;
        }
    },
    {
        "name":"Explore Savannah",
        "pane":"Territory",
        "effect":(modified, gameState) => {
            modified["Savannah"] += 1;
            if (modified["Savannah"]===1) {
                addLog("You have discovered some open _Savannah_. Now you should head over to the Resources tab and start gathering some material. You are well on your way to repairing the cosmos.",gameState);
            }
            addLog("Found 1 _Savannah_.",gameState);
        },
        "speed":(rC) => {return 0.2*Math.sqrt(rC["Scout"])/(1+rC["Savannah"])},
        "canExecute":(rC) => rC["Scout"],
        "info":(rc) => ["Search for _Savannah_ to settle. Faster with more _Scout_."]
    },
    {
        "name":"Explore Forest",
        "pane":"Territory",
        "effect":(modified, gameState) => {
            modified["Forest"] += 1;
            addLog("Found 1 _Forest_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.sqrt(rC["Scout"])/(1+rC["Forest"])},
        "canExecute":(rC) => rC["Savannah"]>=3,
        "visible":(rC)=>rC["Savannah"],
        "info":(rC)=>{
            let message = ["Search for _Forest_ to settle. Faster with more _Scout_."];
            if (rC["Savannah"] < 3) {
                message = message.concat(["Explore the _Savannah_ some more first."]);
            }
            return message;
        }
    },
    {
        "name":"Explore Hills",
        "pane":"Territory",
        "effect":(modified, gameState) => {
            modified["Hills"] += 1;
            addLog("Found 1 _Hills_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.sqrt(rC["Scout"])/(1+rC["Hills"])},
        "canExecute":(rC) => rC["Savannah"]>=3,
        "visible":(rC)=>rC["Savannah"],
        "info":(rC)=>{
            let message = ["Search for _Hills_ to settle. Faster with more _Scout_."];
            if (rC["Savannah"] < 3) {
                message = message.concat(["Explore the _Savannah_ some more first."]);
            }
            return message;
        }
    },
    {
        "name":"Explore Valley",
        "pane":"Territory",
        "effect":(modified, gameState) => {
            modified["Valley"] += 1;
            addLog("Found 1 _Valley_.",gameState);
        },
        "speed":(rC) => {return 0.07*Math.sqrt(rC["Scout"])/(1+rC["Valley"])},
        "canExecute":(rC) => rC["Savannah"]>=3,
        "visible":(rC)=>rC["Savannah"],
        "info":(rC)=>{
            let message = ["Search for _Valley_ to settle. Faster with more _Scout_."];
            if (rC["Savannah"] < 3) {
                message = message.concat(["Explore the _Savannah_ some more first."]);
            }
            return message;
        }
    },
    {
        "name":"Explore River",
        "pane":"Territory",
        "effect":(modified, gameState) => {
            modified["River"] += 1;
            addLog("Found 1 _River_.",gameState);
        },
        "speed":(rC) => {return 0.07*Math.sqrt(rC["Scout"])/(1+rC["River"])},
        "canExecute":(rC) => rC["Savannah"]>=3,
        "visible":(rC)=>rC["Savannah"],
        "info":(rC)=>{
            let message = ["Search for _River_ to settle. Faster with more _Scout_."];
            if (rC["Savannah"] < 3) {
                message = message.concat(["Explore the _Savannah_ some more first."]);
            }
            return message;
        }
    },
    {
        "name":"Explore Cave",
        "pane":"Territory",
        "effect":(modified, gameState) => {
            modified["Cave"] += 1;
            addLog("Found 1 _Cave_.",gameState);
        },
        "speed":(rC) => {return 0.05*Math.sqrt(rC["Scout"])/(1+rC["Cave"])},
        "canExecute":(rc) => rc["Hills"],
        "info":(rc) => ["You might find a cave in the side of a hill. Faster with more Scouts."]
    },
    {
        "name":"Gather Mushrooms",
        "pane":"Resources",
        "effect":(modified, gameState) => {
            modified["Wild Mushrooms"] += 1;
            addLog("Found 1 _Wild Mushrooms_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Forest"], 0.25)/(1+rC["Wild Mushrooms"])},
        "canExecute":(rC) => rC["Gatherer"] && rC["Forest"],
        "visible":(rC) => rC["Forest"],
        "info":(rC)=>{
            let message = ["It took a long time to learn which ones are edible. Faster with more _Gatherer_, _Forest_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Consume Mushrooms",
        "pane":"Resources",
        "effect":(modified, gameState)=>{
            const illness = 2/(Math.max(2,modified["Knowledge of Mushrooms"]))
            modified["Wild Mushrooms"] -= 1;
            modified["Illness"] += illness;
            modified["Food"] += 1;
            modified["Knowledge of Mushrooms"] += ( 1/(1+Math.pow(modified["Knowledge of Mushrooms"],0.7)) );
            addLog(`Ate 1 _Wild Mushrooms_, got ${illness.toFixed(2)} _Illness_, gained 1 _Food_, and learned 1 _Knowledge of Mushrooms_.`,gameState);
        },
        "speed":(rC) => {return 1/(1+rC["Food"])},
        "canExecute":(rC)=>rC["Wild Mushrooms"],
        "visible":(rC,more) => more["actionCount"]["Gather Mushrooms"],
        "info":(rC)=>{
            let message = ["Eat a delicious mushroom."];
            if (!rC["Wild Mushrooms"]) {
                message = message.concat(["You need a _Wild Mushroom_."]);
            }
            return message;
        }
    },
    {
        "name":"Harvest Carrion",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Carrion"] += 1;
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Carrion"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "visible":(rC) => rC["Savannah"],
        "info":(rC)=>{
            let message = ["Watch out for the hyenas. Faster with more Gatherers, Savannah."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Consume Carrion",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Carrion"] -= 1;
            modified["Illness"] += 1;
            modified["Food"] += 1;
            modified["Protein"] += 2;
        },
        "speed":(rC)=>{return 1/(1+rC["Food"]+rC["Protein"])},
        "canExecute":(rC)=>rC["Carrion"],
        "visible":(rC,more) => more["actionCount"]["Harvest Carrion"],
        "info":(rC)=>{
            let message = ["You need the protein ... but damn."];
            if (!rC["Carrion"]) {
                message = message.concat(["You need Carrion."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Grains",
        "pane":"Resources",
        "effect":(modified) => modified["Wild Grains"] += 1,
        "speed":(rC) => {return 0.2*Math.pow(rC["Gatherer"]*rC["Savannah"]*(1+rC["Grain Storage"]), 1/6)/(1+rC["Wild Grains"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "visible":(rC) => rC["Savannah"],
        "info":(rC)=>{
            let message = ["Foraging for wild grains. Faster with more Gatherers, Savannah, Grain Storage."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Consume Grains",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Wild Grains"] -= 1;
            modified["Food"] += 1;
        },
        "speed":(rC)=>{return 1/(1+rC["Food"])},
        "canExecute":(rC)=>rC["Wild Grains"],
        "visible":(rC,more) => more["actionCount"]["Gather Grains"],
        "info":(rC)=>{
            let message = ["Early grains were not much of a meal, but it will do."];
            if (!rC["Carrion"]) {
                message = message.concat(["You need Wild Grains."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Fruit",
        "pane":"Resources",
        "effect":(modified) => modified["Wild Fruit"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Wild Fruit"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "visible":(rC) => rC["Savannah"],
        "info":(rC)=>{
            let message = ["Looking for wild fruit. Faster with more Gatherers, Savannah."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Fruit",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Wild Fruit"] -= 1;
            modified["Food"] += 1;
        },
        "speed":(rC)=>{return 1/(1+rC["Food"])},
        "canExecute":(rC)=>rC["Wild Fruit"],
        "visible":(rC,more) => more["actionCount"]["Gather Fruit"],
        "info":(rC)=>{
            let message = ["The tastiest meal you have available now."];
            if (!rC["Wild Fruit"]) {
                message = message.concat(["You need Wild Fruit."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Nuts",
        "pane":"Resources",
        "effect":(modified) => modified["Nuts"] += 1,
        "speed":(rC) => {
            return 0.1*Math.pow(rC["Gatherer"]*rC["Valley"], 0.25)/(1+rC["Nuts"])
        },
        "canExecute":(rc) => rc["Gatherer"] && rc["Valley"],
        "visible":(rC) => rC["Valley"],
        "info":(rC)=>{
            let message = ["Pick nuts. Faster with more Gatherers, Valley."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Nuts",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Nuts"] -= 1;
            modified["Food"] += 1;
            modified["Protein"] += 1;
        },
        "speed":(rC)=>{return 1/(1+rC["Food"]+rC["Protein"])},
        "canExecute":(rC)=>rC["Nuts"],
        "visible":(rC,more) => more["actionCount"]["Gather Nuts"],
        "info":(rC)=>{
            let message = ["Good for food and protein."];
            if (!rC["Carrion"]) {
                message = message.concat(["You need Nuts."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Eggs",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Eggs"] += 1;
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Hills"], 0.25)/(1+rC["Eggs"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Hills"],
        "visible":(rC) => rC["Hills"],
        "info":(rC)=>{
            let message = ["Gather eggs. Faster with more Gatherers, Hills."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Eggs",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Eggs"] -= 1;
            modified["Illness"] += 1;
            modified["Food"] += 1;
            modified["Protein"] += 1;
        },
        "speed":(rC)=>{return 1/(1+rC["Food"]+rC["Protein"])},
        "canExecute":(rC)=>rC["Eggs"],
        "visible":(rC,more) => more["actionCount"]["Gather Eggs"],
        "info":(rC)=>{
            let message = ["A good source of protein, but raw, wild eggs still make you sick."];
            if (!rC["Carrion"]) {
                message = message.concat(["You need Eggs."]);
            }
            return message;
        }
    },
    {
        "name":"Pick Berries",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Berries"] += 1;
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["River"], 0.25)/(1+rC["Berries"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["River"],
        "visible":(rC) => rC["River"],
        "info":(rC)=>{
            let message = ["Pick berries. Faster with more Gatherers, River."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Berries",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Berries"] -= 1;
            modified["Illness"] += 1;
            modified["Food"] += 1;
        },
        "speed":(rC)=>{return 1/(1+rC["Food"])},
        "canExecute":(rC)=>rC["Berries"],
        "visible":(rC,more) => more["actionCount"]["Pick Berries"],
        "info":(rC)=>{
            let message = ["A nice treat."];
            if (!rC["Berries"]) {
                message = message.concat(["You need Berries."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Wood",
        "pane":"Resources",
        "effect":(modified) => modified["Wood"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Forest"], 0.25)/(1+rC["Wood"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Forest"],
        "visible":(rC) => rC["Forest"],
        "info":(rC)=>{
            let message = ["It's called the Stone Age, but wood was more widely used. It should be called the Wood Age. Faster with more Gatherers, Forest."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Rocks",
        "pane":"Resources",
        "effect":(modified) => modified["Rocks"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Rocks"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "visible":(rC) => rC["Savannah"],
        "info":(rC)=>{
            let message = ["Gathering rocks is boring, but they might be useful. Faster with more Gatherers, Savannah."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Make Stone Tools",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Rocks"] -= 1;
            modified["Stone Tools"] += 1;
        },
        "speed":(rC) => {return 0.05*Math.pow(rC["Stone Worker"]*rC["Rocks"], 0.25)/(1+rC["Stone Tools"])},
        "canExecute":(rc) => rc["Stone Worker"] && rc["Rocks"],
        "visible":(rC) => rC["Stone Worker"],
        "info":(rC)=>{
            let message = ["Manufacture some basic stone tools."];
            if (!rC["Rocks"]) {
                message = message.concat(["You need some Rocks."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Herbs",
        "pane":"Resources",
        "effect":(modified) => modified["Herbs"] += 1,
        "speed":(rC) => {return 0.05*Math.pow(rC["Gatherer"]*rC["River"], 0.25)/(1+rC["Herbs"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["River"],
        "visible":(rC) => rC["River"],
        "info":(rC)=>{
            let message = ["Gather some wild herbs. You should have a few on hand to help cure illness. Faster with more Gatherer, River."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Gather",
        "pane":"Resources",
        "effect":(modified)=>{},
        "speed":(rC) => {return 0.1},
        "canExecute":(rC)=> {
            return rC["Gatherer"]
        },
        "info":(rC) => {
            let message = ["Explore and gather a random resources. Faster than searching for a particular resource, but you might not get what you want. (Not yet implemented.)"];
            return message;
        }
    },
    {
        "name":"Build Campsite",
        "pane":"Buildings",
        "effect":(modified) => modified["Campsite"] += 1,
        "speed":(rC) => {return 0.02*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Campsite"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"] && rc["People"]>15,
        "visible":(rC) => rC["Savannah"],
        "info":(rC)=>{
            let message = ["Make camp here. Faster with more Gatherers, Savannah."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            if (rC["People"] <= 15) {
                message = message.concat(["You need more people."]);
            }
            return message;
        }
    },
    {
        "name":"Build Wood Shelter",
        "pane":"Buildings",
        "effect":(modified) => modified["Wood Shelter"] += 1,
        "speed":(rC) => {return 0.02*Math.pow(rC["Wood"]*rC["Campsite"]*rC["Wood Worker"], 1/6)/(1+rC["Wood Shelter"])},
        "canExecute":(rc) => rc["Campsite"] && rc["Wood Worker"],
        "visible":(rC) => rC["Campsite"],
        "info":(rC)=>{
            let message = ["Build a basic shelter. This will help your population grow. Faster with more Wood, Wood Workers, Campsites."];
            if (!rC["Wood Worker"]) {
                message = message.concat(["You need a Wood Worker."]);
            }
            return message;
        }
    },
    {
        "name":"Build Fire Pit",
        "pane":"Buildings",
        "effect":(modified) => modified["Fire Pit"] += 1,
        "speed":(rC) => {return 0.03*Math.pow(rC["Wood"]*rC["Campsite"], 0.25)/(1+rC["Fire Pit"])},
        "canExecute":(rc) => rc["Wood"] && rc["Campsite"],
        "visible":(rC) => rC["Campsite"],
        "info":(rC)=>{
            let message = ["It took early humans hundreds of thousands of years to figure out how to control fire. It took you a few minutes. Faster with more Wood, Campsite."];
            if (!rC["Wood"]) {
                message = message.concat(["You need some Wood."]);
            }
            return message;
        }
    },
    {
        "name":"Build Grain Storage",
        "pane":"Buildings",
        "effect":(modified) => modified["Grain Storage"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Wild Grains"]*rC["Cave"], 0.25)/(1+rC["Grain Storage"])},
        "canExecute":(rc) => rc["Wild Grains"] && rc["Cave"],
        "visible":(rC) => rC["Wild Grains"] || rC["Cave"],
        "info":(rC)=>{
            let message = ["Storing grain allows for more production of wild grain. Faster with more Wild Grains, Caves."];
            if (!rC["Wild Grains"]) {
                message = message.concat(["You need some Wild Grains to store."]);
            }
            if (!rC["Cave"]) {
                message = message.concat(["You need a Cave."]);
            }
            return message;
        }
    },
    {
        "name":"Form a Tribe",
        "pane":"Society",
        "effect":(modified, gameState) => {
            modified["Tribe"] += 1;
            if (modified["Tribe"] === 1) {
                addLog("You can continue building your population and resources if you so desire.",gameState);
                addLog("Your band has grown into a full-fledged tribe. This is the end of the current demo. Thanks for playing, and please check back later.",gameState);
            }
        },
        "speed":(rC) => {return 0.001*Math.pow(rC["People"]*(rC["Valley"]+rC["River"])*(rC["Fire Pit"]+rC["Grain Storage"]), 1/6)/(1+rC["Tribe"])},
        "canExecute":(rC) => rC["Valley"] && rC["River"] && rC["Fire Pit"] && rC["Grain Storage"] && rC["People"]>=50 && rC["Brain Size"]>=10,
        "visible":(rC) => rC["Valley"] && rC["River"] && rC["Fire Pit"] && rC["Grain Storage"],
        "info":(rC)=>{
            let message = ["Turn your band into an organized tribe. You need a lot of people. Faster with more People, Valley, River, Fire Pit, Grain Storage."];
            if (rC["People"] < 50) {
                message = message.concat(["You need more People."]);
            }
            if (rC["Brain Size"] < 10) {
                message = message.concat(["You need a bigger Brain Size, dummy."]);
            }
            return message;
        }
    },
    {
        "name":"Train Brute",
        "pane":"Military",
        "effect":(modified) => {
            modified["Brute"] += 1;
        },
        "speed":(rC)=>0.05*Math.pow(rC["People"],0.25)*Math.pow(rC["Protein"],0.25)/(1+rC["Brute"]),
        "canExecute":(rC) => {
            return rC["Protein"] && (rC["People"] > 9+(rC["Brute"]?rC["Brute"]:0) * 3);
        },
        "visible":(rC) => rC["People"] >= 10,
        "info":(rC)=>{
            let message = ["Train Brutes. Faster with more People, Protein."]
            if (rC["People"] <= 9+rC["Brute"] * 3) {
                message = message.concat(["You need more people."]);
            }
            if (!rC["Protein"]) {
                message = message.concat(["You need some Protein."])
            }
            return message;
        }
    },
    {
        "name":"Train Stone Thrower",
        "pane":"Military",
        "effect":(modified) => {
            modified["Stone Thrower"] += 1;
        },
        "speed":(rC)=>0.05*Math.pow(rC["People"],0.25)*Math.pow(rC["Protein"],0.25)/(1+rC["Stone Thrower"]),
        "canExecute":(rC) => {return rC["Rocks"] && rC["Protein"] && rC["People"] > 9+(rC["Stone Thrower"]?rC["Stone Thrower"]:0) * 3},
        "visible":(rC) => rC["People"] >= 10,
        "info":(rC)=>{
            let message = ["Train Stone Throwers. Faster with more People."]
            if (rC["People"] <= 9+rC["Stone Thrower"] * 3) {
                message = message.concat(["You need more people."]);
            }
            if (!rC["Protein"]) {
                message = message.concat(["You need some Protein."])
            }
            if (!rC["Rocks"]) {
                message = message.concat(["You need some Rocks to throw."])
            }
            return message;
        }
    },
    {
        "name":"Fight",
        "pane":"Military",
        "effect":(modified)=> {},
        "speed":(rC) => 0.1,
        "canExecute":(rC)=>{return rC["Brute"] || rC["Stone Thrower"]},
        "visible":(rC)=>{return rC["Brute"] || rC["Stone Thrower"]},
        "info":(rC)=>{
            let message = ["Start a fight. It doesn't do anything at the moment."];
            return message;
        }
    }
]
