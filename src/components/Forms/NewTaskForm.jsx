import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const TaskForm = styled.div`
  width: 100%;
  padding: 30px;
  border: 2px solid;
  border-color: #e9e9e9;
  border-radius: 15px;
  /* background: linear-gradient(to right bottom, #e8e9f6, #f8f8f8 40%); */

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
    margin-bottom: 20px;
  }
  & .input-field-container .first-row-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* margin-bottom: 20px; */
    gap: 20px;
  }
  & .input-field-container .first-row-container > div {
    width: 100%;
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
  option {
    font-size: 13px;
    background-color: #f7f7f7;
    color: #000000;
    padding: 10px; /* May not work in all browsers */
    border-radius: 0;
  }
  & textarea {
    height: 100px;
    padding: 10px;
  }
  & .image-container input {
    display: none;
  }
  & .image-container .task-image-label {
    width: 100%;
    height: 200px;
    background-color: #f8f8f8;
    border: 2px dashed #acb0f9;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 1;
    cursor: pointer;
  }
  & .image-container .task-image-label .upload-cloud-icon {
    font-size: 80px;
    color: #6b71ec;
    margin-bottom: 5px;
    text-align: center;
    margin-bottom: 15px;
  }
  & .image-container .task-image-label .hint-text {
    width: 100%;
    text-align: center;
    font-size: 17px;
    opacity: 1;
    font-weight: 500;
  }
  & .image-container .task-image-label .hint-text u {
    color: #6b71ec;
    cursor: pointer;
    font-weight: 700;
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

export function NewTaskForm({ onClickClose }) {
  return (
    <TaskForm>
      <h2 className="form-title">Create New Task</h2>
      <p className="form-sub-title">
        Add a new task by entering its title, selecting a priority status
        (Important, Default, or Irrelevant), setting a due date, and providing
        details. You can also upload an image to support the task. Click Add
        button to save and track it within your project.
      </p>
      <div className="input-field-container">
        <div className="first-row-container">
          <div>
            <label htmlFor="task-title">
              Title <span className="star-icon">*</span>
            </label>
            <input type="text" id="task-title" spellCheck="false" />
          </div>
          <div>
            <label htmlFor="task-status">
              Status <span className="star-icon">*</span>
            </label>
            <select name="task-status" id="task-status">
              <option value="important">---</option>
              <option value="important">Important</option>
              <option value="irrelevant">Irrelevant</option>
              <option value="default">Default</option>
            </select>
          </div>
        </div>
        <div className="date-container">
          <label htmlFor="task-due-date">
            Finish Due Date <span className="star-icon">*</span>
          </label>
          <input type="date" name="due-date" id="task-due-date" />
        </div>
        <div className="desc-container">
          <label htmlFor="task-desc">
            Description <span className="star-icon">*</span>
          </label>
          <br />
          <textarea name="" id="task-desc" spellCheck="false"></textarea>
        </div>
        <div className="image-container">
          <label htmlFor="">Image</label>
          <br />
          <label htmlFor="task-image" className="task-image-label">
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              className="upload-cloud-icon"
            />
            <div className="hint-text">
              <u>Browse</u> Files to upload
            </div>
          </label>
          <input type="file" name="task-image" id="task-image" />
        </div>
        <button className="add-button">ADD</button>
      </div>
    </TaskForm>
  );
}
