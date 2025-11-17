import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import { FaEdit } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

function Home() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0)
  const inputRef = useRef("null");

  //handle todo submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = input.trim();
    if (todo) {
      setTodos([...todos, {list:todo,id:Date.now(),status:false}]);
      setInput("");
    }
    if (editId) {
      const updatedTodos = todos.map(item=>{
        if(editId === item.id) {
          return {...item, list:input}
        }
        return item
      }) 
      setTodos(updatedTodos)
      setEditId(0)
      setInput('')
    }
  };
  //delete function for deleting specific todo
  const todoDelete = (id) => {
    const filteredData = todos.filter(todo=>!(todo.id==id))
    setTodos(filteredData)
  };

  //Edit a selected todo using id to identify and update with new data
  const todoEdit = (id)=>{
      const editTodo = todos.find(todo=>id===todo.id)
      setInput(editTodo.list)
      setEditId(id)
  }

  //Mark completed todo list with specific strike-through style
  const todoDone = (id)=>{
    const completed = todos.map(todo=>{
      if(id===todo.id){
        return({...todo, status:!todo.status})
      }
      return todo
    })
    setTodos(completed)
  }


  useEffect(() => {
    inputRef.current.focus();
  }, [input]);

  return (
    <div className="container text-primary d-flex justify-content-center align-items-center vh-100 w-100">
      <div className="bg-success text-white rounded-3 p-5 w-50 text-center d-flex flex-column align-items-center">
        <h1 className="display-3 border-bottom-1 border-dark mb-4">
          To Do App
        </h1>
        <div className="border-1 border-black w-100">
          <form action="">
            <div className="d-flex gap-3 w-100 mb-5">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="w-100 rounded-3 p-2 fs-4"
                placeholder="type here..."
              />
              <button className="btn px-4 btn-primary btn-lg " onClick={handleSubmit}>
                {editId?'Edit':'Add'}
              </button>
            </div>
          </form>
          <div className=" mt-3">
            <ul className="list-unstyled d-flex flex-column gap-3">
              {todos.map((todo, index) => (
                <li
                  key={index}
                  className="bg-dark py-3 px-1 rounded-2  d-flex align-items-center text-break"
                >
                  <div className="col-10 me-2" id={todo.status?"todo-list":''}>{todo.list}</div>
                  <span className="fs-5">
                    <IoMdDoneAll
                    onClick={()=>todoDone(todo.id)}
                      className={`ms-auto cursor-pointer ${todo.status?'text-success':''}`}
                      title="Completed"
                    />
                    <FaEdit
                    onClick={()=>todoEdit(todo.id)}
                      className="mx-2 text-primary cursor-pointer"
                      title="Edit"
                    />
                    <MdDeleteForever
                      onClick={()=>todoDelete(todo.id)}
                      className="text-warning cursor-pointer"
                      title="Delete"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
