import { FC, useState } from 'react';

import { Mok } from './Mok';

const MapMok: FC = () => {
    const [mok, setMok] = useState<[string, 'arr' | 'str', unknown][]>([]);

    return (
        <>
            {mok.map(([key, type, val]) => (
                <div key={key}>
                    <input
                        type="text"
                        value={key}
                        onChange={(e) =>
                            setMok((state) => [...state?.filter(([k]) => k !== key), [e.target.value, type, val]])
                        }
                    />
                    <Mok<type> mokType={type} setVal={(state) => setMok[key]}></Mok>
                </div>
            ))}
        </>
    );
};

export { MapMok };
