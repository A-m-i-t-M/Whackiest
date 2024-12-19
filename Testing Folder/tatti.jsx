import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Snippet = () => {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch snippets on component mount
    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5001/api/snippets', {
                    headers: {
                        Authorization: Bearer ${localStorage.getItem('token')}, // Assuming a token-based authentication
                    },
                });
                setSnippets(response.data.snippets);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching snippets');
                setLoading(false);
            }
        };

        fetchSnippets();
    }, []);

    // Delete snippet handler
    const deleteSnippet = async (snippetId) => {
        try {
            const response = await axios.post(
                'http://localhost:5001/api/snippets/delete',
                { snippetId },
                {
                    headers: {
                        Authorization: Bearer ${localStorage.getItem('token')},
                    },
                }
            );
            // Remove the deleted snippet from the list
            setSnippets(snippets.filter((snippet) => snippet._id !== snippetId));
            alert(response.data.message);
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting snippet');
        }
    };

    if (loading) return <div className="text-center text-lg font-semibold text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-lg font-semibold text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md relative">
            {/* Back to Dashboard Button */}
            <button
                onClick={() => navigate('/dashboard')}
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500"
            >
                Dashboard
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Snippets</h2>
            {snippets.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">No snippets found.</div>
            ) : (
                <ul className="space-y-4">
                    {snippets.map((snippet) => (
                        <li
                            key={snippet._id}
                            className="flex justify-between items-start bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
                        >
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-700">{snippet.name}</h4>
                                <details className="mt-2 text-gray-600">
                                    <summary className="cursor-pointer">View Code</summary>
                                    <pre className="bg-gray-100 p-3 mt-2 rounded-md text-sm overflow-x-auto">
                                        {snippet.code}
                                    </pre>
                                </details>
                            </div>
                            <button
                                onClick={() => deleteSnippet(snippet._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-400"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Snippet;