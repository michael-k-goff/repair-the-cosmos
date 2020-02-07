import React from 'react';
import ActionSummary from './ActionSummary';
import {StyledMenuPane, StyledPaneButton, StyledMenuHeader,
    StyledMenuGap, StyledSettingsButton
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
                    if ("visible" in a ? a["visible"](resourceCount) : a["canExecute"](resourceCount)) {
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
                onClick={()=>setPane("Settings")}
                onMouseOver={()=>setHover("See general game info and settings.")}
            >
                Info & Settings
            </StyledSettingsButton>
            <ActionSummary
                resourceCount = {resourceCount}
                actionProgress={actionProgress}
            />
        </StyledMenuPane>
    )
}

export default MenuPane;
