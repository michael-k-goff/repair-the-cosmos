import React from 'react';
import {
    StyledResourcePane,
    StyledResourceHeader,
    StyledResourceSubHeader,
    StyledResourcePaneDivider,
    StyledSubpaneButton,
    StyledSubpaneButtons,
    StyledSubsubpane,
    StyledSubsubpaneRow,
    StyledPaneCompressor
} from './styles/StyledResourcePane';

import {StyledLineClear} from './styles/StyledAction';
import {resources_by_pane, actions_by_pane, panes_by_pane, resource_pane_dict} from '../assets.js';
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
    const display_resources_by_pane = resources_by_pane[pane].filter((r) => {
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
            {actions_by_pane[pane].map((a) =>
                <ConditionalAction action={a} key={"action_"+a["name"]} gameState={gameState} />
            )}
        </>
    );
}

const RandADisplay = ({pane, gameState}) => {
    if (!(pane in resource_pane_dict)) {
        return (
            <>
            </>
        );
    }
    return (
        <>
            <ActionDisplay pane={pane} gameState={gameState} />
            <StyledResourcePaneDivider />
            <ResourceDisplay pane={pane} gameState={gameState} />
        </>
    )
}

const SubpaneButton = ({subpane, gameState}) => {
    const isCurrentSubpane = subpane.name === gameState.subpane;
    const handleClick = ()=>gameState.setSubpane(subpane.name);
    const handleMouseOver = ()=>gameState.hovers["pane_"+subpane.name] = new Date().getTime();
    const handleMouseLeave = ()=>delete gameState.hovers["pane_"+subpane.name];

    if (subpane.visible(gameState)) {
        return (
            <StyledSubpaneButton
                current_subpane={isCurrentSubpane}
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                {subpane.name}
            </StyledSubpaneButton>
        );
    }
    else {
        return (
            <>
            </>
        );
    }
}

const SubpaneButtons = ({gameState}) => {
    if (panes_by_pane[gameState.pane].length <= 1) {
        return (
            <>
            </>
        );
    }
    return (
        <StyledSubpaneButtons>
            {panes_by_pane[gameState.pane].map((subpane)=>
                <SubpaneButton key={subpane.name} subpane={subpane} gameState={gameState} />
            )}
        </StyledSubpaneButtons>
    )
}

const Subsubpane = ({subsubpane, gameState}) => {
    if (!(subsubpane.name in resource_pane_dict)) {
        return (
            <>
            </>
        );
    }
    return (
        <StyledSubsubpane>
            <StyledResourceSubHeader>
                {subsubpane.name}
            </StyledResourceSubHeader>
            <RandADisplay pane={subsubpane.name} gameState={gameState}/>
        </StyledSubsubpane>
    );
}

const SubsubpaneRow = ({left, right, gameState}) => {
    return (
        <StyledSubsubpaneRow>
            <Subsubpane subsubpane={left} gameState={gameState} />
            <Subsubpane subsubpane={right} gameState={gameState} />
            <StyledLineClear />
        </StyledSubsubpaneRow>
    )
}

const Subsubpanes = ({gameState}) => {
    if (gameState.pane === gameState.subpane) {
        return (
            <>
            </>
        );
    }
    let subsubpanes = panes_by_pane[gameState.subpane].filter((x)=>x.visible(gameState));
    if (subsubpanes.length%2) {
        subsubpanes = subsubpanes.concat([{name:"Null Pane"}]);
    }
    let index_array = Array.from(Array(subsubpanes.length / 2).keys())
    return (
        <>
            {index_array.map((x)=>(
                <SubsubpaneRow
                    key={x}
                    left={subsubpanes[2*x]}
                    right={subsubpanes[2*x+1]}
                    gameState={gameState}
                />
            ))}
        </>
    );
}

const ResourcePane = ({gameState}) => {
    return (
        <StyledResourcePane>
            <StyledResourceHeader>
                {gameState.pane}
            </StyledResourceHeader>

            <StyledPaneCompressor>
                <RandADisplay pane={gameState.pane} gameState={gameState}/>
            </StyledPaneCompressor>

            <SubpaneButtons gameState={gameState} />

            <StyledPaneCompressor>
                <RandADisplay
                    pane={gameState.pane === gameState.subpane ? "" : gameState.subpane}
                    gameState={gameState}
                />
            </StyledPaneCompressor>

            <Subsubpanes gameState={gameState} />

            <Settings pane={gameState.pane} gameState={gameState} />
        </StyledResourcePane>
    )
}

export default ResourcePane;
