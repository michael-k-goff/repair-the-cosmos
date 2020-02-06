// Game assets: resource groups, resources, actions, and whatever else

import {resources01, actions01} from './assetsByEra/Era01';

// Top level resource panes
export const resource_panes = [
    ["Population","Manage your population, professions, etc."],
    ["Territory","Explore and acquire new territory."],
    ["Resources","Gather natural resources."],
    ["Buildings","Build stuff."],
    ["Society","Manage government, religion, etc."]
]

export const resources = resources01;

export const actions = actions01;

// For improved performance, organized resources and actions by pane.
export var resources_by_pane = {};
export var actions_by_pane = {};
for (var i=0; i<resource_panes.length; i++) {
    resources_by_pane[resource_panes[i][0]] = resources.filter(x=>x[1]===resource_panes[i][0]);
    actions_by_pane[resource_panes[i][0]] = actions.filter(x=>x["pane"]===resource_panes[i][0]);
}
console.log(resources_by_pane);

export const actionEffectWrapper = (modified, sRC, setStory, action) => () => {
    action["effect"](modified, setStory);
    return modified;
}
