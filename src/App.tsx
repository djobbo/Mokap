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
    const hobbyNames = ['VideoGames', 'Code', 'GD'];

    const hobbys = mok.map({
        name: mok.ch(...hobbyNames),
        practiceTime: () => `${mok.num(1, 10)()} ${mok.ch('days', 'months', 'years')()}`,
    });

    const person = mok.map({
        name: mok.str(/[A-Z][a-z]{5,15}/),
        id: (i) => i,
        hobbys: mok.arr(hobbys, mok.num(2, 4)),
        xd: mok.bool,
    });

    const mock = mok.arr(person, 4)();

    return (
        <>
            <GlobalStyle />
            <Card title="New Mok">
                {mock.map(({ name, id, hobbys, xd }) => (
                    <div key={id}>
                        <h2>{name}</h2>
                        {hobbys.map((hobby) => (
                            <div key={Math.random()}>
                                <strong>{hobby.name}</strong> {hobby.practiceTime}
                            </div>
                        ))}
                    </div>
                ))}
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
