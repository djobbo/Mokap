import styled from 'styled-components';

export const MokWrapper = styled.div`
    position: relative;
    margin: 0.5rem 0.5rem 0.5rem 1rem;

    &::before {
        content: '';
        position: absolute;
        top: -0.5rem;
        left: -0.5rem;
        bottom: 0;
        /* border-bottom: 1px solid #d9dcde; */
        width: 2px;
        background-color: #d9dcde;
    }

    &:last-child:before {
        bottom: auto;
        height: 1.5rem;
    }

    &::after {
        content: '';
        position: absolute;
        top: 1rem;
        left: -0.5rem;
        width: 0.5rem;
        height: 2px;
        background-color: #d9dcde;
        /* border-bottom: 1px solid #d9dcde; */
    }
`;

export const MokInput = styled.input`
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    transition: 0.15s all ease;
    background-color: #eff1f3;
    border: 1px solid #d9dcde;

    &:focus {
        box-shadow: 0 0 0px 2px #0059ff44;
        border-color: transparent;
    }
`;

export const MokSelect = styled.select`
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    transition: 0.15s all ease;
    background-color: #eff1f3;
    border: 1px solid #d9dcde;

    &:focus {
        box-shadow: 0 0 0px 2px #0059ff44;
        border-color: transparent;
    }
`;
