import React, { useEffect, useState } from 'react';
import useApiAxios from '../config/axios';
import PriceChart from './PriceChart';

const PopupComponent = ({ id, onClose }) => {
    const [data, setData] = useState(null);
    const [DataHistory, setDataHistory] = useState(null);
    
    useEffect(() => {
        fetchAsset();
        history();
    }, []);

    const fetchAsset = () => {
        useApiAxios.get(`/assets/${id}`)
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    const history = () => {
        useApiAxios.get(`/assets/${id}/history?interval=m1`)
        .then(response => {
            setDataHistory(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-md w-fit">
                <h2 className="text-xl font-semibold mb-4">Asset Details</h2>
                {data ? (
                    <div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                            <p><strong>Name:</strong> {data.name}</p>
                            <p><strong>Symbol:</strong> {data.symbol}</p>
                            <p><strong>Rank:</strong> {data.rank}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Market Information</h3>
                            <p><strong>Price (USD):</strong> {data.priceUsd}</p>
                            <p><strong>Market Cap (USD):</strong> {data.marketCapUsd}</p>
                            <p><strong>Volume (USD 24Hr):</strong> {data.volumeUsd24Hr}</p>
                            <p><strong>Change (24Hr):</strong> {data.changePercent24Hr}%</p>
                            <p><strong>VWAP (24Hr):</strong> {data.vwap24Hr}</p>
                        </div>
                        <div>
                            <a href={data.explorer} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Explore more info</a>
                        </div>
                    </div>
                ) : (
                    
                    <p>Loading...</p>
                    )}
                    {DataHistory?<>
<PriceChart dataHistory={DataHistory}/>
                    </>:<>  <p>Chart Loading...</p></>

                    }
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

export default PopupComponent;
