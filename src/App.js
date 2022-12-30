
import React,{ useEffect,useState } from 'react';
import './App.css';
import axios from "axios"

function App() {
const [data,setData]=useState()
const [allData,setAllData]=useState({})
const[eachData,setEachData]=useState()
  useEffect(()=>
  {
     axios.get("https://pokeapi.co/api/v2/pokemon").then((res)=>
     {
      
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
       
       setData([...res.data.results])
     })
    }
  }
  const handleDetails=(id)=>
  {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res)=>
      {
        console.log(res.data)
        setEachData({...res.data})
      })
  }
  const handleReset=()=>
  {
    setEachData("")
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
            <div onClick={()=>handleDetails(datum.url.substring(34).replace("/",""))}  className="card" style={{width: "18rem"}}>
            <img style={{height:"200px"}} src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${datum.url.substring(34).replace("/","")}.svg`} className="card-img-top" alt="..."></img>
            <div className="card-body">
             <h5 className="card-title">{datum.name}</h5>
             
             <h6>Id: {datum.url.substring(34).replace("/","")}</h6>
             <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-outline-success'>Click to open</button>
             
            </div>
             </div>
             {/* modal */}
             <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
       {eachData && <h1 className="modal-title fs-5" id="exampleModalLabel">{eachData.name}</h1>} 
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
     {eachData && <img style={{height:"400px", width:"400px"}} src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${eachData.id}.svg`}  alt="..."></img> } 
        <h4 className='text-primary'>Stats</h4>
        {eachData && <div><h6> Height: {eachData.height}</h6>
       <h6> Weight: {eachData.weight}</h6>
       <h6>Base_experience: {eachData.base_experience}</h6>
       <h6> Species: {eachData.species.name}</h6>
       </div>}
       
       
      </div>
      <div class="modal-footer">
       
      </div>
    </div>
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
