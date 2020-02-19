// Summarize ongoing actions for the main menu

import {timeLeft, timeLeftString} from '../gameLogic';

import React from 'react';

const ActionSummary = ({gameState}) => {
    let action_keys = Object.keys(gameState.actionProgress);
    let timeLeftDict = {};
    for (var i=0; i<action_keys.length; i++) {
        timeLeftDict[action_keys[i]] = timeLeft(gameState, gameState.actionProgress[action_keys[i]]["action"]);
    }
    action_keys = action_keys.sort( (a,b)=> {
        if (timeLeftDict[a] < timeLeftDict[b]) {return -1}
        if (timeLeftDict[a] > timeLeftDict[b]) {return 1}
        return 0;
    });
    return (
        <div>
            {action_keys.map((k)=>(
                <p key={k}>
                    {k}: {timeLeftString(timeLeftDict[k])} {
                        gameState.actionProgress[k]["action"]["auto"] ? "(A)" :
                            gameState.repeat[k] ? "(R)":""
                    }
                </p>
            ))}
        </div>
    )
}

export default ActionSummary;
