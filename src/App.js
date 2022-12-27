import { Grid } from '@mui/material';
import { Graphviz } from 'graphviz-react';
import { useState, useRef } from 'react';

function App() {
  const [dot, setDot] = useState('graph{}');
  const [inputs, setInputs] = useState({});
  const form = useRef(null)

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("http://127.0.0.1:8000/discover-model", {
      method: 'POST',
      body: new FormData(form.current)
    });

    let result = await response.json();
    let data = await result;
    setDot(data.graph)
  }

  return (
    <Grid container sx={{p:3}}>
      <Grid item xs={12} sm={4}>
        <h3>
          Menu
        </h3>
        <form ref={form} onSubmit={handleSubmit}>
          <label style={{display: 'block'}}>
            File:
            <input type="file" name="file" onChange={handleChange}/>
          </label>
          <label style={{display: 'block'}}>
            Id column name:
            <input type="text" name="id" onChange={handleChange}/>
          </label>
          <label>
            Activity column name:
            <input type="text" name="activity" onChange={handleChange}/>
          </label>
          <label style={{display: 'block'}}>
            Timestamp column name:
            <input type="text" name="timestamp" onChange={handleChange}/>
          </label>
          <label style={{display: 'block'}}>
            Mining algorithm:
            <select name="algorithm" onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="pm4py">PM4PY</option>
              <option value="own">Own algorithm</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Grid>    
      <Grid item xs={12} sm={8}>
        <Graphviz dot={dot}/>
      </Grid>    
    </Grid>
  );
}

export default App;
