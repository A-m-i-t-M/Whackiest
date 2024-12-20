import React, { useEffect, useState } from 'react';
import images from '../assets/bg8.jpg'; 
import {Link} from 'react-router-dom';

export default function Details() {
    const [purohits, setPurohits] = useState([]);
    const [items, setItems] = useState([]);
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    // Fetch data when the component mounts
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
                    throw new Error(errorData.message || 'Failed to fetch items');
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
                    throw new Error(errorData.message || 'Failed to fetch services');
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

    // Handle deletion of data
    const handleDelete = async (id, type) => {
        try {
            const endpointMap = {
                purohit: '/backend/purohit/delete',
                item: '/backend/itemm/delete',
                service: '/backend/service/delete',
            };

            const response = await fetch(endpointMap[type], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to delete ${type}`);
            }

            if (type === 'purohit') setPurohits((prev) => prev.filter((p) => p._id !== id));
            if (type === 'item') setItems((prev) => prev.filter((p) => p._id !== id));
            if (type === 'service') setServices((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            className="container mx-auto p-4"
            style={{
                backgroundImage: `url(${images})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <h1 className="text-3xl font-bold mb-8 text-center text-darkblue">Details Dashboard</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            {/* Purohit Details */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4 text-center text-darkblue">Purohit Details</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-neutral-300 shadow-lg rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-2 border border-neutral-300 text-left bg-lightyellow">Name</th>
                                <th className="px-4 py-2 border border-neutral-300 text-left">Price</th>
                                <th className="px-4 py-2 border border-neutral-300 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purohits.map((purohit) => (
                                <tr key={purohit._id} className="bg-yellow-50 hover:bg-yellow-100 transition duration-200">
                                    <td className="px-4 py-2 border border-neutral-300">{purohit.name}</td>
                                    <td className="px-4 py-2 border border-neutral-300">{purohit.price}</td>
                                    <td className="px-4 py-2 border border-neutral-300 text-center">
                                        <button
                                            className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600 transition duration-200"
                                            onClick={() => handleDelete(purohit._id, 'purohit')}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Item Details */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4 text-center text-darkblue">Item Details</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-neutral-300 shadow-lg rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-2 border border-neutral-300 text-left bg-lightyellow">Name</th>
                                <th className="px-4 py-2 border border-neutral-300 text-left">Price</th>
                                <th className="px-4 py-2 border border-neutral-300 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id} className="bg-yellow-50 hover:bg-yellow-100 transition duration-200">
                                    <td className="px-4 py-2 border border-neutral-300">{item.name}</td>
                                    <td className="px-4 py-2 border border-neutral-300">{item.price}</td>
                                    <td className="px-4 py-2 border border-neutral-300 text-center">
                                        <button
                                            className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600 transition duration-200"
                                            onClick={() => handleDelete(item._id, 'item')}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Service Details */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-center text-darkblue">Service Details</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-neutral-300 shadow-lg rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-2 border border-neutral-300 text-left bg-lightyellow">Name</th>
                                <th className="px-4 py-2 border border-neutral-300 text-left">Price</th>
                                <th className="px-4 py-2 border border-neutral-300 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service._id} className="bg-yellow-50 hover:bg-yellow-100 transition duration-200">
                                    <td className="px-4 py-2 border border-neutral-300">{service.name}</td>
                                    <td className="px-4 py-2 border border-neutral-300">{service.price}</td>
                                    <td className="px-4 py-2 border border-neutral-300 text-center">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition duration-200"
                                            onClick={() => handleDelete(service._id, 'service')}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className=' my-4'>
                <Link to={"/home"}>
                    <span className=' bg-orange-600 border rounded-xl p-1'>Go Back</span>
                </Link>
            </div>
        </div>
    );
}
