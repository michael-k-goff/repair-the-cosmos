// Game assets: resource groups, resources, actions, and whatever else

import {resources01, actions01} from './assetsByEra/Era01';

// Top level resource panes
export const resource_panes = [
    {"name":"Population","desc":"Manage your population, professions, etc."},
    {"name":"Territory","desc":"Explore and acquire new territory."},
    {"name":"Resources","desc":"Gather natural resources."},
    {"name":"Buildings","desc":"Build stuff."},
    {"name":"Society","desc":"Manage government, religion, etc."},
    {"name":"Military","desc":"Take territory, resources, etc."}
]

export const resources = resources01;
// Add extra characteristic dictionaries to the end of each resource
// They should have been dictionaries from the beginning. Oh well.
for (var i=0; i<resources.length;i++) {
    if (resources[i][0]) { // Convert arrays to more proper objects
        let new_resource = {"name":resources[i][0], "pane":resources[i][1],"desc":resources[i][2]}
        if (resources[i][3]) {
            for (var key in resources[i][3]) {
                new_resource[key] = resources[i][3][key]
            }
        }
        resources[i] = new_resource;
    }
    // Add a sort key for resource pane display
    resources[i].sort_key = i + ((resources[i].character==="bad")?1000000:0);
}

export const actions = actions01;
for (i=0; i<actions.length; i++) {
    actions[i].sort_key = i+((actions[i].auto)?1000000:0);
}

// For improved performance, organize and sort resources and actions by pane.
export var resources_by_pane = {};
export var actions_by_pane = {};
const filter_func_resource = i=>x=>x.pane===resource_panes[i].name;
const filter_func_action = i=>x=>x.pane===resource_panes[i].name;
for (i=0; i<resource_panes.length; i++) {
    resources_by_pane[resource_panes[i].name] = resources.filter(filter_func_resource(i)).sort((a,b)=>{
        if (a["sort_key"]<b["sort_key"]) {return -1;}
        if (a["sort_key"]>b["sort_key"]) {return 1;}
        return 0;
    });
    actions_by_pane[resource_panes[i].name] = actions.filter(filter_func_action(i)).sort((a,b)=>{
        if (a["sort_key"]<b["sort_key"]) {return -1;}
        if (a["sort_key"]>b["sort_key"]) {return 1;}
        return 0;
    });
}
// Actions that execute automagically
export const auto_actions = actions.filter(x=>x["auto"]);

export const actionEffectWrapper = (gameState, action) => () => {
    action["effect"](gameState.resourceCount, gameState);
    if (!(action["name"] in gameState.actionCount)) {
        gameState.actionCount[action["name"]] = 0
    }
    gameState.actionCount[action["name"]] += 1;
}
