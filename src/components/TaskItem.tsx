import React from 'react'
import { Task } from '../common/interfaces/task.interface';

// import { FiTrash } from 'react-icons/fi'
import { FiTrash } from "react-icons/fi";

type Props = {
  item: Task,
  handleToggleTaskCompletion(id: number): void,
  handleRemoveTask(id: number): void
}

export default function TaskItem({ item: task, handleToggleTaskCompletion, handleRemoveTask }: Props) {

  const pesoBarra = task.barra;
  const cargaFinal = task.pct / 100 * task.carga;
  const cargaCadaLado = (cargaFinal - pesoBarra) / 2;


  return (
    <li key={task.id}>
      <div
        className={task.isComplete ? 'completed' : ''}
        data-testid="task" >
        <label className="checkbox-container">
          <input
            type="checkbox"
            readOnly
            checked={task.isComplete}
            onClick={() => handleToggleTaskCompletion(task.id)}
          />
          <span className="checkmark"></span>
        </label>
        {/* <p>{`PR: ${task.carga}kg (${task.pct}%)`}</p>
        <p>{`Total: ${cargaFinal.toFixed(1)}kg`}</p>
        <p>{`Cado lado: ${cargaCadaLado.toFixed(2)}kg`}</p> */}
        <p>({task.pct}%)</p>
        <p>{`Cado lado:${cargaCadaLado.toFixed(2)}kg`}</p>
        <p>{`Barra de: ${pesoBarra}kg`}</p>
      </div>

      <button
        type="button"
        data-testid="remove-task-button"
        onClick={() => handleRemoveTask(task.id)}
      >
        <FiTrash size={16} />
      </button>
    </li>
  )
}
