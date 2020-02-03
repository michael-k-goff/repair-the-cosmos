import styled from 'styled-components';

export const StyledMenuPane = styled.div`
    background: rgba(161, 164, 79, 0.8);
    position:absolute;
    top:0;
    left:0;
    height:100vh;
    width:20vw;
`

export const StyledPaneButton = styled.button`
    font-size: 24px;
    display: block;
    width: 100%;
    background-color: ${props => props.current_pane ? "#BA8C00" : "#008CBA"};
    border: 1px solid black;
    border-radius: 8px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
    &:hover {
        background-color: #e7e7e7;
    }
`;

export const StyledResetButton = styled.button`
    font-size: 24px;
    display: block;
    width: 100%;
    background-color: ${props => props.current_pane ? "#BA8C00" : "#BA0000"};
    border: 1px solid black;
    border-radius: 8px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
    &:hover {
        background-color: #e7e7e7;
    }
`;

export const StyledMenuHeader = styled.div`
    text-align: center;
    font-size: 40px;
    margin-bottom: 20px;
`;

export const StyledMenuGap = styled.div`
    height:50px;
`

export const StyledGameInfo = styled.p`
    padding-left:10px;
    padding-right:10px;
`
