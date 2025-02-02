import React from 'react';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css'; // Ensure DevExtreme styles are imported

const GridTest = () => {
    const dummyData = [
        { id: 1, name: 'Product A', price: '100' },
        { id: 2, name: 'Product B', price: '200' },
        { id: 3, name: 'Product C', price: '300' },
    ];

    return (
        <div className="p-4">
            <h2>Product Grid</h2>
            <DataGrid dataSource={dummyData} keyExpr="id">
                <Column dataField="id" caption="ID" />
                <Column dataField="name" caption="Product Name" />
                <Column dataField="price" caption="Price" />
            </DataGrid>
        </div>
    );
};

export default GridTest;
