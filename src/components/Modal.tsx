import React, { FC, PropsWithChildren } from 'react';

const Modal: FC = ({ children }: PropsWithChildren<unknown>) => {
  return <div>{children}</div>;
};

export { Modal };
