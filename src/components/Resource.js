// Component for a single resource display

import React from 'react';
import {
    StyledResourceName,
    StyledResourceCount,
    StyledResourceBox,
    StyledResourceInfoBox,
    StyledResourceInfoButton
} from './styles/StyledResource';
import {StyledLineClear} from './styles/StyledAction.js';

const Resource = ({resource, count, gameState}) => {
    const handleMouseOver = ()=>gameState.hovers["resource_"+resource.name] = 1;
    const handleMouseLeave = ()=>delete gameState.hovers["resource_"+resource.name];

    return (
        <StyledResourceBox character={"character" in resource ? resource.character : ""}>

            <StyledResourceName>
                {resource.name}
            </StyledResourceName>

            <StyledResourceCount>
                {Math.floor(count)}&nbsp;
            </StyledResourceCount>

            <StyledResourceInfoBox>
                <StyledResourceInfoButton
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                >
                    ?
                </StyledResourceInfoButton>
            </StyledResourceInfoBox>

            <StyledLineClear/>

        </StyledResourceBox>
    )
}

export default Resource;
