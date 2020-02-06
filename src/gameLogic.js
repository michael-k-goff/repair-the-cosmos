// Game logic goes here.

import {actionEffectWrapper, actions} from './assets.js';
import {init_resource_count, init_story, init_hover} from './state_hook.js';

export const speedMod = (actionProgress, add_one = 0) => {
    return Math.pow(1/(Object.keys(actionProgress).length+add_one), 0.8);
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
    for (key in actionProgress) {
        var prog = actionProgress[key];
        var speed_mod = speedMod(actionProgress);
        // Real version should start with 0.001 * ...
        prog["timeLeft"] -= 0.001*speed_mod*ms*prog["action"]["speed"](resourceCount);
        if (prog["timeLeft"] > 0) {
            newActionProgress[key] = prog;
        }
        else {
            modified = actionEffectWrapper(modified, setResourceCount, setStory, prog["action"], modCount)();
            if (prog["repeat"] && prog["action"]["canExecute"](modified)) {
                prog["timeLeft"] = 1;
                newActionProgress[key] = prog;
            }
        }
    }
    setResourceCount(modified);
    setActionProgress(newActionProgress);
    more["setActionCount"](modCount);
}

export const cancelActionProgress = (name, actionProgress, setActionProgress) => {
    let newActionProgress = {};
    for (var key in actionProgress) {
        if (key !== name) {
            newActionProgress[key] = actionProgress[key];
        }
    }
    setActionProgress(newActionProgress);
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
