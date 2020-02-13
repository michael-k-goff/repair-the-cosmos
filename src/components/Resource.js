// Component for a single resource display

import React from 'react';
import {StyledResourceName, StyledResourceCount, StyledResourceBox} from './styles/StyledResourcePane';

const Resource = ({resource, count, gameState}) => {
    const handleMouseOver = ()=>gameState.setHover(resource[2]);

    return (
        <StyledResourceBox
            onMouseOver={handleMouseOver}
            character={"character" in resource[3] ? resource[3]["character"] : ""}
        >
            <StyledResourceName>
                {resource[0]}
            </StyledResourceName>
            <StyledResourceCount>
                {Math.floor(count)}
            </StyledResourceCount>
        </StyledResourceBox>
    )
}

export default Resource;
