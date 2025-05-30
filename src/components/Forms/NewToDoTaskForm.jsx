import { useState } from "react";
import styled from "styled-components";
import { createToDoTask } from "../../firestoreService";

const ToDoForm = styled.div`
  width: 100%;
  padding: 30px;
  border: 2px solid;
  border-color: #e9e9e9;
  border-radius: 15px;

  & .star-icon {
    font-size: 13px;
    color: red;
  }
  & .form-title {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  & .form-sub-title {
    font-size: 13px;
    opacity: 0.8;
    margin-bottom: 25px;
  }
  & .input-field-container {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    font-size: 13px;
  }
  & .input-field-container > div {
    margin-bottom: 25px;
  }
  & .input-field-container label {
    opacity: 0.7;
    margin-bottom: 5px;
    display: inline-block;
  }
  & .input-field-container input,
  textarea,
  select {
    border: 1px solid;
    border-color: #ededed;
    background-color: #f8f8f8;
    width: 100%;
    height: 30px;
    border-radius: 3px;
    padding-left: 10px;
    transition: border 0.3s ease;
    font-size: 12px;
  }
  & .input-field-container input:hover,
  textarea:hover,
  select:hover {
    border-color: #acb0f9;
  }
  & .input-field-container input:focus,
  textarea:focus,
  select:focus {
    outline-color: #acb0f9;
  }
  & textarea {
    height: 100px;
    padding: 10px;
  }
  & .add-button {
    width: 100%;
    height: 40px;
    background-color: #4953d6;
    border: none;
    color: white;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  & .add-button:hover {
    box-shadow: 1px 1px 16px 1px #b7bbec;
  }
`;

export function NewToDoTaskForm({
  onClickClose,
  selectedTaskId,
  refreshTodoTask,
}) {
  const [priority, setPriority] = useState("");
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");

  async function handleClickAdd() {
    try {
      await createToDoTask(selectedTaskId, priority, genre, name);
      alert("New todo task added successfully");
      refreshTodoTask();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to create project: " + error.message);
    }
    onClickClose();
  }

  return (
    <ToDoForm>
      <h2 className="form-title">Create New To Do Task</h2>
      <p className="form-sub-title">
        Create a new task by specifying its genre, name, and priority (High,
        Medium, or Low) to efficiently organize, track, and prioritize your
        to-do list.
      </p>
      <div className="input-field-container">
        <div>
          <label htmlFor="priority-status">
            Priority status <span className="star-icon">*</span>
          </label>
          <br />
          <select
            name="priority-status"
            id="priority-status"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">-</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label htmlFor="task-genre">
            Task genre <span className="star-icon">*</span>
          </label>
          <input
            type="text"
            id="task-genre"
            spellCheck="false"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="task-name">
            Task name <span className="star-icon">*</span>
          </label>
          <input
            type="text"
            id="task-name"
            spellCheck="false"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={handleClickAdd}>
          ADD
        </button>
      </div>
    </ToDoForm>
  );
}
