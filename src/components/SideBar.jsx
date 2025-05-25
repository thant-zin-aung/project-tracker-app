import { db, auth } from "../firebase";

import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBox,
  faPaperclip,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const Nav = styled.nav`
  width: 300px;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  padding: 30px;
  // box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  & .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
  }
  & .header-container h1 {
    font-size: 22px;
    font-weight: bold;
  }
  & .header-container .add-project-button {
    background-color: #333cad;
    display: grid;
    place-items: center;
    color: white;
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 100%;
    font-size: 17px;
    cursor: pointer;
  }
  & .list-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;
    margin-bottom: 20px;
  }
  & .list-item .left-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 400;
  }
  & .list-item:hover .left-container {
    font-weight: 500;
    opacity: 1;
  }
  & .list-item .left-container div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  & .list-item .left-container .item-icon {
    opacity: 0.5;
  }
  & .list-item .left-container div .arrow-icon {
    font-size: 12px;
    transition: transform 0.5s ease;
  }
  & .list-item:hover .sub-list {
    margin-top: 30px;
    max-height: 250px;
  }
  & .list-item:hover .arrow-icon {
    transform: rotate(90deg);
  }
  & .list-item .sub-list {
    /* margin-top: 20px; */
    padding-left: 30px;
    overflow-y: hidden;
    max-height: 0;
    transition: all 0.5s ease;
    list-style-type: none;
    overflow-y: auto;
  }
  & .list-item .sub-list li {
    padding: 10px 0;
    cursor: pointer;
    opacity: 0.4;
  }
  & .list-item .sub-list li:hover {
    opacity: 1;
  }

  /* For Webkit-based browsers */
  & .list-item .sub-list::-webkit-scrollbar {
    width: 4px;
  }

  & .list-item .sub-list::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  & .list-item .sub-list::-webkit-scrollbar-thumb {
    background-color: #333cad;
    border: 1px solid #f1f1f1;
  }

  & .list-item .sub-list::-webkit-scrollbar-thumb:hover {
    background-color: #5d65cd;
  }
`;

export function SideBar({ onClickNewProject, clickableButtons, projects }) {
  return (
    <Nav>
      <div className="header-container">
        <h1>Projects</h1>
        <button
          className="add-project-button"
          onClick={() => onClickNewProject(clickableButtons.NEW_PROJECT)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ul>
        <ListItem icon={faBox} title="All projects" projects={projects} />
        <ListItem icon={faPaperclip} title="Pinned" projects={projects} />
        <ListItem icon={faClock} title="In process" projects={projects} />
        <ListItem icon={faCircleCheck} title="Done" projects={projects} />
      </ul>
    </Nav>
  );
}

function ListItem({ icon, title, projects }) {
  return (
    <li className="list-item">
      <div className="left-container">
        <div>
          <FontAwesomeIcon icon={icon} className="item-icon" />
          {title}
        </div>
        <div>
          <FontAwesomeIcon icon={faAngleRight} className="arrow-icon" />
        </div>
      </div>
      <ul className="sub-list">
        {projects.map((project) => (
          <li key={project.id} className="sub-list-item">
            {project.name}
          </li>
        ))}
        {/* <li className="sub-list-item">Item 1</li>
        <li className="sub-list-item">Item 2</li>
        <li className="sub-list-item">Item 3</li>
        <li className="sub-list-item">Item 4</li>
        <li className="sub-list-item">Item 1</li>
        <li className="sub-list-item">Item 2</li>
        <li className="sub-list-item">Item 3</li>
        <li className="sub-list-item">Item 4</li>
        <li className="sub-list-item">Item 1</li>
        <li className="sub-list-item">Item 2</li>
        <li className="sub-list-item">Item 3</li>
        <li className="sub-list-item">Item 4</li> */}
      </ul>
    </li>
  );
}
