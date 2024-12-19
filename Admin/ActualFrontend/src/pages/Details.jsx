import React, { useEffect, useState } from 'react';

export default function Details() {
    const [purohits, setPurohits] = useState([]);
    const [items, setItems] = useState([]);
    const [services, setServices] = useState([]);
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
        const fetchItems = async () => {
            try {
                const response = await fetch('/backend/itemm/admin', {
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
                setItems(data.items);
            } catch (err) {
                setError(err.message);
            }
        };
        const fetchServices = async () => {
            try {
                const response = await fetch('/backend/service/admin', {
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
                setServices(data.services);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPurohits();
        fetchItems();
        fetchServices();
    }, []);

    // Handle deletion of a purohit
    const handleDeletePurohit = async (purohitId) => {
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

    const handleDeleteItem = async (itemId) => {
        try {
            const response = await fetch('/backend/itemm/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete purohit');
            }

            // Update the list of purohits after deletion
            setItems((prevItems) => prevItems.filter((p) => p._id !== itemId));
        } catch (err) {
            setError(err.message);
        }
    };


    const handleDeleteService = async (serviceId) => {
        try {
            const response = await fetch('/backend/service/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ serviceId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete purohit');
            }

            // Update the list of purohits after deletion
            setServices((prevServices) => prevServices.filter((p) => p._id !== serviceId));
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div>
            <h1>Purohit Details</h1>
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
                            onClick={() => handleDeletePurohit(purohit._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <h1>Item Details</h1>
            <ul>
                {items.map((item) => (
                    <li key={item._id} style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <h3>{item.name}</h3>
                            <p>Price: {item.price}</p>
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
                            onClick={() => handleDeleteItem(item._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <h1>Service Details</h1>
            <ul>
                {services.map((service) => (
                    <li key={service._id} style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <h3>{service.name}</h3>
                            <p>Price: {service.price}</p>
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
                            onClick={() => handleDeleteService(service._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}