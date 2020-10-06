import React, { FC, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { getMok } from '../generators';
import { Card } from '../components/Card';
import { Mok } from '../components/Mok';
import { mok } from '../generators/types';

const GlobalStyle = createGlobalStyle`
    * {
    font-family: "Inter";
    box-sizing: border-box;
    }
    
    body{
    background-color: #eff1f3;
    }
`;

const MoksContainer = styled.div`
    padding: 1rem;
`;

const App: FC = () => {
    const [finalMok, setFinalMok] = useState<mok<any>>(undefined);
    const [finalMokValue, setFinalMokValue] = useState<unknown>('');

    const refreshMok = () => {
        console.log('bruh');
        setFinalMokValue(getMok(finalMok));
    };

    useEffect(() => refreshMok(), [finalMok]);

    return (
        <>
            <GlobalStyle />
            <Card title="New Mok">
                <MoksContainer>
                    <Mok updateParentMok={setFinalMok} />
                </MoksContainer>
            </Card>
            <div>{JSON.stringify(finalMokValue)}</div>
        </>
    );
};

export default App;
