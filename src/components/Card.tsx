import React, { PropsWithChildren, FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    margin: 2rem;
    box-shadow: 0 0 1rem #1d2e5311;
    padding: 1.5rem;
    border-radius: 0.75rem;
    background-color: white;
`;

const CardTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

type Props = PropsWithChildren<{ title: string }>;

const Card: FC<Props> = ({ title, children }: Props) => {
    return (
        <Wrapper>
            <CardTitle>{title}</CardTitle>
            {children}
        </Wrapper>
    );
};

export { Card };
