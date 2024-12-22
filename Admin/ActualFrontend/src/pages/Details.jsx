import React, { useEffect, useState } from 'react';
import images from '../assets/bg8.jpg';
import { useNavigate } from 'react-router-dom';

export default function Details() {
    const [purohits, setPurohits] = useState([]);
    const [items, setItems] = useState([]);
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (endpoint, setter) => {
            try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Failed to fetch from ${endpoint}`);
                }

                const data = await response.json();
                setter(data[Object.keys(data)[0]]); // Dynamically set the key based on the response structure
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData('/backend/purohit/admin', setPurohits);
        fetchData('/backend/itemm/admin', setItems);
        fetchData('/backend/service/admin', setServices);
    }, []);

    const handleDelete = async (endpoint, id, setter, key) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [key]: id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to delete ${key}`);
            }

            setter((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const renderTable = (data, deleteHandler, deleteKey) => (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-neutral-300 shadow-lg rounded-2xl">
                <thead className=" text-white dark:bg-slate-800 bg-slate-200">
                    <tr>
                        <th className="px-4 py-2 border border-neutral-300 bg-lightyellow text-left dark:text-white text-orange-400">Name</th>
                        <th className="px-4 py-2 border border-neutral-300 text-left dark:text-white text-orange-400">Price</th>
                        <th className="px-4 py-2 border border-neutral-300 text-center dark:text-white text-orange-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id} className="bg-yellow-50 hover:bg-yellow-100 transition duration-200">
                            <td className="px-4 py-2 border border-neutral-300">{item.name}</td>
                            <td className="px-4 py-2 border border-neutral-300">{item.price}</td>
                            <td className="px-4 py-2 border border-neutral-300 text-center">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition duration-200"
                                    onClick={() => deleteHandler(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div
            style={{
                backgroundImage: `url(${images})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="min-h-screen flex items-center justify-center p-4"
        >
            <div className="w-full max-w-5xl bg-neutral-200 bg-opacity-40 dark:bg-gray-900 dark:bg-opacity-95 rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6 text-center text-darkblue dark:text-purple-300">Details Dashboard</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-left ml-1 text-darkblue dark:text-purple-200">Purohit Details</h2>
                    {renderTable(purohits, (id) => handleDelete('/backend/purohit/delete', id, setPurohits, 'purohitId'), 'purohitId')}
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-left ml-1 text-darkblue dark:text-purple-200">Item Details</h2>
                    {renderTable(items, (id) => handleDelete('/backend/itemm/delete', id, setItems, 'itemId'), 'itemId')}
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4 text-left ml-1 text-darkblue dark:text-purple-200">Service Details</h2>
                    {renderTable(services, (id) => handleDelete('/backend/service/delete', id, setServices, 'serviceId'), 'serviceId')}
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition duration-200"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
