import { FC, useEffect, useState } from 'react';
import crypto from 'crypto';

import moks from '../generators';
import { MokWrapper, MokInput } from './MokElements';
import { Mok } from './Mok';
import { mok } from '../generators/types';

interface Props {
    updateParentMok: (updateMok: mok<any>) => void;
}

const MapMok: FC<Props> = ({ updateParentMok }: Props) => {
    const [mok, setMok] = useState<[string, string, mok<any>][]>([]);

    useEffect(() => {
        const mapMok: { [k in string]: mok<any> } = mok.reduce((acc, [, name, val]) => ({ ...acc, [name]: val }), {});
        updateParentMok(moks.map(mapMok));
    }, [mok]);

    return (
        <MokWrapper>
            {mok.map(([key, name, val]) => (
                <MokWrapper key={key}>
                    <MokInput
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
            <div>
                <button
                    onClick={() =>
                        setMok((state) => {
                            return [...state, [crypto.randomBytes(48).toString('hex'), '', '']];
                        })
                    }
                >
                    +
                </button>
            </div>
        </MokWrapper>
    );
};

export { MapMok };
