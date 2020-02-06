import styled from 'styled-components';

export const StyledGameInfo = styled.p`
    padding-left:10px;
    padding-right:50px;
    padding-bottom:20px;
`

export const StyledResetButton = styled.button`
    font-size: 24px;
    display: block;
    width: 50%;
    background-color: ${props => props.current_pane ? "#BA8C00" : "#BA0000"};
    border: 1px solid black;
    border-radius: 8px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
    &:hover {
        background-color: #e7e7e7;
    }
    margin-left: auto;
    margin-right: auto;
`;
