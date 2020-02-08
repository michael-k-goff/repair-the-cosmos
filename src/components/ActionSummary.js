// Summarize ongoing actions for the main menu

import {timeLeft, timeLeftString} from '../gameLogic';
import {actions} from '../assets';

import React from 'react';

const ActionSummary = ({resourceCount, actionProgress}) => {
    let action_keys = Object.keys(actionProgress);
    let timeLeftDict = {};
    for (var i=0; i<action_keys.length; i++) {
        timeLeftDict[action_keys[i]] = timeLeft(actionProgress, resourceCount, actionProgress[action_keys[i]]["action"]);
    }
    action_keys = action_keys.sort( (a,b)=> {
        if (timeLeftDict[a] < timeLeftDict[b]) {return -1}
        if (timeLeftDict[a] == timeLeftDict[b]) {return 0}
        if (timeLeftDict[a] > timeLeftDict[b]) {return 1}
    });
    return (
        <div>
            {action_keys.map((k)=>(
                <p key={k}>
                    {k}: {timeLeftString(timeLeftDict[k])} {
                        actionProgress[k]["action"]["auto"] ? "(A)" :
                            actionProgress[k]["repeat"] ? "(R)":""
                    }
                </p>
            ))}
        </div>
    )
}

export default ActionSummary;
