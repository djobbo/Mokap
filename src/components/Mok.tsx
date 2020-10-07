import React, { ReactElement, useEffect, useState } from 'react';
import moks from '../generators';
import { mok } from '../generators/types';
import { MapMok } from './MapMok';
import { IJSONMap, IJSONMok } from '../generators/parsers';

import { MokWrapper, MokInput, MokSelect, MokInputContainer } from './MokElements';

interface Props {
    updateParentMok: (updateMok: IJSONMok) => void;
}

function Mok({ updateParentMok }: Props): ReactElement {
    const [mokState, setMokState] = useState<IJSONMok>('');

    const handleMokTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const mokType = e.target.value;
        switch (mokType) {
            default:
                setMokState('');
                return;
            case 'bool':
                setMokState({ mokType });
                return;
            case 'map':
                setMokState({ mokType, items: [] });
                return;
            case 'array':
                setMokState({ mokType, item: '', length: 0 });
                return;
            case 'sequenceOf':
                setMokState({ mokType, items: [] });
        }
    };

    useEffect(() => {
        updateParentMok(mokState);
    }, [mokState]);

    return (
        <MokWrapper>
            <MokSelect onChange={handleMokTypeChange}>
                <option value="constant">Constant</option>
                <option value="map">Map</option>
                <option value="bool">Boolean</option>
                <option value="array">Array</option>
                <option value="sequenceOf">Sequence Of</option>
            </MokSelect>
            {typeof mokState === 'string' ? (
                <MokWrapper>
                    <MokInput type="text" value={mokState} onChange={(e) => setMokState(e.target.value)} />
                </MokWrapper>
            ) : (
                <>
                    {mokState.mokType === 'map' && (
                        <>
                            <MapMok updateParentMok={setMokState} />
                        </>
                    )}
                    {mokState.mokType === 'array' && (
                        <>
                            <MokWrapper>
                                <MokInputContainer>
                                    {typeof mokState.length === 'number' ? (
                                        <label>
                                            length
                                            <MokInput
                                                label
                                                type="number"
                                                value={mokState.length}
                                                onChange={(e) => {
                                                    const { target } = e;
                                                    const length = Math.max(0, parseInt(target.value || '0'));
                                                    setMokState({ ...mokState, length });
                                                }}
                                            />
                                        </label>
                                    ) : (
                                        <Mok updateParentMok={setMokState} /> // Number Mok
                                    )}
                                </MokInputContainer>
                            </MokWrapper>
                            <Mok updateParentMok={setMokState} />
                        </>
                    )}
                </>
            )}
        </MokWrapper>
    );
}

export { Mok };
