import React from 'react';
import {resource_pane_dict, resource_dict, actions_dict} from '../assets';
import {timeLeft, timeLeftString} from '../gameLogic';
import {styledText} from '../textStyling';

import {StyledInfoBox, StyledInfoGap} from './styles/StyledInfoBox';

const InfoBoxPane = ({pane, gameState})=>{
    return (
        <>
            {resource_pane_dict[pane].desc}
        </>
    );
}

const InfoBoxAction = ({action, gameState})=>{
    let a = actions_dict[action];
    const base_speed = a["speed"](gameState.resourceCount);
    let time_left_string = "";
    if (base_speed > 0) {
        let time_left = timeLeft(gameState, a);
        time_left_string = timeLeftString(time_left);
    }
    let message1 =
        <div>
            {a["info"](gameState.resourceCount).map((paragraph,i)=>
                <div key={i}>
                    <p key={i}>{styledText(paragraph, gameState)}</p>
                    <StyledInfoGap key={i+10000}/>
                </div>
            )}
            {(()=>{
                if (base_speed) {return <p>Time left:&nbsp;{time_left_string}</p>}
                }
            )()}
        </div>
    let message2;
    if (gameState.actionProgress[action]) {
        const progress = 100-100*gameState.actionProgress[action]["timeLeft"];
        message2 =
            <>
                <StyledInfoGap />
                {"Progress: "+progress.toFixed(2)+"%"}
            </>
    }
    return (
        <>
            {message1}
            {message2}
        </>
    );
}

const InfoBoxResource = ({resource, gameState})=>{
    return (
        <>
            {resource_dict[resource].desc}
        </>
    );
}

const InfoBox = ({x,y,gameState}) => {
    for (var key in gameState.hovers) {
        const key_pieces = key.split('_');
        if (key_pieces[0]==="action") {
            return (
                <StyledInfoBox style={{top:`${y+10}px`, left:`${x+10}px`}}>
                    <InfoBoxAction action={key_pieces[1]} gameState={gameState} />
                </StyledInfoBox>
            );
        }
        if (key_pieces[0]==="pane") {
            return (
                <StyledInfoBox style={{top:`${y+10}px`, left:`${x+10}px`}}>
                    <InfoBoxPane pane={key_pieces[1]} gameState={gameState} />
                </StyledInfoBox>
            );
        }
        if (key_pieces[0]==="resource") {
            return (
                <StyledInfoBox style={{top:`${y+10}px`, left:`${x+10}px`}}>
                    <InfoBoxResource resource={key_pieces[1]} gameState={gameState} />
                </StyledInfoBox>
            );
        }
        if (key_pieces[0]==="other") {
            return (
                <StyledInfoBox style={{top:`${y+10}px`, left:`${x+10}px`}}>
                    {key_pieces[1]}
                </StyledInfoBox>
            );
        }
    }
    return (
        <>
        </>
    );
}

export default InfoBox;
