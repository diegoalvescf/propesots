import { useState } from 'react'

import '../styles/tasklist.scss'
import { Task } from '../common/interfaces/task.interface';
import TaskItem from './TaskItem';

import { FiCheckSquare } from 'react-icons/fi'

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [carga, setCarga] = useState('');
  const [pct, setPct] = useState('');

  // ((Number(newCarga)*(Number(newTaskTitle)/100))-20)/2 

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!carga) return; // para nao gerar uma nova tarefa (task) se estiver vazi

    const newTask: Task = {
      id: Math.random(),
      carga: Number(carga),
      pct: Number(pct),
      //pct: (((Number(newCarga) * (Number(newTaskTitle) / 100)) - 20) / 2),
      isComplete: false,
      // title: newTaskTitle,
    }

    setTasks(oldState => [...oldState, newTask]); // irá receber os dados novos e adicionar ao array, 
    setPct(''); //para limpar o campo após a inserção 
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter(task => task.id !== id)

    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Digite o PR desejado:</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Carga total"
            onChange={(e) => setCarga(e.target.value)}
            value={carga}
          />

          <div className="input-group">
            <input
              type="number"
              placeholder="%"
              onChange={(e) => setPct(e.target.value)}
              value={pct}
            />
          </div>
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => <TaskItem key={task.id} item={task} handleToggleTaskCompletion={handleToggleTaskCompletion} handleRemoveTask={handleRemoveTask} />)}
        </ul>
      </main>
    </section>
  )
}