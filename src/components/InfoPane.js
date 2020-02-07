import React from 'react';
import {StyledInfoPane, StyledInfoGap} from './styles/StyledInfoPane';
import {speedMod, timeLeft, timeLeftString} from '../gameLogic';

const InfoPane = ({hover, setHover, actionProgress, setActionProgress, resourceCount, setResourceCount, more}) => {
    let message1 =
        <p>
            {hover}
        </p>
    if (hover.info) {
        const base_speed = hover["speed"](resourceCount);
        let time_left_string = "";
        if (base_speed > 0) {
            let time_left = timeLeft(actionProgress, resourceCount, hover);
            time_left_string = timeLeftString(time_left);
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
