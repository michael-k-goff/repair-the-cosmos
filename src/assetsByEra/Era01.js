// The first era, corresponding roughly to the Lower Paleolithic.

export const resources01 = [
    ["People","Population","Your current population. The more the merrier."],
    ["Scout","Population","Scouts help you find new land."],
    ["Gatherer","Population","Gatherers are needed to get more food."],
    ["Wood Worker","Population","Specialized in carving wood implements"],
    ["Stone Worker","Population","Specialist in preparing stone tools"],
    ["Hunter","Population","The hunter is more skilled than the gatherer and also takes on more risk."],
    ["Illness","Population","Illness is bad. If untreated, it will kill your population. It comes from harvesting certain kinds of food.",{"character":"bad"}],

    ["Garden of Eden","Territory","You have been kicked out. Repair the Cosmos."],
    ["Savannah","Territory","A good place for hunting and scavenging."],
    ["Forest","Territory","Harder to move around here."],
    ["Hills","Territory","Food is scarcer but the hills are more defensible."],
    ["Valley","Territory","Ideal place for founding a civilization."],
    ["River","Territory","Great for fishing and trade."],
    ["Cave","Territory","If you're going to be a band of cavepeople, you need a cave."],

    ["Food","Resources","Food is your most basic resource and needed to grow your civilization."],
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
    ["Herbs","Resources","Cure illness. Use them on the Population tab."],

    ["Campsite","Buildings","A campsite to rest."],
    ["Wood Shelter","Buildings","A basic shelter for resting."],
    ["Fire Pit","Buildings","Mastering fire was a major accomplishment for your people."],
    ["Grain Storage","Buildings","Store grain in caves."],

    ["Tribe","Society","An organized tribe, based on mutual interpersonal familiarity."]
]

export const actions01 = [
    {
        "name":"Reproduce",
        "pane":"Population",
        "effect":(modified, setStory) => {
            if (modified["People"] >= 10) {
                modified["Food"] -= 1;
            }
            modified["People"] += 1;
            if (modified["People"]===10 && !modified["Savannah"]) {
                setStory(["Great work, your band is growing. Now it is time to specialize.","I suggest you train a scout so you can explore your surroundings."])
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
            let message = ["Grow your population. Faster with more food."];
            if (rC["People"] >= 10 && !rC["Food"]) {
                message = message.concat(["You need food to grow further."]);
            }
            return message;
        }
    },
    {
        "name":"Train Scout",
        "pane":"Population",
        "effect":(modified, setStory) => {
            modified["Scout"] += 1;
            if (modified["Scout"] === 1) {
                setStory(["Now that you have a scout, head over to the Territory tab and explore your surroundings."])
            }
        },
        "speed":(rC) => {return Math.sqrt(rC["People"])/(10+5*rC["Scout"])},
        "canExecute":(rC) => {return rC["People"] > 9+rC["Scout"] * 2},
        "visible":(rC) => rC["People"] >= 10,
        "info":(rC)=>{
            let message = ["Train scouts to find more territory. Faster with more People."]
            if (rC["People"] <= 9+rC["Scout"] * 2) {
                message = message.concat(["You need more people."]);
            }
            return message;
        }
    },
    {
        "name":"Train Gatherer",
        "pane":"Population",
        "effect":(modified) => {
            modified["Gatherer"] += 1;
        },
        "speed":(rC) => {return Math.sqrt(rC["People"])/(10+5*rC["Gatherer"])},
        "canExecute":(rC) => {return rC["People"] > 9+rC["Gatherer"] * 2},
        "visible":(rC) => rC["People"] >= 10,
        "info":(rC)=>{
            let message = ["Train gatherers to find more food. Faster with more People."];
            if (rC["People"] <= 9+rC["Gatherer"] * 2) {
                message = message.concat(["You need more people."]);
            }
            return message;
        }
    },
    {
        "name":"Train Woodworker",
        "pane":"Population",
        "effect":(modified) => {
            modified["Wood Worker"] += 1;
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Wood"],0.25)/(1+rC["Wood Worker"])},
        "canExecute":(rC) => {return rC["People"] > 10+rC["Wood Worker"] * 4 && rC["Wood"] > 2+rC["Wood Worker"] * 2},
        "visible":(rC) => rC["Wood"] >= 1,
        "info":(rC)=>{
            let message = ["Train wood workers to fashion wooden tools. Faster with more People, Wood."];
            if (rC["People"] <= 10+rC["Wood Worker"] * 4) {
                message = message.concat(["You need more people."]);
            }
            if (rC["Wood"] <= 2+rC["Wood Worker"] * 2) {
                message = message.concat(["You need more Wood."]);
            }
            return message;
        }
    },
    {
        "name":"Train Stoneworker",
        "pane":"Population",
        "effect":(modified) => {
            modified["Stone Worker"] += 1;
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["People"]*rC["Rocks"],0.25)/(1+rC["Stone Worker"])},
        "canExecute":(rC) => {return rC["People"] > 10+rC["Stone Worker"] * 4 && rC["Rocks"] > 2+rC["Stone Worker"] * 2},
        "visible":(rC) => rC["Rocks"] >= 1,
        "info":(rC)=>{
            let message = ["Train stone workers to create and maintain stone tools. Faster with more People, Rocks."];
            if (rC["People"] <= 10+rC["Stone Worker"] * 4) {
                message = message.concat(["You need more people."]);
            }
            if (rC["Rocks"] <= 2+rC["Stone Worker"] * 2) {
                message = message.concat(["You need more Rocks."]);
            }
            return message;
        }
    },
    {
        "name":"Train Hunter",
        "pane":"Population",
        "effect":(modified) => {
            modified["Hunter"] += 1;
        },
        "speed":(rC) => {return 0.05*Math.pow( rC["Gatherer"]*(rC["Wood Worker"]+rC["Stone Worker"]) , 0.25)/(1+rC["Hunter"])},
        "canExecute":(rC) => {return rC["Gatherer"] > 2+rC["Hunter"] * 2 && rC["Wood Worker"]+rC["Stone Worker"]>rC["Hunter"]},
        "visible":(rC)=>rC["Wood Worker"] || rC["Stone Worker"],
        "info":(rC)=>{
            let message = ["Train hunter. Faster with more Gatherers, Wood Workers, Stone Workers."];
            if (rC["Gatherer"] <= 2+rC["Hunter"] * 2) {
                message = message.concat(["You need more Gatherers."]);
            }
            if (rC["Wood Worker"]+rC["Stone Worker"]<=rC["Hunter"]) {
                message = message.concat(["You need more Wood Workers or Stone Workers."]);
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
        "speed":(rC) => {return 0.001*rC["People"]*rC["Illness"]},
        "canExecute":(rC) => rC["People"]>2 && rC["Illness"]>=1,
        "auto":1,
        "info":(rC)=>{
            return ["Kills a person. Goes faster with more Illness and more people."];
        }
    },
    {
        "name":"Use Herbs",
        "pane":"Population",
        "effect":(modified) => {
            modified["Illness"] -= 1;
            modified["Herbs"] -= 1;
        },
        "speed":(rC)=>0.05*rC["Herbs"],
        "canExecute":(rC) => rC["Herbs"] && rC["Illness"]>=1,
        "visible":(rC,more) => more["actionCount"]["Gather Herbs"],
        "info":(rC)=>{
            let message = ["Apply herbs to cure illness."];
            if (!rC["Herbs"]) {
                message = message.concat(["You need to have an Herb."]);
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
        "effect":(modified, setStory) => {
            modified["Savannah"] += 1;
            if (modified["Savannah"]===1) {
                setStory(["You have discovered some open Savannah. Now you should head over to the Resources tab and start gathering some material. You are well on your way to repairing the cosmos."])
            }
        },
        "speed":(rC) => {return 0.2*Math.sqrt(rC["Scout"])/(1+rC["Savannah"])},
        "canExecute":(rC) => rC["Scout"],
        "info":(rc) => ["Search for Savannah to settle. Faster with more Scouts."]
    },
    {
        "name":"Explore Forest",
        "pane":"Territory",
        "effect":(modified) => modified["Forest"] += 1,
        "speed":(rC) => {return 0.1*Math.sqrt(rC["Scout"])/(1+rC["Forest"])},
        "canExecute":(rC) => rC["Savannah"]>=3,
        "visible":(rC)=>rC["Savannah"],
        "info":(rC)=>{
            let message = ["Search for Forest to settle. Faster with more Scouts."];
            if (rC["Savannah"] < 3) {
                message = message.concat(["Explore the Savannah some more first."]);
            }
            return message;
        }
    },
    {
        "name":"Explore Hills",
        "pane":"Territory",
        "effect":(modified) => modified["Hills"] += 1,
        "speed":(rC) => {return 0.1*Math.sqrt(rC["Scout"])/(1+rC["Hills"])},
        "canExecute":(rC) => rC["Savannah"]>=3,
        "visible":(rC)=>rC["Savannah"],
        "info":(rC)=>{
            let message = ["Search for Hills to settle. Faster with more Scouts."];
            if (rC["Savannah"] < 3) {
                message = message.concat(["Explore the Savannah some more first."]);
            }
            return message;
        }
    },
    {
        "name":"Explore Valley",
        "pane":"Territory",
        "effect":(modified) => modified["Valley"] += 1,
        "speed":(rC) => {return 0.07*Math.sqrt(rC["Scout"])/(1+rC["Valley"])},
        "canExecute":(rC) => rC["Savannah"]>=3,
        "visible":(rC)=>rC["Savannah"],
        "info":(rC)=>{
            let message = ["Search for Valley to settle. Faster with more Scouts."];
            if (rC["Savannah"] < 3) {
                message = message.concat(["Explore the Savannah some more first."]);
            }
            return message;
        }
    },
    {
        "name":"Explore River",
        "pane":"Territory",
        "effect":(modified) => modified["River"] += 1,
        "speed":(rC) => {return 0.07*Math.sqrt(rC["Scout"])/(1+rC["River"])},
        "canExecute":(rC) => rC["Savannah"]>=3,
        "visible":(rC)=>rC["Savannah"],
        "info":(rC)=>{
            let message = ["Search for River to settle. Faster with more Scouts."];
            if (rC["Savannah"] < 3) {
                message = message.concat(["Explore the Savannah some more first."]);
            }
            return message;
        }
    },
    {
        "name":"Explore Cave",
        "pane":"Territory",
        "effect":(modified) => modified["Cave"] += 1,
        "speed":(rC) => {return 0.05*Math.sqrt(rC["Scout"])/(1+rC["Cave"])},
        "canExecute":(rc) => rc["Hills"],
        "info":(rc) => ["You might find a cave in the side of a hill. Faster with more Scouts."]
    },
    {
        "name":"Gather Mushrooms",
        "pane":"Resources",
        "effect":(modified) => {
            modified["Wild Mushrooms"] += 1;
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Forest"], 0.25)/(1+rC["Wild Mushrooms"])},
        "canExecute":(rC) => rC["Gatherer"] && rC["Forest"],
        "visible":(rC) => rC["Forest"],
        "info":(rC)=>{
            let message = ["It took a long time to learn which ones are edible. Faster with more Gatherers, Forest."];
            if (!rC["Gatherer"]) {
                message = message.concat(["You need a Gatherer."]);
            }
            return message;
        }
    },
    {
        "name":"Consume Mushrooms",
        "pane":"Resources",
        "effect":(modified)=>{
            modified["Wild Mushrooms"] -= 1;
            modified["Illness"] += 2/(Math.max(2,modified["Knowledge of Mushrooms"]));
            modified["Food"] += 1;
            modified["Knowledge of Mushrooms"] += ( 1/(1+Math.pow(modified["Knowledge of Mushrooms"],0.7)) );
        },
        "speed":(rC) => {return 1/(1+rC["Food"])},
        "canExecute":(rC)=>rC["Wild Mushrooms"],
        "visible":(rC,more) => more["actionCount"]["Gather Mushrooms"],
        "info":(rC)=>{
            let message = ["Eat a delicious mushroom."];
            if (!rC["Wild Mushrooms"]) {
                message = message.concat(["You need a Mushroom."]);
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
        },
        "speed":(rC)=>{return 1/(1+rC["Food"])},
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
        },
        "speed":(rC)=>{return 1/(1+rC["Food"])},
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
        },
        "speed":(rC)=>{return 1/(1+rC["Food"])},
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
        "effect":(modified, setStory) => {
            modified["Tribe"] += 1;
            setStory(["Your band has grown into a full-fledged tribe. This is the end of the current demo. Thanks for playing, and please check back later.","You can continue building your population and resources if you so desire."]);
        },
        "speed":(rC) => {return 0.001*Math.pow(rC["People"]*(rC["Valley"]+rC["River"])*(rC["Fire Pit"]+rC["Grain Storage"]), 1/6)/(1+rC["Tribe"])},
        "canExecute":(rC) => rC["Valley"] && rC["River"] && rC["Fire Pit"] && rC["Grain Storage"] && rC["People"]>=50,
        "visible":(rC) => rC["Valley"] && rC["River"] && rC["Fire Pit"] && rC["Grain Storage"],
        "info":(rC)=>{
            let message = ["Turn your band into an organized tribe. You need a lot of people. Faster with more People, Valley, River, Fire Pit, Grain Storage."];
            if (rC["People"] < 50) {
                message = message.concat(["You need more People."]);
            }
            return message;
        }
    }
]
