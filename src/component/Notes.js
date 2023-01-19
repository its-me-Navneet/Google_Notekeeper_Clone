function Notes(props) {
  return (
    <div className="box">
       <h1>{props.title}</h1>
       <p>{props.description}</p>
       <button 

        onClick={() => { 
          props.deleteNote(props.id);
        }}
      >
        {" "}
        Delete{" "}
      </button>
    </div>
  );
}

export default Notes;
