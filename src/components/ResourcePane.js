import React from 'react';
import {StyledResourcePane, StyledResourceHeader, StyledResourcePaneDivider} from './styles/StyledResourcePane';
import {resources_by_pane, actions_by_pane} from '../assets.js';
import Resource from './Resource.js';
import ConditionalAction from './Action.js';
import Settings from './Settings.js';

// Display all Resources for the pane. Displays conditionally on the pane.
const ResourceDisplay = ({pane, gameState}) => {
    if (!(pane in resources_by_pane)) {
        return(
            <>
            </>
        )
    }
    const display_resources_by_pane = resources_by_pane[gameState.pane].filter((r) => {
        return gameState.resourceCount[r.name] >= 1;
    });
    return (
        <>
            {display_resources_by_pane.map((r) =>
                <Resource
                    resource={r}
                    count={gameState.resourceCount[r.name]}
                    key={"resource_"+r.name}
                    gameState={gameState}
                />
            )}
        </>
    );
}

// Display all Action for the pane. Displays conditionally on the pane.
const ActionDisplay = ({pane, gameState}) => {
    if (!(pane in actions_by_pane)) {
        return(
            <>
            </>
        )
    }
    return (
        <>
            {actions_by_pane[gameState.pane].map((a) =>
                <ConditionalAction action={a} key={"action_"+a["name"]} gameState={gameState} />
            )}
        </>
    );
}

const RandADisplay = ({gameState}) => {
    return (
        <>
            <ActionDisplay pane={gameState.pane} gameState={gameState} />
            <StyledResourcePaneDivider />
            <ResourceDisplay pane={gameState.pane} gameState={gameState} />
        </>
    )
}

const ResourcePane = ({gameState}) => {
    return (
        <StyledResourcePane>
            <StyledResourceHeader>
                {gameState.pane}
            </StyledResourceHeader>
            <RandADisplay gameState={gameState}/>
            <Settings pane={gameState.pane} gameState={gameState} />
        </StyledResourcePane>
    )
}

export default ResourcePane;
