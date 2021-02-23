import {addLog, softCap} from "../gameLogic.js";

export const resources_by_category = [
    {
        "pane":"Quarks",
        "resources":[
            {
                "name":"Up Quark",
                "desc":"Up Quark description"
            },
            {
                "name":"Down Quark",
                "desc":"Down Quark description"
            },
            {
                "name":"Charm Quark",
                "desc":"Charm Quark description"
            },
            {
                "name":"Strange Quark",
                "desc":"Strange Quark description"
            },
            {
                "name":"Top Quark",
                "desc":"Top Quark description"
            },
            {
                "name":"Bottom Quark",
                "desc":"Bottom Quark description"
            }
        ]
    },
    {
        "pane":"Leptons",
        "resources":[
            {
                "name":"Electron",
                "desc":"Electron description"
            },
            {
                "name":"Positron",
                "desc":"Positron description"
            }
        ]
    },
    {
        "pane":"Bosons",
        "resources":[
            {
                "name":"Photon",
                "desc":"Photon description"
            },
            {
                "name":"Higgs Boson",
                "desc":"Higgs Boson description"
            }
        ]
    },
    {
        "pane":"Baryons",
        "resources":[
            {
                "name":"Proton",
                "desc":"Proton description"
            },
            {
                "name":"Neutron",
                "desc":"Neutron description"
            }
        ]
    },
    {
        "pane":"Mesons",
        "resources":[
            {
                "name":"Pion",
                "desc":"Pion description"
            }
        ]
    },
    {
        "pane":"Atoms",
        "resources":[
            {
                "name":"Hydrogen",
                "desc":"Hydrogen description"
            },
            {
                "name":"Helium",
                "desc":"Helium description"
            },
            {
                "name":"Carbon",
                "desc":"Carbon description"
            },
            {
                "name":"Nitrogen",
                "desc":"Nitrogen description"
            },
            {
                "name":"Oxygen",
                "desc":"Oxygen description"
            }
        ]
    },
    {
        "pane":"Molecules",
        "resources":[
            {
                "name":"Water",
                "desc":"Water description"
            },
            {
                "name":"Ammonia",
                "desc":"Ammonia description"
            },
            {
                "name":"Methane",
                "desc":"Methane description"
            },
            {
                "name":"Methanol",
                "desc":"Methanol description"
            }
        ]
    }
]

let flat_resources = [];
let flat_actions = [];

// Helper functions to build the asset and action list
let build_action = new_resource => {
    return {
        "name":`Make ${new_resource.name}`,
        "pane":new_resource.pane,
        "effect": (modified, gameState) => {
            modified[new_resource.name] += 1;
            addLog(`Made 1 _${new_resource.name}_.`,gameState);
        },
        "speed":rC=>1,
        "canExecute":rC=>1,
        "visible":(rC,more)=>1,
        "info":(rC)=>{
            let message = [`Make a _${new_resource.name}_.`];
            return message;
        }
    }
}

for (let i=0; i<resources_by_category.length; i++) {
    let pane = resources_by_category[i].pane;
    for (let j=0; j<resources_by_category[i].resources.length; j++) {
        let new_resource = resources_by_category[i].resources[j];
        new_resource.pane = pane;
        flat_resources.push(new_resource);
        flat_actions.push(build_action(new_resource));
    }
}

export const resources_matter = flat_resources;
export const actions_matter = flat_actions;
