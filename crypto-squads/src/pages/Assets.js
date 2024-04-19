import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useApiAxios from '../config/axios';
import PopupComponent from '../components/PopupComponent';

function Assets() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowId, setSelectedRowId] = useState(null); // State to hold the ID of the selected row

  useEffect(() => {
      fetchAssetes();
  }, []);

  const fetchAssetes = () => {
      useApiAxios.get('/assets')
          .then(response => {
              setData(response.data.data);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  };

  const handleRowClick = (row) => {
    setSelectedRowId(row.id); // Set the ID of the clicked row
  };

  const handleClosePopup = () => {
    setSelectedRowId(null); // Close the popup by resetting the selectedRowId state
  };
  const filteredData =  data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Rank',
        selector: row => row.rank,
        sortable: true,
    },
    {
        name: 'Symbol',
        selector: row => row.symbol,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Price USD',
        selector: row => row.priceUsd,
        sortable: true,
    },
  ];

  return (
      <div className="max-w-4xl mx-auto px-4 py-8">
          <div className='flex justify-between py-1'>
              <h2 className="text-2xl mb-4">Assets</h2>
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

          {selectedRowId && <PopupComponent id={selectedRowId} onClose={handleClosePopup} />} {/* Render PopupComponent if row ID is set */}
      </div>
  );
}

export default Assets;
