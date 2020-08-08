// Game assets: resource groups, resources, actions, and whatever else

import {resources01, actions01} from './assetsByEra/Era01';
import {resources02, actions02} from './assetsByEra/Era02';
import {resources03, actions03} from './assetsByEra/Era03';
import {resources04, actions04} from './assetsByEra/Era04';
import {resources05, actions05} from './assetsByEra/Era05';
import {resources06, actions06} from './assetsByEra/Era06';
import {resources07, actions07} from './assetsByEra/Era07';
import {resources08, actions08} from './assetsByEra/Era08';
import {resources09, actions09} from './assetsByEra/Era09';
import {resources10, actions10} from './assetsByEra/Era10';
import {resources11, actions11} from './assetsByEra/Era11';
import {resources12, actions12} from './assetsByEra/Era12';
import {resources13, actions13} from './assetsByEra/Era13';
import {resources14, actions14} from './assetsByEra/Era14';
import {resources15, actions15} from './assetsByEra/Era15';
import {resources16, actions16} from './assetsByEra/Era16';
import {resources17, actions17} from './assetsByEra/Era17';
import {resource_panes} from './assetsPanes';

// Convert to a dictionary
export const resource_pane_dict = {}
for (var i=0; i<resource_panes.length; i++) {
    resource_pane_dict[resource_panes[i].name] = resource_panes[i];
}

export const resources = resources01.concat(resources02, resources03, resources04,
    resources05, resources06, resources07, resources08, resources09, resources10,
    resources11, resources12, resources13, resources14, resources15, resources16,
    resources17
);
// Add extra characteristic dictionaries to the end of each resource
// They should have been dictionaries from the beginning. Oh well.
for (i=0; i<resources.length;i++) {
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

// Convert to a dictionary
export const resource_dict = {}
for (i=0; i<resources.length; i++) {
    resource_dict[resources[i].name] = resources[i];
}

export const actions = actions01.concat(actions02, actions03, actions04, actions05,
    actions06, actions07, actions08, actions09, actions10, actions11, actions12,
    actions13, actions14, actions15, actions16, actions17
);
for (i=0; i<actions.length; i++) {
    actions[i].sort_key = i+((actions[i].auto)?1000000:0);
}

// Convert to a dictionary
export const actions_dict = {}
for (i=0; i<actions.length; i++) {
    actions_dict[actions[i].name] = actions[i];
}

// For improved performance, organize and sort resources, actions, and panes by pane.
export var resources_by_pane = {};
export var actions_by_pane = {};
export var panes_by_pane = {};
const filter_func_resource = i=>x=>x.pane===resource_panes[i].name;
const filter_func_action = i=>x=>x.pane===resource_panes[i].name;
const filter_func_pane = i=>x=>x.pane===resource_panes[i].name;
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
    panes_by_pane[resource_panes[i].name] = resource_panes.filter(filter_func_pane(i));
}
panes_by_pane["top"] = resource_panes.filter(x=>x.pane==="top");
panes_by_pane["Settings"] = [];
// Actions that execute automagically
export const auto_actions = actions.filter(x=>x["auto"]);

export const actionEffectWrapper = (gameState, action) => () => {
    action["effect"](gameState.resourceCount, gameState);
    if (!(action["name"] in gameState.actionCount)) {
        gameState.actionCount[action["name"]] = 0
    }
    gameState.actionCount[action["name"]] += 1;
}
