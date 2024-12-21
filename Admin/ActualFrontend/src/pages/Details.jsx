import React, { useEffect, useState } from 'react';
import images from '../assets/bg8.jpg';
import { useNavigate } from 'react-router-dom';

export default function Details() {
    const [purohits, setPurohits] = useState([]);
    const [items, setItems] = useState([]);
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const navigate=useNavigate();
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
                throw new Error(errorData.message || 'Failed to delete item');
            }

            // Update the list of items after deletion
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
                throw new Error(errorData.message || 'Failed to delete service');
            }

            // Update the list of services after deletion
            setServices((prevServices) => prevServices.filter((p) => p._id !== serviceId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
              style={{
                backgroundImage: `url(${images})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
            <div className="container mx-auto p-4 bg-opacity-90 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-8 text-center text-darkblue">Details Dashboard</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
    
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
                                                onClick={() => handleDeletePurohit(purohit._id)}
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
                                                onClick={() => handleDeleteItem(item._id)}
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
                                                onClick={() => handleDeleteService(service._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex justify-center'>
                        <button onClick={()=>navigate(-1)} className='bg-red-500 mt-8 items-center mx-auto px-4 py-2  rounded-md text-white flex gap-2'>  Go Back </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}