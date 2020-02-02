// Component for a single action

import React, {useCallback} from 'react';
import {StyledActionButton, StyledActionProgress, StyledCancelButton} from './styles/StyledResourcePane';
import {cancelActionProgress} from '../gameLogic.js';

const progress_to_pct = (prog) => {
    const pct = (100-100*prog["timeLeft"])
    return pct.toFixed(2).toString()+"%"
}

const Action = ({action,
            resourceCount, setResourceCount,
            actionProgress, setActionProgress,
            hover, setHover
}) => {
    const handleClick = () => {
        if (!action["canExecute"](resourceCount) || action["name"] in actionProgress) {
            return;
        }
        let newActionProgress = {}
        for (var key in actionProgress) {
            newActionProgress[key] = actionProgress[key]
        }
        newActionProgress[action["name"]] = {"timeLeft":1, "action":action};
        setActionProgress(newActionProgress);
    }
    const handleClickRepeat = () => {
        if (!action["canExecute"](resourceCount)) {
            return;
        }
        let newActionProgress = {}
        for (var key in actionProgress) {
            newActionProgress[key] = actionProgress[key]
        }
        newActionProgress[action["name"]] = {"timeLeft":1, "action":action,"repeat":1};
        setActionProgress(newActionProgress);
    }
    const handleCancelClick = () => {
        cancelActionProgress(action["name"],actionProgress, setActionProgress);
    }
    return (
        <div onMouseOver={()=>setHover(action)}>
            <StyledActionButton enabled={action["canExecute"](resourceCount) && !(action["name"] in actionProgress)} onClick={handleClick}>
                {action["name"]}
            </StyledActionButton>
            {action["name"] in actionProgress ?
                <StyledActionProgress value={1-actionProgress[action["name"]]["timeLeft"]} max={1}/>:
            ""}
            {action["name"] in actionProgress ?
                <StyledCancelButton onClick={handleCancelClick}>
                    Cancel
                </StyledCancelButton>
                :
            ""}
            {!(action["name"] in actionProgress) ?
                <StyledActionButton enabled={action["canExecute"](resourceCount)} onClick={handleClickRepeat}>
                    Repeat
                </StyledActionButton>:
            ""}
        </div>
    )
}

export default Action;
