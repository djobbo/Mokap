import React, { ReactElement, useEffect, useState } from 'react';
import moks from '../generators';
import { mok } from '../generators/types';
import { MapMok } from './MapMok';

import { MokWrapper, MokInput, MokSelect } from './MokElements';

type MokType = keyof typeof moks | 'constant';

interface Props {
    updateParentMok: (updateMok: mok<any>) => void;
}

function Mok({ updateParentMok }: Props): ReactElement {
    const [mokState, setMokState] = useState<
        | { mokType: 'constant'; value: string }
        | { mokType: 'bool'; value: mok<boolean> }
        | { mokType: 'map'; value: { [k: string]: mok<unknown> } }
        | { mokType: 'arr'; value: mok<unknown>; length: number; mok: mok<unknown> } // TODO: make length a mok
    >({ mokType: 'constant', value: '' });

    const handleMokTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const mokType = e.target.value as MokType;
        switch (mokType) {
            case 'constant':
                setMokState({ mokType, value: '' });
                return;
            case 'bool':
                setMokState({ mokType, value: moks.bool });
                return;
            case 'map':
                setMokState({ mokType, value: {} });
                return;
            case 'arr':
                setMokState({ mokType, value: [], mok: '', length: 0 });
                return;
        }
    };

    useEffect(() => {
        updateParentMok(mokState.value);
    }, [mokState]);

    return (
        <MokWrapper>
            <MokSelect onChange={handleMokTypeChange}>
                <option value="constant">Constant</option>
                <option value="map">Map</option>
                <option value="bool">Boolean</option>
                <option value="arr">Array</option>
            </MokSelect>
            {mokState.mokType === 'constant' && (
                <div>
                    <MokInput
                        type="text"
                        value={mokState.value}
                        onChange={(e) => setMokState({ mokType: 'constant', value: e.target.value })}
                    />
                </div>
            )}
            {mokState.mokType === 'map' && (
                <div>
                    <MapMok
                        updateParentMok={(state: { [k in string]: mok<any> }) =>
                            setMokState({ mokType: 'map', value: state })
                        }
                    />
                </div>
            )}
            {mokState.mokType === 'arr' && (
                <div>
                    <MokInput
                        type="number"
                        value={mokState.length}
                        onChange={(e) => {
                            const { target } = e;
                            const length = Math.max(0, parseInt(target.value || '0'));
                            setMokState({
                                mokType: 'arr',
                                mok: mokState.mok,
                                value: moks.arr(mokState.mok, length),
                                length,
                            });
                        }}
                    />
                    <Mok
                        updateParentMok={(updatedMok: mok<any>) => {
                            setMokState({
                                mokType: 'arr',
                                mok: updatedMok,
                                value: moks.arr(updatedMok, mokState.length),
                                length: mokState.length,
                            });
                        }}
                    ></Mok>
                </div>
            )}
        </MokWrapper>
    );
}

export { Mok };
