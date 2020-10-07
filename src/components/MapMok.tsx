import React, { FC, useEffect, useState } from 'react';
import crypto from 'crypto';

import moks from '../generators';
import { MokWrapper, MokInput, MokInputContainer, AddMokButton } from './MokElements';
import { Mok } from './Mok';
import { mok } from '../generators/types';
import { IJSONMap, IJSONMok } from '../generators/parsers';

interface Props {
    updateParentMok: (updateMok: IJSONMok) => void;
}

const MapMok: FC<Props> = ({ updateParentMok }: Props) => {
    const [mok, setMok] = useState<[symbol, string, IJSONMok][]>([]);

    useEffect(() => {
        updateParentMok({ mokType: 'map', items: mok.map(([, name, item]) => [name, item]) });
    }, [mok]);

    return (
        <>
            {mok.map(([key, name, val]) => (
                <MokWrapper key={key.toString()}>
                    <MokInputContainer>
                        <label>
                            key
                            <MokInput
                                label
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setMok((state) => {
                                        const newState = [...state];
                                        const i = newState?.findIndex(([k]) => k === key);
                                        newState[i] = [key, e.target.value, val];
                                        return newState;
                                    })
                                }
                            />
                        </label>
                    </MokInputContainer>
                    <Mok
                        updateParentMok={(updatedMok: mok<any>) => {
                            setMok((state) => {
                                const newState = [...state];
                                const i = newState?.findIndex(([k]) => k === key);
                                newState[i] = [key, name, updatedMok];
                                return newState;
                            });
                        }}
                    ></Mok>
                </MokWrapper>
            ))}
            <MokWrapper>
                <AddMokButton
                    onClick={() =>
                        setMok((state) => {
                            return [...state, [Symbol(), '', '']];
                        })
                    }
                >
                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                        />
                    </svg>
                </AddMokButton>
            </MokWrapper>
        </>
    );
};

export { MapMok };
