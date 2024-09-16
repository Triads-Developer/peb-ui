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
import { Select, Option, Input } from '@mui/base';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { GridToolbar } from '@mui/x-data-grid';
import Details from './Details.js';
import * as Constants from './constants.js';

function Controls() {
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [name, setName] = React.useState('');
    const [length, setLength] = React.useState('');
    const [results, setResults] = React.useState([]);
    
    let handleSubmit= function(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let results = Search(name);
        setResults(results);
    }

    //search for:
    //Scientific Name (String to search for)
    //Geographic Range (Native) (dropdown)
    //Geographic Range (Current) (dropdown)
    //Seed length (float)
    return ( <>
        <form onSubmit={handleSubmit}>
        <div className="container">
        <div>
        <Input placeholder="Scientific Name"
            name="name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
            }}
        />
        </div>
        <div>
        <Input placeholder="Seed length…"
            endAdornment="mm"
            name="length"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLength(event.target.value);
            }}
        />
        </div>
        <div>
        <Select placeholder="Native Geographic Region" name="native-region">
          {Constants.regionOptions.map((item) => (
                  <Option key={item} value={item} label={item}>
                    {item}
                  </Option>
                ))}
        </Select>
        </div>
        <div>
        <Select placeholder="Current Geographic Region" name="current-region">
          {Constants.regionOptions.map((item) => (
                  <Option key={item} value={item} label={item}>
                    {item}
                  </Option>
                ))}
        </Select>
        </div>
        <div>
        <Select placeholder="Select Shape" name="shape">
          {Constants.shapeOptions.map((item) => (
                  <Option key={item} value={item} label={item}>
                       {item}
                    <img
                      loading="lazy"
                      width={50}
                      height={50}
                      srcSet={`images/dropdown/${item}`}
                      src={`images/dropdown/${item}`}
                      alt={`Image of ${item}`}
                    />
                  </Option>
                ))}
        </Select>
        </div>
        <div>
        <Select placeholder="Select Texture" name="texture">
          {Constants.textureOptions.map((item) => (
                  <Option key={item} value={item} label={item}>
                    {item}
                    <img
                      loading="lazy"
                      width={20}
                      height={14}
                      srcSet={`images/dropdown/${item}`}
                      src={`images/dropdown/${item}`}
                      alt={`Image of ${item}`}
                    />
                  </Option>
                ))}
        </Select>
        </div>
        < Button variant = "contained"
            sx = {
                { 'backgroundColor': '#f50057' }
            }
            type="submit" >
            Search
        </Button> 
        </div>
        </form>

        { results.length > 0 ?
        <>
            <DataGridPro
          rows={results}
          columns={Constants.columns}
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
