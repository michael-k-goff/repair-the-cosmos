import React from 'react';
import {StyledInfoPane, StyledInfoGap} from './styles/StyledInfoPane';
import {timeLeft, timeLeftString} from '../gameLogic';

const InfoPane = ({gameState}) => {
    let message1 =
        <p>
            {gameState.hover}
        </p>
    if (gameState.hover.info) {
        const base_speed = gameState.hover["speed"](gameState.resourceCount);
        let time_left_string = "";
        if (base_speed > 0) {
            let time_left = timeLeft(gameState, gameState.hover);
            time_left_string = timeLeftString(time_left);
        }
        message1 =
            <div>
                {gameState.hover["info"](gameState.resourceCount).map((paragraph,i)=>
                    <div key={i}>
                        <p key={i}>{paragraph}</p>
                        <StyledInfoGap key={i+10000}/>
                    </div>
                )}
                {(()=>{
                    if (base_speed) {return <p>Time left:&nbsp;{time_left_string}</p>}
                    }
                )()}
                <StyledInfoGap />

            </div>
    }
    let message2;
    if (gameState.hover.name && gameState.actionProgress[gameState.hover.name]) {
        const progress = 100-100*gameState.actionProgress[gameState.hover.name]["timeLeft"];
        message2 =
            <p>
                {"Progress: "+progress.toFixed(2)+"%"}
            </p>
    }
    return (
        <StyledInfoPane>
            {message1}
            {message2}
        </StyledInfoPane>
    )
}

export default InfoPane;
