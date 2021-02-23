// Game logic goes here.

import {resources, panes_by_pane, resource_dict, resource_pane_dict, actions_dict} from './assets.js';
import {resource_panes} from './assetsPanes';

import {actionEffectWrapper, actions, auto_actions} from './assets.js';

export const speedMod = (gameState, add_one = 0) => {
    const num_actions = Math.max(1,gameState.numActions+add_one);
    return Math.pow(1/(num_actions), 0.8);
}

// Like speedMod, but this one uses the number of actions directly
export const directSpeedMod = (num_actions, add_one = 0) => {
    num_actions = Math.max(1,num_actions);
    return Math.pow(1/(num_actions+add_one), 0.8);
}

export const timeLeft = (gameState, action) => {
    const base_speed = action["speed"](gameState.resourceCount);
    if (base_speed <= 0) {
        return -1; // Dummy return
    }
    let speed_mod = speedMod(gameState, (action["name"] in gameState.actionProgress)?0:1)
    let timeLeft = 1/base_speed * ( (action["name"] in gameState.actionProgress) ? gameState.actionProgress[action["name"]]["timeLeft"] : 1 );
    return timeLeft / (action["auto"]?1:speed_mod);
}

export const timeLeftString = (time_left) => {
    time_left = Math.round(time_left);
    let time_left_string = time_left ? "" : "0s ";
    if (time_left >= 24*60*60) {
        time_left_string += `${Math.floor(time_left/(24*60*60))}d `;
        time_left = time_left - 24*60*60*Math.floor(time_left/(24*60*60));
    }
    if (time_left >= 60*60) {
        time_left_string += `${Math.floor(time_left/(60*60))}hr `;
        time_left = time_left - 60*60*Math.floor(time_left/(60*60));
    }
    if (time_left >= 60) {
        time_left_string += `${Math.floor(time_left/60)}m `;
        time_left = time_left - 60*Math.floor(time_left/60);
    }
    if (time_left >= 1) {
        time_left_string += `${time_left}s `;
    }
    return time_left_string;
}

const cacheNumAction = (gameState) => {
    // Number of non-automatic actions for the purposes of speed modification
    let num_actions = Object.keys(gameState.actionProgress).filter(key =>
        !(gameState.actionProgress[key]["action"]["auto"])
    ).length;
    gameState.numActions = num_actions;
    return num_actions;
}

// Initiate the auto-executing actions.
const initiateAuto = (gameState) => {
    // Add all executable auto actions
    for (var i=0; i<auto_actions.length; i++) {
        if (!(auto_actions[i]["name"] in gameState.actionProgress) && auto_actions[i]["canExecute"](gameState.resourceCount,gameState)) {
            gameState.actionProgress[auto_actions[i]["name"]] = {"timeLeft":1, "action":auto_actions[i]}
        }
    }
}

// Handle button presses via staging
const stageNewAction = (gameState) => {
    if (gameState["staging"]["action"]) {
        if (gameState["staging"]["operation"]==="One") {
            gameState.actionProgress[gameState["staging"]["action"]["name"]] =  {
                "timeLeft":1,
                "action":gameState["staging"]["action"]
            }
        }
        if (gameState["staging"]["operation"]==="Repeat") { // As of February 18, 2020, this case should be obsolete.
            gameState.actionProgress[gameState["staging"]["action"]["name"]] = {
                "timeLeft":1,
                "action":gameState["staging"]["action"]
            }
            gameState.repeat[gameState["staging"]["action"]["name"]] = 1;
        }
        if (gameState["staging"]["operation"] && gameState["staging"]["operation"]==="RepeatToggle") {
            // Check how many repeats
            let num_repeats = 0;
            for (var key in gameState.repeat) {
                if (gameState.repeat[key]) {
                    num_repeats += 1;
                }
            }
            if (num_repeats >= 4 && !gameState.repeat[gameState.staging.action.name]) {
                gameState.hovers["other_You cannot have more than 4 repeating actions. Please disable another repeating action first."] = new Date().getTime();
            }
            else {
                gameState.repeat[gameState.staging.action.name] = gameState.repeat[gameState.staging.action.name] ? 0:1;
            }
        }
    }
    if (gameState["staging"]["operation"] && gameState["staging"]["operation"]==="CancelRepeat") {
        gameState.repeat = {};
    }
}

const actionDone = (gameState, action, cancelAll) => {
    return (
        !gameState["staging"]["action"] ||
        gameState["staging"]["operation"] !== "Cancel" ||
        gameState["staging"]["action"]["name"] !== action
    ) &&
        gameState.actionProgress[action]["action"]["canExecute"](gameState.resourceCount,gameState) &&
    (
        !cancelAll ||
        gameState.actionProgress[action]["action"]["auto"]
    )
}

const checkActionDone = (gameState, key, prog) => {
    if (prog["timeLeft"] <= 0) {
        actionEffectWrapper(gameState, prog["action"])();
        if (gameState.repeat[prog.action.name] &&
            prog["action"]["canExecute"](gameState.resourceCount,gameState)
        ) {
            prog["timeLeft"] = 1;
        }
        else {
            delete gameState.actionProgress[key];
        }
    }
}

// Get rid of all but the newest hover. Assuming either there is a unique newest, or if there are
// more than one for whatever reason, it doesn't matter which we keep.
const cleanHovers = (gameState) => {
    let newest = 0;
    let prev_key = "";
    for (var key in gameState.hovers) {
        if (gameState.hovers[key] <= newest) {
            delete gameState.hovers[key];
        }
        else {
            newest = gameState.hovers[key];
            if (gameState.hovers[prev_key]) {
                delete gameState.hovers[prev_key];
            }
            prev_key = key;
        }
    }
}

// The main update loop. Called once per frame.
export const updateActionProgress = (gameState, ms) => {
    const num_actions = cacheNumAction(gameState);
    initiateAuto(gameState);
    stageNewAction(gameState);
    // Update all actions in progress
    let cancelAll = gameState["staging"]["operation"] && gameState["staging"]["operation"] === "CancelALL";
    for (var key in gameState.actionProgress) {
        // This if statement cancels actions staged by be canceled by simply skipping over their copying.
        if (actionDone(gameState, key, cancelAll)) {
            var prog = gameState.actionProgress[key];
            var speed_mod = 0.001*(prog["action"]["auto"]?1:directSpeedMod(num_actions));
            prog["timeLeft"] -= speed_mod*ms*prog["action"]["speed"](gameState.resourceCount);
            checkActionDone(gameState, key, prog);
        }
        else {
            delete gameState.actionProgress[key];
        }
    }
    cleanHovers(gameState);
    gameState.staging = {};
}

export const gameSave = (gameState, window) => {
    window.localStorage.setItem("resourceCount",JSON.stringify(gameState.resourceCount));
    window.localStorage.setItem("actionProgress",JSON.stringify(gameState.actionProgress));
    window.localStorage.setItem("story",JSON.stringify(gameState.story));
    window.localStorage.setItem("actionCount",JSON.stringify(gameState["actionCount"]));
    window.localStorage.setItem("repeat",JSON.stringify(gameState["repeat"]));
}

export const loadGame = (gameState, window) => {
    let rC = window.localStorage.getItem("resourceCount");
    if (rC) {
        let parsed = JSON.parse(rC);
        for (var r_key in resource_dict) {
            if (!parsed[r_key]) {
                parsed[r_key] = 0;
            }
        }
        gameState.resourceCount = parsed;
    }
    let aP = window.localStorage.getItem("actionProgress");
    // This is a bit of a mess. Probably want a system where the actions are readily identified by keys.
    if (aP) {
        aP = JSON.parse(aP);
        for (var key in aP) {
            for (let i=0; i<actions.length; i++) {
                if (aP[key]["action"]["name"]===actions[i]["name"]) {
                    aP[key]["action"] = actions[i];
                }
            }
        }
        gameState.actionProgress = aP;
    }
    let s = window.localStorage.getItem("story");
    if (s) {
        gameState.story = JSON.parse(s);
    }

    let aC = window.localStorage.getItem("actionCount");
    if (aC) {
        gameState.actionCount = JSON.parse(aC);
    }

    let repeat = window.localStorage.getItem("repeat");
    if (repeat) {
        gameState.repeat = JSON.parse(repeat);
    }
}

// Initialize resources

export const init_resource_count = () => {
    let irc = {};
    for (var key in resources) {
        irc[resources[key].name] = 0;
    }
    irc["Australopithecus"] = 2; // Adam and Eve
    irc["Garden of Eden"] = 1;
    return irc;
}

export const addLog = (text, gameState) => {
    for (var i=gameState.story.length-2; i>=0; i--) {
        gameState.story[i+1] = gameState.story[i];
    }
    gameState.story[0] = text;
}

// Initialize other stuff
export const init_story = [
    "The Fall. Adam and Eve have been cast from the Garden. Your job is to guide them and their descendents to repair the cosmos.",
    "To start with, you need more people. Head over to the Population tab and be fruitful and multiply.",
    "Check the other tabs periodically for more actions as they become available.",
    "",
    ""
]

// Initial game state. Meant to supersede the hook system; we'll see if that works.
export const initGameState = () => {
    return {
        "pane":resource_panes[0].name,
        "subpane": panes_by_pane[resource_panes[0].name].length ? panes_by_pane[resource_panes[0].name][0].name : resource_panes[0].name,
        "resourceCount":init_resource_count(),
        "actionProgress":{},
        "story":init_story,
        "actionCount":{},
        "repeat":{},
        "staging":{},
        "numActions":0,
        "hovers":{},
        "actions_dict":actions_dict,
        "resource_dict":resource_dict,
        // A few assets to be bundled up in here for messiness, I mean convenience
        "resource_pane_dict":resource_pane_dict
    }
}

// Soft cap, for use in speed formulas.
// Usage: import into the EraNN.js files. Multiply it by the rest of the speed formula.
// The first parameter is where the softcap should be, the second is the value being softcaped.
// Use a higher exponent to make the softcap sharper. In the limit (infinite exponent), it is a hard cap.
export const softCap = (actual,cap,exponent=2) => 1/(1+Math.pow(actual/cap,exponent))
