import styled from 'styled-components';

export const MokWrapper = styled.div`
    position: relative;
    padding: 1rem;
    margin-left: 1rem;
    border: 1px solid red;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 1rem;
        /* border-left: 1px solid #d9dcde; */
        border-left: 1px solid #000;
    }

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -1rem;
        width: 1rem;
        /* border-bottom: 1px solid #d9dcde; */
        border-left: 1px solid #000;
    }

    &:last-of-type:before {
        height: 2rem;
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
