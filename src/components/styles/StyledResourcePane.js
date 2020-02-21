import styled from 'styled-components';

export const StyledResourcePane = styled.div`
    background: rgba(255,255,255, 0.8);
    position:absolute;
    top:0;
    left:20vw;
    height:100vh;
    width:calc(60vw - 40px);
    margin-left:20px;
    margin-right:20px;
    margin-top:20px;
    margin-bottom:100px;
`

export const StyledResourceHeader = styled.div`
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
`;

export const StyledResourceSubHeader = styled.div`
    text-align: center;
    font-size: 24px;
    margin-bottom: 10px;
`;

export const StyledResourcePaneDivider = styled.div`
    height:20px;
`;

export const StyledSubpaneButton = styled.button`
    font-size: 20px;
    background-color: ${props => props.current_subpane ? "#BA8C00" : "#008CBA"};
    border: 1px solid black;
    border-radius: 8px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
    &:hover {
        background-color: #e7e7e7;
    }
`;

export const StyledSubpaneButtons = styled.div`
    text-align:center;
    padding-bottom:20px;
`;

export const StyledSubsubpane = styled.div`
    width:49%;
    height: 100%;
    left:0;
    border: 1px solid black;
    display:table-cell;
`

export const StyledSubsubpaneRow = styled.div`
    width: 100%;
    display: table;
`

// This is for situations where there is Action and Resource box on a row, such as for a top level pane.
// Compresses size by 50%.
export const StyledPaneCompressor = styled.div`
    width:50%;
`
