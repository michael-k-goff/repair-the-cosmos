// Game logic goes here.

import {resource_panes, resources} from './assets.js';
import {useState} from 'react';

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
    gameState.setNumActions(num_actions);
    return num_actions
}

const initiateAuto = (gameState) => {
    // Add all executable auto actions
    for (var i=0; i<auto_actions.length; i++) {
        if (!(auto_actions[i]["name"] in gameState.actionProgress) && auto_actions[i]["canExecute"](gameState.resourceCount,gameState)) {
            gameState.actionProgress[auto_actions[i]["name"]] = {"timeLeft":1, "action":auto_actions[i]}
        }
    }
}

const stageNewAction = (gameState) => {
    // Handle button presses via staging
    if (gameState["staging"]["action"]) {
        if (gameState["staging"]["operation"]==="One") {
            gameState.actionProgress[gameState["staging"]["action"]["name"]] = {"timeLeft":1, "action":gameState["staging"]["action"]}
        }
        if (gameState["staging"]["operation"]==="Repeat") {
            gameState.actionProgress[gameState["staging"]["action"]["name"]] = {
                "timeLeft":1,
                "action":gameState["staging"]["action"],
                "repeat":1
            }
        }
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
        if (prog["repeat"] && prog["action"]["canExecute"](gameState.resourceCount,gameState)) {
            prog["timeLeft"] = 1;
        }
        else {
            delete gameState.actionProgress[key];
        }
    }
}

// Apply staging to a single action, aside from the CancelALL operation, which is in actionDone
const applyStaging = (gameState, key, prog) => {
    if (gameState["staging"]["operation"] && gameState["staging"]["operation"]==="CancelRepeat") {
        prog["repeat"] = 0;
    }
    if (gameState["staging"]["operation"] && gameState["staging"]["operation"]==="RepeatToggle" && gameState["staging"]["action"]["name"] === key) {
        prog["repeat"] = prog["repeat"]?0:1;
    }
}

const setGameState = (gameState) => {
    gameState.setResourceCount(gameState.resourceCount);
    gameState.setActionProgress(gameState.actionProgress);
    gameState["setActionCount"](gameState.actionCount);
    gameState["setStaging"]({});
}

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
            applyStaging(gameState, key, prog);
            var speed_mod = prog["action"]["auto"]?1:directSpeedMod(num_actions);
            // Real version should start with 0.001 * ...
            prog["timeLeft"] -= 0.001*speed_mod*ms*prog["action"]["speed"](gameState.resourceCount);
            checkActionDone(gameState, key, prog);
        }
        else {
            delete gameState.actionProgress[key];
        }
    }
    setGameState(gameState);
}

export const gameReset = (gameState) => {
    gameState.setActionProgress({});
    gameState.setResourceCount(init_resource_count());
    gameState.setStory(init_story);
    gameState.setHover(init_hover);
    gameState.setActionCount({});
}

export const gameSave = (gameState, window) => {
    window.localStorage.setItem("resourceCount",JSON.stringify(gameState.resourceCount));
    window.localStorage.setItem("actionProgress",JSON.stringify(gameState.actionProgress));
    window.localStorage.setItem("story",JSON.stringify(gameState.story));
    window.localStorage.setItem("actionCount",JSON.stringify(gameState["actionCount"]));
}

export const loadGame = (gameState, window) => {
    let rC = window.localStorage.getItem("resourceCount");
    if (rC) {
        gameState.setResourceCount(JSON.parse(rC));
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
        gameState.setActionProgress(aP);
    }
    let s = window.localStorage.getItem("story");
    if (s) {
        gameState.setStory(JSON.parse(s));
    }

    let aC = window.localStorage.getItem("actionCount");
    if (aC) {
        gameState["setActionCount"](JSON.parse(aC));
    }
}

// Initialize resources

export const init_resource_count = () => {
    let irc = {};
    for (var key in resources) {
        irc[resources[key].name] = 0;
    }
    irc["People"] = 2; // Adam and Eve
    irc["Garden of Eden"] = 1;
    return irc;
}

// Initialize other stuff
export const init_story = [
    "The Fall. Adam and Eve have been cast from the Garden. Your job is to guide them and their descendents to repair the cosmos.",
    "To start with, you need more people. Head over to the Population tab and be fruitful and multiply.",
    "Check the other tabs periodically for more actions as they become available."
]

export const init_hover = "Watch this space for more info.";

export const useGameState = () => {
    // Currently displayed pane
    const [pane, setPane] = useState(resource_panes[0].name);

    // Counts of all resources
    const [resourceCount, setResourceCount] = useState(init_resource_count());

    // Progress toward completing actions
    const [actionProgress, setActionProgress] = useState({});

    // What is currently being overed over for the info box
    const [hover, setHover] = useState(init_hover);

    // Current story
    const [story, setStory] = useState(init_story)

    // Counts of how many times each action is performed
    const [actionCount, setActionCount] = useState({});

    // Staging area for actions done by click.
    const [staging, setStaging] = useState({})

    // Number of non-automatic actions going on at once.
    // Being stored as a separate variable for caching purposes
    const [numActions, setNumActions] = useState(0);

    return {
            "pane":pane, "setPane":setPane,
            "resourceCount":resourceCount, "setResourceCount":setResourceCount,
            "actionProgress":actionProgress, "setActionProgress":setActionProgress,
            "hover":hover, "setHover":setHover,
            "story":story, "setStory":setStory,
            "actionCount":actionCount, "setActionCount":setActionCount,
            "staging":staging, "setStaging":setStaging,
            "numActions":numActions, "setNumActions":setNumActions
    }
}
