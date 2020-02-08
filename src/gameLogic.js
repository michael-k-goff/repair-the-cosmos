// Game logic goes here.

import {actionEffectWrapper, actions, auto_actions} from './assets.js';
import {init_resource_count, init_story, init_hover} from './state_hook.js';

export const speedMod = (actionProgress, add_one = 0) => {
    // This function is called repeatedly, so consider caching the num_actions variable.
    const manualAP = Object.keys(actionProgress).filter(key =>
        !(actionProgress[key]["action"]["auto"])
    );
    const num_actions = Math.max(1,manualAP.length);
    return Math.pow(1/(num_actions+add_one), 0.8);
}

export const timeLeft = (actionProgress, resourceCount, action) => {
    const base_speed = action["speed"](resourceCount);
    if (base_speed <= 0) {
        return -1; // Dummy return
    }
    let speed_mod = speedMod(actionProgress, (action["name"] in actionProgress)?0:1)
    let timeLeft = 1/base_speed * ( (action["name"] in actionProgress) ? actionProgress[action["name"]]["timeLeft"] : 1 );
    return timeLeft / (action["auto"]?1:speed_mod);
}

export const timeLeftString = (time_left) => {
    time_left = Math.round(time_left);
    console.log(time_left);
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

export const updateActionProgress = (resourceCount, setResourceCount,
                    actionProgress, setActionProgress, story, setStory, more, ms) => {
    let newActionProgress = {};
    let modified = {}
    for (var key in resourceCount) {
        modified[key] = resourceCount[key];
    }
    let modCount = {} // Modified action counts
    for (key in more["actionCount"]) {
        modCount[key] = more["actionCount"][key];
    }
    // Add all executable auto actions
    for (var i=0; i<auto_actions.length; i++) {
        if (!(auto_actions[i]["name"] in actionProgress) && auto_actions[i]["canExecute"](modified,more)) {
            newActionProgress[auto_actions[i]["name"]] = {"timeLeft":1, "action":auto_actions[i]}
        }
    }
    // Handle button presses via staging
    if (more["staging"]["action"]) {
        if (more["staging"]["operation"]=="One") {
            newActionProgress[more["staging"]["action"]["name"]] = {"timeLeft":1, "action":more["staging"]["action"]}
        }
        if (more["staging"]["operation"]=="Repeat") {
            newActionProgress[more["staging"]["action"]["name"]] = {
                "timeLeft":1,
                "action":more["staging"]["action"],
                "repeat":1
            }
        }
    }
    // Update all actions in progress
    let cancelAll = more["staging"]["operation"] && more["staging"]["operation"] === "CancelALL";
    for (key in actionProgress) {
        // This if statement cancels actions staged by be canceled by simply skipping over their copying.
        if (
            (!more["staging"]["action"] ||
            more["staging"]["operation"] !== "Cancel" ||
            more["staging"]["action"]["name"] !== key) &&
            actionProgress[key]["action"]["canExecute"](modified,more) &&
            (!cancelAll || actionProgress[key]["action"]["auto"])
         ) {
            var prog = actionProgress[key];
            // Check to cancel repeats
            if (more["staging"]["operation"] && more["staging"]["operation"]==="CancelRepeat") {
                prog["repeat"] = 0;
            }
            if (more["staging"]["operation"] && more["staging"]["operation"]==="RepeatToggle" && more["staging"]["action"]["name"] === key) {
                prog["repeat"] = prog["repeat"]?0:1;
            }
            var speed_mod = prog["action"]["auto"]?1:speedMod(actionProgress);
            // Real version should start with 0.001 * ...
            prog["timeLeft"] -= 0.001*speed_mod*ms*prog["action"]["speed"](resourceCount);
            if (prog["timeLeft"] > 0) {
                newActionProgress[key] = prog;
            }
            else {
                modified = actionEffectWrapper(modified, setResourceCount, setStory, prog["action"], modCount)();
                if (prog["repeat"] && prog["action"]["canExecute"](modified,more)) {
                    prog["timeLeft"] = 1;
                    newActionProgress[key] = prog;
                }
            }
        }
    }
    setResourceCount(modified);
    setActionProgress(newActionProgress);
    more["setActionCount"](modCount);
    more["setStaging"]({});
}

export const gameReset = (setResourceCount, setActionProgress, setStory, setHover, more) => {
    setActionProgress({});
    setResourceCount(init_resource_count);
    setStory(init_story);
    setHover(init_hover);
    more["setActionCount"]({});
}

export const gameSave = (resourceCount, actionProgress, story, more, window) => {
    window.localStorage.setItem("resourceCount",JSON.stringify(resourceCount));
    window.localStorage.setItem("actionProgress",JSON.stringify(actionProgress));
    window.localStorage.setItem("story",JSON.stringify(story));
    window.localStorage.setItem("actionCount",JSON.stringify(more["actionCount"]));
}

export const loadGame = (setResourceCount, setActionProgress, setStory, more, window) => {
    let rC = window.localStorage.getItem("resourceCount");
    if (rC) {
        setResourceCount(JSON.parse(rC));
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
        setActionProgress(aP);
    }
    let s = window.localStorage.getItem("story");
    if (s) {
        setStory(JSON.parse(s));
    }

    let aC = window.localStorage.getItem("actionCount");
    if (aC) {
        more["setActionCount"](JSON.parse(aC));
    }
}
