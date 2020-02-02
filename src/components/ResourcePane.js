import React from 'react';
import {StyledResourcePane, StyledResourceHeader, StyledResourcePaneDivider} from './styles/StyledResourcePane';
import {resources, actions} from '../assets.js';
import Resource from './Resource.js';
import Action from './Action.js';

const ResourcePane = ({pane,
                resourceCount, setResourceCount,
                actionProgress, setActionProgress,
                hover, setHover
}) => {
    const resources_by_pane = resources.filter((r) => {
        return r[1] === pane && resourceCount[r[0]];
    });
    const actions_by_pane = actions.filter((a) => {
        return a["pane"] === pane && a["canExecute"](resourceCount);
    })
    return (
        <StyledResourcePane>
            <StyledResourceHeader>
                {pane}
            </StyledResourceHeader>
            {actions_by_pane.map((a) =>
                <Action action={a} key={"action_"+a["name"]}
                    resourceCount={resourceCount} setResourceCount={setResourceCount}
                    actionProgress={actionProgress} setActionProgress={setActionProgress}
                    hover={hover} setHover={setHover}
                />
            )}

            <StyledResourcePaneDivider />

            {resources_by_pane.map((r) =>
                <Resource resource={r}
                    count={resourceCount[r[0]]} resourceCount={resourceCount}
                    setResourceCount={setResourceCount}
                    hover={hover} setHover={setHover}
                    key={"resource_"+r[0]} />
            )}
        </StyledResourcePane>
    )
}

export default ResourcePane;
