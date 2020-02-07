// Component for a single action

import React, {useState} from 'react';
import {StyledActionButton, StyledActionProgress, StyledCancelButton, StyledToggleButton, StyledRepeatButton}
    from './styles/StyledResourcePane';

const progress_to_pct = (prog) => {
    const pct = (100-100*prog["timeLeft"])
    return pct.toFixed(2).toString()+"%"
}

const Action = ({action,
            resourceCount, setResourceCount,
            actionProgress, setActionProgress,
            hover, setHover, more
}) => {
    // Using hooks to keep track of whether we are hovering because evidently neither
    // Styled components nor JSX can handle hover effects despite claims on the Internet
    // that they can. This is an unnecessarily convolution solution and the fact that I
    // feel compelled to do this causes me to have negative feelings about React, CSS,
    // and really society in general.
    const [mainHover, setMainHover] = useState(0);
    const [repeatHover, setRepeatHover] = useState(0);
    const handleClick = () => {
        if (!action["canExecute"](resourceCount) || action["name"] in actionProgress) {
            return;
        }
        // Now setting the new action via staging rather than directly
        more["setStaging"]({"action":action,"operation":"One"});
    }
    const handleClickRepeat = () => {
        if (!action["canExecute"](resourceCount)) {
            return;
        }
        // Now setting the new action via staging rather than directly
        more["setStaging"]({"action":action,"operation":"Repeat"});
        setRepeatHover(0);
    }
    const handleCancelClick = () => {
        // Now canceling via staging
        more["setStaging"]({"action":action,"operation":"Cancel"});
    }
    const handleRepeatToggle = () => {
        more["setStaging"]({"operation":"RepeatToggle","action":action});
    }
    const enabled = action["canExecute"](resourceCount) && !(action["name"] in actionProgress);
    const count = more["actionCount"][action["name"]];
    const actionButtonColors = (hover_var) => {
        let brightness = Math.sin(new Date().getTime()/500)
        let bg =
            (hover_var && enabled)
            ?
                "#e7e7e7"
            :
                enabled
                ? // `rgb(${Math.floor(128+128*brightness)},${Math.floor(221+35*brightness},${Math.floor(198+58*brightness})
                    !count
                    ?
                        (`rgb(${Math.floor(128+128*brightness)},${Math.floor(221+35*brightness)},${Math.floor(198+58*brightness)})`)
                    :
                        ("rgb(0,186,140)")
                :
                    "#77DABC"
        return {
            color: enabled ? "#000000" : "#777777",
            'backgroundColor': bg
        }
    };
    return (
        <div onMouseOver={()=>setHover(action)}>
            <StyledActionButton
                style={actionButtonColors(mainHover)}
                count={more["actionCount"][action["name"]]}
                enabled={enabled}
                onClick={handleClick}
                onMouseOver={()=>setMainHover(1)}
                onMouseLeave={()=>setMainHover(0)}
            >
                {action["name"]}
            </StyledActionButton>

            {action["name"] in actionProgress ?
                <StyledActionProgress value={1-actionProgress[action["name"]]["timeLeft"]} max={1}/>:
            ""}

            {action["name"] in actionProgress ?
                <StyledCancelButton onClick={handleCancelClick}>
                    Cancel
                </StyledCancelButton>
                :
            ""}
            {action["name"] in actionProgress ?
                <StyledToggleButton onClick={handleRepeatToggle}>
                    Repeat: {actionProgress[action["name"]]["repeat"]?"ON":"OFF"}
                </StyledToggleButton>
                :
            ""}
            {!(action["name"] in actionProgress) ?
                <StyledRepeatButton
                    style={actionButtonColors(repeatHover)}
                    count={more["actionCount"][action["name"]]}
                    enabled={action["canExecute"](resourceCount)}
                    onClick={handleClickRepeat}
                    onMouseOver={()=>setRepeatHover(1)}
                    onMouseLeave={()=>setRepeatHover(0)}
                >
                    Repeat
                </StyledRepeatButton>:
            ""}
        </div>
    )
}

export default Action;
