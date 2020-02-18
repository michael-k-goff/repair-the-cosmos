// Component for a single resource display

import React from 'react';
import {StyledResourceName, StyledResourceCount, StyledResourceBox} from './styles/StyledResourcePane';

const Resource = ({resource, count, gameState}) => {
    const handleMouseOver = ()=>gameState.setHover(resource.desc);

    return (
        <StyledResourceBox
            onMouseOver={handleMouseOver}
            character={"character" in resource ? resource.character : ""}
        >
            <StyledResourceName>
                {resource.name}
            </StyledResourceName>
            <StyledResourceCount>
                {Math.floor(count)}
            </StyledResourceCount>
        </StyledResourceBox>
    )
}

export default Resource;
