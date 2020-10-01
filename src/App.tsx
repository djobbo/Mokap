import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Card } from './components/Card';
import { Mok } from './components/Mok';
import mok from './generators';

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
    console.log(mok);

    return (
        <>
            <GlobalStyle />
            <Card title="New Mok">
                {/* <MoksContainer>
                    <Mok />
                    <Mok mokType="bool" />
                    <Mok mokType="map" />
                </MoksContainer> */}
            </Card>
        </>
    );
};

export { App };
