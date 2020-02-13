// Stylings for buttons and other features within actions

import styled from 'styled-components';

//////////////////////////////////// Buttons

export const StyledActionButton = styled.button`
    font-size: 16px;
    width: 67%;
    background-color: ${
        props => props.enabled ?
         (props.count ? "#00BA8C" : "#80FFFF") :
         "#77DABC"
    };
    color: ${props => props.enabled ? "#000000" : "#7E7E7E"};
    border: 1px solid black;
    border-radius: 5px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
    &:hover {
        background-color: ${props => props.enabled ? "#e7e7e7" : "#77DABC"};
    }
`

export const StyledRepeatButton = styled.button`
    font-size: 16px;
    width: 33%;
    background-color: ${
        props => props.enabled ?
         "#00BA8C" :
         "#77DABC"
    };
    color: ${props => props.enabled ? "#000000" : "#7E7E7E"};
    border: 1px solid black;
    border-radius: 5px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
    &:hover {
        background-color: ${props => props.enabled ? "#e7e7e7" : "#77DABC"};
    }
`

export const StyledCancelButton = styled.button`
    font-size: 16px;
    width: 40%;
    background-color: #BA3C00;
    border: 1px solid black;
    border-radius: 5px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
    &:hover {
        background-color: #e7e7e7;
    }
`;

export const StyledToggleButton = styled.button`
    font-size: 16px;
    width: 60%;
    background-color: #BA3C00;
    border: 1px solid black;
    border-radius: 5px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
    &:hover {
        background-color: #e7e7e7;
    }
`;

///////////////////////////////// Progress bars

export const StyledActionProgress = styled.progress`
    width:100%;
    height:15px;
`;

//////////////////////////////// Boxes

export const StyledActionBox = styled.div`
    width: 100%;
`;

export const StyledActionButtonBox = styled.div`
    width: 40%;
    height: 100%;
    float: left;
`;

export const StyledActionProgressBox = styled.div`
    width: 30%;
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
