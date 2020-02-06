import React from 'react';
import {StyledInfoPane, StyledInfoGap} from './styles/StyledInfoPane';
import {speedMod} from '../gameLogic';

const InfoPane = ({hover, setHover, actionProgress, setActionProgress, resourceCount, setResourceCount}) => {
    let message1 =
        <p>
            {hover}
        </p>
    if (hover.info) {
        const base_speed = hover["speed"](resourceCount);
        let time_left_string = "";
        if (base_speed > 0) {
            let time_left = 1/base_speed;
            if (hover["name"] in actionProgress) {
                time_left *= actionProgress[hover["name"]]["timeLeft"];
            }
            time_left /= speedMod(actionProgress, hover["name"] in actionProgress ? 0:1);
            time_left = Math.round(time_left);
            time_left_string = time_left ? "" : "0s ";
            if (time_left >= 24*60*60) {
                time_left_string += `${Math.floor(time_left/24*60*60)}d `;
                time_left = time_left - 24*60*60*Math.floor(time_left/24*60*60);
            }
            if (time_left >= 60*60) {
                time_left_string += `${Math.floor(time_left/60*60)}hr `;
                time_left = time_left - 60*60*Math.floor(time_left/60*60);
            }
            if (time_left >= 60) {
                time_left_string += `${Math.floor(time_left/60)}m `;
                time_left = time_left - 60*Math.floor(time_left/60);
            }
            if (time_left >= 1) {
                time_left_string += `${time_left}s `;
            }
        }
        message1 =
            <div>
                {hover["info"](resourceCount).map((paragraph,i)=>
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
    if (hover.name && actionProgress[hover.name]) {
        const progress = 100-100*actionProgress[hover.name]["timeLeft"];
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
