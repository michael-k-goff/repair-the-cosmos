// Stylings for buttons and other features within actions

import styled from 'styled-components';

//////////////////////////////////// Buttons

export const StyledActionButton = styled.button`
    font-size: 16px;
    width: 45%;
    background-color: ${
        props => props.active ? "#BA3C00" :
            props.enabled ?
                (props.count ? "#00BA8C" : "#80FFFF") :
                "#77DABC"
    };
    color: ${props => (props.enabled || props.active) ? "#000000" : "#7E7E7E"};
    border: 1px solid black;
    border-radius: 5px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
`

export const StyledToggleButton = styled.button`
    font-size: 16px;
    width: 35%;
    background-color: #BA3C00;
    background-color: ${
        props => props.repOn ? "#80FFFF" : "#DDDDDD"
    };
    border: 1px solid black;
    border-radius: 5px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
`;

export const StyledInfoButton = styled.button`
    font-size: 16px;
    width: 20%;
    background-color: #BA3C00;
    background-color: ${
        props => props.repOn ? "#80FFFF" : "#DDDDDD"
    };
    border: 1px solid black;
    border-radius: 5px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
`;

///////////////////////////////// Progress bars

export const StyledActionProgress = styled.progress`
    width:100%;
    height:20px;
`;

//////////////////////////////// Boxes

export const StyledActionBox = styled.div`
    width: 100%;
`;

export const StyledActionButtonBox = styled.div`
    width: 18%;
    height: 100%;
    float: left;
`;

export const StyledActionProgressBox = styled.div`
    width: 32%;
    height: 100%;
    float: left;
    margin-left: 0%;
`;

export const StyledActionButtonBox2 = styled.div`
    width: 25%;
    height: 100%;
    float: left;
    margin-left: 0%;
`;

export const StyledLineClear = styled.div`
    clear: both;
`;
