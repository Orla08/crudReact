import {isEmpty, size} from 'lodash';
import React, {useEffect, useState} from "react";
import { addDocument, deleteDocument, getCollection, updatetDocument } from './actions';

function App() {
   const [task, setTask] = useState(''); 
   const [tasks, setTasks] = useState([]); 
   const [id, setId] = useState('');
   const [editMode, setEditMode] = useState(false);
   const [error, setError] = useState(null)


  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks")
      if(result.statusResponse){
        setTasks(result.data)
      }
      //console.log(result)
      //Dentro de result se guardan tres variables, el statusResponde, Data, error, en data esta el array de objetos
    })()
  }, [])




   const validForm = ()=> {
    let isValid = true;
    setError(null)

    if (isEmpty(task)){
      setError('Debes ingresar una tarea')
      isValid = false;
    }
      return isValid //Esta funcion devulve falso o verdadero si mandas el task vacio
      //Si devuelve falso es que hay errores
   }


  const addTask = async (e) => {
    e.preventDefault()

    if (!validForm()){ 
      return
    }     

    const result  =  await addDocument("tasks", { name : task }) //Crea en la base de datos
    if (!result.statusResponse){
      setError(result.error)
      return
    }
    setTasks([...tasks , {id : result.data.id, name: task}]) //El array sera igual a la copia del mismo mas el obejto new taks
    setTask('');
  }


  const saveTask = async(e) => {
    e.preventDefault()
    if (!validForm()){ 
      return
    } 
    
    const result = await updatetDocument("tasks", id, {name:task}) //Edita en la base de datos
    if(!result.statusResponse){
      setError(result.error)
      return
    }

    const editTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    //mapeamos el array de taks y preguntamos que si el id es igual al id que se guardo al presionar editar
    //Si es igual entonces el objeto sera id con el nuevo cuerpo, si no devuelve el mismo item
    setTasks(editTasks) //El nuevo array de taks sera igual al array nuevo con la edicion hecha
    setEditMode(false) //ponemos en falso el modoEditar
    setTask('') // y vaciamos las variables
    setId('')
  }


  const eliminar = async(id) => {


    const result = await deleteDocument("tasks", id) //Aqui elimina de la base de datos
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const filterTasks = tasks.filter(task => task.id !==id) //Devuelveme el array de tasks nuevo sin el task que elimine
    setTasks(filterTasks) //Elñ nuevo array de taks es este
  }


  const editar = (objectTask) => {
    setTask(objectTask.name)
    setEditMode(true);
    setId(objectTask.id);
  }

  return (
    <div className="container mt-5">
     <h1>Tareas</h1><hr/>
     <div className="row"> 
      <div className="col-8">
        <h4 className="text-center">Lista de Tareas</h4>
        {
          tasks.length === 0 ? ( //Si es igual a cero el array de taks
            <li className="list-group-item"> No hay taks aun</li> 
          )
          : ( //Si no muestre la lista
            <ul className="list-group">
         { 
          tasks.map((task) => (
            <li className="list-group-item" key={task.id}> 
            {/* Cada Li lleva su id en este caso su id se reprensenta con key=valor */}
              <span className="lead">{task.name}</span>
              <button 
              className="btn btn-danger btn-sm float-right"
              onClick={()=>  eliminar(task.id)} //para llamar a una funcion dentro de este metodo debes hacer un arrow function
              >
                Eliminar
              </button>
              <button 
              className="btn btn-warning btn-sm float-right mx-2"
              onClick={()=> editar(task)} //Para que no ejecute errores
              >
                Editar
              </button>
            </li>
          ))
         }
        </ul>
          )
        }
        


      </div>
      <div className="col-4">
        <h4 className="text-center">{ editMode ?  'Editar tarea'  :  "Agregar Tarea"}</h4>
        <form onSubmit={editMode ? saveTask :addTask}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingrese la tarea.."
            onChange={(value)=>{setTask(value.target.value)}} //Aqui le decimos que lo que escriba el usuario se va a almacenar en el state de task
            value={task}
          />
          {error && <span className="text-danger">{error}</span>}
          <button 
          className={editMode ? "btn btn-warning btn-block" :"btn btn-dark btn-block"}
          type="submit">
          { editMode ?  "Guardar"  :  "Agregar"}
          </button>
        </form>
      </div>
     </div>
    </div>
  );
}

export default App;
