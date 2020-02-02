// Game logic goes here.

import {actionEffectWrapper} from './assets.js';

export const updateActionProgress = (resourceCount, setResourceCount,
                    actionProgress, setActionProgress, story, setStory, ms) => {
    let newActionProgress = {};
    let modified = {}
    for (var key in resourceCount) {
        modified[key] = resourceCount[key];
    }
    for (var key in actionProgress) {
        var prog = actionProgress[key];
        var speed_mod = Math.pow(1/Object.keys(actionProgress).length, 0.8);
        // Real version should start with 0.001 * ...
        prog["timeLeft"] -= 0.001*speed_mod*ms*prog["action"]["speed"](resourceCount);
        if (prog["timeLeft"] > 0) {
            newActionProgress[key] = prog;
        }
        else {
            modified = actionEffectWrapper(modified, setResourceCount, setStory, prog["action"])();
            if (prog["repeat"] && prog["action"]["canExecute"](modified)) {
                prog["timeLeft"] = 1;
                newActionProgress[key] = prog;
            }
        }
    }
    setResourceCount(modified);
    setActionProgress(newActionProgress);
}

export const cancelActionProgress = (name, actionProgress, setActionProgress) => {
    let newActionProgress = {};
    for (var key in actionProgress) {
        if (key != name) {
            newActionProgress[key] = actionProgress[key];
        }
    }
    setActionProgress(newActionProgress);
}
