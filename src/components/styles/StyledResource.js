import styled from 'styled-components';

export const StyledResourceInfoButton = styled.button`
    font-size: 16px;
    width: 100%;
    background-color: #BA3C00;
    background-color: ${
        props => props.repOn ? "#80FFFF" : "#DDDDDD"
    };
    border: 1px solid black;
    border-radius: 5px;
    -webkit-transition-duration: 0.2s; /* Safari */
    transition-duration: 0.2s;
`;

export const StyledResourceName = styled.div`
    float: left;
    width:22%;
    height: 100%;
    left:0;
`

export const StyledResourceCount = styled.div`
    width: 20%;
    height: 100%;
    float: left;
    margin-left: 0%;
    text-align: right;
`

export const StyledResourceInfoBox = styled.div`
    width: 4%;
    height: 100%;
    float: left;
    margin-left: 0%;
`

export const StyledResourceBox = styled.div`
    width: 100%;
    color: ${props => ({"bad":"#FF0000","":"FFFFFF"}[props.character])};
`
