import React, {useState} from 'react';
import {StyledMenuPane, StyledPaneButton, StyledMenuHeader} from './styles/StyledMenuPane';
import {resource_panes} from '../assets.js';
import {useGameState} from '../state_hook.js';

const MenuPane = ({pane, setPane, resourceCount, setResourceCount, hover, setHover}) => {
    return (
        <StyledMenuPane>
            <StyledMenuHeader>
                Repair the Cosmos
            </StyledMenuHeader>
            {resource_panes.map((r,x) =>
                <StyledPaneButton
                    current_pane={r[0]===pane}
                    key={x}
                    onClick={()=>{setPane(r[0])}}
                    onMouseOver={()=>setHover(r[1])}
                >
                    {r[0]}
                </StyledPaneButton>
            )}
        </StyledMenuPane>
    )
}

export default MenuPane;
