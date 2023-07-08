import React from 'react'
import CheckTask from './CheckTask';
import axios from 'axios';
import { useEffect } from 'react';


function TaskList({tasks, setTasks}) {
    const taskDelete = (did) => {
      axios
      .delete('http://127.0.0.1:8000/delete-task/'+did)
      .then((response) => {
        console.log('del',response.data)
        if (response.data.deleted == 'True'){
          const delTask = tasks.filter((dTask) => dTask.id !== did);
          setTasks(delTask);
        }
      })
      //tasks.map((t) => t.id !== did)
    }
     
    useEffect( () => {
      TaskGet()
    },[])
    
    function TaskGet(){ 
      const abortConst = new AbortController();

      axios
      .get('http://127.0.0.1:8000/tasks-list/', {signal: abortConst.signal})
      .then((response) => {
        response.data.map( (task) => {
          const verifyTask = tasks.find((vTask) => vTask.id === task.id);
          console.log('vt-',verifyTask)
          if (!verifyTask){
            setTasks(
              prevTasks => {
                return [...prevTasks, {"id": task.id, "name": task.task, "is_completed": task.is_completed }]
              }
            )
          }
        })                   
      })

      return () => abortConst.abort()
    }
    
    return(
      tasks.map(
        (task) => {
          return(
            <div className="d-flex" key={task.id}>
                <input className="task_delete btn btn-danger ml-2 mb-2" type="button" value="-" 
                    onClick={() => taskDelete(task.id)}/>
                    
                <CheckTask task={task} tasks={tasks} setTasks={setTasks} />
                <h4 className="task_item"> {task.name}</h4>
            </div>
          )
      })
    )

}

export default TaskList;