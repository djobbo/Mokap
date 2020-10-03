import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import mok from '../generators';

const Wrapper = styled.div`
    position: relative;
    padding: 1rem;
    margin-left: 1rem;
    display: flex;
    align-items: center;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 1rem;
        border-left: 1px solid #d9dcde;
    }

    &:last-of-type:before {
        height: 2rem;
    }
`;

const MokContent = styled.div`
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -1rem;
        width: 1rem;
        border-bottom: 1px solid #d9dcde;
    }
`;

const MokInput = styled.input`
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

type MokType = keyof typeof mok | 'constant';

type Props = PropsWithChildren<{
    mokType?: MokType;
}>;

const Mok: FC<Props> = ({ children, mokType = 'constant' }: Props) => {
    // const [mokState, setMockState] = useReducer<Reducer<MokState, Action>>(reducer, {type: mokType}, )

    return (
        <Wrapper>
            <h3>Field Name</h3>
            <select>
                <option value="arr">Array</option>
                <option value="map">Number</option>
                <option value="bool">Boolean</option>
            </select>
            {mokType === 'bool' && (
                <MokContent>
                    <select>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </MokContent>
            )}

            {mokType === 'arr' && (
                <MokContent>
                    <MokInput placeholder="array" />
                </MokContent>
            )}

            {mokType === 'map' && (
                <MokContent>
                    <Mok mokType="arr"></Mok>
                </MokContent>
            )}
            {children}
        </Wrapper>
    );
};

export { Mok };
