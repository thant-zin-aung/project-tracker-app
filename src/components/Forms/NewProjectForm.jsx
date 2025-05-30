import { useState } from "react";
import { auth } from "../../firebase";
import { createProject } from "../../firestoreService";

import styled from "styled-components";

const ProjectForm = styled.div`
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
  textarea {
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
  textarea:hover {
    border-color: #acb0f9;
  }
  & .input-field-container input:focus,
  textarea:focus {
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

export function NewProjectForm({ onClickClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contributors, setContributors] = useState(""); // Comma-separated

  const handleOnClickAdd = async () => {
    if (!name.trim() || !description.trim()) {
      alert("Please enter both project name and description.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You need to log in first.");
      return;
    }

    const ownerId = user.uid;
    const contributorsArray = contributors
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (!contributorsArray.includes(ownerId)) {
      contributorsArray.push(ownerId);
    }

    try {
      await createProject(name, description, ownerId, contributorsArray);
      alert("Project created successfully!");
      refreshProjects();
      onClickClose();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to create project: " + error.message);
    }
  };

  return (
    <ProjectForm>
      <h2 className="form-title">Create New Project</h2>
      <p className="form-sub-title">
        Use this form to start a new project within your Project Tracker App.
        Give your project a clear and descriptive name that reflects the overall
        goal or initiative you want to manage. This name will help your team
        quickly identify the project in dashboards and task lists.
      </p>
      <div className="input-field-container">
        <div>
          <label htmlFor="project-name">
            Project Name <span className="star-icon">*</span>
          </label>
          <input
            type="text"
            id="project-name"
            spellCheck="false"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="desc-container">
          <label htmlFor="task-desc">
            Description <span className="star-icon">*</span>
          </label>
          <br />
          <textarea
            id="task-desc"
            spellCheck="false"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="contributors">
            Contributors (comma-separated IDs)
          </label>
          <input
            type="text"
            id="contributors"
            spellCheck="false"
            value={contributors}
            onChange={(e) => setContributors(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={handleOnClickAdd}>
          ADD
        </button>
      </div>
    </ProjectForm>
  );
}
