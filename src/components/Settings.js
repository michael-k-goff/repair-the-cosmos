// Display for the settings pane.

import React, {useState} from 'react';
import {StyledGameInfo, StyledResetButton} from './styles/StyledSettings';
import {StyledMenuGap} from './styles/StyledMenuPane'
import {initGameState} from '../gameLogic.js';

const Settings = ({pane, gameState}) => {
    // Settings state. Count up four clicks in a two second interval in order to reset.
    const [resetClicks, setResetClicks] = useState([1,1,1,1]);

    if (pane !== "Settings") {
        return(
            <>
            </>
        );
    }

    // Handle button operations
    const handleResetClick = () => {
        let d = new Date();
        let newResetClicks = [resetClicks[1],resetClicks[2],resetClicks[3],d.getTime()];
        setResetClicks(newResetClicks);
        if (newResetClicks[3] < newResetClicks[0] + 2000) {
            const reseted = initGameState();
            for (let key in reseted) {
                gameState[key] = reseted[key];
            }
        }
    }
    const handleMouseOver = ()=>gameState.hovers["other_Reset everything. Click four times quickly to make sure you really mean it."] = 1;
    const handleMouseLeave = ()=>delete gameState.hovers["other_Reset everything. Click four times quickly to make sure you really mean it."];

    return (
        <div>
            <StyledResetButton onClick={handleResetClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                Reset
            </StyledResetButton>
            <StyledMenuGap />
            <StyledGameInfo>
                Repair the Cosmos, by Michael Goff. Started January 31 to February 2, 2020, as part of <a href="https://globalgamejam.org/">Global Game Jam 2020</a>.
            </StyledGameInfo>
            <StyledGameInfo>
                Thank you <a href="https://pigsquad.com/">Portland Indie Game Squad</a> for organizing and <a href="https://pnca.edu/">Pacific Northwest College of Art</a> for hosting.
            </StyledGameInfo>
        </div>
    )
}

export default Settings;
