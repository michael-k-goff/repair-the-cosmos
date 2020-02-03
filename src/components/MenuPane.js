import React, {useState} from 'react';
import {StyledMenuPane, StyledPaneButton, StyledMenuHeader, StyledMenuGap, StyledResetButton, StyledGameInfo} from './styles/StyledMenuPane';
import {resource_panes} from '../assets.js';
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
            {resource_panes.map((r,x) =>
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
            <StyledResetButton
                onClick={handleResetClick}
                onMouseOver={()=>setHover("Reset everything. Click four times quickly to make sure you really mean it.")}
            >
                Reset
            </StyledResetButton>
            <StyledMenuGap />
            <StyledGameInfo>
                Repair the Cosmos, by Michael Goff. Prepared January 31 to February 2, 2020, as part of <a href="https://globalgamejam.org/">Global Game Jam 2020</a>.
            </StyledGameInfo>
        </StyledMenuPane>
    )
}

export default MenuPane;
