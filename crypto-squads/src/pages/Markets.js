import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useApiAxios from '../config/axios';

function Markets() {
  
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMarkets();
    }, []);

    const fetchMarkets = () => {
        useApiAxios.get('/markets')
            .then(response => {
                setData(response.data.data);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.exchangeId,
            sortable: true,
        },
        {
            name: 'Rank',
            selector: row => row.rank,
            sortable: true,
        },
        {
            name: 'Base Symbol',
            selector: row => row.baseSymbol,
            sortable: true,
        },
        {
            name: 'Base ID',
            selector: row => row.baseId,
            sortable: true,
        },
        {
            name: 'Quote Symbol',
            selector: row => row.quoteSymbol,
            sortable: true,
        },
        {
            name: 'Quote Id',
            selector: row => row.quoteId,
            sortable: true,
        },
        {
            name: 'Price Quote',
            selector: row => row.priceQuote,
            sortable: true,
        },
        {
            name: 'Price Usd',
            selector: row => row.priceUsd,
            sortable: true,
        },
        {
            name: 'volume Usd 24Hr ',
            selector: row => row.volumeUsd24Hr,
            sortable: true,
        },
        {
            name: 'Percent Exchange Volume',
            selector: row => row.percentExchangeVolume,
            sortable: true,
        },
        {
            name: 'trades Count 24Hr',
            selector: row => row.tradesCount24Hr,
            sortable: true,
        }, 
        {
            name: 'Updated',
            selector: row => new Date(row.updated).toLocaleString(),
            sortable: true,
        },
    ];

    const filteredData =  data.filter((item) =>
        item.baseSymbol.toLowerCase().includes(searchTerm.toLowerCase())
    ) 

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className='flex justify-between py-1'>
                <h2 className="text-2xl mb-4">Markets</h2>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
            />
        </div>
    );
}

export default Markets;
