import React from 'react';
import {StyledStoryPane, StyledStoryGap} from './styles/StyledStoryPane';
import {styledText} from '../textStyling';

const StoryPane = ({story,gameState}) => {
    return (
        <StyledStoryPane>
            {story.map((paragraph,i) =>
                <div key={i}>
                    <p>
                        {styledText(paragraph,gameState)}
                    </p>
                    <StyledStoryGap/>
                </div>
            )}
        </StyledStoryPane>
    )
}

export default StoryPane;
