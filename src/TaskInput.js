import { useRef } from 'react';
//import uuid from 'react-uuid'
import axios from 'axios';

function TaskInput({setTasks}) {
  const taskItem = useRef()
  const addTask = () => {
    const item = taskItem.current.value
    if (item === '') {return}

    const data = new FormData()
    data.append("text",item)
    axios
    .post('http://127.0.0.1:8000/tasks-list/', data)
    .then((response) => {
      console.log('post',response.data.data)
      setTasks(
        prevTasks => {
          return [...prevTasks, 
            {
              "id": response.data.data.id, 
              "name": response.data.data.text, 
              "is_completed": response.data.data.is_completed
            }
          ]
        }
      )
      
    })
    taskItem.current.value = null
  }

  return (
    <div>
      <input className="task_input" type="text" placeholder="write something.."
        ref={taskItem}/> &nbsp;&nbsp;
      <input className="task_add btn btn-info" type="button" value="+" onClick={addTask} />
    </div>
  )
}
export default TaskInput