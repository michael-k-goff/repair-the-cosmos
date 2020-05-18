// The first era, corresponding roughly to the Lower Paleolithic.

import {addLog, softCap} from "../gameLogic.js";

export const resources01 = [
    ["People","Population ","Your current population. The more the merrier."],
    ["Scout","Specialists","Scouts help you find new land."],
    ["Gatherer","Specialists","Gatherers are needed to get more food."],
    ["Wood Worker","Specialists","Specialized in carving wood implements"],
    ["Stone Worker","Specialists","Specialist in preparing stone tools"],
    ["Hunter","Specialists","The hunter is more skilled than the gatherer and also takes on more risk."],
    ["Brain Size","Health","During the Lower Paleolithic, homonid brains grew to their present size, which in Repair the Cosmos is 10."],
    ["Immune System","Health","Your Immune System slows illness, but does not cure it. More immunity gives you more time to apply a cure. It grows whenever someone dies of illness."],
    ["Illness","Health","Illness is bad. If untreated, it will kill your population. It comes from harvesting certain kinds of food.",{"character":"bad"}],
    ["Infant Mortality","Health","As brain size grows, delivery becomes more challenging, and more children die in childbirth. This stat is the percentage change that a child dies in birth. It decreases, to a point, with attempted births.",{"character":"bad"}],

    ["Garden of Eden","Territory","You have been kicked out. Repair the Cosmos."],
    ["Savannah","Territory","A good place for hunting and scavenging."],
    ["Forest","Territory","Harder to move around here."],
    ["Hills","Territory","Food is scarcer but the hills are more defensible."],
    ["Valley","Territory","Ideal place for founding a civilization."],
    ["River","Territory","Great for fishing and trade."],
    ["Cave","Territory","If you're going to be a band of cavepeople, you need a cave."],

    ["Food","Nutrition","Food is your most basic resource and needed to grow your civilization."],
    ["Protein","Nutrition","Concentrated nutritional energy. It is essential for growing your strength and endurance."],
    ["Wild Mushrooms","Wild Food","Wild mushrooms are good food."],
    ["Knowledge of Mushrooms","Food Knowledge","Through some unfortunate trial and error, you are learning which mushrooms won't make you sick."],
    ["Carrion","Wild Food","Not the most appetizing meal, but an important source of protein early in history."],
    ["Wild Grains","Wild Food","Before domestication, cereals were harvested from the wild."],
    ["Wild Fruit","Wild Food","A rare and delicious treat."],
    ["Nuts","Wild Food","High protein food that doesn't fight back."],
    ["Eggs","Wild Food","Before animal husbandry is invented, you gather eggs from the wild."],
    ["Berries","Wild Food","Berries are delicious, but they will make you sick if you're not careful."],
    ["Knowledge of Berries","Food Knowledge","White and yellow, kill a fellow. Purple and blue, good for you. Red could be good, could be dead."],
    ["Wood","Raw Materials","Go ahead and waste it. This stuff grows on trees."],
    ["Rocks","Raw Materials","Plain old rocks."],
    ["Stone Tools","Manufactured Goods","The most basic stone tools."],
    ["Herbs","Raw Materials","Cure illness. Use them on the Population tab."],

    ["Campsite","Buildings","A campsite to rest."],
    ["Wood Shelter","Buildings","A basic shelter for resting."],
    ["Fire Pit","Buildings","Mastering fire was a major accomplishment for your people."],
    ["Grain Storage","Buildings","Store grain in caves."],

    ["Tribe","Civilization","An organized tribe, based on mutual interpersonal familiarity."],

    ["Brute","Units","A basic brawler."],
    ["Stone Thrower","Units","Does not live in a glass house."]
]

export const actions01 = [
    {
        "name":"Reproduce",
        "pane":"Population ",
        "effect":(modified, gameState) => {
            let message = "";
            if (modified["People"] >= 10) {
                modified["Food"] -= 1;
                message = "You ate 1 _Food_. "
            }
            let success = Math.random() > modified["Infant Mortality"]/100 ? 1:0;
            if (!modified["Infant Mortality"]) {success = 1}
            modified["People"] += success;
            if (success) {
                message = "You gained 1 _People_. "+message;
            }
            else {
                message = "Childbirth was unsuccessful. "+message;
                if (modified["Infant Mortality"] >= 31) {
                    modified["Infant Mortality"] -= 1;
                    message = message + "_Infant Mortality_ has decreased by 1."
                }
            }
            addLog(message,gameState);
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
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Scout"] += 1;
            addLog("Trained 1 _Scout_.",gameState);
            if (modified["Scout"] === 1) {
                addLog("Now that you have a scout, head over to the Territory tab and explore your surroundings.",gameState);
            }
        },
        "speed":(rC) => {return softCap(10+2*rC["Scout"], rC["People"], 4)*Math.sqrt(rC["People"])/(10+5*rC["Scout"])},
        "canExecute":(rC) => rC["People"] >= 10,
        "visible":(rC) => rC["People"] >= 5,
        "info":(rC)=>{
            let message = ["Train _Scout_ to find more territory. Faster with more _People_."]
            if (rC["People"] < 10) {
                message = message.concat([`!You need ${10} _People_.`]);
            }
            return message;
        }
    },
    {
        "name":"Train Gatherer",
        "pane":"Specialists",
        "effect":(modified,gameState) => {
            modified["Gatherer"] += 1;
            addLog("Trained 1 _Gatherer_.",gameState);
        },
        "speed":(rC) => {return softCap(10+2*rC["Gatherer"], rC["People"], 4)*Math.sqrt(rC["People"])/(10+5*rC["Gatherer"])},
        "canExecute":(rC) => {return rC["People"] >= 10},
        "visible":(rC) => rC["People"] >= 5,
        "info":(rC)=>{
            let message = ["Train _Gatherer_ to find more food. Faster with more _People_."];
            if (rC["People"] < 10) {
                message = message.concat([`!You need ${10} _People_.`]);
            }
            return message;
        }
    },
    {
        "name":"Train Woodworker",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Wood Worker"] += 1;
            modified["Wood"] -= 2;
            addLog("Trained 1 _Wood Worker_ and consumed 2 _Wood_.",gameState);
        },
        "speed":(rC) => {
            return 0.1*softCap(11+4*rC["Wood Worker"], rC["People"], 4)*Math.pow(rC["People"]*rC["Wood"],0.25)/(1+rC["Wood Worker"])
        },
        "canExecute":(rC) => {return rC["Brain Size"]>=3 && rC["People"] >= 11 && rC["Wood"] >= 2},
        "visible":(rC,more) => more["actionCount"]["Gather Wood"],
        "info":(rC)=>{
            let message = ["Train _Wood Worker_ to fashion wooden tools. Faster with more _People_, _Wood_."];
            if (rC["People"] < 11) {
                message = message.concat([`!You need ${11} _People_.`]);
            }
            if (rC["Wood"] < 2) {
                message = message.concat(["!You need 3 _Wood_."]);
            }
            if (rC["Brain Size"] < 3) {
                message = message.concat(["!You need to increase _Brain Size_ to 3."]);
            }
            return message;
        }
    },
    {
        "name":"Train Stoneworker",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Stone Worker"] += 1;
            modified["Rocks"] -= 2;
            addLog("Trained 1 _Stone Worker_ and consumed 2 _Rocks_.",gameState);
        },
        "speed":(rC) => {return 0.1*softCap(11+4*rC["Stone Worker"], rC["People"], 4)*Math.pow(rC["People"]*rC["Rocks"],0.25)/(1+rC["Stone Worker"])},
        "canExecute":(rC) => {return rC["Brain Size"]>=3 && rC["People"] >= 11 && rC["Rocks"] >= 2},
        "visible":(rC,more) => more["actionCount"]["Gather Rocks"],
        "info":(rC)=>{
            let message = ["Train _Stone Worker_ to create and maintain _Stone Tools_. Faster with more _People_, _Rocks_."];
            if (rC["People"] < 11) {
                message = message.concat([`!You need ${11} _People_.`]);
            }
            if (rC["Rocks"] < 2) {
                message = message.concat(["!You need 2 _Rocks_."]);
            }
            if (rC["Brain Size"] < 3) {
                message = message.concat(["!You need to increase _Brain Size_ to 3."]);
            }
            return message;
        }
    },
    {
        "name":"Train Hunter",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Hunter"] += 1;
            addLog("Trained 1 _Hunter_.",gameState);
        },
        "speed":(rC) => {return 0.05*softCap(20+4*rC["Hunter"], rC["People"], 4)*Math.pow( rC["Gatherer"]*(rC["Wood Worker"]+rC["Stone Worker"]) , 0.25)/(1+rC["Hunter"])},
        "canExecute":(rC) => {return rC["People"] >= 20 && rC["Wood Worker"]+rC["Stone Worker"]>=1},
        "visible":(rC)=>rC["Wood Worker"] || rC["Stone Worker"],
        "info":(rC)=>{
            let message = ["Train _Hunter_. Faster with more _Gatherer_, _Wood Worker_, _Stone Worker_."];
            if (rC["People"] < 20) {
                message = message.concat(["!You need 20 _People_."]);
            }
            if (rC["Wood Worker"]+rC["Stone Worker"]<1) {
                message = message.concat(["!You need a _Wood Worker_ or _Stone Worker_."]);
            }
            return message;
        }
    },
    {
        "name":"Brain Expansion",
        "pane":"Health",
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
        "visible":(rC,more) => (more["actionCount"]["Brain Expansion"] || rC["Protein"]) && (!more["actionCount"]["Brain Expansion"] || more["actionCount"]["Brain Expansion"]<10),
        "info":(rC)=>{
            let message = ["Evolve into hominids with larger _Brain Size_. Grows faster with more _Protein_."];
            if (rC["Brain Size"] >= 10) {
                message = message.concat(["!Your _Brain Size_ is already at full capacity."]);
            }
            else if (rC["Protein"] < (rC["Brain Size"]?rC["Brain Size"]+1 : 1)) {
                message = message.concat(["!You need more _Protein_."]);
            }
            return message;
        }
    },
    {
        "name":"Succumb to Illness",
        "pane":"Health",
        "effect":(modified, gameState)=> {
            if (modified["People"] >= 3) {
                modified["People"] -= 1;
            }
            modified["Illness"] -= 1;
            modified["Immune System"] += 1;
            addLog("1 _People_ died of illness. Remaining _Illness_ has decreased by 1 and _Immune System_ has improved by 1.",gameState);
        },
        "speed":(rC) => {
            return 0.20*rC["Illness"]/(10+rC["Immune System"])
        },
        "canExecute":(rC) => rC["People"]>=3 && rC["Illness"]>=1,
        "auto":1,
        "info":(rC)=>{
            return ["Kills 1 _People_. Goes faster with more _Illness_ and slower with a better _Immune System_."];
        }
    },
    {
        "name":"Use Herbs",
        "pane":"Health",
        "effect":(modified, gameState) => {
            let illness_cured = 1+0.3*Math.sqrt(modified["Herbalist"])
            modified["Illness"] = Math.max(0,modified["Illness"]-illness_cured);
            modified["Herbs"] -= 1;
            addLog(`Cured ${Math.round(100*illness_cured)/100} _Illness_ and consumed 1 _Herbs_.`,gameState);
        },
        "speed":(rC)=>0.05*rC["Herbs"]*(1+Math.pow(rC["Herbalist"],0.25)),
        "canExecute":(rC) => rC["Herbs"]>=1 && rC["Illness"]>0,
        "visible":(rC,more) => more["actionCount"]["Gather Herbs"],
        "info":(rC)=>{
            let message = ["Apply _Herbs_ to cure _Illness_. Faster with more _Herbs_."];
            if (!rC["Herbs"]) {
                message = message.concat(["!You need to have an _Herbs_."]);
            }
            if (!rC["Illness"]) {
                message = message.concat(["!None of your people are ill, so there is no reason."]);
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
                message = message.concat(["!Explore the _Savannah_ some more first."]);
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
                message = message.concat(["!Explore the _Savannah_ some more first."]);
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
                message = message.concat(["!Explore the _Savannah_ some more first."]);
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
                message = message.concat(["!Explore the _Savannah_ some more first."]);
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
        "info":(rc) => ["You might find a _Cave_ in the side of a _Hills_. Faster with more _Scout_."]
    },
    {
        "name":"Gather Mushrooms",
        "pane":"Wild Food",
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
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Mushrooms",
        "pane":"Nutrition",
        "effect":(modified, gameState)=>{
            const illness = 2/(Math.max(2,modified["Knowledge of Mushrooms"]));
            const knowledge = 1/(1+Math.pow(modified["Knowledge of Mushrooms"],0.7));
            modified["Wild Mushrooms"] -= 1;
            modified["Illness"] += illness;
            let new_food = Math.min(1, 3/Math.sqrt(modified["Food"]+1))
            modified["Food"] += new_food;
            modified["Knowledge of Mushrooms"] += knowledge;
            addLog(`Ate 1 _Wild Mushrooms_, got ${Math.round(100*illness)/100} _Illness_, gained ${Math.round(100*new_food)/100} _Food_, and learned ${Math.round(100*knowledge)/100} _Knowledge of Mushrooms_.`,gameState);
        },
        "speed":(rC) => (1+Math.sqrt(rC["Wild Mushrooms"]))*0.2,
        "canExecute":(rC)=>rC["Wild Mushrooms"] >= 1,
        "visible":(rC,more) => more["actionCount"]["Gather Mushrooms"],
        "info":(rC)=>{
            let message = ["Eat a delicious mushroom. Faster with more _Wild Mushrooms_."];
            if (rC["Wild Mushrooms"] < 1) {
                message = message.concat(["!You need a _Wild Mushrooms_."]);
            }
            return message;
        }
    },
    {
        "name":"Harvest Carrion",
        "pane":"Wild Food",
        "effect":(modified, gameState) => {
            modified["Carrion"] += 1;
            addLog("Found 1 _Carrion_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Carrion"])},
        "canExecute":(rc, more) => rc["Gatherer"] && rc["Savannah"] && !more["actionCount"]["Hunt"],
        "visible":(rC, more) => rC["Savannah"] && !more["actionCount"]["Hunt"],
        "info":(rC)=>{
            let message = ["Watch out for the hyenas. Faster with more _Gatherer_, _Savannah_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Carrion",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            modified["Carrion"] -= 1;
            modified["Illness"] += 1;
            let new_food = Math.min(1, 3/Math.sqrt(modified["Food"]+1));
            modified["Food"] += new_food;
            let new_protein =  2*Math.min(1, 3/Math.sqrt(modified["Protein"]+1))
            modified["Protein"] += new_protein;
            addLog(`You ate 1 _Carrion_, which yields ${Math.round(100*new_food)/100} _Food_, ${Math.round(100*new_protein)/100} _Protein_, and causes 1 _Illness_.`,gameState);
        },
        "speed":(rC)=>(1+Math.sqrt(rC["Carrion"]))*0.1,
        "canExecute":(rC)=>rC["Carrion"]>=1,
        "visible":(rC,more) => more["actionCount"]["Harvest Carrion"] && !more["actionCount"]["Hunt"],
        "info":(rC)=>{
            let message = ["You need the _Protein_ ... but damn. Faste rwith more _Carrion_."];
            if (rC["Carrion"] < 1) {
                message = message.concat(["!You need _Carrion_."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Grains",
        "pane":"Wild Food",
        "effect":(modified, gameState) => {
            modified["Wild Grains"] += 1;
            addLog("Found 1 _Wild Grains_",gameState);
        },
        "speed":(rC) => {return 0.2*Math.pow(rC["Gatherer"]*rC["Savannah"]*(1+rC["Grain Storage"]), 1/6)/(1+rC["Wild Grains"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "visible":(rC) => rC["Savannah"],
        "info":(rC)=>{
            let message = ["Foraging for wild grains. Faster with more _Gatherer_, _Savannah_, _Grain Storage_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Grains",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            modified["Wild Grains"] -= 1;
            let new_food = Math.min(1, 3/Math.sqrt(modified["Food"]+1))
            modified["Food"] += new_food;
            addLog(`Ate 1 _Wild Grains_ and gained ${Math.floor(100*new_food)/100} _Food_.`, gameState);
        },
        "speed":(rC)=>{
            return (1+Math.sqrt(rC["Wild Grains"]))*0.1
        },
        "canExecute":(rC)=>rC["Wild Grains"]>=1,
        "visible":(rC,more) => more["actionCount"]["Gather Grains"],
        "info":(rC)=>{
            let message = ["Early grains were not much of a meal, but it will do. Faster with more _Wild Grains_."];
            if (rC["Wild Grains"] < 1) {
                message = message.concat(["!You need _Wild Grains_."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Fruit",
        "pane":"Wild Food",
        "effect":(modified, gameState) => {
            modified["Wild Fruit"] += 1;
            addLog("Gathered 1 _Wild Fruit_.", gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Wild Fruit"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "visible":(rC) => rC["Savannah"],
        "info":(rC)=>{
            let message = ["Looking for wild fruit. Faster with more _Gatherer_, _Savannah_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Fruit",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            modified["Wild Fruit"] -= 1;
            let new_food = Math.min(1, 3/Math.sqrt(modified["Food"]+1));
            modified["Food"] += 1;
            addLog(`Ate 1 _Wild Fruit_ and gained ${Math.floor(100*new_food)/100} _Food_.`, gameState);
        },
        "speed":(rC)=>(1+Math.sqrt(rC["Wild Fruit"]))*0.1,
        "canExecute":(rC)=>rC["Wild Fruit"]>=1,
        "visible":(rC,more) => more["actionCount"]["Gather Fruit"],
        "info":(rC)=>{
            let message = ["The tastiest meal you have available now. Faster with more _Wild Fruit_."];
            if (rC["Wild Fruit"] < 1) {
                message = message.concat(["!You need _Wild Fruit_."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Nuts",
        "pane":"Wild Food",
        "effect":(modified, gameState) => {
            modified["Nuts"] += 1;
            addLog("Gathered 1 _Nuts_.", gameState);
        },
        "speed":(rC) => {
            return 0.1*Math.pow(rC["Gatherer"]*rC["Valley"], 0.25)/(1+rC["Nuts"])
        },
        "canExecute":(rc) => rc["Gatherer"] && rc["Valley"],
        "visible":(rC) => rC["Valley"],
        "info":(rC)=>{
            let message = ["Pick nuts. Faster with more _Gatherer_, _Valley_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Nuts",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            modified["Nuts"] -= 1;
            let new_food = Math.min(1, 3/Math.sqrt(modified["Food"]+1));
            modified["Food"] += new_food;
            let new_protein = Math.min(1, 3/Math.sqrt(modified["Protein"]+1))
            modified["Protein"] += new_protein;
            addLog(`Ate 1 _Nuts_ and gained ${Math.floor(new_food*100)/100} _Food_ and ${Math.floor(new_protein*100)/100} _Protein_.`, gameState);
        },
        "speed":(rC)=>(1+Math.sqrt(rC["Nuts"]))*0.1,
        "canExecute":(rC)=>rC["Nuts"]>=1,
        "visible":(rC,more) => more["actionCount"]["Gather Nuts"],
        "info":(rC)=>{
            let message = ["Good for _Food_ and _Protein_. Faster with more _Nuts_."];
            if (rC["Nuts"] < 1) {
                message = message.concat(["!You need _Nuts_."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Eggs",
        "pane":"Wild Food",
        "effect":(modified, gameState) => {
            modified["Eggs"] += 1;
            addLog("Gathered 1 _Eggs_.", gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Hills"], 0.25)/(1+rC["Eggs"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Hills"],
        "visible":(rC) => rC["Hills"],
        "info":(rC)=>{
            let message = ["Gather _Eggs_. Faster with more _Gatherer_, _Hills_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Eggs",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            modified["Eggs"] -= 1;
            modified["Illness"] += 1;
            let new_food = Math.min(1, 3/Math.sqrt(modified["Food"]+1));
            modified["Food"] += new_food;
            let new_protein = Math.min(1, 3/Math.sqrt(modified["Food"]+1));
            modified["Protein"] += new_protein;
            addLog(`Ate 1 _Eggs_, which caused a gain of ${Math.floor(100*new_food)/100} _Food_, ${Math.floor(100*new_protein)/100} _Protein_, and 1 _Illness_.`,gameState);
        },
        "speed":(rC)=>(1+Math.sqrt(rC["Eggs"]))*0.1,
        "canExecute":(rC)=>rC["Eggs"]>=1,
        "visible":(rC,more) => more["actionCount"]["Gather Eggs"],
        "info":(rC)=>{
            let message = ["A good source of _Protein_, but raw, wild eggs still make you sick. Faster with more _Eggs_."];
            if (rC["Eggs"] < 1) {
                message = message.concat(["!You need _Eggs_."]);
            }
            return message;
        }
    },
    {
        "name":"Pick Berries",
        "pane":"Wild Food",
        "effect":(modified, gameState) => {
            modified["Berries"] += 1;
            addLog("Picked 1 _Berries_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["River"], 0.25)/(1+rC["Berries"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["River"],
        "visible":(rC) => rC["River"],
        "info":(rC)=>{
            let message = ["Pick _Berries_. Faster with more _Gatherer_, _River_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Berries",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            const illness = 2/(Math.max(2,modified["Knowledge of Berries"]));
            const knowledge = 1/(1+Math.pow(modified["Knowledge of Berries"],0.7));
            modified["Berries"] -= 1;
            modified["Illness"] += illness;
            let new_food = Math.min(1, 3/Math.sqrt(modified["Food"]+1));
            modified["Food"] += new_food;
            modified["Knowledge of Berries"] += knowledge;
            addLog(`Ate 1 _Berries_, got ${Math.round(100*illness)/100} _Illness_, gained ${Math.round(100*new_food)/100} _Food_, and learned ${Math.round(100*knowledge)/100} _Knowledge of Berries_.`,gameState);
        },
        "speed":(rC)=>(1+Math.sqrt(rC["Berries"]))*0.1,
        "canExecute":(rC)=>rC["Berries"]>=1,
        "visible":(rC,more) => more["actionCount"]["Pick Berries"],
        "info":(rC)=>{
            let message = ["A nice treat. Faster with more _Berries_."];
            if (rC["Berries"] < 1) {
                message = message.concat(["!You need _Berries_."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Wood",
        "pane":"Raw Materials",
        "effect":(modified, gameState) => {
            modified["Wood"] += 1;
            addLog("Gathered 1 _Wood_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Forest"], 0.25)/(1+rC["Wood"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Forest"],
        "visible":(rC) => rC["Forest"],
        "info":(rC)=>{
            let message = ["It's called the Stone Age, but _Wood_ was more widely used. It should be called the Wood Age. Faster with more _Gatherer_, _Forest_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Rocks",
        "pane":"Raw Materials",
        "effect":(modified, gameState) => {
            modified["Rocks"] += 1;
            addLog("Gathered 1 _Rocks_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Rocks"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "visible":(rC) => rC["Savannah"],
        "info":(rC)=>{
            let message = ["Gathering _Rocks_ is boring, but they might be useful. Faster with more _Gatherer_, _Savannah_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Make Stone Tools",
        "pane":"Manufactured Goods",
        "effect":(modified, gameState) => {
            modified["Rocks"] -= 1;
            modified["Stone Tools"] += 1;
            addLog("Made 1 _Stone Tools_ from 1 _Rocks_.", gameState);
        },
        "speed":(rC) => {return 0.05*Math.pow(rC["Stone Worker"]*rC["Rocks"], 0.25)/(1+rC["Stone Tools"])},
        "canExecute":(rc) => rc["Stone Worker"] && rc["Rocks"],
        "visible":(rC) => rC["Stone Worker"],
        "info":(rC)=>{
            let message = ["Manufacture some basic _Stone Tools_. Faster with more _Stone Worker_ and _Rocks_."];
            if (rC["Rocks"] < 1) {
                message = message.concat(["!You need some _Rocks_."]);
            }
            return message;
        }
    },
    {
        "name":"Gather Herbs",
        "pane":"Raw Materials",
        "effect":(modified, gameState) => {
            let num_herbs = 1+0.2*Math.pow(modified["Herbalist"],0.3);
            modified["Herbs"] += num_herbs;
            addLog(`Gathered ${Math.floor(num_herbs*100)/100} _Herbs_.`, gameState)
        },
        "speed":(rC) => {return 0.05*Math.pow(rC["Gatherer"]*rC["River"], 0.25)/(1+rC["Herbs"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["River"],
        "visible":(rC) => rC["River"],
        "info":(rC)=>{
            let message = ["Gather some _Herbs_. You should have a few on hand to help cure _Illness_. Faster with more _Gatherer_, _River_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Gather",
        "pane":"Resources",
        "effect":(modified, gameState)=>{
            let gatherResults = [
                ["Gather Herbs","Herbs"],["Gather Rocks","Rocks"],["Gather Wood","Wood"],
                ["Pick Berries","Berries"],["Gather Eggs","Eggs"],["Gather Nuts","Nuts"],
                ["Gather Fruit","Wild Fruit"],["Gather Grains","Wild Grains"],
                ["Harvest Carrion","Carrion"],["Gather Mushrooms","Wild Mushrooms"]
            ].filter((x)=>gameState.actions_dict[x[0]].canExecute(modified,gameState));
            if (gatherResults.length === 0) {
                addLog("Your gatherers failed to find anything useful.");
                return;
            }
            let result = Math.floor(gatherResults.length*Math.random());
            let speed = gameState.actions_dict[gatherResults[result][0]].speed(modified, gameState);
            // Assuming that each of the actions considered produces 1 resource.
            // Modify the following if that changes.
            let bonus = speed*60*2;
            modified[gatherResults[result][1]] += bonus;
            console.log(gatherResults[result][1]);
            addLog(`Your gatherers have found ${Math.round(100*bonus)/100} _${gatherResults[result][1]}_.`,gameState);
        },
        "speed":(rC) => {return 1/60},
        "canExecute":(rC, gameState)=> {
            return rC["Gatherer"]
        },
        "info":(rC) => {
            let message = ["Gather a random resources. Results are twice as good, per second, compared to dedicated searching."];
            return message;
        }
    },
    {
        "name":"Build Campsite",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Campsite"] += 1;
            addLog("Built 1 _Campsite_.",gameState);
        },
        "speed":(rC) => {return 0.02*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Campsite"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"] && rc["People"]>15,
        "visible":(rC) => rC["Savannah"],
        "info":(rC)=>{
            let message = ["Make camp here. Faster with more _Gatherer_, _Savannah_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            if (rC["People"] <= 15) {
                message = message.concat(["!You need more _People_."]);
            }
            return message;
        }
    },
    {
        "name":"Build Wood Shelter",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Wood Shelter"] += 1;
            modified["Wood"] -= 3;
            addLog("Built 1 _Wood Shelter_ and consumed 3 _Wood_.",gameState);
        },
        "speed":(rC) => {return 0.02*Math.pow(rC["Wood"]*rC["Campsite"]*rC["Wood Worker"], 1/6)/(1+rC["Wood Shelter"])},
        "canExecute":(rc) => rc["Campsite"] && rc["Wood Worker"] && rc["Wood"]>=3,
        "visible":(rC) => rC["Campsite"],
        "info":(rC)=>{
            let message = ["Build a basic shelter. This will help your population grow. Faster with more _Wood_, _Wood Worker_, _Campsite_."];
            if (!rC["Wood Worker"]) {
                message = message.concat(["!You need a _Wood Worker_."]);
            }
            if (rC["Wood"] < 3) {
                message = message.concat(["!You need more _Wood_."]);
            }
            return message;
        }
    },
    {
        "name":"Build Fire Pit",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Fire Pit"] += 1;
            addLog("Built 1 _Fire Pit_.",gameState);
        },
        "speed":(rC) => {return 0.03*Math.pow(rC["Wood"]*rC["Campsite"], 0.25)/(1+rC["Fire Pit"])},
        "canExecute":(rc) => rc["Wood"] && rc["Campsite"],
        "visible":(rC) => rC["Campsite"],
        "info":(rC)=>{
            let message = ["It took early humans hundreds of thousands of years to figure out how to control fire. It took you a few minutes. Faster with more _Wood_, _Campsite_."];
            if (!rC["Wood"]) {
                message = message.concat(["You need some _Wood_."]);
            }
            return message;
        }
    },
    {
        "name":"Build Grain Storage",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Grain Storage"] += 1;
            addLog("Built 1 _Grain Storage_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Wild Grains"]*rC["Cave"], 0.25)/(1+rC["Grain Storage"])},
        "canExecute":(rc) => rc["Wild Grains"] && rc["Cave"],
        "visible":(rC) => rC["Wild Grains"] || rC["Cave"],
        "info":(rC)=>{
            let message = ["Storing grain allows for more production of wild grain. Faster with more _Wild Grains_, _Cave_."];
            if (!rC["Wild Grains"]) {
                message = message.concat(["!You need some _Wild Grains_ to store."]);
            }
            if (!rC["Cave"]) {
                message = message.concat(["!You need a _Cave_."]);
            }
            return message;
        }
    },
    {
        "name":"Form a Tribe",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Tribe"] += 1;
            modified["Garden of Eden"] = 0;
            addLog("Formed 1 _Tribe_.",gameState);
            if (modified["Tribe"] === 1) {
                addLog("With your first Tribe formed, your population is advancing toward cognitive modernity and reaching the Upper Paleolithic.",gameState);
                addLog("The _Garden of Eden_ has been lost to mythology.",gameState);
            }
        },
        "speed":(rC) => {return 0.001*Math.pow(rC["People"]*(rC["Valley"]+rC["River"])*(rC["Fire Pit"]+rC["Grain Storage"]), 1/6)/(1+rC["Tribe"])},
        "canExecute":(rC) => rC["Valley"] && rC["River"] && rC["Fire Pit"] && rC["Grain Storage"] && rC["People"]>=50 && rC["Brain Size"]>=10,
        "visible":(rC) => rC["Valley"] && rC["River"] && rC["Fire Pit"] && rC["Grain Storage"],
        "info":(rC)=>{
            let message = ["Turn your band into an organized tribe. You need a lot of people. Faster with more _People_, _Valley_, _River_, _Fire Pit_, _Grain Storage_."];
            if (rC["People"] < 50) {
                message = message.concat(["!You need 50 _People_."]);
            }
            if (rC["Brain Size"] < 10) {
                message = message.concat(["!You need a bigger _Brain Size_, dummy."]);
            }
            return message;
        }
    },
    {
        "name":"Train Brute",
        "pane":"Units",
        "effect":(modified,gameState) => {
            modified["Brute"] += 1;
            modified["Protein"] -= 1;
            addLog("Trained 1 _Brute_ and consumed 1 _Protein_.",gameState);
        },
        "speed":(rC)=>0.05*softCap(10+3*rC["Brute"], rC["People"], 4)*Math.pow(rC["People"],0.25)*Math.pow(rC["Protein"],0.25)/(1+rC["Brute"]),
        "canExecute":(rC) => {
            return rC["Protein"] >= 1 && (rC["People"] >= 10);
        },
        "visible":(rC) => rC["People"] >= 10,
        "info":(rC)=>{
            let message = ["Train _Brute_. Faster with more _People_, _Protein_."]
            if (rC["Protein"] < 1) {
                message = message.concat(["!You need 1 _Protein_."])
            }
            return message;
        }
    },
    {
        "name":"Train Stone Thrower",
        "pane":"Units",
        "effect":(modified, gameState) => {
            modified["Stone Thrower"] += 1;
            modified["Protein"] -= 1;
            addLog("Trained 1 _Stone Thrower_ and consumed 1 _Protein_.",gameState);
        },
        "speed":(rC)=>0.05*softCap(10+3*rC["Stone Thrower"], rC["People"], 4)*Math.pow(rC["People"],0.25)*Math.pow(rC["Protein"],0.25)/(1+rC["Stone Thrower"]),
        "canExecute":(rC) => {return rC["Rocks"] && rC["Protein"]>=1 && rC["People"] >= 10},
        "visible":(rC) => rC["People"] >= 10,
        "info":(rC)=>{
            let message = ["Train _Stone Thrower_. Faster with more _People_, _Protein_."]
            if (rC["People"] <= 9+rC["Stone Thrower"] * 3) {
                message = message.concat(["!You need more _People_."]);
            }
            if (rC["Protein"] <= 1) {
                message = message.concat(["!You need some _Protein_."])
            }
            if (!rC["Rocks"]) {
                message = message.concat(["!You need some _Rocks_ to throw."])
            }
            return message;
        }
    },
    {
        "name":"Fight",
        "pane":"Military Subpane",
        "effect":(modified,gameState)=> {
            // Will add more detail and differentiate the units later
            let power = Math.sqrt(modified["Brute"])+Math.sqrt(modified["Stone Thrower"]);
            let r = [Math.random(), Math.random()];
            if (r[0] > r[1]) {
                r = [r[1],r[0]];
            }
            let new_pop = 5*r[0]*power/(1+modified["People"]);
            let new_food = 10*(r[1]-r[0])*power/(1+modified["Food"]);
            let new_protein = 5*(1-r[1])*power/(1+modified["Protein"]);
            let loss_brute = modified["Brute"]/(modified["Brute"]+modified["Stone Thrower"]);
            let loss_st = modified["Stone Thrower"]/(modified["Brute"]+modified["Stone Thrower"]);
            modified["People"] += new_pop;
            modified["Food"] += new_food;
            modified["Protein"] += new_protein;
            modified["Brute"] -= loss_brute;
            modified["Stone Thrower"] -= loss_st
            addLog(`Got into a fight. Gained ${Math.round(100*new_pop)/100} _People_, ${Math.round(100*new_food)/100} _Food_, ${Math.round(100*new_protein)/100} _Protein_ and lost ${Math.round(100*loss_brute)/100} _Brute_ and ${Math.round(100*loss_st)/100} _Stone Thrower_.`, gameState);
        },
        "speed":(rC) => 1/60,
        "canExecute":(rC)=>{return rC["Brute"]>=1 || rC["Stone Thrower"]>=1},
        "visible":(rC)=>{return rC["Brute"] || rC["Stone Thrower"]},
        "info":(rC)=>{
            let message = ["Start a fight. You will gain _People_, _Food_, _Protein_ and lose a unit. Better rewards with more _Brute_, _Stone Thrower_."];
            return message;
        }
    }
]
