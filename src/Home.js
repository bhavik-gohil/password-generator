import TaskList from './TaskList';
import TaskInput from './TaskInput';

function Home({ tasks, setTasks}) {
    return (
        <div>
            <h1>ADD TASK</h1>
            <hr/>
            <TaskInput setTasks={setTasks} />
            <hr/>
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    )
}

export default Home
