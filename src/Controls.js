import React from 'react';
import { Link } from "react-router-dom";
import Search from './search.js';
import data from './data/collection.json';
import {
    FormGroup,
    FormControlLabel,
    Switch,
    Button,
    TextField,
} from '@mui/material';
import { Select, Option } from '@mui/base';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { GridToolbar } from '@mui/x-data-grid';
import Details from './Details.js';

function Controls() {
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [name, setName] = React.useState('');
    const [results, setResults] = React.useState([]);
    const shapeOptions = [
        "ellipsoidal",
        "fusiform",
        "globose",
        "ovoid",
    ];
    const columns = [
        {field: 'GDCC_ID', headerName: 'Accession Number', width: 10},
        {field: 'Family', headerName: 'Family', width: 125},
        {field: 'Genus', headerName: 'Genus', width: 125},
        {field: 'Species', headerName: 'Species', width: 125},
        {field: 'Botanical Author', headerName: 'Botanical Author', width: 125},
        {field: 'Common Name', headerName: 'Common Name',width: 125},
        {field: 'image', headerName: 'Image', width: 200, renderCell: (params) => <img src={"images/icons/" + params.row.GDCC_ID} />},
        {field: 'Details', headerName: 'Details', width: 200, renderCell: (params) => <Link to={"/details/" + params.row.GDCC_ID}> Details {params.row.ID} </Link>},
    ];

    let handleButtonPress = function() {
        let results = Search(name);
        setResults(results);
    }

    return ( <>
        <div>
        <TextField
          id="outlined-controlled"
          label="String to search for"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
        />

        <Select placeholder="Select shape">
          {shapeOptions.map((item) => (
                  <Option key={item} value={item} label={item}>
                    <img
                      loading="lazy"
                      width={20}
                      height={14}
                      srcSet={`images/dropdown/${item}`}
                      src={`images/dropdown/${item}`}
                      alt={`Image of ${item}`}
                    />
                    {item}
                  </Option>
                ))}
        </Select>

        < Button variant = "contained"
            sx = {
                { 'backgroundColor': '#f50057' }
            }
            onClick = { handleButtonPress }
        >
            Search
        </Button> 
        </div>
        { results.length > 0 ?
        <>
            <DataGridPro
          rows={results}
          columns={columns}
          initialState={{
                  pagination: {
                            paginationModel: { page: 0, pageSize: 20 },
                              },
                    }}
          pageSizeOptions={[5, 10, 20]}
          disableColumnFilter
          headerFilters
          slots={{
            toolbar: GridToolbar
          }}
        />
            <Link to="/">Back to Home </Link>
            </>: 
            null }
    </>);
};

    export default Controls;
