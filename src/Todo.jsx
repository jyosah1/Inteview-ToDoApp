import React, { useState } from "react";
import { Button, Input, List } from "antd";

function ToDo() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function addTask() {
    if (newTask.trim() !== "") {
      // Ensure new task is added as an object
      setTask((task) => [...task, { title: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTask = task.filter((_, i) => i !== index);
    setTask(updatedTask);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index - 1]] = [
        updatedTask[index - 1],
        updatedTask[index],
      ];
      setTask(updatedTask);
    }
  }

  function moveTaskDown(index) {
    if (index < task.length - 1) {
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index + 1]] = [
        updatedTask[index + 1],
        updatedTask[index],
      ];
      setTask(updatedTask);
    }
  }

  function completeTask(index) {
    const updatedTask = [...task];
    updatedTask[index] = {
      ...updatedTask[index],
      completed: !updatedTask[index].completed, // Toggle completed status
    };
    setTask(updatedTask);
  }

  return (
    <>
      <div className="container">
        <h1>TODO LIST</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex">
            <Input
              placeholder="Add task..."
              value={newTask}
              type="text"
              onChange={handleInputChange}
            />
            <Button
              type="primary"
              onClick={addTask}
              style={{ marginLeft: "5px" }}
            >
              ADD
            </Button>
          </div>
        </form>

        <div>
          <List
            itemLayout="horizontal"
            dataSource={task}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <a
                    key="list-loadmore-compelete"
                    onClick={() => completeTask(index)}
                  >
                    {item.completed ? "undo" : "complete"}
                  </a>,
                  <a key="list-loadmore-more" onClick={() => moveTaskUp(index)}>
                    up
                  </a>,
                  <a
                    key="list-loadmore-more"
                    onClick={() => moveTaskDown(index)}
                  >
                    down
                  </a>,
                  <a key="list-loadmore-edit" onClick={() => deleteTask(index)}>
                    delete
                  </a>,
                ]}
              >
                <p
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </p>
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* <ol>
        {task.map((taskItem, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: taskItem.completed ? "line-through" : "none",
              }}
            >
              {taskItem.text}
            </span>
            <Button
              type="primary"
              onClick={() => deleteTask(index)}
              style={{ marginLeft: "5px", marginTop: "5px" }}
            >
              ❌
            </Button>
            <Button
              type="primary"
              onClick={() => moveTaskUp(index)}
              style={{ marginLeft: "5px", marginTop: "5px" }}
            >
              ⬆️
            </Button>
            <Button
              type="primary"
              onClick={() => moveTaskDown(index)}
              style={{ marginLeft: "5px", marginTop: "5px" }}
            >
              ⬇️
            </Button>
            <Button
              type="primary"
              onClick={() => completeTask(index)}
              style={{ marginLeft: "5px", marginTop: "5px" }}
            >
              ✅
            </Button>
          </li>
        ))}
      </ol> */}
    </>
  );
}

export default ToDo;
