import { useEffect, useState } from "react";
import Container from "./Container";
import Header from "./Header";
import TaskList from "./TaskList";
import Footer from "./Footer";
import { Pencil2Icon } from "@radix-ui/react-icons";

function App() {
  //States
  const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(localStorageTasks);
  const [text, setText] = useState("");
  // event handlers
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!text) {
      alert("Task can't be empty");
      return;
    }

    handleAddTask(text);
    setText("");
  };
  const handleAddTask = (text) => {
    const newTask = { id: new Date().getTime(), name: text, checked: false };
    setTasks([...tasks, newTask]);
  };
  const handleToggleTask = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setTasks(newTasks);
  };
  const handleRemoveTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  };

  const handleRemoveAllTasks = () => setTasks([]);

  const handleCheckAllTasks = () => {
    const newTasks = tasks.map((task) => {
      return { ...task, checked: true };
    });
    setTasks(newTasks);
  };

  const handleUncheckAllTasks = () => {
    const newTasks = tasks.map((task) => {
      return { ...task, checked: false };
    });
    setTasks(newTasks);
  };
  //Counter var
  const numberOfTasks = tasks.length;
  const tasksDone = tasks.filter((task) => task.checked).length;

  //Local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <>
      <Header>
        <img
          className="background-image"
          src="../background-image.jpeg"
          alt=""
        />
        <p className="task-counter">
          <b>{tasksDone}</b> / {numberOfTasks} of tasks completed!
        </p>
        <section className="btn-group">
          <button onClick={handleCheckAllTasks}>Mark All as Done</button>
          <button onClick={handleUncheckAllTasks}>Mark All as Undone</button>
        </section>
      </Header>
      <Container>
        <TaskList
          tasks={tasks}
          onRemoveTask={handleRemoveTask}
          onToggleTask={handleToggleTask}
        />
      </Container>
      <Footer>
        <form onSubmit={handleSubmit}>
          <input
            className="text-area"
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            placeholder="Add your Task"
          />
          <button className="add-task-btn">
            Add Task <Pencil2Icon />
          </button>
        </form>
        <button className="remove-task-btn" onClick={handleRemoveAllTasks}>
          Remove All Tasks
        </button>
      </Footer>
    </>
  );
}

export default App;
