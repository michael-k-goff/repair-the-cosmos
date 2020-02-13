// Game assets: resource groups, resources, actions, and whatever else

import {resources01, actions01} from './assetsByEra/Era01';

// Top level resource panes
export const resource_panes = [
    ["Population","Manage your population, professions, etc."],
    ["Territory","Explore and acquire new territory."],
    ["Resources","Gather natural resources."],
    ["Buildings","Build stuff."],
    ["Society","Manage government, religion, etc."],
    ["Military","Take territory, resources, etc."]
]

export const resources = resources01;
// Add extra characteristic dictionaries to the end of each resource
// They should have been dictionaries from the beginning. Oh well.
for (var i=0; i<resources.length;i++) {
    if (resources[i].length === 3) {
        resources[i] = resources[i].concat([{}]);
    }
    // Add a sort key for resource pane display
    resources[i][3]["sort_key"] = i + ((resources[i][3]["character"]==="bad")?1000000:0);
}

export const actions = actions01;
for (i=0; i<actions.length; i++) {
    actions[i]["sort_key"] = i+((actions[i]["auto"])?1000000:0);
}

// For improved performance, organize and sort resources and actions by pane.
export var resources_by_pane = {};
export var actions_by_pane = {};
const filter_func_resource = i=>x=>x[1]===resource_panes[i][0];
const filter_func_action = i=>x=>x["pane"]===resource_panes[i][0];
for (i=0; i<resource_panes.length; i++) {
    resources_by_pane[resource_panes[i][0]] = resources.filter(filter_func_resource(i)).sort((a,b)=>{
        if (a[3]["sort_key"]<b[3]["sort_key"]) {return -1;}
        if (a[3]["sort_key"]>b[3]["sort_key"]) {return 1;}
        return 0;
    });
    actions_by_pane[resource_panes[i][0]] = actions.filter(filter_func_action(i)).sort((a,b)=>{
        if (a["sort_key"]<b["sort_key"]) {return -1;}
        if (a["sort_key"]>b["sort_key"]) {return 1;}
        return 0;
    });
}
// Actions that execute automagically
export const auto_actions = actions.filter(x=>x["auto"]);

export const actionEffectWrapper = (modified, sRC, setStory, action, modCount) => () => {
    action["effect"](modified, setStory);
    if (!(action["name"] in modCount)) {
        modCount[action["name"]] = 0
    }
    modCount[action["name"]] += 1;
    return modified;
}
