import styled from 'styled-components';

export const StyledResourcePane = styled.div`
    background: rgba(255,255,255, 0.8);
    position:absolute;
    top:0;
    left:20vw;
    height:100vh;
    width:50vw;
    margin-left:20px;
    margin-top:20px;
`

export const StyledResourceHeader = styled.div`
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
`;

export const StyledActionButton = styled.button`
    font-size: 16px;
    width: 25%;
    border: 1px solid black;
    border-radius: 5px;
`

export const StyledCancelButton = styled.button`
    font-size: 16px;
    width: 15%;
    background-color: #BA3C00;
    border: 1px solid black;
    border-radius: 5px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
    &:hover {
        background-color: #e7e7e7;
    }
`;

export const StyledActionProgress = styled.progress`
    width:50%;
    height:15px;
`;

export const StyledResourceName = styled.div`
    position:absolute;
    left:0;
`

export const StyledResourceCount = styled.div`
    position:absolute;
    left:200px;
`

export const StyledResourceBox = styled.div`
    height:20px;
`

export const StyledResourcePaneDivider = styled.div`
    height:50px;
`
