import React from 'react';
import {StyledStoryPane, StyledStoryGap} from './styles/StyledStoryPane';

const StoryPane = ({story}) => {
    return (
        <StyledStoryPane>
            {story.map((paragraph,i) =>
                <div key={i}>
                    <p>
                        {paragraph}
                    </p>
                    <StyledStoryGap/>
                </div>
            )}
        </StyledStoryPane>
    )
}

export default StoryPane;
