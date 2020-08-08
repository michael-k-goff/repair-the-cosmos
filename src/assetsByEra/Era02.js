// The second era, corresponding roughly to the Upper Paleolithic

import {addLog, softCap} from "../gameLogic.js";

const barter_resources = [
    ["Furs","Set Trap"],
    ["Cowry Shells","Trade Cowry Shells"],
    ["Clothing","Sew Clothing"],
    ["Microlith","Produce Microlith"],
    ["Axe","Produce Axe"],
    ["Spear","Produce Spear"],
    ["Beads","Produce Beads"],
    ["Stone Tools","Make Stone Tools"]
]

export const resources02 = [
    ["Neanderthal","Population ","Neanderthals were a separate species of human that lived throughout Asia and went extinct about 40,000 years ago."],
    ["Slave","Population ","Your first slaves were captured from neighboring tribes."],
    ["Story Teller","Specialists","Story telling is perhaps the oldest form of entertainment."],
    ["Fisher","Specialists","A fisher catches _Fish_. Do I have to explain everything?"],
    ["Domesticated Dog","Animals","You should call him Spot."],
    ["Tracker","Specialists","The tracker helps better understand your territory and improve hunting."],
    ["Trapper","Specialists","Trappers catch animals for their fur, which allows you to make clothing."],
    ["Herbalist","Specialists","Herbalists help you find and apply Herbs faster and also make Herbs more effective."],

    ["Language","Civilization","The advent of language, which followed behavior modernity, is a critical step in devloping a more complex society."],
    ["Oral Tradition","Art","Under an oral tradition, history, law, and literature are passed from one generation to the next orally."],
    ["Chiefdom","Civilization","A large, hierarchical society unified by a sense of tribal identity."],
    ["Animistic Belief","Religion","Belief in the pervasiveness of spiritual essence in all things."],
    ["Cave Painting","Art","An early cave painting"],
    ["Rock Art","Art","Artwork carved into rock."],

    ["Trails","Infrastructure","Trails facilitate hunting, resource gathering, and trade."],
    ["Barter Route","Infrastructure","A most basic trade route. Allows collection of new resources."],
    ["Stone Shelter","Buildings","The stone shelter is more durable than the wood shelter and a better home."],
    ["Tipi","Buildings","Another form of housing and public gathering."],
    ["Cookstove","Buildings","Needed to cook food."],
    ["Graveyard","Buildings","People actually do die over time. Your _People_ are not fixed, the number is an abstraction of ... never mind."],

    ["Game Meat","Wild Food","Meat from hunted animals."],
    ["Megafauna Meat","Wild Food","Meat from large animals. Be careful not to overhunt them."],
    ["Fish","Wild Food","Half the time you pull out old boots."],
    ["Cooked Meat","Processed Food","Cooking meat makes it more nutritious and less likely to make you sick."],
    ["Bones","Organic Materials","Animal bones."],
    ["Furs","Organic Materials","Animal furs. Good for making clothing."],
    ["Rock Gatherer - Slave","Minerals","A slave that has been assigned to gather rocks."],
    ["Wood Gatherer - Slave","Organic Materials","A slave that has been assigned to gather wood."],
    ["Cowry Shells","Organic Materials","Cowry shells were once used as a form of money."],
    ["Clothing","Manufactured Goods","Clothing is essential for living in any but temperature climates."],
    ["Microlith","Manufactured Goods","Microliths are small stone tools typically used as spearpoints or arrowheads."],
    ["Axe","Manufactured Goods","Good for war or for cutting wood."],
    ["Spear","Manufactured Goods","Good for hunting or cutting wood."],
    ["Beads","Manufactured Goods","A form of currency and status."],
    ["Raft","Manufactured Goods","A makeshift raft helps you get to nearby islands."],

    ["Warrior","Units","A better trained warrior than the _Brute_."],
    ["Axeman","Units","Fights with an axe."],
    ["Spearman","Units","Fights with a spear."],

    ["Tundra","Home Continent","Icy territory."],
    ["Jungle","Home Continent","Jungle, welcome to the jungle. Watch it bring you to your shun n-n-n-n-n-n-n-n knees, knees. Uh I, I wanna watch you bleed."],
    ["Island","Home Continent","A small island near the shore."],
    // Unincorporated stuff
    ["Bark","Organic Materials","Bark is the outer layer of a tree. In paleolithic times, bark was used to make adhesives."],
    ["Flint","Minerals","Flint tools date to the late Paleolithic. It has subsequently been used in early firearms to ignite gunpowder and as a construction material."],
    ["Ceramic","Composites","Ceramics are a broad class of materials, with usage going back to 26000 years ago for sculpture."]
]

export const actions02 = [
    {
        "name":"Train Story Teller",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Story Teller"] += 1;
            addLog("Trained 1 _Story Teller_.",gameState);
        },
        "speed":(rC) => {return 0.1 * softCap(50+5*rC["Story Teller"], rC["People"], 4)* Math.pow(rC["People"]*rC["Language"],0.25)/(10+5*rC["Story Teller"])},
        "canExecute":(rC) => {return rC["People"] >= 50},
        "visible":(rC) => rC["Language"] >= 1,
        "info":(rC)=>{
            let message = ["Train _Scout_ to entertain and improve your culture. Faster with more _People_ and _Language_."]
            if (rC["People"] < 50+rC["Story Teller"] * 5) {
                message = message.concat([`!You need ${50+rC["Story Teller"] * 5} _People_.`]);
            }
            return message;
        }
    },
    {
        "name":"Develop Language",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Language"] += 1;
            addLog("Learned 1 new _Language_.", gameState)
        },
        "speed":(rC) => {return 0.005 * Math.sqrt(rC["Tribe"])/(1+2*rC["Language"])},
        "canExecute":(rC) => {return rC["Tribe"] >= 1},
        "visible":(rC) => rC["Tribe"] >= 1,
        "info":(rC)=>{
            let message = ["Develop a _Language_ to advance your culture. Faster with more _Tribe_."]
            return message;
        }
    },
    {
        "name":"Hunt",
        "pane":"Wild Food",
        "power":(modified, gameState) => Math.sqrt(modified["Hunter"]),
        "effect":(modified,gameState) => {
            const new_resource = gameState.actions_dict["Hunt"].power(modified, gameState);
            modified["Game Meat"] += new_resource;
            modified["Carrion"] = 0;
            addLog(`Hunted ${Math.floor(100*new_resource)/100} _Game Meat_.`, gameState);
        },
        "speed":(rC) => 0.1*softCap(rC["Game Meat"],10),
        "canExecute":(rC) => rC["Hunter"] >= 1 && rC["Tribe"] >= 1,
        "info":(rC)=>{
            return ["Hunt game animals to get _Game Meat_. Faster with more _Hunter_."];
        }
    },
    {
        "name":"Train Fisher",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Fisher"] += 1;
            addLog("Trained 1 _Fisher_.",gameState);
        },
        "speed":(rC) => {return 0.2 * softCap(50+5*rC["Fisher"], rC["People"], 4) * Math.sqrt(rC["People"])/(10+5*rC["Fisher"])},
        "canExecute":(rC) => {return rC["People"] >= 50},
        "visible":(rC,more) => more["actionCount"]["Form a Tribe"],
        "info":(rC)=>{
            let message = ["Train _Fisher_ to catch _Fish_. Faster with more _People_."]
            if (rC["People"] < 50) {
                message = message.concat([`!You need ${50} _People_.`]);
            }
            return message;
        }
    },
    {
        "name":"Train Tracker",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Tracker"] += 1;
            addLog("Trained 1 _Tracker_.",gameState);
        },
        "speed":(rC) => {return 0.15 * softCap(100+5*rC["Tracker"], rC["People"], 4) * Math.sqrt(rC["People"])/(10+5*rC["Tracker"])},
        "canExecute":(rC) => {return rC["People"] >= 100},
        "visible":(rC,more) => more["actionCount"]["Form a Tribe"],
        "info":(rC)=>{
            let message = ["Train _Tracker_ to improve your hunting and exploration. Faster with more _People_."]
            if (rC["People"] < 100) {
                message = message.concat([`!You need ${100} _People_.`]);
            }
            return message;
        }
    },
    {
        "name":"Train Trapper",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Trapper"] += 1;
            addLog("Trained 1 _Trapper_.",gameState);
        },
        "speed":(rC) => {return 0.15 * softCap(100+5*rC["Trapper"], rC["People"], 4) * Math.sqrt(rC["People"])/(10+5*rC["Trapper"])},
        "canExecute":(rC) => {return rC["People"] >= 100},
        "visible":(rC,more) => more["actionCount"]["Form a Tribe"],
        "info":(rC)=>{
            let message = ["Train _Trapper_ to trap animals for _Fur_. Faster with more _People_."]
            if (rC["People"] < 100) {
                message = message.concat([`!You need ${100} _People_.`]);
            }
            return message;
        }
    },
    {
        "name":"Train Herbalist",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Herbalist"] += 1;
            addLog("Trained 1 _Herbalist_.",gameState);
        },
        "speed":(rC) => {return 0.15 * softCap(100+5*rC["Herbalist"], rC["People"], 4) * Math.sqrt(rC["People"])/(10+5*rC["Herbalist"])},
        "canExecute":(rC) => {return rC["People"] >= 100},
        "visible":(rC,more) => more["actionCount"]["Form a Tribe"],
        "info":(rC)=>{
            let message = ["Train _Herbalist_ to find and use _Herbs_ faster and make them more effective. Faster with more _People_."]
            if (rC["People"] < 100) {
                message = message.concat([`!You need ${100} _People_.`]);
            }
            return message;
        }
    },
    {
        "name":"Fish",
        "pane":"Wild Food",
        "power":(modified,gameState) => Math.sqrt(modified["Fisher"]),
        "effect":(modified,gameState)=>{
            const new_resource = gameState.actions_dict["Fish"].power(modified,gameState);
            modified["Fish"] += new_resource;
            addLog(`Caught ${Math.floor(100*new_resource)/100} _Fish_.`,gameState);
        },
        "speed":(rC) => 0.1*softCap(rC["Fish"],10),
        "canExecute":(rC) => rC["Fisher"] >= 1,
        "info":(rC)=>{
            return ["Catch some _Fish_. Faster with more _Fisher_."];
        }
    },
    {
        "name":"Build Cookstove",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Cookstove"] += 1;
            addLog("Built 1 _Cookstove_.", gameState);
        },
        "speed":(rC) => 0.03*Math.sqrt(rC["Fire Pit"])/(1+rC["Cookstove"]),
        "canExecute":(rC,more) => more["actionCount"]["Hunt"] >= 1,
        "info":(rC)=>["Build a _Cookstove_. Cooking your food is good. Faster with more _Fire Pit_."]
    },
    {
        "name":"Cook Game Meat",
        "pane":"Processed Food",
        "power":(modified,gameState)=>Math.pow(modified["Game Meat"]*modified["Cookstove"],0.25),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Cook Game Meat"].power(modified, gameState);
            modified["Cooked Meat"] += new_resource;
            modified["Game Meat"] -= 1;
            addLog(`Cooked 1 _Game Meat_ into ${Math.floor(100*new_resource)/100} _Cooked Meat_.`,gameState);
        },
        "speed":(rC)=>0.15*softCap(rC["Cooked Meat"],10),
        "canExecute":(rC,more) => rC["Game Meat"] >= 1 && rC["Cookstove"] >= 1,
        "visible":(rC,more) => rC["Cookstove"] >= 1,
        "info":(rC)=> {
            let message = ["Cook some _Game Meat_ into _Cooked Meat_. Faster with more _Cookstove_ and _Game Meat_."]
            if (rC["Game Meat"]<1) {
                message = message.concat(["!You need some _Game Meat_."]);
            }
            return message;
        }
    },
    {
        "name":"Cook Fish",
        "pane":"Processed Food",
        "power":(modified,gameState) => Math.pow(modified["Fish"]*modified["Cookstove"],0.25),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Cook Fish"].power(modified,gameState);
            modified["Cooked Meat"] += new_resource;
            modified["Fish"] -= 1;
            addLog(`Cooked 1 _Fish_ into ${Math.floor(100*new_resource)/100} _Cooked Meat_.`,gameState);
        },
        "speed":(rC)=>0.15*softCap(rC["Cooked Meat"],10),
        "canExecute":(rC,more) => rC["Fish"] >= 1 && rC["Cookstove"] >= 1,
        "visible":(rC,more) => rC["Cookstove"] >= 1,
        "info":(rC)=> {
            let message = ["Cook some _Fish_ into _Cooked Meat_. Faster with more _Cookstove_ and _Fish_."]
            if (rC["Fish"]<1) {
                message = message.concat(["!You need some _Fish_."]);
            }
            return message;
        }
    },
    {
        "name":"Cook Megafauna Meat",
        "pane":"Processed Food",
        "power":(modified,gameState) => Math.pow(modified["Megafauna Meat"]*modified["Cookstove"],0.25),
        "effect":(modified, gameState) => {
            const new_resource = 2*gameState.actions_dict["Cook Megafauna Meat"].power(modified,gameState)
            modified["Cooked Meat"] += new_resource;
            modified["Megafauna Meat"] -= 1;
            addLog(`Cooked 1 _Megafauna Meat_ into ${Math.floor(100*new_resource)/100} _Cooked Meat_.`,gameState);
        },
        "speed":(rC)=>0.1*softCap(rC["Cooked Meat"],10),
        "canExecute":(rC,more) => rC["Megafauna Meat"] >= 1 && rC["Cookstove"] >= 1,
        "visible":(rC,more) => rC["Cookstove"] >= 1,
        "info":(rC)=> {
            let message = ["Cook some _Megafauna Meat_ into _Cooked Meat_. Faster with more _Cookstove_ and _Megafauna Meat_."]
            if (rC["Megafauna Meat"]<1) {
                message = message.concat(["!You need some _Megafauna Meat_."]);
            }
            return message;
        }
    },
    {
        "name":"Set Trap",
        "pane":"Organic Materials",
        "effect":(modified, gameState) => {
            let new_fur = Math.sqrt(modified["Trapper"]);
            let new_bone = Math.sqrt(modified["Trapper"]);
            if (modified["Fur"] && modified["Bones"]) {
                const soft_cap_diff = softCap(modified["Fur"],10) / softCap(modified["Bones"],10);
                modified["Furs"]>modified["Bones"] ? new_fur *= soft_cap_diff : new_bone /= soft_cap_diff;
            }
            modified["Furs"] += new_fur;
            modified["Bones"] += new_bone;
            addLog(`Trapped a critter for ${Math.floor(100*new_fur)/100} _Furs_ and ${Math.floor(100*new_bone)/100} _Bones_.`, gameState);
        },
        "speed":(rC)=>0.2*softCap( Math.min(rC["Furs"],rC["Bones"]),5 ),
        "canExecute":(rC,more) => rC["Trapper"] >= 1,
        "visible":(rC, more) => more["actionCount"]["Train Trapper"] >= 1,
        "info":(rC) => {
            return ["Set a trap for some _Fur_ and _Bones_."]
        }
    },
    {
        "name":"Sew Clothing",
        "pane":"Manufactured Goods",
        "power":(modified, gameState) => Math.sqrt(modified["Furs"]),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Sew Clothing"].power(modified, gameState);
            modified["Furs"] -= 1;
            modified["Clothing"] += new_resource;
            addLog(`Turned 1 _Furs_ into ${Math.floor(100*new_resource)/100} _Clothing_.`, gameState);
        },
        "speed":(rC)=>0.2*softCap(rC["Clothing"],10),
        "canExecute":(rC,more)=>rC["Furs"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Set Trap"] >= 1,
        "info":(rC)=>{
            let message = ["Sew _Furs_ into _Clothing_."];
            if (rC["Furs"]<1) {
                message = message.concat(["!You need some _Furs_."]);
            }
            return message;
        }
    },
    {
        "name":"Explore Tundra",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Tundra"] += 1;
            addLog("Found 1 _Tundra_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Tracker"]*rC["Clothing"],0.25)/(1+rC["Tundra"])},
        "canExecute":(rC) => rC["Tracker"]>=1 && rC["Clothing"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Train Tracker"]>=1,
        "info":(rC)=>{
            let message = ["Search for _Tundra_ to settle. Faster with more _Tracker_, _Clothing_."];
            if (rC["Tracker"] < 1) {
                message = message.concat(["!You need a _Tracker_."]);
            }
            if (rC["Clothing"] < 1) {
                message = message.concat(["!It's too cold. You need some _Clothing_."]);
            }
            return message;
        }
    },
    {
        "name":"Explore Jungle",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Jungle"] += 1;
            addLog("Found 1 _Jungle_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Tracker"]*rC["Clothing"],0.25)/(1+rC["Jungle"])},
        "canExecute":(rC) => rC["Tracker"]>=1 && rC["Clothing"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Train Tracker"]>=1,
        "info":(rC)=>{
            let message = ["Search for _Jungle_ to settle. Faster with more _Tracker_, _Clothing_."];
            if (rC["Tracker"] < 1) {
                message = message.concat(["!You need a _Tracker_."]);
            }
            if (rC["Clothing"] < 1) {
                message = message.concat(["!It's too dangerous. You need some _Clothing_."]);
            }
            return message;
        }
    },
    {
        "name":"Produce Microlith",
        "pane":"Manufactured Goods",
        "power":(modified, gameState) => Math.pow(modified["Rocks"]*modified["Stone Worker"],0.25),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Produce Microlith"].power(modified, gameState);
            modified["Microlith"] += new_resource;
            modified["Rocks"] -= 1;
            addLog(`Transformed 1 _Rocks_ into ${Math.floor(100*new_resource)/100} _Microlith_.`,gameState);
        },
        "speed":(rC) => {return 0.3*softCap(rC["Microlith"],10)},
        "canExecute":(rC) => rC["Rocks"]>=1 && rC["Language"] >= 1 && rC["Stone Worker"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Develop Language"]>=1,
        "info":(rC)=>{
            let message = ["Create _Microlith_. Faster with more _Rocks_, _Stone Worker_."];
            if (rC["Stone Worker"] < 1) {
                message = message.concat(["!You need a _Stone Worker_."]);
            }
            if (rC["Rocks"] < 1) {
                message = message.concat(["!You need some _Rocks_."]);
            }
            return message;
        }
    },
    {
        "name":"Build Stone Shelter",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Rocks"] -= 5;
            modified["Stone Shelter"] += 1;
            addLog("Built 1 _Stone Shelter_, which consumed 5 _Rocks_.",gameState);
        },
        "speed":(rC) => {return 0.05*Math.pow(rC["Rocks"]*rC["Stone Worker"]*(1+rC["Island"]+rC["Hills"]),1/6)/(1+rC["Stone Shelter"])},
        "canExecute":(rC) => rC["Rocks"]>=5 && rC["Stone Worker"] >= 1 && rC["Microlith"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Produce Microlith"]>=1,
        "info":(rC)=>{
            let message = ["Create a _Stone Shelter_. Faster with more _Rocks_, _Stone Worker_, _Hills_, _Island_."];
            if (rC["Stone Worker"] < 1) {
                message = message.concat(["!You need a _Stone Worker_."]);
            }
            if (rC["Rocks"] < 5) {
                message = message.concat(["!You need 5 _Rocks_."]);
            }
            if (rC["Microlith"] < 1) {
                message = message.concat(["!You need a _Microlith_."]);
            }
            return message;
        }
    },
    {
        "name":"Build Trails",
        "pane":"Infrastructure",
        "effect":(modified, gameState) => {
            modified["Trails"] += 1;
            addLog("Built 1 _Trails_.", gameState)
        },
        "speed":(rC)=>0.1*Math.pow(rC["Tracker"]*(1+rC["Savannah"]+rC["Forest"]+rC["Hills"]+rC["Valley"]+rC["River"]+rC["Tundra"]),0.25)/(1+rC["Trails"]),
        "canExecute":(rC) => rC["Tracker"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Train Tracker"]>=1,
        "info":(rC)=>{
            let message = ["Build _Trails_. Faster with more _Tracker_, _Savannah_, _Forest_, _Hills_, _Valley_, _River_, _Tundra_."];
            if (rC["Tracker"] < 1) {
                message = message.concat(["!You need a _Tracker_."]);
            }
            return message;
        }
    },
    {
        "name":"Establish Barter Route",
        "pane":"Infrastructure",
        "effect":(modified, gameState) => {
            modified["Barter Route"] += 1;
            addLog("Established 1 _Barter Route_.", gameState)
        },
        "speed":(rC)=>0.1*Math.sqrt(rC["Trails"])/(1+rC["Barter Route"]),
        "canExecute":(rC) => rC["Trails"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Build Trails"]>=1,
        "info":(rC)=>{
            let message = ["Establish a _Barter Route_. Faster with more _Trails_."];
            if (rC["Trails"] < 1) {
                message = message.concat(["!You need _Trails_."]);
            }
            return message;
        }
    },
    {
        "name":"Barter Furs",
        "pane":"Trade",
        "effect":(modified, gameState) => {
            let gain = "";
            let valid_count = 0;
            for (let i=0; i<barter_resources.length; i++) {
                if (barter_resources[i][0] !== "Furs" && gameState["actionCount"][barter_resources[i][1]]) {
                    valid_count += 1
                    if (Math.random()*valid_count < 1) {
                        gain = barter_resources[i][0];
                    }
                }
            }
            if (gain !== "") {
                modified["Furs"] -= 1;
                let num_gained = 5/(1+modified[gain]);
                modified[gain] += num_gained;
                addLog(`Bartered 1 _Furs_ for ${Math.floor(100*num_gained)/100} _${gain}_.`, gameState);
            }
            else {
                addLog("Could not find a trading partner.",gameState);
            }
        },
        "speed":(rC)=>1/60,
        "canExecute":(rC) => rC["Furs"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Trade _Furs_ for a random resource."];
            if (rC["Furs"] < 1) {
                message = message.concat(["!You need _Furs_."]);
            }
            return message;
        }
    },
    {
        "name":"Barter Cowry Shells",
        "pane":"Trade",
        "effect":(modified, gameState) => {
            let gain = "";
            let valid_count = 0;
            for (let i=0; i<barter_resources.length; i++) {
                if (barter_resources[i][0] !== "Cowry Shells" && gameState["actionCount"][barter_resources[i][1]]) {
                    valid_count += 1
                    if (Math.random()*valid_count < 1) {
                        gain = barter_resources[i][0];
                    }
                }
            }
            if (gain !== "") {
                modified["Cowry Shells"] -= 1;
                let num_gained = 5/(1+modified[gain]);
                modified[gain] += num_gained;
                addLog(`Bartered 1 _Cowry Shells_ for ${Math.floor(100*num_gained)/100} _${gain}_.`, gameState);
            }
            else {
                addLog("Could not find a trading partner.",gameState);
            }
        },
        "speed":(rC)=>1/60,
        "canExecute":(rC) => rC["Cowry Shells"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Trade _Cowry Shells_ for a random resource."];
            if (rC["Cowry Shells"] < 1) {
                message = message.concat(["!You need _Cowry Shells_."]);
            }
            return message;
        }
    },
    {
        "name":"Barter Clothing",
        "pane":"Trade",
        "effect":(modified, gameState) => {
            let gain = "";
            let valid_count = 0;
            for (let i=0; i<barter_resources.length; i++) {
                if (barter_resources[i][0] !== "Clothing" && gameState["actionCount"][barter_resources[i][1]]) {
                    valid_count += 1
                    if (Math.random()*valid_count < 1) {
                        gain = barter_resources[i][0];
                    }
                }
            }
            if (gain !== "") {
                modified["Clothing"] -= 1;
                let num_gained = 5/(1+modified[gain]);
                modified[gain] += num_gained;
                addLog(`Bartered 1 _Clothing_ for ${Math.floor(100*num_gained)/100} _${gain}_.`, gameState);
            }
            else {
                addLog("Could not find a trading partner.",gameState);
            }
        },
        "speed":(rC)=>1/60,
        "canExecute":(rC) => rC["Clothing"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Trade _Clothing_ for a random resource."];
            if (rC["Clothing"] < 1) {
                message = message.concat(["!You need _Clothing_."]);
            }
            return message;
        }
    },
    {
        "name":"Barter Microlith",
        "pane":"Trade",
        "effect":(modified, gameState) => {
            let gain = "";
            let valid_count = 0;
            for (let i=0; i<barter_resources.length; i++) {
                if (barter_resources[i][0] !== "Microlith" && gameState["actionCount"][barter_resources[i][1]]) {
                    valid_count += 1
                    if (Math.random()*valid_count < 1) {
                        gain = barter_resources[i][0];
                    }
                }
            }
            if (gain !== "") {
                modified["Microlith"] -= 1;
                let num_gained = 5/(1+modified[gain]);
                modified[gain] += num_gained;
                addLog(`Bartered 1 _Microlith_ for ${Math.floor(100*num_gained)/100} _${gain}_.`, gameState);
            }
            else {
                addLog("Could not find a trading partner.",gameState);
            }
        },
        "speed":(rC)=>1/60,
        "canExecute":(rC) => rC["Microlith"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Trade _Microlith_ for a random resource."];
            if (rC["Microlith"] < 1) {
                message = message.concat(["!You need _Microlith_."]);
            }
            return message;
        }
    },
    {
        "name":"Barter Axe",
        "pane":"Trade",
        "effect":(modified, gameState) => {
            let gain = "";
            let valid_count = 0;
            for (let i=0; i<barter_resources.length; i++) {
                if (barter_resources[i][0] !== "Axe" && gameState["actionCount"][barter_resources[i][1]]) {
                    valid_count += 1
                    if (Math.random()*valid_count < 1) {
                        gain = barter_resources[i][0];
                    }
                }
            }
            if (gain !== "") {
                modified["Axe"] -= 1;
                let num_gained = 5/(1+modified[gain]);
                modified[gain] += num_gained;
                addLog(`Bartered 1 _Axe_ for ${Math.floor(100*num_gained)/100} _${gain}_.`, gameState);
            }
            else {
                addLog("Could not find a trading partner.",gameState);
            }
        },
        "speed":(rC)=>1/60,
        "canExecute":(rC) => rC["Axe"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Trade _Axe_ for a random resource."];
            if (rC["Axe"] < 1) {
                message = message.concat(["!You need _Axe_."]);
            }
            return message;
        }
    },
    {
        "name":"Barter Spear",
        "pane":"Trade",
        "effect":(modified, gameState) => {
            let gain = "";
            let valid_count = 0;
            for (let i=0; i<barter_resources.length; i++) {
                if (barter_resources[i][0] !== "Spear" && gameState["actionCount"][barter_resources[i][1]]) {
                    valid_count += 1
                    if (Math.random()*valid_count < 1) {
                        gain = barter_resources[i][0];
                    }
                }
            }
            if (gain !== "") {
                modified["Spear"] -= 1;
                let num_gained = 5/(1+modified[gain]);
                modified[gain] += num_gained;
                addLog(`Bartered 1 _Spear_ for ${Math.floor(100*num_gained)/100} _${gain}_.`, gameState);
            }
            else {
                addLog("Could not find a trading partner.",gameState);
            }
        },
        "speed":(rC)=>1/60,
        "canExecute":(rC) => rC["Spear"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Trade _Spear_ for a random resource."];
            if (rC["Spear"] < 1) {
                message = message.concat(["!You need _Spear_."]);
            }
            return message;
        }
    },
    {
        "name":"Barter Beads",
        "pane":"Trade",
        "effect":(modified, gameState) => {
            let gain = "";
            let valid_count = 0;
            for (let i=0; i<barter_resources.length; i++) {
                if (barter_resources[i][0] !== "Beads" && gameState["actionCount"][barter_resources[i][1]]) {
                    valid_count += 1
                    if (Math.random()*valid_count < 1) {
                        gain = barter_resources[i][0];
                    }
                }
            }
            if (gain !== "") {
                modified["Beads"] -= 1;
                let num_gained = 5/(1+modified[gain]);
                modified[gain] += num_gained;
                addLog(`Bartered 1 _Beads_ for ${Math.floor(100*num_gained)/100} _${gain}_.`, gameState);
            }
            else {
                addLog("Could not find a trading partner.",gameState);
            }
        },
        "speed":(rC)=>1/60,
        "canExecute":(rC) => rC["Beads"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Trade _Beads_ for a random resource."];
            if (rC["Beads"] < 1) {
                message = message.concat(["!You need _Beads_."]);
            }
            return message;
        }
    },
    {
        "name":"Barter Stone Tools",
        "pane":"Trade",
        "effect":(modified, gameState) => {
            let gain = "";
            let valid_count = 0;
            for (let i=0; i<barter_resources.length; i++) {
                if (barter_resources[i][0] !== "Stone Tools" && gameState["actionCount"][barter_resources[i][1]]) {
                    valid_count += 1
                    if (Math.random()*valid_count < 1) {
                        gain = barter_resources[i][0];
                    }
                }
            }
            if (gain !== "") {
                modified["Stone Tools"] -= 1;
                let num_gained = 5/(1+modified[gain]);
                modified[gain] += num_gained;
                addLog(`Bartered 1 _Stone Tools_ for ${Math.floor(100*num_gained)/100} _${gain}_.`, gameState);
            }
            else {
                addLog("Could not find a trading partner.",gameState);
            }
        },
        "speed":(rC)=>1/60,
        "canExecute":(rC) => rC["Stone Tools"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Trade _Stone Tools_ for a random resource."];
            if (rC["Stone Tools"] < 1) {
                message = message.concat(["!You need _Stone Tools_."]);
            }
            return message;
        }
    },
    {
        "name":"Trade Cowry Shells",
        "pane":"Organic Materials",
        "power":(modified,gameState) => Math.sqrt(modified["Barter Route"]),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Trade Cowry Shells"].power(modified,gameState);
            modified["Cowry Shells"] += new_resource;
            addLog(`Gained ${Math.floor(100*new_resource)/100} _Cowry Shells_.`, gameState);
        },
        "speed":(rC)=>0.03*softCap(rC["Cowry Shells"],15),
        "canExecute":(rC) => rC["Barter Route"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Trade for _Cowry Shells_. Faster with more _Barter Route_."];
            if (rC["Barter Route"] < 1) {
                message = message.concat(["!You need _Barter Route_."]);
            }
            return message;
        }
    },
    {
        "name":"Barter",
        "pane":"Resources",
        "effect":(modified, gameState)=>{
            let gatherResults = [
                ["Gather Rocks","Rocks"],["Gather Wood","Wood"],["Trade Cowry Shells","Cowry Shells"],
                ["Make Stone Tools","Stone Tools"],["Produce Microlith","Microlith"] // Maybe add more later
            ].filter((x)=>gameState.actions_dict[x[0]].canExecute(modified,gameState));
            if (gatherResults.length === 0) {
                addLog("Your traders failed to gain anything useful.");
                return;
            }
            let result = Math.floor(gatherResults.length*Math.random());
            let speed = gameState.actions_dict[gatherResults[result][0]].speed(modified, gameState);
            let power = gameState.actions_dict[gatherResults[result][0]].speed(modified, gameState);
            // Assuming that each of the actions considered produces 1 resource.
            // Modify the following if that changes.
            let bonus = speed*power*60*2;
            modified[gatherResults[result][1]] += bonus;
            console.log(gatherResults[result][1]);
            addLog(`Your traders have found ${Math.round(100*bonus)/100} _${gatherResults[result][1]}_.`,gameState);
        },
        "speed":(rC) => {return 1/60},
        "canExecute":(rC, gameState)=> {
            return rC["Barter Route"]
        },
        "info":(rC) => {
            let message = ["Barter for a random resources. Results are twice as good, per second, compared to dedicated production."];
            return message;
        }
    },
    {
        "name":"Produce Beads",
        "pane":"Manufactured Goods",
        "power":(modified, gameState)=>Math.pow(modified["Barter Route"]*modified["Bones"],0.25),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Produce Beads"].power(modified, gameState);
            modified["Beads"] += new_resource;
            modified["Bones"] -= 1;
            addLog(`Produced ${Math.floor(100*new_resource)/100} _Beads_ from 1 _Bones.`, gameState);
        },
        "speed":(rC)=> {
            return 0.2*softCap(rC["Beads"],10);
        },
        "canExecute":(rC) => rC["Barter Route"]>=1 && rC["Bones"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Establish Barter Route"]>=1,
        "info":(rC)=>{
            let message = ["Produce _Beads_. Faster with more _Bones_, _Barter Route_."];
            if (rC["Barter Route"] < 1) {
                message = message.concat(["!You need _Barter Route_."]);
            }
            if (rC["Bones"] < 1) {
                message = message.concat(["!You need _Bones_."]);
            }
            return message;
        }
    },
    {
        "name":"Hunt Megafauna",
        "pane":"Wild Food",
        "power":(modified,gameState)=>Math.pow(modified["Hunter"]*modified["Tracker"],0.25),
        "effect":(modified,gameState) => {
            const new_resource = gameState.actions_dict["Hunt Megafauna"].power(modified, gameState);
            modified["Megafauna Meat"] += new_resource;
            addLog(`Hunted ${Math.floor(100*new_resource)/100} _Megafauna Meat_`, gameState);
        },
        "speed":(rC) => 0.2*softCap(rC["Megafauna Meat"],10),
        "canExecute":(rC) => rC["Hunter"] >= 1 && rC["Tracker"] >= 1,
        "visible":(rC, more) => more["actionCount"]["Train Tracker"] >= 1,
        "info":(rC)=>{
            let message = ["Hunt large, soon-to-be-extinct animals for _Megafauna Meat_. Faster with more _Hunter_ and _Tracker_."];
            if (rC["Tracker"] < 1) {
                message = message.concat(["!You need a _Tracker_."]);
            }
            if (rC["Hunter"] < 1) {
                message = message.concat(["!You need a _Hunter_."]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Dog",
        "pane":"Animals",
        "effect":(modified, gameState) => {
            modified["Domesticated Dog"] += 1;
            modified["Game Meat"] -= 10;
            addLog("Domesticated 1 _Domesticated Dog_ and consumed 10 _Game Meat_.", gameState);
        },
        "speed":(rC) => 0.01 * Math.pow(rC["Game Meat"],0.5)/(1+10*rC["Domesticated Dog"]),
        "canExecute":(rC) => rC["Game Meat"] >= 10 && rC["People"] >= 150,
        "visible":(rC, more) => rC["People"] >= 100,
        "info":(rC)=>{
            let message = ["Domesticate a _Domesticated Dog_. Faster with more _Game Meat_."];
            if (rC["People"] < 150) {
                message = message.concat(["!You need 150 _People_."]);
            }
            if (rC["Game Meat"] < 10) {
                message = message.concat(["!You need 10 _Game Meat_."]);
            }
            return message;
        }
    },
    {
        "name":"Breed Dog",
        "pane":"Animals",
        "effect":(modified, gameState) => {
            modified["Domesticated Dog"] += 1;
            modified["Game Meat"] -= 1;
            addLog("Domesticated 1 _Domesticated Dog_ and consumed 1 _Game Meat_.", gameState);
        },
        "speed":(rC) => 0.03 * Math.pow(rC["Game Meat"],0.5)/(1+rC["Domesticated Dog"]),
        "canExecute":(rC) => rC["Game Meat"] >= 1 && rC["Domesticated Dog"] >= 1,
        "visible":(rC, more) => more["actionCount"]["Domesticate Dog"] >= 1,
        "info":(rC)=>{
            let message = ["Breed a _Domesticated Dog_. Faster with more _Game Meat_."];
            if (rC["Game Meat"] < 1) {
                message = message.concat(["!You need 1 _Game Meat_."]);
            }
            return message;
        }
    },
    {
        "name":"Produce Axe",
        "pane":"Manufactured Goods",
        "power":(modified,gameState)=>Math.pow(modified["Rocks"]*modified["Microlith"]*modified["Stone Worker"],1/6),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Produce Axe"].power(modified, gameState);
            modified["Axe"] += new_resource;
            modified["Microlith"] -= 1;
            modified["Rocks"] -= 1;
            addLog(`Transformed ${Math.floor(100*new_resource)/100} _Microlith_ and 1 _Rocks_ into 1 _Axe_.`,gameState);
        },
        "speed":(rC) => {return 0.1*softCap(rC["Axe"],10)},
        "canExecute":(rC) => rC["Rocks"]>=1 && rC["Microlith"] >= 1 && rC["Stone Worker"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Produce Microlith"]>=1,
        "info":(rC)=>{
            let message = ["Create _Axe_. Faster with more _Rocks_, _Microlith, _Stone Worker_."];
            if (rC["Stone Worker"] < 1) {
                message = message.concat(["!You need a _Stone Worker_."]);
            }
            if (rC["Rocks"] < 1) {
                message = message.concat(["!You need some _Rocks_."]);
            }
            if (rC["Microlith"] < 1) {
                message = message.concat(["!You need some _Microlith_."]);
            }
            return message;
        }
    },
    {
        "name":"Produce Spear",
        "pane":"Manufactured Goods",
        "power":(modified, gameState)=>Math.pow(modified["Wood"]*modified["Microlith"]*modified["Stone Worker"],1/6),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Produce Spear"].power(modified, gameState);
            modified["Spear"] += new_resource;
            modified["Microlith"] -= 1;
            modified["Wood"] -= 1;
            addLog(`Transformed ${Math.floor(100*new_resource)/100} _Microlith_ and 1 _Wood_ into 1 _Spear_.`,gameState);
        },
        "speed":(rC) => {return 0.1*softCap(rC["Spear"],10)},
        "canExecute":(rC) => rC["Wood"]>=1 && rC["Microlith"] >= 1 && rC["Stone Worker"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Produce Microlith"]>=1,
        "info":(rC)=>{
            let message = ["Create _Spear_. Faster with more _Wood_, _Microlith, _Stone Worker_."];
            if (rC["Stone Worker"] < 1) {
                message = message.concat(["!You need a _Stone Worker_."]);
            }
            if (rC["Wood"] < 1) {
                message = message.concat(["!You need some _Wood_."]);
            }
            if (rC["Microlith"] < 1) {
                message = message.concat(["!You need some _Microlith_."]);
            }
            return message;
        }
    },
    {
        "name":"Train Warrior",
        "pane":"Units",
        "effect":(modified,gameState) => {
            modified["Warrior"] += 1;
            modified["Protein"] -= 2;
            addLog("Trained 1 _Warrior_ and consumed 2 _Protein_.",gameState);
        },
        "speed":(rC)=>0.05*softCap(50+5*rC["Warrior"], rC["People"], 4)*Math.pow(rC["People"]*rC["Protein"],0.25)/(1+rC["Warrior"]),
        "canExecute":(rC) => {
            return rC["Protein"]>=2 && (rC["People"] >= 50);
        },
        "visible":(rC, more) => more["actionCount"]["Cook Game Meat"] >= 1,
        "info":(rC)=>{
            let message = ["Train _Warrior_. Faster with more _People_, _Protein_."]
            if (rC["People"] < 50) {
                message = message.concat([`!You need ${50} _People_.`]);
            }
            if (rC["Protein"]<2) {
                message = message.concat(["!You need 2 _Protein_."])
            }
            return message;
        }
    },
    {
        "name":"Train Axeman",
        "pane":"Units",
        "effect":(modified,gameState) => {
            modified["Axeman"] += 1;
            modified["Protein"] -= 2;
            modified["Axe"] -= 1;
            addLog("Trained 1 _Axeman_, consumed 2 _Protein_, and used 1 _Axe_.",gameState);
        },
        "speed":(rC)=>0.05*softCap(50+5*rC["Axeman"], rC["People"], 4)*Math.pow(rC["People"]*rC["Protein"]*rC["Axe"],1/6)/(1+rC["Axeman"]),
        "canExecute":(rC) => {
            return rC["Protein"]>=1 && rC["Axe"]>=1 && rC["People"] >= 50;
        },
        "visible":(rC, more) => more["actionCount"]["Cook Game Meat"] >= 1,
        "info":(rC)=>{
            let message = ["Train _Axeman_. Faster with more _People_, _Protein_, _Axe_."]
            if (rC["People"] < 50) {
                message = message.concat([`!You need ${50} _People_.`]);
            }
            if (rC["Protein"]<2) {
                message = message.concat(["!You need 2 _Protein_."])
            }
            if (rC["Axe"]<1) {
                message = message.concat(["!You need an _Axe_."])
            }
            return message;
        }
    },
    {
        "name":"Train Spearman",
        "pane":"Units",
        "effect":(modified,gameState) => {
            modified["Spearman"] += 1;
            modified["Protein"] -= 2;
            modified["Spear"] -= 1;
            addLog("Trained 1 _Spearman_, consumed 2 _Protein_, and used 1 _Spear_.",gameState);
        },
        "speed":(rC)=>0.05*softCap(50+5*rC["Spearman"], rC["People"], 4)*Math.pow(rC["People"]*rC["Protein"]*rC["Spear"],1/6)/(1+rC["Spearman"]),
        "canExecute":(rC) => {
            return rC["Protein"]>=1 && rC["Spear"]>=1 && rC["People"] >= 50;
        },
        "visible":(rC, more) => more["actionCount"]["Cook Game Meat"] >= 1,
        "info":(rC)=>{
            let message = ["Train _Spearman_. Faster with more _People_, _Protein_, _Spear_."]
            if (rC["People"] < 50) {
                message = message.concat([`!You need ${50} _People_.`]);
            }
            if (rC["Protein"]<2) {
                message = message.concat(["!You need 2 _Protein_."])
            }
            if (rC["Spear"]<1) {
                message = message.concat(["!You need a _Spear_."])
            }
            return message;
        }
    },
    {
        "name":"Build Raft",
        "pane":"Manufactured Goods",
        "power":(modified,gameState)=>Math.pow(modified["Wood"]*modified["Stone Tools"],1/4),
        "effect":(modified, gameState)=>{
            const new_resource = gameState.actions_dict["Build Raft"].power(modified, gameState);
            modified["Raft"] += new_resource;
            modified["Wood"] -= 5;
            addLog(`Built ${Math.floor(100*new_resource)/100} _Raft_ with 5 _Wood_.`,gameState);
        },
        "speed":(rC) => 0.05*softCap(rC["Raft"],3),
        "canExecute":(rC) => rC["Stone Tools"]>=1 && rC["Wood"]>=5,
        "visible":(rC, more) => more["actionCount"]["Produce Microlith"] >= 1,
        "info":(rC)=>{
            let message = ["Build a _Raft_. Faster with more _Wood_, _Stone Tools_."]
            if (rC["Wood"]<5) {
                message = message.concat(["!You need 5 _Wood_."])
            }
            if (rC["Stone Tools"]<1) {
                message = message.concat(["!You need 1 _Stone Tools_."])
            }
            return message;
        }
    },
    {
        "name":"Explore Island",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Island"] += 1;
            addLog("Found 1 _Island_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Tracker"]*rC["Raft"],0.25)/(1+rC["Island"])},
        "canExecute":(rC) => rC["Tracker"]>=1 && rC["Raft"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Build Raft"]>=1,
        "info":(rC)=>{
            let message = ["Search for _Island_ to settle. Faster with more _Tracker_, _Raft_."];
            if (rC["Tracker"] < 1) {
                message = message.concat(["!You need a _Tracker_."]);
            }
            if (rC["Raft"] < 1) {
                message = message.concat(["!You need a _Raft_."]);
            }
            return message;
        }
    },
    {
        "name":"Raid",
        "pane":"Military Subpane",
        "effect":(modified,gameState)=> {
            // Will add more detail and differentiate the units later
            let power = Math.sqrt(modified["Axeman"])+Math.sqrt(modified["Spearman"])+Math.sqrt(modified["Warrior"]);
            let r = [Math.random(), Math.random()];
            if (r[0] > r[1]) {
                r = [r[1],r[0]];
            }
            let new_pop = 50*r[0]*power/(1+modified["People"]);
            let new_food = 20*(r[1]-r[0])*power/(1+modified["Food"]);
            let new_protein = 10*(1-r[1])*power/(1+modified["Protein"]);
            let loss_warrior = modified["Warrior"]/(modified["Warrior"]+modified["Axeman"]+modified["Spearman"]);
            let loss_axeman = modified["Axeman"]/(modified["Warrior"]+modified["Axeman"]+modified["Spearman"]);
            let loss_spearman = modified["Spearman"]/(modified["Warrior"]+modified["Axeman"]+modified["Spearman"]);
            modified["People"] += new_pop;
            modified["Food"] += new_food;
            modified["Protein"] += new_protein;
            modified["Warrior"] -= loss_warrior;
            modified["Axeman"] -= loss_axeman;
            modified["Spearman"] -= loss_spearman;
            addLog(`Launched a raid. Gained ${Math.round(100*new_pop)/100} _People_, ${Math.round(100*new_food)/100} _Food_, ${Math.round(100*new_protein)/100} _Protein_ and lost ${Math.round(100*loss_warrior)/100} _Warrior_, ${Math.round(100*loss_axeman)/100} _Axeman_, and ${Math.round(100*loss_spearman)/100} _Spearman_.`, gameState);
        },
        "speed":(rC) => 1/60,
        "canExecute":(rC)=>{return rC["Warrior"]>=1 || rC["Axeman"]>=1 || rC["Spearman"] >= 1},
        "info":(rC)=>{
            let message = ["Launch a raiding party. You will gain _People_, _Food_, _Protein_ and lose a unit. Better rewards with more _Warrior_, _Axeman_, _Spearman_."];
            return message;
        }
    },
    {
        "name":"Raid the Neanderthals",
        "pane":"Military Subpane",
        "effect":(modified,gameState)=> {
            // Will add more detail and differentiate the units later
            let loss_warrior = modified["Warrior"]/(modified["Warrior"]+modified["Axeman"]+modified["Spearman"]);
            let loss_axeman = modified["Axeman"]/(modified["Warrior"]+modified["Axeman"]+modified["Spearman"]);
            let loss_spearman = modified["Spearman"]/(modified["Warrior"]+modified["Axeman"]+modified["Spearman"]);
            modified["Warrior"] -= loss_warrior;
            modified["Axeman"] -= loss_axeman;
            modified["Spearman"] -= loss_spearman;
            modified["Neanderthal"] += 1;
            addLog(`Launched a raid against the Neanderthals. Captured 1 _Neanderthal_ and lost ${Math.round(100*loss_warrior)/100} _Warrior_, ${Math.round(100*loss_axeman)/100} _Axeman_, and ${Math.round(100*loss_spearman)/100} _Spearman_.`, gameState);
        },
        "speed":(rC) => {
            let num_neander = rC["Neanderthal"] ? rC["Neanderthal"] : 0;
            let num_warrior = rC["Warrior"] ? rC["Warrior"] : 0;
            let num_axeman = rC["Axeman"] ? rC["Axeman"] : 0;
            let num_spearman = rC["Spearman"] ? rC["Spearman"] : 0;
            return 0.05*(Math.sqrt(num_warrior)+Math.sqrt(num_axeman)+Math.sqrt(num_spearman))/(1+num_neander)
        },
        "canExecute":(rC)=>{return rC["Warrior"]>=1 || rC["Axeman"]>=1 || rC["Spearman"] >= 1},
        "info":(rC)=>{
            let message = ["Launch a raiding party against the Neanderthals. You will capture 1 _Neanderthal_ and lose a unit. Faster with more _Warrior_, _Axeman_, _Spearman_."];
            return message;
        }
    },
    {
        "name":"Capture Slave",
        "pane":"Military Subpane",
        "effect":(modified,gameState)=> {
            let loss_warrior = modified["Warrior"]/(modified["Warrior"]+modified["Axeman"]+modified["Spearman"]);
            let loss_axeman = modified["Axeman"]/(modified["Warrior"]+modified["Axeman"]+modified["Spearman"]);
            let loss_spearman = modified["Spearman"]/(modified["Warrior"]+modified["Axeman"]+modified["Spearman"]);
            modified["Slave"] += 1;
            modified["Warrior"] -= loss_warrior;
            modified["Axeman"] -= loss_axeman;
            modified["Spearman"] -= loss_spearman;
            addLog(`Captured ${1} _Slave_ and lost ${Math.round(100*loss_warrior)/100} _Warrior_, ${Math.round(100*loss_axeman)/100} _Axeman_, and ${Math.round(100*loss_spearman)/100} _Spearman_.`, gameState);
        },
        "speed":(rC) => 0.02*(Math.sqrt(rC["Warrior"])+Math.sqrt(rC["Axeman"])+Math.sqrt(rC["Spearman"]))/(1+rC["Slave"]),
        "canExecute":(rC)=>{return rC["Warrior"]>=1 || rC["Axeman"]>=1 || rC["Spearman"] >= 1},
        "info":(rC)=>{
            let message = ["Launch a raiding party. You will capture a _Slave_ and lose a unit. Faster with more _Warrior_, _Axeman_, _Spearman_."];
            return message;
        }
    },
    {
        "name":"Build Tipi",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Furs"] -= 2;
            modified["Tipi"] += 1;
            addLog("Built 1 _Tipi_, which consumed 2 _Furs_.",gameState);
        },
        "speed":(rC) => {return 0.05*Math.pow(rC["Furs"]*(1+rC["Jungle"]+rC["River"]),1/4)/(1+rC["Tipi"])},
        "canExecute":(rC) => rC["Furs"]>=2,
        "visible":(rC,more)=>more["actionCount"]["Set Trap"]>=1,
        "info":(rC)=>{
            let message = ["Create a _Tipi_. Faster with more _Furs_, _River_, _Jungle_."];
            if (rC["Furs"] < 2) {
                message = message.concat(["!You need 2 _Furs_."]);
            }
            return message;
        }
    },
    {
        "name":"Fertility Dance",
        "pane":"Population ",
        "effect":(modified, gameState) => {
            let message = "";
            if (modified["People"] >= 10) {
                modified["Food"] -= 5;
                message = "You ate 5 _Food_. "
            }
            let success = Math.random() > modified["Infant Mortality"]/100 ? 1:0;
            if (!modified["Infant Mortality"]) {success = 1}
            modified["People"] += 5*success;
            if (success) {
                message = "You gained 5 _People_. "+message;
            }
            else {
                message = "The fertility dance was unsuccessful. "+message;
                if (modified["Infant Mortality"] >= 31) {
                    modified["Infant Mortality"] -= 1;
                    message = message + "_Infant Mortality_ has decreased by 1."
                }
            }
            addLog(message,gameState);
        },
        "speed":(rC) => {
            let food_speed = 1+Math.sqrt(rC["Food"]);
            let shelter_speed = 1+Math.sqrt(rC["Stone Shelter"])+Math.sqrt(rC["Tipi"]);
            return 2*Math.sqrt(food_speed*shelter_speed)/rC["People"];
        },
        "canExecute":(rC) => {
            return (rC["Food"]>=5 && rC["Story Teller"] >= 1);
        },
        "visible":(rC, more)=>more["actionCount"]["Train Story Teller"] >= 1,
        "info":(rC)=>{
            let message = ["Add 5 _People_ to your tribe. Faster with more _Food_, _Stone Shelter_, _Tipi_."];
            if (rC["Food"] < 5) {
                message = message.concat(["!You need more _Food_."]);
            }
            if (rC["Story Teller"] < 1) {
                message = message.concat(["!You need a _Story Teller_."]);
            }
            return message;
        }
    },
    {
        "name":"Tell Story",
        "pane":"Art",
        "effect":(modified, gameState) => {
            modified["Oral Tradition"] += 1;
            addLog("Told a story and gained 1 _Oral Tradition_",gameState);
        },
        "speed":(rC) => {return 0.25*Math.pow(rC["Story Teller"]*(rC["Rock Art"]+rC["Cave Painting"]),1/4)/(1+rC["Oral Tradition"])},
        "canExecute":(rC) => rC["Story Teller"]>=1,
        "visible":(rC,more)=>more["actionCount"]["Train Story Teller"]>=1,
        "info":(rC)=>{
            let message = ["Tell a story and gain 1 _Oral Tradition_. Faster with more _Story Teller_, _Rock Art_, _Cave Painting_."];
            if (rC["Story Teller"] < 1) {
                message = message.concat(["!You need a _Story Teller_."]);
            }
            return message;
        }
    },
    {
        "name":"Build Graveyard",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Graveyard"] += 1;
            addLog("Built 1 _Graveyard_",gameState);
        },
        "speed":(rC) => {return 0.05*Math.pow(rC["Oral Tradition"],1/2)/(1+rC["Graveyard"])},
        "canExecute":(rC) => rC["Oral Tradition"]>=3,
        "visible":(rC,more)=>more["actionCount"]["Train Story Teller"]>=1,
        "info":(rC)=>{
            let message = ["Build a _Graveyard_. Faster with more _Oral Tradition_."];
            if (rC["Oral Tradition"] < 3) {
                message = message.concat(["!You need 3 _Oral Tradition_."]);
            }
            return message;
        }
    },
    {
        "name":"Develop Animism",
        "pane":"Religion",
        "effect":(modified, gameState) => {
            modified["Animistic Belief"] += 1;
            addLog("Developed your _Animistic Belief_.",gameState);
        },
        "speed":(rC) => 0.01*Math.pow(rC["Oral Tradition"],1/2)/(1+rC["Animistic Belief"]),
        "canExecute":(rC) => rC["Oral Tradition"]>=5,
        "visible":(rC,more)=>more["actionCount"]["Tell Story"]>=1,
        "info":(rC)=>{
            let message = ["Develop an _Animistic Belief_. Faster with more _Oral Tradition_."];
            if (rC["Oral Tradition"] < 5) {
                message = message.concat(["!You need 5 _Oral Tradition_."]);
            }
            return message;
        }
    },
    {
        "name":"Form a Chiefdom",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Chiefdom"] += 1;
            addLog("Formed 1 _Chiefdom_.",gameState)
            if (modified["Chiefdom"] === 1) {
                addLog("Your population has developed into a Chiefdom and is reaching the Neolithic era.",gameState);
            }
        },
        "speed":(rC) => {return 0.001*Math.pow((rC["People"]+0.5*rC["Domesticated Dog"])*(rC["Jungle"]+rC["Tundra"]+rC["Island"])*(rC["Oral Tradition"])*(rC["Barter Route"]+rC["Stone Shelter"]+rC["Tipi"]), 1/10)/(1+rC["Chiefdom"])},
        "canExecute":(rC) => rC["Island"] && rC["Domesticated Dog"] && rC["Tipi"] && rC["Barter Route"] && rC["Graveyard"] && rC["People"] >= 250,
        "visible":(rC) => rC["Island"] && rC["Domesticated Dog"] && rC["Tipi"] && rC["Barter Route"] && rC["Graveyard"],
        "info":(rC)=>{
            let message = ["Turn your tribes into an organized _Chiefdom_. You need a lot of people. Faster with more _People_, _Domesticated Dog_, _Jungle_, _Island_, _Tundra_, _Oral Tradition_, _Barter Route_, _Stone Shelter_, _Tipi_."];
            if (rC["People"] < 250) {
                message = message.concat(["!You need 250 _People_."]);
            }
            return message;
        }
    },
    {
        "name":"Create Rock Art",
        "pane":"Art",
        "effect":(modified, gameState) => {
            modified["Rock Art"] += 1;
            modified["Stone Tools"] -= 1;
            addLog("Created 1 _Rock Art_",gameState)
        },
        "speed":(rC)=>0.04*Math.pow(rC["Stone Tools"],0.5)/(1+rC["Rock Art"]),
        "canExecute":(rC)=>rC["Stone Tools"]>=1 && rC["Tribe"] >= 1,
        "visible":(rC)=>rC["Tribe"] >= 1,
        "info":(rC)=>{
            let message = ["Create a _Rock Art_. Faster with more _Stone Tools_."];
            if (rC["Stone Tools"] < 1) {
                message = message.concat(["!You need _Stone Tools_."]);
            }
            return message;
        }
    },
    {
        "name":"Create Cave Painting",
        "pane":"Art",
        "effect":(modified, gameState) => {
            modified["Cave Painting"] += 1;
            addLog("Created 1 _Cave Painting_",gameState)
        },
        "speed":(rC)=>0.04*Math.pow(rC["Language"]*rC["Cave"],0.25)/(1+rC["Cave Painting"]),
        "canExecute":(rC)=>rC["Cave"]>=1 && rC["Language"]>=1,
        "visible":(rC)=>rC["Language"] >= 1,
        "info":(rC)=>{
            let message = ["Create a _Cave Painting_. Faster with more _Cave_, _Language_."];
            if (rC["Cave"] < 1) {
                message = message.concat(["!You need a _Cave_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Game Meat",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            modified["Game Meat"] -= 1;
            let new_food = Math.min(1, 5/Math.sqrt(modified["Food"]+1));
            modified["Food"] += new_food;
            let new_protein = Math.min(1, 5/Math.sqrt(modified["Protein"]+1));
            modified["Protein"] += new_protein;
            modified["Illness"] += 2;
            addLog(`Ate 1 _Game Meat_ and gained ${Math.floor(100*new_food)/100} _Food_, ${Math.floor(100*new_protein)/100} _Protein_, 2 _Illness.`, gameState);
        },
        "speed":(rC)=>Math.sqrt(rC["Game Meat"])*0.1,
        "canExecute":(rC)=>rC["Game Meat"] >= 1,
        "visible":(rC,more) => more["actionCount"]["Hunt"],
        "info":(rC)=>{
            let message = ["Eat some raw _Game Meat_. It will yield more _Food_ and _Protein_ and less _Illness_ if you cook it. Faster with more _Game Meat_."];
            if (rC["Game Meat"] < 1) {
                message = message.concat(["!You need _Game Meat_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Megafauna Meat",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            modified["Megafauna Meat"] -= 1;
            let new_food = 2*Math.min(1, 5/Math.sqrt(modified["Food"]+1));
            modified["Food"] += new_food;
            let new_protein = Math.min(1, 5/Math.sqrt(modified["Protein"]+1));
            modified["Protein"] += new_protein;
            modified["Illness"] += 3;
            addLog(`Ate 1 _Megafauna Meat_ and gained ${Math.floor(100*new_food)/100} _Food_, ${Math.floor(100*new_protein)/100} _Protein_, 3 _Illness.`, gameState);
        },
        "speed":(rC)=>Math.sqrt(rC["Megafauna Meat"])*0.1,
        "canExecute":(rC)=>rC["Megafauna Meat"] >= 1,
        "visible":(rC,more) => more["actionCount"]["Hunt Megafauna"],
        "info":(rC)=>{
            let message = ["Eat some raw _Megafauna Meat_. It will yield more _Food_ and _Protein_ and less _Illness_ if you cook it. Faster with more _Megafauna Meat_."];
            if (rC["Megafauna Meat"] < 1) {
                message = message.concat(["!You need _Megafauna Meat_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Fish",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            modified["Fish"] -= 1;
            let new_food = Math.min(1, 5/Math.sqrt(modified["Food"]+1));
            modified["Food"] += new_food;
            let new_protein = Math.min(1, 5/Math.sqrt(modified["Protein"]+1));
            modified["Protein"] += new_protein;
            modified["Illness"] += 2;
            addLog(`Ate 1 _Fish_ and gained ${Math.floor(100*new_food)/100} _Food_, ${Math.floor(100*new_protein)/100} _Protein_, 2 _Illness_.`, gameState);
        },
        "speed":(rC)=>Math.sqrt(rC["Fish"])*0.1,
        "canExecute":(rC)=>rC["Fish"] >= 1,
        "visible":(rC,more) => more["actionCount"]["Fish"],
        "info":(rC)=>{
            let message = ["Eat some raw _Fish_. It will yield more _Food_ and _Protein_ and less _Illness_ if you cook it. Faster with more _Fish_."];
            if (rC["Fish"] < 1) {
                message = message.concat(["!You need _Fish_."]);
            }
            return message;
        }
    },
    {
        "name":"Eat Cooked Meat",
        "pane":"Nutrition",
        "effect":(modified, gameState) => {
            modified["Cooked Meat"] -= 1;
            let new_food = 2*Math.min(1, 5/Math.sqrt(modified["Food"]+1));
            modified["Food"] += new_food;
            let new_protein = 2*Math.min(1, 5/Math.sqrt(modified["Protein"]+1));
            modified["Protein"] += new_protein;
            modified["Illness"] += 0.5;
            addLog(`Ate 1 _Cooked Meat_ and gained ${Math.floor(100*new_food)/100} _Food_, ${Math.floor(100*new_protein)/100} _Protein_, 0.5 _Illness_.`, gameState);
        },
        "speed":(rC)=>Math.sqrt(rC["Cooked Meat"])*0.1,
        "canExecute":(rC)=>rC["Cooked Meat"] >= 1,
        "visible":(rC,more) => {
            return more["actionCount"]["Cook Game Meat"]>=1 || more["actionCount"]["Cook Megafauna Meat"]>=1 || more["actionCount"]["Cook Fish"] >= 0
        },
        "info":(rC)=>{
            let message = ["Eat some _Cooked Meat_. It will yield 2 _Food_, 2 _Protein_, and 0.5 _Illness_. Faster with more _Cooked Meat_."];
            if (rC["Cooked Meat"] < 1) {
                message = message.concat(["!You need _Cooked Meat_."]);
            }
            return message;
        }
    },
    {
        "name":"Assign Rock Gatherer",
        "pane":"Minerals",
        "effect":(modified, gameState) => {
            modified["Slave"] -= 1;
            modified["Rock Gatherer - Slave"] += 1;
            addLog("Assigned 1 _Slave_ to be a _Rock Gatherer - Slave_.",gameState);
        },
        "speed":(rC) => 0.1*Math.sqrt(rC["Slave"]) / (1+rC["Rock Gatherer - Slave"]),
        "canExecute":(rC) => rC["Slave"] >= 1,
        "visible":(rC, more) => more["actionCount"]["Capture Slave"],
        "info":(rC)=>{
            let message = ["Put a _Slave_ to work gathering _Rocks_. Faster with more _Slave_."];
            if (rC["Slave"] < 1) {
                message = message.concat(["!You need a _Slave_."]);
            }
            return message;
        }
    },
    {
        "name":"Assign Wood Gatherer",
        "pane":"Organic Materials",
        "effect":(modified, gameState) => {
            modified["Slave"] -= 1;
            modified["Wood Gatherer - Slave"] += 1;
            addLog("Assigned 1 _Slave_ to be a _Wood Gatherer - Slave_.",gameState);
        },
        "speed":(rC) => 0.1*Math.sqrt(rC["Slave"]) / (1+rC["Wood Gatherer - Slave"]),
        "canExecute":(rC) => rC["Slave"] >= 1,
        "visible":(rC, more) => more["actionCount"]["Capture Slave"],
        "info":(rC)=>{
            let message = ["Put a _Slave_ to work gathering _Wood_. Faster with more _Slave_."];
            if (rC["Slave"] < 1) {
                message = message.concat(["!You need a _Slave_."]);
            }
            return message;
        }
    },
    {   // Slave work loop
        "name":"Perform Slave Work",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            let results = [];
            let num_rocks = 0.1*Math.sqrt(modified["Rock Gatherer - Slave"])*gameState.actions_dict["Gather Rocks"].power(modified,gameState)*gameState.actions_dict["Gather Rocks"].speed(modified);
            if (num_rocks > 0) {
                modified["Rocks"] += num_rocks;
                results = results.concat([`gathered ${Math.floor(num_rocks*100)/100} _Rocks_`]);
            }
            let num_wood = 0.1*Math.sqrt(modified["Wood Gatherer - Slave"])*gameState.actions_dict["Gather Wood"].power(modified,gameState)*gameState.actions_dict["Gather Wood"].speed(modified);
            if (num_wood > 0) {
                modified["Wood"] += num_wood;
                results = results.concat([`gathered ${Math.floor(num_wood*100)/100} _Wood_`]);
            }
            if (results.length > 0) {
                addLog("Your slaves have done the following: "+results.join(", ")+".",gameState);
            }
        },
        "speed":(rC) => {
            return 1/60;
        },
        "canExecute":(rC, more) => more["actionCount"]["Capture Slave"],
        "auto":1,
        "info":(rC)=>{
            return ["Your slaves perform some work."];
        }
    },
    { // Illness loop. For now starting with Jungle, but may add more causes of illness.
        "name":"Catch Illness",
        "pane":"Health",
        "effect":(modified, gameState)=> {
            let new_illness = 10*modified["Jungle"]/(10+modified["Illness"]);
            if (modified["Immune System"] > 20+20*modified["Jungle"]) {
                new_illness *= (1-0.05*(modified["Immune System"]-20-20*modified["Jungle"]));
            }
            modified["Illness"] += new_illness;
            addLog(`The _Jungle_ has caused ${Math.round(100*new_illness)/100} _Illness_.`,gameState);
        },
        "speed":(rC) => {
            return 1/60;
        },
        "canExecute":(rC) => 40+20*rC["Jungle"]>rC["Immune System"] && rC["Jungle"]>=1,
        "auto":1,
        "info":(rC)=>{
            return ["Catch _Illness_ from the environment. Greater effect with more _Jungle_, less with more _Immune System_, _Herbalist_."];
        }
    },
    // Unincorporated material
    {
        "name":"Gather Bark",
        "pane":"Minerals",
        "effect":(modified, gameState) => {
            modified["Bark"] += 1;
            addLog("Gathered 1 _Bark_.",gameState);
        },
        "speed":(rC) => {return 0.1},
        "canExecute":(rC) => rC["Tribe"]>=1,
        "visible":(rC,more) => more.actionCount["Form a Tribe"],
        "info":(rC)=>{
            let message = ["Gather some _Bark_."];
            return message;
        }
    },
    {
        "name":"Gather Flint",
        "pane":"Organic Materials",
        "effect":(modified, gameState) => {
            modified["Flint"] += 1;
            addLog("Gathered 1 _Flint_.",gameState);
        },
        "speed":(rC) => {return 0.1},
        "canExecute":(rC) => rC["Tribe"]>=1,
        "visible":(rC,more) => more.actionCount["Form a Tribe"],
        "info":(rC)=>{
            let message = ["Gather some _Flint_."];
            return message;
        }
    },
    {
        "name":"Make Ceramic",
        "pane":"Composites",
        "effect":(modified, gameState) => {
            modified["Ceramic"] += 1;
            addLog("Made 1 _Ceramic_.",gameState);
        },
        "speed":(rC) => {return 0.1},
        "canExecute":(rC) => rC["Tribe"]>=1,
        "visible":(rC,more) => more.actionCount["Form a Tribe"],
        "info":(rC)=>{
            let message = ["Make some _Ceramic_."];
            return message;
        }
    }
]
