import React from 'react';
import {StyledInfoPane, StyledInfoGap} from './styles/StyledInfoPane';

const InfoPane = ({hover, setHover, actionProgress, setActionProgress, resourceCount, setResourceCount}) => {
    let message1 =
        <p>
            {hover}
        </p>
    if (hover.info) {
        message1 =
            <div>
                {hover["info"](resourceCount).map((paragraph,i)=>
                    <div key={i}>
                        <p key={i}>{paragraph}</p>
                        <StyledInfoGap key={i+10000}/>
                    </div>
                )}
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
