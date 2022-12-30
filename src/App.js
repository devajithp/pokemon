
import React,{ useEffect,useState } from 'react';
import './App.css';
import axios from "axios"

function App() {
const [data,setData]=useState()
const [allData,setAllData]=useState({})
  useEffect(()=>
  {
     axios.get("https://pokeapi.co/api/v2/pokemon").then((res)=>
     {
      console.log(res.data)
      setAllData(res.data)
      setData([...res.data.results])
     })
  },[])
  const handlePrevious=()=>
  {
     if(allData.previous)
     {
      axios.get(`${allData.previous}`).then((res)=>
      {
        setAllData(res.data)
        console.log(res.data)
        setData([...res.data.results])
      })
     }
    
  }
  const handleNext=()=>
  {
    
    if(allData.next)
    {
     axios.get(`${allData.next}`).then((res)=>
     {
      setAllData(res.data)
       console.log(res.data)
       setData([...res.data.results])
     })
    }
  }
  return (
    <div className="App container">
      <h1>Pokemon</h1>
     <header>
      <div className='row'>
        <div className='col-md-6'>
        <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
        </div>
      </div>
      </header>
      <section style={{marginTop:"20px"}}>
        <div className='row'>
       { data && data.map((datum,index)=>
       {
        return(
          <div className='col-md-3' style={{marginTop:"10px"}}>
            <div className="card" style={{width: "18rem"}}>
            <img style={{height:"200px"}} src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${datum.url.slice(-3).split("/").join("")}.svg`} className="card-img-top" alt="..."></img>
            <div className="card-body">
             <h5 className="card-title">{datum.name}</h5>
             
             <h6>Id: {datum.url.slice(-3).split("/").join("")}</h6>
             <h6>hello</h6>
             
            </div>
             </div>
          </div>
        )
       })

       }
       </div>
      </section>
      <footer style={{marginTop:"20px"}}>
        <div className='container'>
           <div className='row'>
             <div className='col-md-6'>
             <button onClick={handlePrevious} className='btn btn-info'>Previous</button>
             </div>
             <div className='col-md-6' style={{paddingLeft:"550px"}}>
                <button onClick={handleNext} className='btn btn-info'>Next</button>
             </div>
           </div>
        </div>
      </footer>
      
     
    </div>
  );
}

export default App;
