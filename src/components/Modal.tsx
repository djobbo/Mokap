import React, { FC, PropsWithChildren } from 'react';

const Modal: FC = ({ children }: PropsWithChildren<{}>) => {
    return <div>{children}</div>;
};

export { Modal };
