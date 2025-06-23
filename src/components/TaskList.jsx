import { Cross2Icon } from "@radix-ui/react-icons";
import EmptyList from "./EmptyList";

export default function TaskList({ tasks, onRemoveTask, onToggleTask }) {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? <EmptyList /> : null}
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onRemoveTask={() => {
              onRemoveTask(task.id);
            }}
            onToggleTask={onToggleTask}
          />
        );
      })}
    </ul>
  );
}

function Task({ task, onRemoveTask, onToggleTask }) {
  return (
    <li className="task-item">
      <label>
        <input
          className="checkbox"
          onChange={() => onToggleTask(task.id)}
          type="checkbox"
          checked={task.checked}
        />
        {task.name}
      </label>
      <section>
        <button onClick={onRemoveTask}>
          <Cross2Icon />
        </button>
      </section>
    </li>
  );
}
