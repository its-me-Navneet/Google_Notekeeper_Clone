import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./component/Input";
import Notes from "./component/Notes"; 
import { useNavigate } from "react-router-dom"; 

const host = "http://localhost:5000";
const list = [];

function App() {
  const [email,setEmail]=useState("");
  const [List, setList] = useState(list);
  const [click, setclick] = useState(false); 

  useEffect(()=>{
    setEmail(localStorage.getItem("email"));
  },[]) 
  
  async function Add(title, description) {
    const note = {
      _id: "",
      title: title,
      description: description,
      email: email,
    };

    setList((p) => {
      return [...p, note];
    });

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, email }),
    });
    const json = await response.json(); 
  }

  //.............................. Delete the note.......................
  async function deleteNote(ind) {
    const response = await fetch(`${host}/api/notes/deletenote/${ind}`,{
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();

    let newList = List.filter((x, index) => {
      return ind !== x._id;
    });

    setList(newList);
  }
  function handlechange() {
    setclick(true);
  }

  //...................Fetch all Note....................................
  async function Display() {
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }, 
      body: JSON.stringify({email }),
    });
    const json = await response.json();
    //  console.log(json) ;
    setList(json);
  }

  useEffect(() => {
    if(email.length>0){
      Display();
    }
  }, [email]);  
  
  let navigate = useNavigate(); 
  useEffect(() => {
      if(localStorage.getItem("email")==null){
        navigate("/login");
      } 
  }, [])
  

  return (
    <div className="Con">
     
      <div className="con">
        {!click && (
          <input
            className="inputnotes Ask"
            type="text"
            placeholder="Take a Note"
            onClick={handlechange}
          />
        )}
        {click && <Input add={Add}></Input>}
      </div>

      {List.map((x, index) => {
        return (
          <Notes
            title={x.title}
            key={x._id}
            id={x._id}
            description={x.description}
            deleteNote={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default App;
