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

export const MokInput = styled.input<{ hasLabel?: boolean }>`
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

    ${({ hasLabel }) =>
        hasLabel &&
        `
        border-radius: 0 0.5rem 0.5rem 0;
    `}
`;

export const MokInputContainer = styled.div`
    border-radius: 0.5rem;
    background-color: #d9dcde;
    padding-left: 1rem;
    display: inline-flex;
    align-items: center;

    label {
        font-size: 0.75rem;
        text-transform: uppercase;
        font-weight: bold;
        color: #3a3d40;

        input {
            margin-left: 1rem;
        }
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

export const AddMokButton = styled.button`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    background-color: transparent;
    color: #d9dcde;
    cursor: pointer;

    &:hover {
        color: #919aa1;
    }
`;
