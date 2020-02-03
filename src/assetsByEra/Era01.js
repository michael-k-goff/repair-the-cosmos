// The first era, corresponding roughly to the Lower Paleolithic.

export const resources01 = [
    ["People","Population","Your current population. The more the merrier."],
    ["Scout","Population","Scouts help you find new land."],
    ["Gatherer","Population","Gatherers are needed to get more food."],
    ["Wood Worker","Population","Specialized in carving wood implements"],
    ["Stone Worker","Population","Specialist in preparing stone tools"],
    ["Hunter","Population","The hunter is more skilled than the gatherer and also takes on more risk."],

    ["Garden of Eden","Territory","You have been kicked out. Repair the Cosmos."],
    ["Savannah","Territory","A good place for hunting and scavenging."],
    ["Forest","Territory","Harder to move around here."],
    ["Hills","Territory","Food is scarcer but the hills are more defensible."],
    ["Valley","Territory","Ideal place for founding a civilization."],
    ["River","Territory","Great for fishing and trade."],
    ["Cave","Territory","If you're going to be a band of cavepeople, you need a cave."],

    ["Wild Mushrooms","Resources","Wild mushrooms are good food."],
    ["Carrion","Resources","Not the most appetizing meal."],
    ["Wild Grains","Resources","Before domestication, cereals were harvested from the wild."],
    ["Wild Fruit","Resources","A rare and delicious treat."],
    ["Wood","Resources","Go ahead and waste it. This stuff grows on trees."],
    ["Rocks","Resources","Plain old rocks."],

    ["Campsite","Buildings","A campsite to rest."],
    ["Fire Pit","Buildings","Mastering fire was a major accomplishment for your people."],
    ["Grain Storage","Buildings","Store grain in caves."],

    ["Tribe","Society","An organized tribe, based on mutual interpersonal knowledge."]
]

export const actions01 = [
    {
        "name":"Reproduce",
        "pane":"Population",
        "effect":(modified, setStory) => {
            modified["People"] += 1;
            if (modified["People"]==10) {
                setStory(["Great work, your band is growing. Now it is time to specialize.","I suggest you train a scout so you can explore your surroundings."])
            }
        },
        "speed":(rC) => {
            return (1+Math.sqrt(rC["Wild Mushrooms"])+Math.sqrt(rC["Carrion"])+Math.sqrt(rC["Wild Grains"])+Math.sqrt(rC["Wild Fruit"]))/rC["People"];
        },
        "canExecute":(rC) => {return 1},
        "info":(rC)=>{
            let message = ["Grow your population. More food and shelter helps you grow faster."];
            return message;
        }
    },
    {
        "name":"Train Scout",
        "pane":"Population",
        "effect":(modified, setStory) => {
            modified["Scout"] += 1;
            if (modified["Scout"] == 1) {
                setStory(["Now that you have a scout, head over to the Territory tab and explore your surroundings."])
            }
        },
        "speed":(rC) => {return Math.sqrt(rC["People"])/(10+5*rC["Scout"])},
        "canExecute":(rC) => {return rC["People"] > 9+rC["Scout"] * 2},
        "info":(rC)=>{
            let message = ["Train scouts to find more territory."]
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
        "info":(rC)=>{
            let message = ["Train gatherers to find more food."];
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
        "info":(rC)=>{
            let message = ["Train wood workers to fashion wooden tools."];
            if (rC["People"] <= 10+rC["Wood Worker"] * 4) {
                message = message.concat(["You need more people."]);
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
        "info":(rC)=>{
            let message = ["Train stone workers to create and maintain stone tools."];
            if (rC["People"] <= 10+rC["Stone Worker"] * 4) {
                message = message.concat(["You need more people."]);
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
        "info":(rC)=>{
            let message = ["Train hunter."];
            return message;
        }
    },
    {
        "name":"Explore Savannah",
        "pane":"Territory",
        "effect":(modified, setStory) => {
            modified["Savannah"] += 1;
            if (modified["Savannah"]==1) {
                setStory(["You have discovered some open Savannah. Now you should head over to the Resources tab and start gathering some material. You are well on your way to repairing the cosmos."])
            }
        },
        "speed":(rC) => {return 0.2*Math.sqrt(rC["Scout"])/(1+rC["Savannah"])},
        "canExecute":(rC) => rC["Scout"],
        "info":(rc) => ["Search for Savannah to settle. Train more Scouts to search faster."]
    },
    {
        "name":"Explore Forest",
        "pane":"Territory",
        "effect":(modified) => modified["Forest"] += 1,
        "speed":(rC) => {return 0.1*Math.sqrt(rC["Scout"])/(1+rC["Forest"])},
        "canExecute":(rC) => rC["Scout"],
        "info":(rc) => ["Search for Forest to settle. Train more Scouts to search faster."]
    },
    {
        "name":"Explore Hills",
        "pane":"Territory",
        "effect":(modified) => modified["Hills"] += 1,
        "speed":(rC) => {return 0.1*Math.sqrt(rC["Scout"])/(1+rC["Hills"])},
        "canExecute":(rC) => rC["Scout"],
        "info":(rc) => ["Search for Hills to settle. Train more Scouts to search faster."]
    },
    {
        "name":"Explore Valley",
        "pane":"Territory",
        "effect":(modified) => modified["Valley"] += 1,
        "speed":(rC) => {return 0.07*Math.sqrt(rC["Scout"])/(1+rC["Valley"])},
        "canExecute":(rC) => rC["Scout"],
        "info":(rc) => ["Search for a valley to settle. Train more Scouts to search faster."]
    },
    {
        "name":"Explore River",
        "pane":"Territory",
        "effect":(modified) => modified["River"] += 1,
        "speed":(rC) => {return 0.07*Math.sqrt(rC["Scout"])/(1+rC["River"])},
        "canExecute":(rC) => rC["Scout"],
        "info":(rc) => ["Search for Savannah to settle. Train more Scouts to search faster. A good place to park a van."]
    },
    {
        "name":"Explore Cave",
        "pane":"Territory",
        "effect":(modified) => modified["Cave"] += 1,
        "speed":(rC) => {return 0.05*Math.sqrt(rC["Scout"])/(1+rC["Cave"])},
        "canExecute":(rc) => rc["Hills"],
        "info":(rc) => ["You might find a cave in the side of a hill."]
    },
    {
        "name":"Gather Mushrooms",
        "pane":"Resources",
        "effect":(modified) => modified["Wild Mushrooms"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Forest"], 0.25)/(1+rC["Wild Mushrooms"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Forest"],
        "info":(rc) => ["It took a long time to learn which ones are edible."]
    },
    {
        "name":"Harvest Carrion",
        "pane":"Resources",
        "effect":(modified) => modified["Carrion"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Carrion"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "info":(rc) => ["Watch out for the hyenas."]
    },
    {
        "name":"Gather Grains",
        "pane":"Resources",
        "effect":(modified) => modified["Wild Grains"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Wild Grains"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "info":(rc) => ["Foraging for grains."]
    },
    {
        "name":"Gather Fruit",
        "pane":"Resources",
        "effect":(modified) => modified["Wild Fruit"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Wild Fruit"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "info":(rc) => ["Looking for wild fruit."]
    },
    {
        "name":"Gather Wood",
        "pane":"Resources",
        "effect":(modified) => modified["Wood"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Forest"], 0.25)/(1+rC["Wood"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Forest"],
        "info":(rc) => ["It's called the Stone Age, but wood was more widely used. It should be called the Wood Age."]
    },
    {
        "name":"Gather Rocks",
        "pane":"Resources",
        "effect":(modified) => modified["Rocks"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Rocks"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"],
        "info":(rc) => ["Gathering rocks is boring, but they might be useful."]
    },
    {
        "name":"Build Campsite",
        "pane":"Buildings",
        "effect":(modified) => modified["Campsite"] += 1,
        "speed":(rC) => {return 0.02*Math.pow(rC["Gatherer"]*rC["Savannah"], 0.25)/(1+rC["Campsite"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Savannah"] && rc["People"]>10,
        "info":(rc) => ["Make camp here."]
    },
    {
        "name":"Build Fire Pit",
        "pane":"Buildings",
        "effect":(modified) => modified["Fire Pit"] += 1,
        "speed":(rC) => {return 0.03*Math.pow(rC["Wood"]*rC["Campsite"], 0.25)/(1+rC["Fire Pit"])},
        "canExecute":(rc) => rc["Wood"] && rc["Campsite"],
        "info":(rc) => ["It took early humans hundreds of thousands of years to figure out how to control fire. It took you a few minutes."]
    },
    {
        "name":"Build Grain Storage",
        "pane":"Buildings",
        "effect":(modified) => modified["Grain Storage"] += 1,
        "speed":(rC) => {return 0.1*Math.pow(rC["Wild Grains"]*rC["Cave"], 0.25)/(1+rC["Grain Storage"])},
        "canExecute":(rc) => rc["Wild Grains"] && rc["Cave"],
        "info":(rc) => ["Storing grain increase its effectiveness in feeding the population."]
    },
    {
        "name":"Form a Tribe",
        "pane":"Society",
        "effect":(modified, setStory) => {
            modified["Tribe"] += 1;
            setStory(["Your band has grown into a full-fledged tribe. This is the end of the current demo. Thanks for playing, and please check back later.","You can continue building your population and resources if you so desire."]);
        },
        "speed":(rC) => {return 0.001*Math.pow(rC["People"]*(rC["Valley"]+rC["River"])*(rC["Fire Pit"]+rC["Grain Storage"]), 1/6)/(1+rC["Tribe"])},
        "canExecute":(rc) => rc["Gatherer"] && rc["Valley"] && rc["River"] && rc["Fire Pit"] && rc["Grain Storage"],
        "info":(rc) => ["Turn your band into an organized tribe. You need a lot of people."]
    }
]
