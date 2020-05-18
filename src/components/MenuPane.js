import React from 'react';
import ActionSummary from './ActionSummary';
import {StyledMenuPane, StyledPaneButton, StyledMenuHeader,
    StyledMenuGap, StyledSettingsButton, StyledMenuSmallGap
} from './styles/StyledMenuPane';
import {resource_pane_dict, panes_by_pane} from '../assets.js';

const ConditionalMenuButton = ({r, gameState}) => {
    // Determine whether to display this button
    let doDisplay = resource_pane_dict[r.name].visible(gameState);
    // Button actions
    const handleOnClick = ()=>{
        //gameState.setPane(r.name);
        gameState.pane = r.name;
        let subpane = panes_by_pane[r.name].length ? panes_by_pane[r.name][0].name : r.name;
        gameState.subpane = subpane;
        //gameState.setSubpane(subpane);
    }
    const handleMouseOver = ()=>gameState.hovers["pane_"+r.name] = new Date().getTime();
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
    let cancelAllClick = ()=>gameState.staging = {"operation":"CancelALL"};
    let cancelRepeatClick = ()=>gameState.staging = {"operation":"CancelRepeat"};
    let settingsClick = ()=>{
        gameState.pane = "Settings";
        gameState.subpane = "Settings";
    }
    // Hovers for the special panes
    let cancelAllHover = ()=>gameState.hovers["pane_Cancel Actions"] = new Date().getTime();
    let cancelAllLeave = ()=>delete gameState.hovers["pane_Cancel Actions"];
    let cancelRepeatHover = ()=>gameState.hovers["pane_Cancel Repeats"] = new Date().getTime();
    let cancelRepeatLeave = ()=>delete gameState.hovers["pane_Cancel Repeats"];
    let settingsHover = ()=>gameState.hovers["pane_Info & Settings"] = new Date().getTime();
    let settingsLeave = ()=>delete gameState.hovers["pane_Info & Settings"];
    return (
        <StyledMenuPane>
            <StyledMenuHeader>
                Repair the Cosmos
            </StyledMenuHeader>

            {panes_by_pane.top.map((r) =>
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
                onClick={cancelRepeatClick}
                onMouseOver={cancelRepeatHover}
                onMouseLeave={cancelRepeatLeave}
            >
                Cancel Repeats
            </StyledSettingsButton>

            <StyledMenuSmallGap />

            <StyledSettingsButton
                onClick={settingsClick}
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
