// Component for a single action

import React from 'react';
import {
    StyledActionButton,
    StyledActionProgress,
    StyledToggleButton,
    StyledActionBox,
    StyledActionButtonBox,
    StyledActionProgressBox,
    StyledLineClear,
    StyledInfoButton
}
    from './styles/StyledAction';

const ConditionalActionButton = ({action, gameState, enabled}) => {
    const handleClick = () => {
        if (action["name"] in gameState.actionProgress) {
            gameState.setStaging({"action":action,"operation":"Cancel"});
            return;
        }
        if (!action["canExecute"](gameState.resourceCount,gameState)) {
            return;
        }
        // Now setting the new action via staging rather than directly
        gameState.setStaging({"action":action,"operation":"One"});
    }

    if (!(action.auto)) {
        return (
            <StyledActionButton
                count={gameState.actionCount[action["name"]]}
                active={action.name in gameState.actionProgress}
                enabled={enabled}
                onClick={handleClick}
            >
                {
                    enabled ? "Go!" :
                        action.name in gameState.actionProgress ? "Stop" : "Can't"
                }
            </StyledActionButton>
        );
    }
    else {
        return (
            <>
            </>
        )
    }
}

const ConditionalToggleButton = ({action, gameState}) => {
    const handleRepeatToggle = () => {
        gameState.setStaging({"operation":"RepeatToggle","action":action});
    }
    if (!(action.auto)) {
        return (
            <StyledToggleButton onClick={handleRepeatToggle} repOn={gameState.repeat[action["name"]]}>
                Rep.
            </StyledToggleButton>
        );
    }
    else {
        return (
            <>
            </>
        )
    }
}

const ConditionalButtonBox = ({action, gameState}) => {
    // Just the name here for automatic actions
    /*if (action.auto) {
        return (
            <>
                {action.name}
            </>
        );
    }*/

    const enabled = action["canExecute"](gameState.resourceCount,gameState) && !(action["name"] in gameState.actionProgress);
    const handleMouseOver = () => { // For the Info box
        gameState.hovers["action_"+action.name] = new Date().getTime();
    }
    const handleMouseLeave = () => { // For the Info box
        delete gameState.hovers["action_"+action.name];
    }

    // Repeat button taken out: <ConditionalRepeatButton action={action} gameState={gameState} enabled={enabled} />
    return (
        <>
            <ConditionalActionButton action={action} gameState={gameState} enabled={enabled} />
            <ConditionalToggleButton action={action} gameState={gameState} />
            <StyledInfoButton onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                ?
            </StyledInfoButton>
        </>
    )
}

/*const ConditionalButtonBox2 = ({action, gameState}) => {
    // Nothing here for actions not in progress or automatic actions
    if (!(action.name in gameState.actionProgress) || action.auto) {
        return (
            <>
            </>
        );
    }

    const handleCancelClick = () => {
        // Now canceling via staging
        gameState.setStaging({"action":action,"operation":"Cancel"});
    }
    const handleRepeatToggle = () => {
        gameState.setStaging({"operation":"RepeatToggle","action":action});
    }

    return (
        <>
            <StyledCancelButton onClick={handleCancelClick}>
                Cancel
            </StyledCancelButton>
        </>
    );
}*/

const ConditionalProgressBar = ({action, gameState}) => {
    if (!(action["name"] in gameState.actionProgress)) {
        return (
            <>
                <p style={{position:'absolute'}}>&nbsp;{action.name}</p>
            </>
        );
    }
    const prog_value = 1-gameState.actionProgress[action["name"]]["timeLeft"]
    return (
        <>
            <p style={{position:'absolute'}}>&nbsp;{action.name}</p>
            <StyledActionProgress value={prog_value} max={1} />
        </>
    );
}

// Actions, assuming visibility. This component handles both manual and automatic actions.
const Action = ({action, gameState}) => {
    // The second set of buttons has been removed. The JSX was
    //<StyledActionButtonBox2>
    //    <ConditionalButtonBox2 action={action} gameState={gameState} />
    //</StyledActionButtonBox2>
    return (
        <StyledActionBox>
            <StyledActionButtonBox>
                <ConditionalButtonBox action={action} gameState={gameState} />
            </StyledActionButtonBox>

            <StyledActionProgressBox>
                <ConditionalProgressBar action={action} gameState={gameState} />
            </StyledActionProgressBox>

            <StyledLineClear/>
        </StyledActionBox>
    )
}

const ConditionalAction = ({action, gameState}) => {
    // Actions that are not visible
    if ("visible" in action ?
        !action["visible"](gameState.resourceCount,gameState) :
        !action["canExecute"](gameState.resourceCount,gameState)
    ) {
        return (
            <>
            </>
        )
    }

    // Auto actions that are not currently running
    if (!(action["name"] in gameState.actionProgress) && action["auto"]) {
        return(
            <>
            </>
        );
    }

    return (
        <Action action={action} gameState={gameState} />
    );
}

export default ConditionalAction;
