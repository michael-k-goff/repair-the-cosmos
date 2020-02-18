import React from 'react';
import ActionSummary from './ActionSummary';
import {StyledMenuPane, StyledPaneButton, StyledMenuHeader,
    StyledMenuGap, StyledSettingsButton, StyledMenuSmallGap
} from './styles/StyledMenuPane';
import {resource_panes, resources_by_pane, actions_by_pane} from '../assets.js';

const ConditionalMenuButton = ({r, gameState}) => {
    // Determine whether to display this button
    let doDisplay = false;
    for (var i=0; i<resources_by_pane[r.name].length; i++) {
        let res = resources_by_pane[r.name][i][0];
        if (res in gameState.resourceCount && gameState.resourceCount[res]) {
            doDisplay = true;
        }
    }
    for (i=0; i<actions_by_pane[r.name].length; i++) {
        let a = actions_by_pane[r.name][i];
        if ("visible" in a ? a["visible"](gameState.resourceCount,gameState) : a["canExecute"](gameState.resourceCount,gameState)) {
            doDisplay = true;
        }
    }

    // Button actions
    const handleOnClick = ()=>gameState.setPane(r.name)
    const handleMouseOver = ()=>gameState.setHover(r.desc)

    const isCurrentPane = r.name===gameState.pane;

    if (doDisplay) {
        return (
            <StyledPaneButton
                current_pane={isCurrentPane}
                onClick={handleOnClick}
                onMouseOver={handleMouseOver}
            >
                {r.name}
            </StyledPaneButton>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
}

const MenuPane = ({gameState}) => {
    let cancelAllClick = ()=>gameState["setStaging"]({"operation":"CancelALL"});
    return (
        <StyledMenuPane>
            <StyledMenuHeader>
                Repair the Cosmos
            </StyledMenuHeader>

            {resource_panes.map((r) =>
                <ConditionalMenuButton
                    r={r}
                    key={r.name}
                    gameState={gameState}
                >
                    {r[0]}
                </ConditionalMenuButton>
            )}

            <StyledMenuGap />

            <StyledSettingsButton
                onClick={cancelAllClick}
                onMouseOver={()=>gameState.setHover("Cancel all actions currently in progress.")}
            >
                Cancel Actions
            </StyledSettingsButton>
            <StyledSettingsButton
                onClick={()=>gameState["setStaging"]({"operation":"CancelRepeat"})}
                onMouseOver={()=>gameState.setHover("Cancel all repeats. Actions in progress will be allowed to continue but will not repeat.")}
            >
                Cancel Repeats
            </StyledSettingsButton>

            <StyledMenuSmallGap />

            <StyledSettingsButton
                onClick={()=>gameState.setPane("Settings")}
                onMouseOver={()=>gameState.setHover("See general game info and settings.")}
            >
                Info & Settings
            </StyledSettingsButton>

            <StyledMenuSmallGap />

            <ActionSummary gameState={gameState} />

        </StyledMenuPane>
    )
}

export default MenuPane;
