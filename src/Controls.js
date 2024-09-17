import React from 'react';
import { Link } from "react-router-dom";
import Search from './search.js';
import data from './data/collection.json';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {
    FormGroup,
    FormControlLabel,
    Switch,
    Button,
    TextField,
} from '@mui/material';
import { Option, Input } from '@mui/base';
import Select from '@mui/material/Select';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { GridToolbar } from '@mui/x-data-grid';
import Details from './Details.js';
import * as Constants from './constants.js';

function Controls() {
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [name, setName] = React.useState('');
    const [length, setLength] = React.useState('');
    const [results, setResults] = React.useState([]);
    const [nativeRegion, setNativeRegion] = React.useState([]);
    const [currentRegion, setCurrentRegion] = React.useState([]);
    const [shape, setShape] = React.useState([]);
    const [texture, setTexture] = React.useState([]);

    let handleSubmit= function(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let results = Search(name);
        setResults(results);
    }

    const handleShapeChange = (event) => {
        if (event) {
            setShape(event.target.value);
        }
    }

    const handleTextureChange = (event) => {
        if (event) {
            setTexture(event.target.value);
        }
    }

    const handleCurrentRegionChange = (event) => {
        if (event) {
            setCurrentRegion(event.target.value);
        }
    }

    const handleNativeRegionChange = (event) => {
        if (event) {
            setNativeRegion(event.target.value);
        }
    }
    //search for:
    //Scientific Name (String to search for)
    //Geographic Range (Native) (dropdown)
    //Geographic Range (Current) (dropdown)
    //Seed length (float)
    return ( <div className="container">
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
            <Box sx={{ minWidth: 120, marginBottom: '10px'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Native Geographic Region</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    placeholder="Native Geographic Region"
                    value={nativeRegion}
                    label="Native Geographic Region"
                    onChange={handleNativeRegionChange} >
                        {Constants.regionOptions.map((item) => (
                            <MenuItem 
                            value={item}
                            key={item}>
                            {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
        <div>
            <Box sx={{ minWidth: 120, marginBottom: '10px'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Current Geographic Region</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    placeholder="Native Geographic Region"
                    value={currentRegion}
                    label="Native Geographic Region"
                    onChange={handleCurrentRegionChange} >
                        {Constants.regionOptions.map((item) => (
                            <MenuItem 
                            value={item}
                            key={item}>
                            {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
        <div>

        <Box sx={{ minWidth: 120, marginBottom: '10px'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Shape</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    placeholder="Seed Shape"
                    value={shape}
                    label="Seed Shape"
                    onChange={handleShapeChange} >
                        {Constants.shapeOptions.map((item) => (
                            <MenuItem 
                            value={item}
                            key={item}>
                            {item}

                            <img
                                loading="lazy"
                                width={50}
                                height={50}
                                srcSet={`images/dropdown/${item}`}
                                src={`images/dropdown/${item}`}
                                alt={`Image of ${item}`}
                            />
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
        <div>

        <Box sx={{ minWidth: 120, marginBottom: '10px'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Texture</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    multiple
                    placeholder="Seed Texture"
                    value={texture}
                    label="Seed Texture"
                    onChange={handleTextureChange} >
                        {Constants.textureOptions.map((item) => (
                            <MenuItem 
                            value={item}
                            key={item}>
                            {item}

                            <img
                                loading="lazy"
                                width={50}
                                height={50}
                                srcSet={`images/dropdown/${item}`}
                                src={`images/dropdown/${item}`}
                                alt={`Image of ${item}`}
                            />
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
        < Button variant = "contained"
            sx = {
                { 
                   'backgroundColor': '#f50057',
                   'width' : '50px',
                   'height' : '50px'
                }
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
    </div>);
};

    export default Controls;
