import { Graphviz } from 'graphviz-react';
import { useState, useEffect } from 'react';

function App() {
  const [dot, setDot] = useState('graph{a--b}');

  useEffect(() => {
    fetch("http://127.0.0.1:8000/discover-model")
    .then(response => response.json())
    .then(data => {
      setDot(data.graph)
    })
  },[]);

  return (
    <Graphviz dot={dot}/>
  );
}

export default App;
