import React from 'react';
import {StyledResourcePane, StyledResourceHeader, StyledResourcePaneDivider} from './styles/StyledResourcePane';
import {resources, actions, resources_by_pane, actions_by_pane} from '../assets.js';
import Resource from './Resource.js';
import Action from './Action.js';
import Settings from './Settings.js';

const RandADisplay = ({pane,
                resourceCount, setResourceCount,
                actionProgress, setActionProgress,
                hover, setHover
}) => {
    const display_resources_by_pane = resources_by_pane[pane].filter((r) => {
        return resourceCount[r[0]];
    });
    const display_actions_by_pane = actions_by_pane[pane].filter((a) => {
        return "visible" in a ? a["visible"](resourceCount) : a["canExecute"](resourceCount);
    })
    return (
        <fragment>
            {display_actions_by_pane.map((a) =>
                <Action action={a} key={"action_"+a["name"]}
                    resourceCount={resourceCount} setResourceCount={setResourceCount}
                    actionProgress={actionProgress} setActionProgress={setActionProgress}
                    hover={hover} setHover={setHover}
                />
            )}

            <StyledResourcePaneDivider />

            {display_resources_by_pane.map((r) =>
                <Resource resource={r}
                    count={resourceCount[r[0]]} resourceCount={resourceCount}
                    setResourceCount={setResourceCount}
                    hover={hover} setHover={setHover}
                    key={"resource_"+r[0]} />
            )}
        </fragment>
    )
}

const ResourcePane = ({pane,
                resourceCount, setResourceCount,
                actionProgress, setActionProgress,
                hover, setHover, setStory
}) => {
    return (
        <StyledResourcePane>
            <StyledResourceHeader>
                {pane}
            </StyledResourceHeader>
            {(()=>{
                if (pane in resources_by_pane) {
                    return <RandADisplay
                        pane={pane}
                        resourceCount={resourceCount} setResourceCount={setResourceCount}
                        actionProgress={actionProgress} setActionProgress={setActionProgress}
                        hover={hover} setHover={setHover}
                    />
                }
            })()}
            {(()=> {
                if (pane === "Settings") {
                    return <Settings
                        pane={pane}
                        resourceCount={resourceCount} setResourceCount={setResourceCount}
                        actionProgress={actionProgress} setActionProgress={setActionProgress}
                        hover={hover} setHover={setHover} setStory={setStory}
                    />
                }
            })()}
        </StyledResourcePane>
    )
}

export default ResourcePane;
