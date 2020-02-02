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

export const actionEffectWrapper = (modified, sRC, setStory, action) => () => {
    action["effect"](modified, setStory);
    return modified;
}
