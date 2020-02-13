// Component for a single action

import React from 'react';
import {
    StyledActionButton,
    StyledActionProgress,
    StyledCancelButton,
    StyledToggleButton,
    StyledRepeatButton,
    StyledActionBox,
    StyledActionButtonBox,
    StyledActionProgressBox,
    StyledActionButtonBox2,
    StyledLineClear
}
    from './styles/StyledAction';

const ConditionalActionButton = ({action, gameState, enabled}) => {
    const handleClick = () => {
        if (!action["canExecute"](gameState.resourceCount,gameState) || action["name"] in gameState.actionProgress) {
            return;
        }
        // Now setting the new action via staging rather than directly
        gameState.setStaging({"action":action,"operation":"One"});
    }

    if (!(action.auto)) {
        return (
            <StyledActionButton
                count={gameState.actionCount[action["name"]]}
                enabled={enabled}
                onClick={handleClick}
            >
                {action["name"]}
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

const ConditionalRepeatButton = ({action, gameState, enabled}) => {
    const handleClickRepeat = () => {
        if (!action["canExecute"](gameState.resourceCount,gameState)) {
            return;
        }
        // Now setting the new action via staging rather than directly
        gameState.setStaging({"action":action,"operation":"Repeat"});
    }

    if (action["name"] in gameState.actionProgress || action.auto) {
        return (
            <>
            </>
        );
    }
    return (
        <StyledRepeatButton
            count={gameState.actionCount[action["name"]]}
            enabled={enabled}
            onClick={handleClickRepeat}
        >
            Repeat
        </StyledRepeatButton>
    );
}

const ConditionalButtonBox = ({action, gameState}) => {
    // Just the name here for automatic actions
    if (action.auto) {
        return (
            <>
                {action.name}
            </>
        );
    }

    const enabled = action["canExecute"](gameState.resourceCount,gameState) && !(action["name"] in gameState.actionProgress);

    return (
        <>
            <ConditionalActionButton action={action} gameState={gameState} enabled={enabled} />
            <ConditionalRepeatButton action={action} gameState={gameState} enabled={enabled} />
        </>
    )
}

const ConditionalButtonBox2 = ({action, gameState}) => {
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
            <StyledToggleButton onClick={handleRepeatToggle}>
                Repeat: {gameState.actionProgress[action["name"]]["repeat"]?"ON":"OFF"}
            </StyledToggleButton>
        </>
    );
}

const ConditionalProgressBar = ({action, gameState}) => {
    if (!(action["name"] in gameState.actionProgress)) {
        return (
            <>
            </>
        );
    }
    const prog_value = 1-gameState.actionProgress[action["name"]]["timeLeft"]
    return <StyledActionProgress value={prog_value} max={1}/>
}

// Actions, assuming visibility. This component handles both manual and automatic actions.
const Action = ({action, gameState}) => {
    const handleMouseOver = ()=>gameState.setHover(action);

    return (
        <StyledActionBox onMouseOver={handleMouseOver}>
            <StyledActionButtonBox>
                <ConditionalButtonBox action={action} gameState={gameState} />
            </StyledActionButtonBox>

            <StyledActionProgressBox>
                <ConditionalProgressBar action={action} gameState={gameState} />
            </StyledActionProgressBox>

            <StyledActionButtonBox2>
                <ConditionalButtonBox2 action={action} gameState={gameState} />
            </StyledActionButtonBox2>

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
