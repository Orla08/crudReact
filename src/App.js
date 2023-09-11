import {isEmpty} from 'lodash';
import React, {useState} from "react";
import shortid from 'shortid';

function App() {
   const [task, setTask] = useState(''); 
   const [tasks, setTasks] = useState([]); 


  const addTask = (e) => {
    e.preventDefault()
    if (isEmpty(task)){
      console.log('Task vacio')
      return
    }
    const newTask = { //Nueva task
      id : shortid.generate(), //Generamos un id AlfaNumerico
      nameTask : task, //Tendra un parametro task que sera al igual que el state task
    }
    setTasks([...tasks , newTask]) //El array sera igual a la copia del mismo mas el obejto new taks
    setTask('');
  }


  return (
    <div className="container mt-5">
     <h1>Tareas</h1><hr/>
     <div className="row"> 
      <div className="col-8">
        <h4 className="text-center">Lista de Tareas</h4>
        <ul className="list-group">
         { 

          tasks.map((task) => (
            <li className="list-group-item" key={task.id}> 
            {/* Cada Li lleva su id en este caso su id se reprensenta con key=valor */}
              <span className="lead">{task.nameTask}</span>
              <button className="btn btn-danger btn-sm float-right">Eliminar</button>
              <button className="btn btn-warning btn-sm float-right mx-2">Editar</button>
            </li>
          ))
          
         }
        </ul>
      </div>
      <div className="col-4">
        <h4 className="text-center">Formulario</h4>
        <form onSubmit={addTask}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingrese la tarea.."
            onChange={(value)=>{setTask(value.target.value)}} //Aqui le decimos que lo que escriba el usuario se va a almacenar en el state de task
            value={task}
          />
          <button 
          className="btn btn-dark btn-block"
          type="submit">
          Agregar
          </button>
        </form>
      </div>
     </div>
    </div>
  );
}

export default App;
