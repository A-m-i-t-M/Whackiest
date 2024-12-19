import React, { useEffect, useState } from 'react';

export default function Details() {
    const [purohits, setPurohits] = useState([]);
    const [error, setError] = useState(null);

    // Fetch purohits when the component mounts
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

    // Handle deletion of a purohit
    const handleDelete = async (purohitId) => {
        try {
            const response = await fetch('/backend/purohit/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ purohitId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete purohit');
            }

            // Update the list of purohits after deletion
            setPurohits((prevPurohits) => prevPurohits.filter((p) => p._id !== purohitId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Details</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {purohits.map((purohit) => (
                    <li key={purohit._id} style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <h3>{purohit.name}</h3>
                            <p>Price: {purohit.price}</p>
                        </div>
                        <button
                            style={{
                                marginLeft: '10px',
                                padding: '5px 10px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleDelete(purohit._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
