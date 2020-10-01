import React, { FC, useState } from 'react';
import { Modal } from './components/Modal';

const App: FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return <div>{modalOpen && <Modal>YOLO</Modal>}</div>;
};

export { App };
