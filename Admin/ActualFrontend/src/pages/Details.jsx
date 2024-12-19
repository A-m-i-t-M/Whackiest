import React, { useEffect, useState } from 'react';

export default function Details() {
    const [purohits, setPurohits] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurohits = async () => {
            try {
                const response = await fetch('/backend/purohit/admin', {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch purohits');
                }

                const data = await response.json();
                setPurohits(data.purohits);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPurohits();
    }, []); 
    return (
        <div>
            <h1>Details</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {purohits.map((purohit) => (
                    <li key={purohit._id}>
                        <h3>{purohit.name}</h3>
                        <p>Price: {purohit.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
