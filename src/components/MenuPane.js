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
    const handleMouseOver = ()=>gameState.hovers["pane_"+r.name] = 1;
    const handleMouseLeave = ()=>delete gameState.hovers["pane_"+r.name];

    const isCurrentPane = r.name===gameState.pane;

    if (doDisplay) {
        return (
            <StyledPaneButton
                current_pane={isCurrentPane}
                onClick={handleOnClick}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
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
    // Hovers for the special panes
    let cancelAllHover = ()=>gameState.hovers["pane_Cancel Actions"] = 1;
    let cancelAllLeave = ()=>delete gameState.hovers["pane_Cancel Actions"];
    let cancelRepeatHover = ()=>gameState.hovers["pane_Cancel Repeats"] = 1;
    let cancelRepeatLeave = ()=>delete gameState.hovers["pane_Cancel Repeats"];
    let settingsHover = ()=>gameState.hovers["pane_Info & Settings"] = 1;
    let settingsLeave = ()=>delete gameState.hovers["pane_Info & Settings"];
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
                onMouseOver={cancelAllHover}
                onMouseLeave={cancelAllLeave}
            >
                Cancel Actions
            </StyledSettingsButton>
            <StyledSettingsButton
                onClick={()=>gameState["setStaging"]({"operation":"CancelRepeat"})}
                onMouseOver={cancelRepeatHover}
                onMouseLeave={cancelRepeatLeave}
            >
                Cancel Repeats
            </StyledSettingsButton>

            <StyledMenuSmallGap />

            <StyledSettingsButton
                onClick={()=>gameState.setPane("Settings")}
                onMouseOver={settingsHover}
                onMouseLeave={settingsLeave}
            >
                Info & Settings
            </StyledSettingsButton>

            <StyledMenuSmallGap />

            <ActionSummary gameState={gameState} />

        </StyledMenuPane>
    )
}

export default MenuPane;
