
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
 

  const [text,setText]=useState("")
  const [data,setData]=useState([])


  console.log(text);
  


  const getNotes = async(e)=>{
   e.preventDefault();

    const res = await fetch("http://localhost:3000/notes",{
      method:"GET",
    })

     console.log(res);

     const data= await res.json();

     setData(data)
     
  }


  useEffect(()=>{
    getNotes();
  },[])

  const addNotes = async(e)=>{
   e.preventDefault();

    const res = await fetch("http://localhost:5000/notes",{
      method:"POST",
      headers:{
        "Content-Type":"application.json"
      },
      body:JSON.stringify({text})
    })

     console.log(res);

     const data= await res.json();
     if(res.ok){
      alert(data.message)
     }
     
  }


  return (
    <>
     <div>
      <form action="" className='flex items-center justify-center mt-12 gap-3' onSubmit={addNotes}>

        <input type="text"  className='py-2 px-2' onChange={e=>setText(e.target.value)}/>
        <button className='bg-blue-500 text-white px-2 py-2 ' >Add</button>
      </form>

      <div>
        
      </div>
     </div>
    </>
  )
}

export default App
