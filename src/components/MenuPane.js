import React, {useState} from 'react';
import {StyledMenuPane, StyledPaneButton, StyledMenuHeader,
    StyledMenuGap, StyledMenuSmallGap, StyledGameInfo, StyledSettingsButton
} from './styles/StyledMenuPane';
import {resource_panes, resources_by_pane, actions_by_pane} from '../assets.js';
import {gameReset} from '../gameLogic.js';

const MenuPane = ({pane, setPane, resourceCount, setResourceCount, hover, setHover, setStory, setActionProgress}) => {
    const [resetClicks, setResetClicks] = useState([1,1,1,1]);
    const handleResetClick = () => {
        let d = new Date();
        let newResetClicks = [resetClicks[1],resetClicks[2],resetClicks[3],d.getTime()];
        setResetClicks(newResetClicks);
        if (newResetClicks[3] < newResetClicks[0] + 2000) {
            gameReset(setResourceCount, setActionProgress, setStory, setHover);
        }
    }
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
                for (var i=0; i<actions_by_pane[r[0]].length; i++) {
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
        </StyledMenuPane>
    )
}

export default MenuPane;
