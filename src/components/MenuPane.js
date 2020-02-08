import React from 'react';
import ActionSummary from './ActionSummary';
import {StyledMenuPane, StyledPaneButton, StyledMenuHeader,
    StyledMenuGap, StyledSettingsButton, StyledMenuSmallGap
} from './styles/StyledMenuPane';
import {resource_panes, resources_by_pane, actions_by_pane} from '../assets.js';

const MenuPane = ({pane, setPane, resourceCount, setResourceCount, hover, setHover, setStory, actionProgress, setActionProgress, more}) => {
    return (
        <StyledMenuPane>
            <StyledMenuHeader>
                Repair the Cosmos
            </StyledMenuHeader>

            {resource_panes.filter(r=>{
                for (var i=0; i<resources_by_pane[r[0]].length; i++) {
                    let res = resources_by_pane[r[0]][i][0];
                    if (res in resourceCount && resourceCount[res]) {
                        return true;
                    }
                }
                for (i=0; i<actions_by_pane[r[0]].length; i++) {
                    let a = actions_by_pane[r[0]][i];
                    if ("visible" in a ? a["visible"](resourceCount,more) : a["canExecute"](resourceCount,more)) {
                        return true;
                    }
                }
                return false;
            }).map((r,x) =>
                <StyledPaneButton
                    current_pane={r[0]===pane}
                    key={x}
                    onClick={()=>{setPane(r[0])}}
                    onMouseOver={()=>setHover(r[1])}
                >
                    {r[0]}
                </StyledPaneButton>
            )}

            <StyledMenuGap />

            <StyledSettingsButton
                onClick={()=>more["setStaging"]({"operation":"CancelALL"})}
                onMouseOver={()=>setHover("Cancel all actions currently in progress.")}
            >
                Cancel Actions
            </StyledSettingsButton>
            <StyledSettingsButton
                onClick={()=>more["setStaging"]({"operation":"CancelRepeat"})}
                onMouseOver={()=>setHover("Cancel all repeats. Actions in progress will be allowed to continue but will not repeat.")}
            >
                Cancel Repeats
            </StyledSettingsButton>

            <StyledMenuSmallGap />

            <StyledSettingsButton
                onClick={()=>setPane("Settings")}
                onMouseOver={()=>setHover("See general game info and settings.")}
            >
                Info & Settings
            </StyledSettingsButton>

            <StyledMenuSmallGap />

            <ActionSummary
                resourceCount = {resourceCount}
                actionProgress={actionProgress}
            />

        </StyledMenuPane>
    )
}

export default MenuPane;
