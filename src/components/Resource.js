// Component for a single resource display

import React from 'react';
import {StyledResourceName, StyledResourceCount, StyledResourceBox} from './styles/StyledResourcePane';

const Resource = ({resource, count, resourceCount, setResourceCount, hover, setHover}) => {
    return (
        <StyledResourceBox onMouseOver={()=>setHover(resource[2])}>
            <StyledResourceName>
                {resource[0]}
            </StyledResourceName>
            <StyledResourceCount>
                {count}
            </StyledResourceCount>
        </StyledResourceBox>
    )
}

export default Resource;
