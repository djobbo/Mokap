import React, { FC, useState } from 'react';

const StringMok: FC = () => {
    const [mok, setMok] = useState<string>();

    return (
        <div>
            <input type="text" value={mok} onChange={(e) => setMok(e.target.value)} />
        </div>
    );
};

export { StringMok };
