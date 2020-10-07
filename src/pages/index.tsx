import React, { FC, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Card } from '../components/Card';
import { Mok } from '../components/Mok';
import { IJSONMok, parseMok } from '../generators/parsers';
import { getMok } from '../generators';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Inter";
        box-sizing: border-box;
        border: none;
    }
    
    body{
        background-color: #eff1f3;
    }
`;

const MoksContainer = styled.div`
    padding: 1rem;
`;

const App: FC = () => {
    const [finalMok, setFinalMok] = useState<IJSONMok>('');
    const [finalMokValue, setFinalMokValue] = useState<string>('');

    const refreshMok = () => {
        console.log('bruh');
        setFinalMokValue(JSON.stringify(getMok(parseMok(finalMok))));
    };

    useEffect(
        () => refreshMok(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [finalMok],
    );

    return (
        <>
            <GlobalStyle />
            <Card title="New Mok">
                <MoksContainer>
                    <Mok updateParentMok={setFinalMok} />
                </MoksContainer>
            </Card>
            <div>{finalMokValue}</div>
        </>
    );
};

export default App;
