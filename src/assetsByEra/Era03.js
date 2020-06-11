// The third era, corresponding roughly to the Neolithic

import {addLog, softCap} from "../gameLogic.js";

export const resources03 = [
    ["Wheat Farm","Farmed Food","A farm for growing wheat."],
    ["Barley Farm","Farmed Food","A farm for growing barley."],
    ["Rice Farm","Farmed Food","A farm for growing rice."],
    ["Maize Farm","Farmed Food","A farm for growing maize (that's corn for you Yanks)."],
    ["Domesticated Wheat","Farmed Food","This resource represents the quality of your bred genetic stock for wheat."],
    ["Domesticated Barley","Farmed Food","This resource represents the quality of your bred genetic stock for barley."],
    ["Domesticated Rice","Farmed Food","This resource represents the quality of your bred genetic stock for rice."],
    ["Domesticated Maize","Farmed Food","This resource represents the quality of your bred genetic stock for maize."],
    ["Wheat","Farmed Food","Stockpile of wheat."],
    ["Barley","Farmed Food","Stockpile of barley."],
    ["Rice","Farmed Food","Stockpile of rice."],
    ["Maize","Farmed food","Stockpile of maize."],
    ["Orchard","Farmed Food","Grow fresh fruit."],
    ["Fruit","Farmed Food","Fresh fruit from an orchard."],

    ["Beef","Farmed Food","It's what's for dinner"],
    ["Pork","Farmed Food","From pigs"],
    ["Mutton","Farmed Food","It's lamb from young sheep and mutton from older sheep."],
    ["Poultry Meat","Farmed Food","From chickens, turkeys, etc."],

    ["Milk","Processed Food","Humans began drinking milk from other mammals during the Neolitic Revolution, as far back as 9000 BC in Mesopotamia."],
    ["Cheese","Processed Food","Cheese is known to the archeological records in 5500 BC, and maybe earlier."],
    ["Bread","Processed Food","Evidence of starch consumption goes back 30,000 years, and bread became a mainstream food item in the Neolithic Revolution."],
    ["Millstone","Processed Food","For grinding grains and nuts."],

    ["Dining Hall","Dining","A central place to serve meals."],

    ["Poultry","Animals","Poultry herd"],
    ["Cow","Animals","Just a plain ol' cow."],
    ["Cat","Animals","Cats domesticated humans as many as 7000-8000 years ago."],
    ["Pig","Animals","Domesticated from wild board, separately in the Near East and China."],
    ["Sheep","Animals","Most likely domesticated from wild mouflon around 11000 to 9000 BC."],

    ["Mountain","Home Continent","Settlement in high mountains."],
    ["Desert","Home Continent","Much of the world's desert today is the result of depletion from farming and grazing."],
    ["Pasture","Home Continent","Grassland for grazing livestock."],

    ["Megalith","Art","Megalith construction dates to the Mesolithic period with Gobleki Tepi around 9500 BC."],
    ["Earthwork","Art","Earthworks are ancient monuments build from or in the Earth, such as the Cahokia Mound or the Nazca Lines."],

    ["Settlement","Civilization","A settled tribe in a fixed location and with permanent buildings."],
    ["City","Civilization","Key elements of cities are population density, specialization, and complex social structure."],

    ["Temple","Religion","An ancient place of worship, often the focal point of a settlement."],
    ["Shamanistic Tradition","Religion","Shamanistic beliefs center around a practitioner--a shaman--who is believed to communicate with the spirit world."],
    ["Druidic Tradition","Religion","Druidism is a spiritual and legal tradition of ancient Celtic cultures."],
    ["Sun Worship","Religion","Worship of the Sun."],
    ["Moon Worship","Religion","Worship of the Moon."],
    ["Ancestor Worship","Religion","Worship of ancestors."],
    ["Bull Worship","Religion","Worship of bulls. There's no bull about it."],
    ["Bear Worship","Religion","Worship of bears."],

    ["Pottery","Manufactured Goods","Shards have been found as far back as 20,000 years ago."],

    ["Archer","Units","Archers were a staple of ancient warfare."],

    ["Walls","Infrastructure","City walls for defense."],

    ["Clay","Raw Materials","Usage of clay for pottery dates back to the early Neolithic or earlier."],
    ["Copper","Raw Materials","The earliest known copper working is observed around 5000 BC, inaugurating the Chalcolithic era."],

    ["Stilt House","Buildings","Stilt houses are built to protect against flooding and vermin."],
    ["Granary","Buildings","Ancient granaries are storehouses for grain, generally built with pottery."],

    ["Shaman","Specialists","Beyond their religious function, shamans provide medical services."],

    ["Disease","Health","Denser urban populations and close proximinty to animals creates a disease risk."],
    ["Disease Resistance","Health","When people die of disease, the population develops immunity."]
]

export const actions03 = [
    {
        "name":"Build Settlement",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["Settlement"] += 1;
            addLog("Built 1 _Settlement_.",gameState);
        },
        "speed":(rC) => {return 0.01 * Math.pow(rC["Chiefdom"],0.5)/(1+rC["Settlement"])},
        "canExecute":(rC,more) => {return rC["Chiefdom"] >= 1},
        "visible":(rC,more) => more.actionCount["Form a Chiefdom"],
        "info":(rC)=>{
            let message = ["Build a _Settlement_. Faster with more _Chiefdom_."]
            if (rC["Chiefdom"] < 1) {
                message = message.concat([`!You need 1 _Chiefdom_.`]);
            }
            return message;
        }
    },
    {
        "name":"Build Megalith",
        "pane":"Art",
        "effect":(modified, gameState) => {
            modified["Megalith"] += 1;
            modified["Rocks"] -= 10
            addLog("Built 1 _Megalith_ from 10 _Rocks_.",gameState);
        },
        "speed":(rC) => {return 0.01 * Math.pow(rC["Chiefdom"],0.5)/(1+rC["Megalith"])},
        "canExecute":(rC,more) => {return rC["Chiefdom"] >= 1 && rC["Rocks"] >= 10},
        "visible":(rC,more) => more.actionCount["Form a Chiefdom"],
        "info":(rC)=>{
            let message = ["Build a _Megalith_. Faster with more _Chiefdom_."]
            if (rC["Chiefdom"] < 1) {
                message = message.concat([`!You need 1 _Chiefdom_.`]);
            }
            if (rC["Rocks"] < 10) {
                message = message.concat([`!You need 10 _Rocks_.`]);
            }
            return message;
        }
    },
    {
        "name":"Build Earthwork",
        "pane":"Art",
        "effect":(modified, gameState) => {
            modified["Earthwork"] += 1;
            addLog("Built 1 _Earthwork_.",gameState);
        },
        "speed":(rC) => {return 0.01 * Math.pow(rC["Chiefdom"],0.5)/(1+rC["Earthwork"])},
        "canExecute":(rC,more) => {return rC["Chiefdom"] >= 1},
        "visible":(rC,more) => more.actionCount["Form a Chiefdom"],
        "info":(rC)=>{
            let message = ["Build a _Settlement_. Faster with more _Chiefdom_."]
            if (rC["Chiefdom"] < 1) {
                message = message.concat([`!You need 1 _Chiefdom_.`]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Wheat",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            modified["Domesticated Wheat"] += 1;
            modified["Wild Grains"] -= 5;
            addLog("Upgrade _Domesticated Wheat_ by 1 and consumed 5 _Wild Grains_.",gameState);
        },
        "speed":(rC) => {return 0.03 * Math.pow(1+rC["Wheat Farm"],0.5)/(1+rC["Domesticated Wheat"])},
        "canExecute":(rC,more) => {return rC["Chiefdom"] >= 1 && rC["Wild Grains"]>= 5},
        "visible":(rC,more) => more.actionCount["Form a Chiefdom"],
        "info":(rC)=>{
            let message = ["Upgrade _Domesticated Wheat_. Faster with more _Wheat Farm_."]
            if (rC["Chiefdom"] < 1) {
                message = message.concat([`!You need 1 _Chiefdom_.`]);
            }
            if (rC["Wild Grains"] < 5) {
                message = message.concat([`!You need 5 _Wild Grains_.`]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Barley",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            modified["Domesticated Barley"] += 1;
            modified["Wild Grains"] -= 5;
            addLog("Upgrade _Domesticated Barley_ by 1 and consumed 5 _Wild Grains_.",gameState);
        },
        "speed":(rC) => {return 0.03 * Math.pow(1+rC["Barley Farm"],0.5)/(1+rC["Domesticated Barley"])},
        "canExecute":(rC,more) => {return rC["Chiefdom"] >= 1 && rC["Wild Grains"]>= 5},
        "visible":(rC,more) => more.actionCount["Form a Chiefdom"],
        "info":(rC)=>{
            let message = ["Upgrade _Domesticated Barley_. Faster with more _Barley Farm_."]
            if (rC["Chiefdom"] < 1) {
                message = message.concat([`!You need 1 _Chiefdom_.`]);
            }
            if (rC["Wild Grains"] < 5) {
                message = message.concat([`!You need 5 _Wild Grains_.`]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Rice",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            modified["Domesticated Rice"] += 1;
            modified["Wild Grains"] -= 5;
            addLog("Upgrade _Domesticated Rice_ by 1 and consumed 5 _Wild Grains_.",gameState);
        },
        "speed":(rC) => {return 0.03 * Math.pow(1+rC["Rice Farm"],0.5)/(1+rC["Domesticated Rice"])},
        "canExecute":(rC,more) => {return rC["Chiefdom"] >= 1 && rC["Wild Grains"]>= 5},
        "visible":(rC,more) => more.actionCount["Form a Chiefdom"],
        "info":(rC)=>{
            let message = ["Upgrade _Domesticated Barley_. Faster with more _Rice Farm_."]
            if (rC["Chiefdom"] < 1) {
                message = message.concat([`!You need 1 _Chiefdom_.`]);
            }
            if (rC["Wild Grains"] < 5) {
                message = message.concat([`!You need 5 _Wild Grains_.`]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Maize",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            modified["Domesticated Maize"] += 1;
            modified["Wild Grains"] -= 5;
            addLog("Upgrade _Domesticated Maize_ by 1 and consumed 5 _Wild Grains_.",gameState);
        },
        "speed":(rC) => {return 0.03 * Math.pow(1+rC["Maize Farm"],0.5)/(1+rC["Domesticated Maize"])},
        "canExecute":(rC,more) => {return rC["Chiefdom"] >= 1 && rC["Wild Grains"]>= 5},
        "visible":(rC,more) => more.actionCount["Form a Chiefdom"],
        "info":(rC)=>{
            let message = ["Upgrade _Domesticated Barley_. Faster with more _Maize Farm_."]
            if (rC["Chiefdom"] < 1) {
                message = message.concat([`!You need 1 _Chiefdom_.`]);
            }
            if (rC["Wild Grains"] < 5) {
                message = message.concat([`!You need 5 _Wild Grains_.`]);
            }
            return message;
        }
    },
    {
        "name":"Build Wheat Farm",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            modified["Wheat Farm"] += 1;
            addLog("Built 1 _Wheat Farm_.",gameState)
        },
        "speed":(rC,more)=>0.05*Math.pow(rC["Domesticated Wheat"]*(1+rC["Savannah"]+rC["Hills"]+rC["Valley"]+2*rC["River"]),0.25)/(1+rC["Wheat Farm"]),
        "canExecute":(rC,more) => rC["Domesticated Wheat"]>=1,
        "visible":(rC,more) => rC["Domesticated Wheat"] >= 1,
        "info":(rC)=>{
            let message = ["Build a _Wheat Farm_. Faster with more _Domesticated Wheat_, _Savannah_, _Hills_, _Valley_, _River_."]
            if (rC["Domesticated Wheat"] < 1) {
                message = message.concat([`!You need 1 _Domesticated Wheat_.`]);
            }
            return message;
        }
    },
    {
        "name":"Build Barley Farm",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            modified["Barley Farm"] += 1;
            addLog("Built 1 _Barley Farm_.",gameState)
        },
        "speed":(rC,more)=>0.05*Math.pow(rC["Domesticated Barley"]*(1+rC["Savannah"]+rC["Hills"]+rC["Valley"]+2*rC["River"]),0.25)/(1+rC["Barley Farm"]),
        "canExecute":(rC,more) => rC["Domesticated Barley"]>=1,
        "visible":(rC,more) => rC["Domesticated Barley"] >= 1,
        "info":(rC)=>{
            let message = ["Build a _Barley Farm_. Faster with more _Domesticated Barley_, _Savannah_, _Hills_, _Valley_, _River_."]
            if (rC["Domesticated Barley"] < 1) {
                message = message.concat([`!You need 1 _Domesticated Barley_.`]);
            }
            return message;
        }
    },
    {
        "name":"Build Rice Farm",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            modified["Rice Farm"] += 1;
            addLog("Built 1 _Rice Farm_.",gameState)
        },
        "speed":(rC,more)=>0.05*Math.pow(rC["Domesticated Rice"]*(1+rC["Savannah"]+rC["Hills"]+rC["Valley"]+2*rC["River"]),0.25)/(1+rC["Rice Farm"]),
        "canExecute":(rC,more) => rC["Domesticated Rice"]>=1,
        "visible":(rC,more) => rC["Domesticated Rice"] >= 1,
        "info":(rC)=>{
            let message = ["Build a _Rice Farm_. Faster with more _Domesticated Rice_, _Savannah_, _Hills_, _Valley_, _River_."]
            if (rC["Domesticated Rice"] < 1) {
                message = message.concat([`!You need 1 _Domesticated Rice_.`]);
            }
            return message;
        }
    },
    {
        "name":"Build Maize Farm",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            modified["Maize Farm"] += 1;
            addLog("Built 1 _Maize Farm_.",gameState)
        },
        "speed":(rC,more)=>0.05*Math.pow(rC["Domesticated Maize"]*(1+rC["Savannah"]+rC["Hills"]+rC["Valley"]+2*rC["River"]),0.25)/(1+rC["Maize Farm"]),
        "canExecute":(rC,more) => rC["Domesticated Maize"]>=1,
        "visible":(rC,more) => rC["Domesticated Maize"] >= 1,
        "info":(rC)=>{
            let message = ["Build a _Maize Farm_. Faster with more _Domesticated Maize_, _Savannah_, _Hills_, _Valley_, _River_."]
            if (rC["Domesticated Maize"] < 1) {
                message = message.concat([`!You need 1 _Domesticated Maize_.`]);
            }
            return message;
        }
    },
    {
        "name":"Grow Wheat",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Wheat Farm"]*modified["Wheat Farm"]*modified["Domesticated Wheat"],1/6);
            modified["Wheat"] += num;
            addLog(`Grew ${Math.floor(100*num)/100} _Wheat_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Wheat"],20+10*rC["Granary"]),
        "canExecute":(rC,more)=>rC["Wheat Farm"] >= 1,
        "visible":(rC,more)=>more.actionCount["Build Wheat Farm"] >= 1,
        "info":(rC)=>{
            let message = ["Grow _Wheat_. Higher yield with more _Wheat Farm_, _Domesticated Wheat_, faster with more _Granary_."];
            if (rC["Wheat Farm"] < 1) {
                message = message.concat([`!You need a _Wheat Farm_.`]);
            }
            return message;
        }
    },
    {
        "name":"Grow Barley",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Barley Farm"]*modified["Barley Farm"]*modified["Domesticated Barley"],1/6);
            modified["Barley"] += num;
            addLog(`Grew ${Math.floor(100*num)/100} _Barley_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Barley"],20+10*rC["Granary"]),
        "canExecute":(rC,more)=>rC["Barley Farm"] >= 1,
        "visible":(rC,more)=>more.actionCount["Build Barley Farm"] >= 1,
        "info":(rC)=>{
            let message = ["Grow _Barley_. Higher yield with more _Barley Farm_, _Domesticated Barley_, faster with more _Granary_."];
            if (rC["Barley Farm"] < 1) {
                message = message.concat([`!You need a _Barley Farm_.`]);
            }
            return message;
        }
    },
    {
        "name":"Grow Rice",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Rice Farm"]*modified["Rice Farm"]*modified["Domesticated Rice"],1/6);
            modified["Rice"] += num;
            addLog(`Grew ${Math.floor(100*num)/100} _Rice_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Rice"],20+10*rC["Granary"]),
        "canExecute":(rC,more)=>rC["Rice Farm"] >= 1,
        "visible":(rC,more)=>more.actionCount["Build Rice Farm"] >= 1,
        "info":(rC)=>{
            let message = ["Grow _Rice_. Higher yield with more _Rice Farm_, _Domesticated Rice_, faster with more _Granary_."];
            if (rC["Rice Farm"] < 1) {
                message = message.concat([`!You need a _Rice Farm_.`]);
            }
            return message;
        }
    },
    {
        "name":"Grow Maize",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Maize Farm"]*modified["Maize Farm"]*modified["Domesticated Maize"],1/6);
            modified["Maize"] += num;
            addLog(`Grew ${Math.floor(100*num)/100} _Maize_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Maize"],20+10*rC["Granary"]),
        "canExecute":(rC,more)=>rC["Maize Farm"] >= 1,
        "visible":(rC,more)=>more.actionCount["Build Maize Farm"] >= 1,
        "info":(rC)=>{
            let message = ["Grow _Maize_. Higher yield with more _Maize Farm_, _Domesticated Maize_, faster with more _Granary_."];
            if (rC["Maize Farm"] < 1) {
                message = message.concat([`!You need a _Maize Farm_.`]);
            }
            return message;
        }
    },
    {
        "name":"Produce Millstone",
        "pane":"Manufactured Goods",
        "power":(modified, gameState)=>Math.max(1,0.4*Math.pow(modified["Stone Worker"]*modified["Stone Tools"], 0.25)),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Produce Millstone"].power(modified,gameState);
            modified["Rocks"] -= 5;
            modified["Millstone"] += new_resource;
            addLog(`Made ${Math.floor(100*new_resource)/100} _Millstone_ from 5 _Rocks_.`, gameState);
        },
        "speed":(rC) => {return 0.05*softCap(rC["Millstone"],3+rC["Granary"])},
        "canExecute":(rC) => rC["Rocks"] >= 5 && rC["Stone Worker"] >= 1 && rC["Stone Tools"] >= 1,
        "visible":(rC,more) => more.actionCount["Grow Wheat"] || more.actionCount["Grow Barley"] || more.actionCount["Grow Rice"] || more.actionCount["Grow Maize"],
        "info":(rC)=>{
            let message = ["Manufacture a _Millstone_. Faster with more _Granary_ and more effective with more _Stone Worker_, _Stone Tools_."];
            if (rC["Rocks"] < 5) {
                message = message.concat(["!You need 5 _Rocks_."]);
            }
            return message;
        }
    },
    {
        "name":"Bake Bread",
        "pane":"Processed Food",
        "power":(modified,gameState)=>Math.max(1, 0.4*Math.sqrt(modified["Millstone"])),
        "effect":(modified,gameState) => {
            const new_resource = gameState.actions_dict["Bake Bread"].power(modified,gameState);
            modified["Bread"] += new_resource;
            const total_grain = modified["Wheat"]+modified["Barley"]+modified["Rice"]+modified["Maize"];
            const mod_wheat = modified["Wheat"]/total_grain;
            modified["Wheat"] -= mod_wheat;
            const mod_barley = modified["Barley"]/total_grain;
            modified["Barley"] -= mod_barley;
            const mod_rice = modified["Rice"]/total_grain;
            modified["Rice"] -= mod_rice;
            const mod_maize = modified["Maize"]/total_grain;
            modified["Maize"] -= mod_maize;
            addLog(`Baked ${Math.floor(100*new_resource)/100} _Bread_.`,gameState);
        },
        "speed":(rC) => {return 0.05*softCap(rC["Bread"],10+5*rC["Dining Hall"])},
        "canExecute":(rC) => rC["Millstone"] >= 1 && (rC["Wheat"]+rC["Barley"]+rC["Rice"]+rC["Maize"]>=1),
        "visible":(rC,more) => more.actionCount["Produce Millstone"],
        "info":(rC)=>{
            let message = ["Bake _Bread_. Faster with more _Dining Hall_ and more effective with more _Millstone_."];
            if (rC["Wheat"]+rC["Barley"]+rC["Rice"]+rC["Maize"]<1) {
                message = message.concat(["!You need more _Wheat_, _Barley_, _Rice_, or _Maize_."]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Cow",
        "pane":"Animals",
        "effect":(modified,gameState)=>{
            modified["Cow"] += 1;
            modified["Disease"] += 10;
            addLog(`Domesticated 1 _Cow_ and caught 10 _Disease_.`,gameState);
        },
        "speed":(rC)=>0.03*Math.sqrt(rC["Domesticated Dog"])/(1+rC["Cow"]),
        "canExecute":(rC,more)=>more.actionCount["Build Settlement"] && rC["Domesticated Dog"]>=1,
        "visible":(rC,more)=>more.actionCount["Build Settlement"],
        "info":(rC)=>{
            let message = ["Domesticate a _Cow_. Faster with more _Domesticated Dog_."];
            if (rC["Domesticated Dog"]<1) {
                message = message.concat(["!You need a _Domesticated Dog_."]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Sheep",
        "pane":"Animals",
        "effect":(modified,gameState)=>{
            modified["Sheep"] += 1;
            modified["Disease"] += 10;
            addLog(`Domesticated 1 _Sheep_ and caught 10 _Disease_.`,gameState);
        },
        "speed":(rC)=>0.03*Math.sqrt(rC["Domesticated Dog"])/(1+rC["Sheep"]),
        "canExecute":(rC,more)=>more.actionCount["Build Settlement"] && rC["Domesticated Dog"]>=1,
        "visible":(rC,more)=>more.actionCount["Build Settlement"],
        "info":(rC)=>{
            let message = ["Domesticate a _Sheep_. Faster with more _Domesticated Dog_."];
            if (rC["Domesticated Dog"]<1) {
                message = message.concat(["!You need a _Domesticated Dog_."]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Poultry",
        "pane":"Animals",
        "effect":(modified,gameState)=>{
            modified["Poultry"] += 1;
            modified["Disease"] += 10;
            addLog(`Domesticated 1 _Poultry_ and caught 10 _Disease_.`,gameState);
        },
        "speed":(rC)=>0.03*Math.sqrt(rC["Domesticated Dog"])/(1+rC["Poultry"]),
        "canExecute":(rC,more)=>more.actionCount["Build Settlement"] && rC["Domesticated Dog"]>=1,
        "visible":(rC,more)=>more.actionCount["Build Settlement"],
        "info":(rC)=>{
            let message = ["Domesticate _Poultry_. Faster with more _Domesticated Dog_."];
            if (rC["Domesticated Dog"]<1) {
                message = message.concat(["!You need a _Domesticated Dog_."]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Pig",
        "pane":"Animals",
        "effect":(modified,gameState)=>{
            modified["Pig"] += 1;
            modified["Disease"] += 10;
            addLog(`Domesticated 1 _Pig_ and caught 10 _Disease_.`,gameState);
        },
        "speed":(rC)=>0.03*Math.sqrt(rC["Domesticated Dog"])/(1+rC["Pig"]),
        "canExecute":(rC,more)=>more.actionCount["Build Settlement"] && rC["Domesticated Dog"]>=1,
        "visible":(rC,more)=>more.actionCount["Build Settlement"],
        "info":(rC)=>{
            let message = ["Domesticate a _Pig_. Faster with more _Domesticated Dog_."];
            if (rC["Domesticated Dog"]<1) {
                message = message.concat(["!You need a _Domesticated Dog_."]);
            }
            return message;
        }
    },
    {
        "name":"Produce Beef",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Cow"],1/2);
            const num_desert = 0.1*num/(1+modified["Desert"]);
            modified["Disease"] += 1;
            modified["Beef"] += num;
            modified["Desert"] += num_desert;
            addLog(`Produced ${Math.floor(100*num)/100} _Beef_ and caught 1 _Disease_.`,gameState);
            addLog(`Grazing created ${Math.floor(100*num_desert)/100} _Desert_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Beef"],10+4*rC["Dining Hall"]),
        "canExecute":(rC,more)=>rC["Cow"] >= 1,
        "visible":(rC,more)=>more.actionCount["Domesticate Cow"] >= 1,
        "info":(rC)=>{
            let message = ["Produce _Beef_. Higher yield with more _Cow_, faster with more _Dining Hall_."];
            if (rC["Cow"] < 1) {
                message = message.concat([`!You need a _Cow_.`]);
            }
            return message;
        }
    },
    {
        "name":"Produce Mutton",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Sheep"],1/2);
            const num_desert = 0.1*num/(1+modified["Desert"]);
            modified["Disease"] += 1;
            modified["Mutton"] += num;
            modified["Desert"] += num_desert;
            addLog(`Produced ${Math.floor(100*num)/100} _Mutton_ and caught 1 _Disease_.`,gameState);
            addLog(`Grazing created ${Math.floor(100*num_desert)/100} _Desert_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Mutton"],10+4*rC["Dining Hall"]),
        "canExecute":(rC,more)=>rC["Sheep"] >= 1,
        "visible":(rC,more)=>more.actionCount["Domesticate Sheep"] >= 1,
        "info":(rC)=>{
            let message = ["Produce _Mutton_. Higher yield with more _Sheep_, faster with more _Dining Hall_."];
            if (rC["Sheep"] < 1) {
                message = message.concat([`!You need a _Sheep_.`]);
            }
            return message;
        }
    },
    {
        "name":"Produce Pork",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Pig"],1/2);
            modified["Disease"] += 1;
            modified["Pork"] += num;
            addLog(`Produced ${Math.floor(100*num)/100} _Pork_ and caught 1 _Disease_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Pig"],10+4*rC["Dining Hall"]),
        "canExecute":(rC,more)=>rC["Pig"] >= 1,
        "visible":(rC,more)=>more.actionCount["Domesticate Pig"] >= 1,
        "info":(rC)=>{
            let message = ["Produce _Pork_. Higher yield with more _Pig_, faster with more _Dining Hall_."];
            if (rC["Pig"] < 1) {
                message = message.concat([`!You need a _Pig_.`]);
            }
            return message;
        }
    },
    {
        "name":"Produce Poultry Meat",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Poultry"],1/2);
            modified["Poultry Meat"] += num;
            modified["Disease"] += 1;
            addLog(`Produced ${Math.floor(100*num)/100} _Poultry Meat_ and caught 1 _Disease_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Poultry Meat"],10+4*rC["Dining Hall"]),
        "canExecute":(rC,more)=>rC["Poultry"] >= 1,
        "visible":(rC,more)=>more.actionCount["Domesticate Poultry"] >= 1,
        "info":(rC)=>{
            let message = ["Produce _Poultry Meat_. Higher yield with more _Poultry_, faster with more _Dining Hall_."];
            if (rC["Poultry"] < 1) {
                message = message.concat([`!You need a _Poultry_.`]);
            }
            return message;
        }
    },
    {
        "name":"Produce Milk",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Cow"],1/2);
            modified["Milk"] += num;
            addLog(`Produced ${Math.floor(100*num)/100} _Milk_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Milk"],10+4*rC["Dining Hall"]),
        "canExecute":(rC,more)=>rC["Cow"] >= 1,
        "visible":(rC,more)=>more.actionCount["Domesticate Cow"] >= 1,
        "info":(rC)=>{
            let message = ["Produce _Milk_. Higher yield with more _Cow_, faster with more _Dining Hall_."];
            if (rC["Cow"] < 1) {
                message = message.concat([`!You need a _Cow_.`]);
            }
            return message;
        }
    },
    {
        "name":"Produce Cheese",
        "pane":"Processed Food",
        "effect":(modified, gameState) => {
            const num = 1;
            modified["Cheese"] += num;
            modified["Milk"] -= 1;
            addLog(`Produced ${Math.floor(100*num)/100} _Cheese_ from 1 _Milk_.`,gameState);
        },
        "speed":(rC,more) => 0.1*softCap(rC["Cheese"],10+4*rC["Dining Hall"]),
        "canExecute":(rC,more)=>rC["Milk"] >= 1,
        "visible":(rC,more)=>more.actionCount["Produce Milk"] >= 1,
        "info":(rC)=>{
            let message = ["Produce _Cheese_. Faster with more _Dining Hall_."];
            if (rC["Milk"] < 1) {
                message = message.concat([`!You need _Milk_.`]);
            }
            return message;
        }
    },
    {
        "name":"Create Pasture",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Pasture"] += 1;
            addLog(`Created 1 _Pasture_.`,gameState)
        },
        "speed":(rC, more) => 0.05*Math.pow(rC["Savannah"]*(rC["Cow"]+rC["Sheep"]),0.25)/(1+rC["Pasture"]),
        "canExecute":(rC, more) => rC["Cow"]+rC["Sheep"] >= 1,
        "visible":(rC,more)=>more.actionCount["Domesticate Cow"] || more.actionCount["Domesticate Sheep"],
        "info":(rC)=>{
            let message = ["Create _Pasture_. Faster with more _Savannah_, _Cow_, _Sheep_."];
            if (rC["Cow"]+rC["Sheep"] < 1) {
                message = message.concat([`!You need _Cow_ or _Sheep_.`]);
            }
            return message;
        }
    },
    {
        "name":"Plant Orchard",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            modified["Orchard"] += 1;
            addLog(`Planted 1 _Orchard_.`,gameState);
        },
        "speed":(rC, more) => 0.1*Math.pow(rC["Pasture"]*rC["River"],0.25)/(1+rC["Orchard"]),
        "canExecute":(rC, more) => rC["Pasture"] >= 1 && rC["River"] >= 1,
        "visible":(rC,more) => more.actionCount["Create Pasture"],
        "info":(rC)=>{
            let message = ["Plant an _Orchard_. Faster with more _Pasture_, _River_."];
            if (rC["Pasture"] < 1) {
                message = message.concat([`!You need a _Pasture_.`]);
            }
            if (rC["River"] < 1) {
                message = message.concat([`!You need a _River_.`]);
            }
            return message;
        }
    },
    {
        "name":"Grow Fruit",
        "pane":"Farmed Food",
        "effect":(modified, gameState) => {
            const num = Math.pow(modified["Orchard"],1/2);
            modified["Fruit"] += num;
            addLog(`Produced ${Math.floor(100*num)/100} _Fruit_.`,gameState);
        },
        "speed":(rC, more) => 0.1*softCap(rC["Fruit"],10+5*rC["Dining Hall"]),
        "canExecute":(rC, more) => rC["Orchard"] >= 1,
        "visible":(rC, more) => more.actionCount["Plant Orchard"],
        "info":(rC)=>{
            let message = ["Grow _Fruit_. Higher yield with more _Pasture_, faster with more _Dining Hall_."];
            if (rC["Orchard"] < 1) {
                message = message.concat([`!You need an _Orchard_.`]);
            }
            return message;
        }
    },
    {
        "name":"Build Temple",
        "pane":"Religion",
        "effect":(modified,gameState) => {
            modified["Temple"] += 1;
            modified["Rocks"] -= 10;
            addLog(`Built 1 _Temple_.`,gameState);
        },
        "speed":(rC, more) => 0.02*Math.pow(rC["Settlement"]*rC["Stone Worker"],0.25)/(1+rC["Temple"]),
        "canExecute":(rC, more) => rC["Settlement"] >= 1 && rC["Rocks"] >= 10,
        "visible": (rC, more) => more.actionCount["Build Settlement"],
        "info":(rC) => {
            let message = ["Build a _Temple_. Faster with more _Settlement_ and _Stone Worker_."];
            if (rC["Settlement"] < 1) {
                message = message.concat([`!You need a _Settlement_.`]);
            }
            if (rC["Rocks"] < 10) {
                message = message.concat([`!You need 10 _Rocks_.`]);
            }
            return message;
        }
    },
    {
        "name":"Develop Druidism",
        "pane":"Religion",
        "effect":(modified, gameState) => {
            modified["Druidic Tradition"] += 1;
            addLog(`Developed 1 _Druidic Tradition_.`,gameState);
        },
        "speed":(rC, more) => 0.05*Math.pow(rC["Megalith"]*rC["Temple"],0.25)/(1+rC["Druidic Tradition"]),
        "canExecute":(rC,more) => rC["Megalith"]>=1 && rC["Temple"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Megalith"],
        "info":(rC) => {
            let message = ["Develop _Druidic Tradition_. Faster with more _Megalith_, _Temple_."];
            if (rC["Megalith"] < 1) {
                message = message.concat([`!You need a _Megalith_.`]);
            }
            if (rC["Temple"] < 1) {
                message = message.concat([`!You need a _Temple_.`]);
            }
            return message;
        }
    },
    {
        "name":"Develop Shamanism",
        "pane":"Religion",
        "effect":(modified, gameState) => {
            modified["Shamanistic Tradition"] += 1;
            addLog(`Developed 1 _Shamanistic Tradition_.`,gameState);
        },
        "speed":(rC, more) => {
            return 0.05*Math.pow(rC["Temple"],0.5)/(1+rC["Shamanistic Tradition"])
        },
        "canExecute":(rC,more) => rC["Temple"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Temple"],
        "info":(rC) => {
            let message = ["Develop _Shamanistic Tradition_. Faster with more _Temple_."];
            if (rC["Temple"] < 1) {
                message = message.concat([`!You need a _Temple_.`]);
            }
            return message;
        }
    },
    {
        "name":"Develop Sun Worship",
        "pane":"Religion",
        "effect":(modified, gameState) => {
            modified["Sun Worship"] += 1;
            addLog(`Developed 1 _Sun Worship_.`,gameState);
        },
        "speed":(rC, more) => 0.05*Math.pow(rC["Temple"],0.5)/(1+rC["Sun Worship"]),
        "canExecute":(rC,more) => rC["Temple"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Temple"],
        "info":(rC) => {
            let message = ["Develop _Sun Worship_. Faster with more _Temple_."];
            if (rC["Temple"] < 1) {
                message = message.concat([`!You need a _Temple_.`]);
            }
            return message;
        }
    },
    {
        "name":"Develop Moon Worship",
        "pane":"Religion",
        "effect":(modified, gameState) => {
            modified["Moon Worship"] += 1;
            addLog(`Developed 1 _Moon Worship_.`,gameState);
        },
        "speed":(rC, more) => 0.05*Math.pow(rC["Temple"],0.5)/(1+rC["Moon Worship"]),
        "canExecute":(rC,more) => rC["Temple"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Temple"],
        "info":(rC) => {
            let message = ["Develop _Moon Worship_. Faster with more _Temple_."];
            if (rC["Temple"] < 1) {
                message = message.concat([`!You need a _Temple_.`]);
            }
            return message;
        }
    },
    {
        "name":"Develop Ancestor Worship",
        "pane":"Religion",
        "effect":(modified, gameState) => {
            modified["Ancestor Worship"] += 1;
            addLog(`Developed 1 _Ancestor Worship_.`,gameState);
        },
        "speed":(rC, more) => 0.05*Math.pow(rC["Temple"],0.5)/(1+rC["Ancestor Worship"]),
        "canExecute":(rC,more) => rC["Temple"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Temple"],
        "info":(rC) => {
            let message = ["Develop _Ancestor Worship_. Faster with more _Temple_."];
            if (rC["Temple"] < 1) {
                message = message.concat([`!You need a _Temple_.`]);
            }
            return message;
        }
    },
    {
        "name":"Develop Bull Worship",
        "pane":"Religion",
        "effect":(modified, gameState) => {
            modified["Bull Worship"] += 1;
            addLog(`Developed 1 _Bull Worship_.`,gameState);
        },
        "speed":(rC, more) => 0.05*Math.pow(rC["Temple"]*rC["Cow"],0.25)/(1+rC["Ancestor Worship"]),
        "canExecute":(rC,more) => rC["Temple"] >= 1 && rC["Cow"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Temple"],
        "info":(rC) => {
            let message = ["Develop _Bull Worship_. Faster with more _Temple_, _Cow_."];
            if (rC["Temple"] < 1) {
                message = message.concat([`!You need a _Temple_.`]);
            }
            return message;
        }
    },
    {
        "name":"Develop Bear Worship",
        "pane":"Religion",
        "effect":(modified, gameState) => {
            modified["Bear Worship"] += 1;
            addLog(`Developed 1 _Bear Worship_.`,gameState);
        },
        "speed":(rC, more) => 0.05*Math.pow(rC["Temple"],0.5)/(1+rC["Bear Worship"]),
        "canExecute":(rC,more) => rC["Temple"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Temple"],
        "info":(rC) => {
            let message = ["Develop _Bear Worship_. Faster with more _Temple_."];
            if (rC["Temple"] < 1) {
                message = message.concat([`!You need a _Temple_.`]);
            }
            return message;
        }
    },
    {
        "name":"Train Shaman",
        "pane":"Specialists",
        "effect":(modified, gameState) => {
            modified["Shaman"] += 1;
            addLog("Trained 1 _Shaman_.",gameState);
        },
        "speed":(rC) => {return 0.02 * softCap(300+25*rC["Shaman"], rC["People"], 4) * Math.sqrt(rC["People"])/(5+3*rC["Shaman"])},
        "canExecute":(rC) => {return rC["Shamanistic Tradition"] >= 1},
        "visible":(rC,more) => more["actionCount"]["Develop Shamanism"],
        "info":(rC)=>{
            let message = ["Train _Shaman_ to respond to _Disease_. Faster with more _People_."]
            if (rC["Shamanistic Tradition"] < 1) {
                message = message.concat([`!You need to develop _Shamanistic Tradition_.`]);
            }
            return message;
        }
    },
    {
        "name":"Succumb to Disease",
        "pane":"Health",
        "effect":(modified, gameState)=> {
            let num_deaths = 6 / (2+modified["Shaman"])
            if (modified["People"] >= 250) {
                modified["People"] -= 3;
            }
            modified["Disease"] -= 1;
            modified["Disease Resistance"] += 1;
            addLog(`${Math.floor(100*num_deaths)/100} _People_ died of disease. Remaining _Disease_ has decreased by 1 and _Disease Resistance_ has improved by 1.`,gameState);
        },
        "speed":(rC) => {
            return 0.10*rC["Disease"]/(10+rC["Disease Resistance"])
        },
        "canExecute":(rC) => rC["People"]>=250 && rC["Disease"]>=1,
        "auto":1,
        "info":(rC)=>{
            return ["Kills 3 _People_. Goes faster with more _Disease_ and slower with a more _Disease Resistance_. Less deadly with more _Shaman_."];
        }
    },
    {
        "name":"Dig Clay",
        "pane":"Raw Materials",
        "power":(modified, gameState) => Math.pow(modified["Gatherer"]*modified["River"], 0.25),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Dig Clay"].power(modified, gameState);
            modified["Clay"] += new_resource;
            addLog(`Dug ${Math.floor(100*new_resource)/100} _Clay_.`,gameState);
        },
        "speed":(rC) => {return 0.1*softCap(rC["Clay"],20+10*rC["Settlement"])},
        "canExecute":(rc) => rc["Settlement"],
        "visible":(rC) => rC["Settlement"],
        "info":(rC)=>{
            let message = ["Dig up some _Clay_. Faster with more _Settlement_, higher yield with more _Gatherer_, _River_."];
            if (!rC["Gatherer"]) {
                message = message.concat(["!You need a _Gatherer_."]);
            }
            return message;
        }
    },
    {
        "name":"Build City Walls",
        "pane":"Infrastructure",
        "effect":(modified, gameState) => {
            modified["Walls"] += 1;
            modified["Clay"] -= 2;
            modified["Rocks"] -= 5;
            addLog(`Built _Walls_ from 2 _Clay_ and 5 _Rocks_.`,gameState)
        },
        "speed":(rC) => 0.05*Math.sqrt(rC["Settlement"])/(1+rC["Walls"]),
        "canExecute":(rC)=>rC["Clay"]>=2 && rC["Rocks"]>=5,
        "visible":(rC,more)=>more.actionCount["Dig Clay"],
        "info":(rC)=>{
            let message = ["Build _Walls_. Faster with more _Settlement_."];
            if (rC["Clay"]<2) {
                message = message.concat(["!You need 2 _Clay_."]);
            }
            if (rC["Rocks"]<5) {
                message = message.concat(["!You need 5 _Rocks_."]);
            }
            return message;
        }
    },
    {
        "name":"Make Pottery",
        "pane":"Manufactured Goods",
        "power":(modified, gameState) => 1,
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Make Pottery"].power(modified, gameState);
            modified["Pottery"] += new_resource;
            modified["Clay"] -= 1;
            addLog(`Make ${Math.floor(100*new_resource)/100} _Pottery_ from 1 _Clay_.`,gameState);
        },
        "speed":(rC) => {return 0.1*softCap(rC["Pottery"],20+10*rC["Granary"])},
        "canExecute":(rc) => rc["Clay"] >= 1,
        "visible":(rC,more) => more.actionCount["Dig Clay"],
        "info":(rC)=>{
            let message = ["Make _Pottery_. Faster with more _Granary_."];
            if (rC["Clay"]<1) {
                message = message.concat(["!You need some _Clay_."]);
            }
            return message;
        }
    },
    {
        "name":"Build Granary",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Granary"] += 1;
            addLog(`Built 1 _Granary_.`,gameState);
        },
        "speed":(rC, more) => 0.03*Math.pow(rC["Settlement"]*rC["Pottery"],0.25)/(1+rC["Granary"]),
        "canExecute":(rC,more) => rC["Pottery"] >= 3,
        "visible":(rC,more) => more.actionCount["Make Pottery"],
        "info":(rC) => {
            let message = ["Build a _Granary_. Faster with more _Settlement_, _Pottery_."];
            if (rC["Pottery"] < 3) {
                message = message.concat([`!You need 3 _Pottery_.`]);
            }
            return message;
        }
    },
    {
        "name":"Build Dining Hall",
        "pane":"Dining",
        "effect":(modified, gameState) => {
            modified["Dining Hall"] += 1;
            addLog(`Built 1 _Dining Hall_.`,gameState);
        },
        "speed":(rC, more) => 0.03*Math.pow(rC["Settlement"]*rC["Pottery"],0.25)/(1+rC["Dining Hall"]),
        "canExecute":(rC,more) => rC["Pottery"] >= 3,
        "visible":(rC,more) => more.actionCount["Make Pottery"],
        "info":(rC) => {
            let message = ["Build a _Dining Hall_. Faster with more _Settlement_, _Pottery_."];
            if (rC["Pottery"] < 3) {
                message = message.concat([`!You need 3 _Pottery_.`]);
            }
            return message;
        }
    },
    {
        "name":"Build Stilt House",
        "pane":"Buildings",
        "effect":(modified, gameState) => {
            modified["Stilt House"] += 1;
            addLog(`Built 1 _Stilt House_.`,gameState);
        },
        "speed":(rC, more) => 0.05*Math.pow(rC["Walls"],0.5)/(1+rC["Stilt House"]),
        "canExecute":(rC,more) => rC["Walls"] >= 3,
        "visible":(rC,more) => more.actionCount["Build City Walls"],
        "info":(rC) => {
            let message = ["Build a _Stilt House_. Faster with more _Walls_."];
            if (rC["Pottery"] < 1) {
                message = message.concat([`!You need _Walls_.`]);
            }
            return message;
        }
    },
    {
        "name":"Train Archer",
        "pane":"Units",
        "effect":(modified,gameState) => {
            modified["Archer"] += 1;
            modified["Protein"] -= 3;
            addLog("Trained 1 _Archer_ and consumed 3 _Protein_.",gameState);
        },
        "speed":(rC)=>0.01*softCap(250+25*rC["Archer"], rC["People"], 4)*Math.pow(rC["People"]*rC["Protein"],0.25)/(1+rC["Archer"]),
        "canExecute":(rC) => {
            return rC["Protein"]>=3 && (rC["People"] >= 250 && rC["Walls"]>=1);
        },
        "visible":(rC, more) => more["actionCount"]["Build City Walls"],
        "info":(rC)=>{
            let message = ["Train _Archer_. Faster with more _People_, _Protein_."]
            if (rC["People"] < 250) {
                message = message.concat([`!You need ${250} _People_.`]);
            }
            if (rC["Protein"]<3) {
                message = message.concat(["!You need 3 _Protein_."])
            }
            if (rC["Walls"]<3) {
                message = message.concat(["!You need _Walls_."])
            }
            return message;
        }
    },
    {
        "name":"Explore Mountain",
        "pane":"Home Continent",
        "effect":(modified, gameState) => {
            modified["Mountain"] += 1;
            addLog("Found 1 _Mountain_.",gameState);
        },
        "speed":(rC) => {return 0.1*Math.pow(rC["Archer"],0.5)/(1+rC["Mountain"])},
        "canExecute":(rC) => rC["Archer"] >= 1,
        "visible":(rC,more)=>more["actionCount"]["Train Archer"]>=1,
        "info":(rC)=>{
            let message = ["Search for a _Mountain_ to settle. Faster with more _Archer_."];
            if (rC["Archer"] < 1) {
                message = message.concat(["!You need an _Archer_."]);
            }
            return message;
        }
    },
    {
        "name":"Domesticate Cat",
        "pane":"Animals",
        "effect":(modified, gameState) => {
            modified["Cat"] += 1;
            addLog(`Got domesticated by 1 _Cat_.`,gameState);
        },
        "speed":(rC)=>0.03*Math.pow(rC["Milk"]*rC["Settlement"],0.25)/(1+rC["Cat"]),
        "canExecute":(rC,more)=>rC["Milk"]>=1,
        "visible":(rC,more)=>more.actionCount["Produce Milk"],
        "info":(rC)=>{
            let message = ["Domesticate a _Cat_. Faster with more _Milk_, _Settlement_."];
            if (rC["Milk"]<1) {
                message = message.concat(["!You need _Milk_."]);
            }
            return message;
        }
    },
    {
        "name":"Mine Copper",
        "pane":"Raw Materials",
        "power":(modified, gameState) => Math.max(1,0.2*Math.pow(modified["Hills"], 0.5)),
        "effect":(modified, gameState) => {
            const new_resource = gameState.actions_dict["Mine Copper"].power(modified, gameState);
            modified["Copper"] += new_resource;
            addLog(`Dug ${Math.floor(100*new_resource)/100} _Copper_.`,gameState);
        },
        "speed":(rC) => {return 0.1*softCap(rC["Copper"],20+10*rC["Settlement"])},
        "canExecute":(rC) => rC["Clay"]>=1 && rC["Hills"]>=1,
        "visible":(rC,more) => more.actionCount["Dig Clay"],
        "info":(rC)=>{
            let message = ["Mine some _Copper_. Faster with more _Settlement_, higher yield with more _Hills_."];
            if (rC["Clay"]<1) {
                message = message.concat(["!You need some _Clay_."]);
            }
            if (rC["Hills"]<1) {
                message = message.concat(["!You need some _Hills_."]);
            }
            return message;
        }
    },
    {
        "name":"Build a City",
        "pane":"Civilization",
        "effect":(modified, gameState) => {
            modified["City"] += 1;
            addLog("Built 1 _City_.",gameState)
            if (modified["City"] === 1) {
                addLog("This is the end of the current demo. Feel free to keep playing.",gameState);
                addLog("You have built a City and is reaching the Bronze Age.",gameState);
            }
        },
        "speed":(rC) => {return 0.001*Math.pow(rC["People"]*rC["Settlement"]*rC["Copper"]*rC["Temple"]*(rC["Mountain"]+rC["Pasture"]+rC["Desert"]), 1/10)/(1+rC["City"])},
        "canExecute":(rC) => rC["Copper"] && rC["Temple"] && rC["Mountain"] && rC["Pasture"] && rC["Desert"] && rC["People"] >= 2000,
        "visible":(rC) => rC["Copper"] && rC["Temple"] && rC["Mountain"] && rC["Pasture"] && rC["Desert"],
        "info":(rC)=>{
            let message = ["Build a _City_. You need a lot of people. Faster with more _People_, _Settlement_, _Copper_, _Temple_, _Mountain_, _Pasture_, _Desert_."];
            if (rC["People"] < 2000) {
                message = message.concat(["!You need 2000 _People_."]);
            }
            return message;
        }
    },
    {
        "name":"Feast",
        "pane":"Dining",
        "effect":(modified, gameState) => {
            const foods = ["Wheat","Barley","Rice","Maize","Beef","Pork","Poultry Meat","Mutton","Milk","Cheese","Fruit","Bread"];
            let food_eaten = [];
            let food_gain = 0;
            const food_multipliers = {"Beef":2,"Pork":2,"Poultry Meat":2,"Mutton":2,"Cheese":2,"Bread":2};
            for (let food in foods) {
                const num_eaten = Math.min(modified[foods[food]],Math.pow(modified[foods[food]],0.25));
                food_gain += num_eaten * (foods[food] in food_multipliers ? food_multipliers[foods[food]] : 1);
                modified[foods[food]] -= num_eaten;
                if (num_eaten > 0) {
                    let str_piece = (Math.floor(100*num_eaten)/100).toString() + " _" + foods[food]+"_";
                    food_eaten = food_eaten.concat([str_piece]);
                }
            }
            food_gain *= Math.min(modified["Dining Hall"],Math.pow(modified["Dining Hall"],0.25));
            modified["Food"] += food_gain;
            addLog(`Ate ${food_eaten.join(', ')} and gained ${Math.floor(100*food_gain)/100} _Food_.`,gameState)
        },
        "speed":(rC) => 0.1*softCap(rC["Food"],50+20*rC["Dining Hall"]),
        "canExecute":(rC) => rC["Dining Hall"] >= 1,
        "visible":(rC,more) => more.actionCount["Build Dining Hall"],
        "info":(rC) => {
            let message = ["Have a feast to gain _Food_. Faster with more _Dining Hall_, more effective with more food."];
            if (rC["Dining Hall"] < 1) {
                message = message.concat(["!You need a _Dining Hall_."]);
            }
            return message;
        }
    },
    {
        "name":"Marriage Ceremony",
        "pane":"Population ",
        "effect":(modified, gameState) => {
            let message = "";
            if (modified["People"] >= 10) {
                modified["Food"] -= 25;
                message = "You ate 25 _Food_. "
            }
            let success = Math.random() > modified["Infant Mortality"]/100 ? 1:0;
            if (!modified["Infant Mortality"]) {success = 1}
            modified["People"] += 25*success;
            if (success) {
                message = "You gained 25 _People_. "+message;
            }
            else {
                message = "The marriage ceremony was unsuccessful. "+message;
                if (modified["Infant Mortality"] >= 31) {
                    modified["Infant Mortality"] -= 1;
                    message = message + "_Infant Mortality_ has decreased by 1."
                }
            }
            addLog(message,gameState);
        },
        "speed":(rC) => {
            let food_speed = 1+Math.sqrt(rC["Food"]);
            let shelter_speed = rC["Stilt House"];
            return 8*Math.sqrt(food_speed*shelter_speed)/rC["People"];
        },
        "canExecute":(rC) => {
            return (rC["Food"]>=25 && rC["Temple"] >= 1);
        },
        "visible":(rC, more)=>more["actionCount"]["Build Temple"] >= 1,
        "info":(rC)=>{
            let message = ["Add 25 _People_ to your tribe. Faster with more _Food_, _Stilt House_."];
            if (rC["Food"] < 25) {
                message = message.concat(["!You need 25 _Food_."]);
            }
            if (rC["Temple"] < 1) {
                message = message.concat(["!You need a _Temple_."]);
            }
            return message;
        }
    }
]
