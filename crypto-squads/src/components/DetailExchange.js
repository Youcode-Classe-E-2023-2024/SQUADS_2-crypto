import React, { useEffect, useState } from 'react';
import useApiAxios from '../config/axios';

const DetailExchange = ({ id, onClose }) => {
    const [data, setData] = useState(null);    
    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const response = await useApiAxios.get(`/exchanges/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchExchanges();
    }, [id]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-md w-fit">
                <h2 className="text-xl font-semibold mb-4">Exchange Details</h2>
                {data ? (
                    <div>
                        <div className="mb-4">
                            <p><strong>Exchange Id:</strong> {data.exchangeId}</p>
                            <p><strong>Name:</strong> {data.name}</p>
                            <p><strong>Rank:</strong> {data.rank}</p>
                            <p><strong>percent Total Volume:</strong> {data.percentTotalVolume}</p>
                            <p><strong>volume Usd:</strong> {data.volumeUsd}</p>
                            <p><strong>socket:</strong> {data.tradingPairs}</p>
                            <p><strong>socket:</strong> {data.socket? <>Yes</>:<>No</>}</p>
                        </div>
                        <div>
                            <a href={data.exchangeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Explore more info</a>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DetailExchange;
