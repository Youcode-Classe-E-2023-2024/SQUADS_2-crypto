import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useApiAxios from '../config/axios';
import DetailExchange from '../components/DetailExchange';

function Exchanges() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowId, setSelectedRowId] = useState(null); // State to hold the ID of the selected row
  const [showOnlySocketTrue, setShowOnlySocketTrue] = useState(false); // State to track whether to show only rows with socket true

  useEffect(() => {
      fetchAssetes();
  }, []);

  const fetchAssetes = () => {
      useApiAxios.get('/exchanges')
          .then(response => {
              setData(response.data.data);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  };

  const handleRowClick = (row) => {
    setSelectedRowId(row.exchangeId); // Set the ID of the clicked row
  };

  const handleClosePopup = () => {
    setSelectedRowId(null); // Close the popup by resetting the selectedRowId state
  };

  const filteredData =  data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!showOnlySocketTrue || item.socket) // Apply filter only if showOnlySocketTrue is true
    );


    const columns = [
      {
        name: 'Exchange Id',
        selector: row => row.exchangeId,
        sortable: true,
      },
      {
        name: 'Rank',
        selector: row => row.rank,
        sortable: true,
      },
      {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
      },
      {
        name: 'Percent Total Volume',
        selector: row => row.percentTotalVolume,
        sortable: true,
      },
      {
        name: 'Volume USD',
        selector: row => row.volumeUsd,
        sortable: true,
      },
      {
        name: 'Trading Pairs',
        selector: row => row.tradingPairs,
        sortable: true,
      },
      {
        name: 'Socket',
        selector: row => row.socket,
        sortable: true,
        cell: row => row.socket ? 'Yes' : 'No',
      },
      {
        name: 'Exchange URL',
        selector: row => row.exchangeUrl,
        sortable: true,
        cell: row => <a href={row.exchangeUrl} target="_blank" rel="noopener noreferrer">Visit</a>,
      },
      {
        name: 'Updated',
        selector: row => new Date(row.updated).toLocaleString(),
        sortable: true,
      },
    ];
    


    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
          <div className='flex justify-between py-1'>
              <h2 className="text-2xl mb-4">Exchange</h2>
              <button onClick={() => setShowOnlySocketTrue(!showOnlySocketTrue)}>
                  {showOnlySocketTrue ? "Show All" : "Show Socket Only"}
              </button>
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
              onRowClicked={handleRowClick} // Attach click event handler
          />

          {selectedRowId && <DetailExchange id={selectedRowId} onClose={handleClosePopup} />} {/* Render PopupComponent if row ID is set */}
      </div>
  );
}

export default Exchanges;