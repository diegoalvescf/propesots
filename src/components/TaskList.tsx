import { useState } from 'react'

import '../styles/tasklist.scss'
import { Task } from '../common/interfaces/task.interface';
import TaskItem from './TaskItem';

// import { FiCheckSquare } from 'react-icons/fi'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { RadioBox, BarContainer } from './styled';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [carga, setCarga] = useState('');
  const [pct, setPct] = useState('');
  const [barra, setBarra] = useState(20);

  // ((Number(newCarga)*(Number(newTaskTitle)/100))-20)/2 

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!carga) return; // para nao gerar uma nova tarefa (task) se estiver vazi

    const newTask: Task = {
      id: Math.random(),
      carga: Number(carga),
      pct: Number(pct),
      isComplete: false,
      barra: Number(barra),
      //pct: (((Number(newCarga) * (Number(newTaskTitle) / 100)) - 20) / 2),
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
      <h2>Digite seu PR</h2>
      <header>
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
            <GiWeightLiftingUp size={16} color="#fff" />
          </button>
        </div>
      </header>

      <BarContainer>
        <RadioBox
          type="button"
          onClick={() => { setBarra(20) }}
          isActive={barra === 20}
        >
          <span>Barra de 20kg</span>
        </RadioBox>

        <RadioBox
          type="button"
          onClick={() => { setBarra(15) }}
          isActive={barra === 15}
        >
          <span>Barra de 15kg</span>
        </RadioBox>
      </BarContainer>

      <main>
        <ul>
          {tasks.map(task =>
            <TaskItem key={task.id}
              item={task}
              handleToggleTaskCompletion={handleToggleTaskCompletion}
              handleRemoveTask={handleRemoveTask} />)}
        </ul>
      </main>
    </section>
  )
}