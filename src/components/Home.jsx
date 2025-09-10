import React, { useEffect, useState } from 'react'
import './home.css'

function Home() {

    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([])

    //handle todo sumbmission 
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('input',input);
        const todo = input.trim()
        if(todo) {
          setTodos(prev=>[...prev,todo])
          setInput('')
        }
        
    }

    // useEffect(()=>{
    //   console.log('todo',todos);
      
    // },[todos])

  return (
    <div className='container text-primary d-flex justify-content-center align-items-center vh-100 w-100'>
     <div className='bg-success text-white rounded-3 p-5 w-50 text-center d-flex flex-column align-items-center'>
     <h1 className='display-3 border-bottom-1 border-dark mb-4'>To Do App</h1>
      <div className='border-1 border-black w-100'>
            <form action="" className=''>
              <div className="d-flex gap-3 w-100 mb-5">
                <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" className='w-100 rounded-3 p-1 fs-4' 
                placeholder='type here...'/>
              <button className='btn btn-primary ' onClick={handleSubmit}>Submit</button>
              </div>
            </form>
            <div className=' mt-3'>
              <ul className='list-unstyled d-flex flex-column gap-3'>
                {
                  todos.map((todo,index)=>(
                  <li key={index} className='bg-dark p-3 rounded-2 col-12'>
                    {todo}
                  </li>)
                  )
                }
              </ul>
          </div>
      </div>
     </div>
    </div>
  )
}

export default Home
