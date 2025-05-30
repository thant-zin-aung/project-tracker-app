import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faBarsStaggered,
  faCircle,
  faGear,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTrashCan,
  faClock,
  faCirclePause,
} from "@fortawesome/free-regular-svg-icons";
import { faHourglass } from "@fortawesome/free-regular-svg-icons";
import userProfileImage from "../../../assets/img/user-profile.jpg";
import person1 from "../../../assets/img/person-1.jpg";
import person2 from "../../../assets/img/person-2.jpg";
import person3 from "../../../assets/img/person-3.jpg";
import person4 from "../../../assets/img/person-4.jpg";
import { updateToDoTaskIsFinish } from "../../../firestoreService";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 20px;
  padding: 20px;

  & .left-wrapper {
    flex: 2;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
  }
  & .right-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .task-outline-container,
  .profile-container {
    width: 100%;
    height: 120px;
    min-height: 120px;
    background-color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 1px 1px 8px 1px #f7f7f7;
  }
  .task-outline-container .left-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .task-outline-container .left-container h3 {
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .task-outline-container .left-container p {
    font-size: 13px;
    opacity: 0.7;
  }
  .task-outline-container .right-container .contributor-container {
    margin-bottom: 5px;
  }
  .task-outline-container .right-container .contributor-container img {
    width: 33px;
    height: 33px;
    border-radius: 100%;
    object-fit: cover;
    border: 2px solid white;
  }
  .task-outline-container .right-container .total-contributor-container {
    display: flex;
    align-items: center;
  }
  .task-outline-container .right-container .total-contributor-container p {
    font-size: 14px;
    margin-right: 10px;
    font-weight: 400;
  }
  .task-outline-container
    .right-container
    .total-contributor-container
    .total-contributor {
    display: flex;
    align-items: center;
    padding: 2px 10px;
    border: 1px solid;
    border-color: #bdbdbd;
    border-radius: 3px;
  }
  .task-outline-container
    .right-container
    .total-contributor-container
    .total-contributor
    .user-icon {
    font-size: 10px;
    margin-right: 5px;
    color: #5f5f5f;
  }
  .task-outline-container
    .right-container
    .total-contributor-container
    .total-contributor
    span {
    font-size: 13px;
    font-weight: 600;
  }

  .profile-container img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 20px;
  }
  .profile-container .left-container {
    flex: 2;
    display: flex;
    align-items: center;
  }
  .profile-info-container {
    flex: 2;
    display: flex;
    flex-direction: column;
  }
  .profile-info-container h4 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .profile-info-container p {
    font-size: 13px;
    opacity: 0.7;
    margin-bottom: 10px;
  }
  .profile-info-container p:last-child {
    margin-bottom: 0;
  }
  .profile-container .right-container {
    border-style: solid;
    border-color: #bcbcbc;
    border-width: 0 0 0 1px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70%;
    padding-left: 50px;
  }
  .profile-container .right-container > div {
    display: flex;
    font-size: 14px;
  }
  .profile-container .right-container > div:first-child {
    margin-bottom: 15px;
  }
  /* .profile-container .right-container > div .left {
    width: 200px;
  } */
  .profile-container .right-container > div .right {
    width: 100px;
    text-align: right;
    font-weight: 500;
  }

  .task-detail-container {
    flex: 1;
    width: 100%;
    min-height: 0;
    padding: 20px 20px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 8px 1px #f7f7f7;
  }
  .task-detail-container .title-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .task-detail-container .title-container .left {
    font-size: 22px;
    font-weight: 500;
  }
  .task-detail-container .title-container .right {
    display: flex;
    align-items: center;
  }
  .task-detail-container .title-container .right button {
    padding: 12px 20px;
    margin-left: 20px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    background-color: black;
    color: white;
    cursor: pointer;
  }
  .task-detail-container .title-container .right .add-new-task-button {
    background-color: white;
    color: black;
    border: 1px solid;
    border-color: #cbcbcb;
  }
  .task-detail-container .title-container .right .focus-icon,
  .task-detail-container .title-container .right .add-task-icon {
    margin-right: 7px;
    font-size: 17px;
  }
  .task-detail-container .title-container .right .add-task-icon {
    opacity: 0.6;
  }
  .task-detail-container .task-list-container {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    min-height: 0;
    padding: 0 20px;
    margin-top: 10px;
  }
  .task-detail-container .task-list-container::-webkit-scrollbar {
    width: 3px;
  }

  .task-detail-container .task-list-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .task-detail-container .task-list-container::-webkit-scrollbar-thumb {
    background-color: #c3c3c3;
    /* border-radius: 10px; */
  }

  .task-detail-container .task-list-container::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  & .right-wrapper > div,
  & .right-wrapper > img {
    border-radius: 20px;
    overflow: hidden;
  }
  & .focus-mode-container {
    width: 100%;
    height: 100%;
    /* background-color: black;
    color: white; */
    background: linear-gradient(to left top, #9fe7ff, white 60%);
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* border: 1px solid;
    border-color: #e0e0e0; */
    box-shadow: 1px 1px 8px 1px #f7f7f7;
  }
  & .focus-mode-container > .title {
    font-size: 30px;
    font-weight: 500;
  }
  & .focus-mode-container .hint {
    font-size: 15px;
    opacity: 0.7;
  }
  & .focus-mode-container .time-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .focus-mode-container .time-container .time {
    font-size: 40px;
    font-weight: 700;
  }
  & .focus-mode-container .time-container .setting-container {
    display: flex;
    align-items: center;
  }
  &
    .focus-mode-container
    .time-container
    .setting-container
    .take-a-break-button {
    padding: 15px 50px;
    background-color: white;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    margin-right: 20px;
  }
  & .focus-mode-container .time-container .setting-container .setting-icon {
    font-size: 30px;
    opacity: 0.7;
  }
  & .focus-mode-container .auto-break-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .focus-mode-container .auto-break-container .left {
    display: flex;
    align-items: center;
    font-size: 15px;
  }
  & .focus-mode-container .auto-break-container .left .info-icon {
    font-size: 18px;
    opacity: 0.7;
    margin-left: 10px;
  }
  & .focus-mode-container .auto-break-container .right {
  }
  & .focus-mode-container .duration-container {
    width: 100%;
    padding: 20px 20px;
    border-radius: 10px;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
  }
  & .focus-mode-container .duration-container .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 20px;
  }
  & .focus-mode-container .duration-container .top > div {
    width: 50%;
  }
  & .focus-mode-container .duration-container .top .title {
    margin-bottom: 10px;
  }
  & .focus-mode-container .duration-container .top .duration {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    border: 1px solid;
    border-color: #c7c7c7;
    padding: 0 10px;
    border-radius: 10px;
  }
  & .focus-mode-container .duration-container .top .duration-icon {
    opacity: 0.7;
  }
  & .focus-mode-container .duration-container .save-button {
    width: 100%;
    height: 50px;
    background-color: #4a54d6;
    color: white;
    border: none;
    font-size: 17px;
    border-radius: 10px;
  }

  & .task-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TaskContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid;
  border-bottom-color: #dfdfdf;

  & input {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
  & label > div:first-child {
    font-size: 13px;
    opacity: 0.6;
    margin-bottom: 5px;
  }
  & label > div:last-child {
    font-size: 15px;
  }
  & label .list-icon {
    color: grey;
    margin-right: 5px;
  }
  & .left {
    display: flex;
    align-items: center;
  }
  & .right {
    display: flex;
    align-items: center;
  }
  & .right .priority {
    font-size: 14px;
    display: flex;
    align-items: center;
    color: ${({ $priorityColor }) => $priorityColor};
  }
  & .right .priority-icon {
    font-size: 8px;
    margin-right: 5px;
  }
  & .right .delete-icon {
    font-size: 20px;
    margin-left: 20px;
  }
`;

export function TaskDetailPage({
  onClickNewToDoTask,
  clickableButtons,
  todoTasks,
}) {
  const priorityMap = {
    high: {
      text: "high",
      color: "#fda862",
    },
    medium: {
      text: "medium",
      color: "#51b3ff",
    },
    low: {
      text: "low",
      color: "#b16ced",
    },
  };
  return (
    <Container>
      <div className="left-wrapper">
        <div className="task-outline-container">
          <div className="left-container">
            <h3>Good Morning, John Alby!</h3>
            <p>What do you plan to do today?</p>
          </div>
          <div className="right-container">
            <div className="contributor-container">
              <img src={userProfileImage} />
              <img src={person2} style={{ transform: "translateX(-10px)" }} />
              <img
                src={person1}
                style={{ transform: "translateX(calc(-10px * 2))" }}
              />
              <img
                src={person4}
                style={{ transform: "translateX(calc(-10px * 3))" }}
              />
              <img
                src={person3}
                style={{ transform: "translateX(calc(-10px * 4))" }}
              />
            </div>
            <div className="total-contributor-container">
              <p>Total Contributor</p>
              <div className="total-contributor">
                <FontAwesomeIcon icon={faUser} className="user-icon" />{" "}
                <span>23</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-container">
          <div className="left-container">
            <img src={userProfileImage} />
            <div className="profile-info-container">
              <h4>John Alby</h4>
              <p>Software Engineer</p>
              <p>johnalby.dev@gmail.com</p>
            </div>
          </div>
          <div className="right-container">
            <div>
              <div className="left">Overall Impact Score : </div>
              <div className="right">10%</div>
            </div>
            <div>
              <div className="left">Ideal Session Length : </div>
              <div className="right">120 min</div>
            </div>
          </div>
        </div>

        <div className="task-detail-container">
          <div className="title-container">
            <div className="left">Tasks List</div>
            <div className="right">
              <button className="focus-mode-button">
                <FontAwesomeIcon icon={faHourglass} className="focus-icon" />{" "}
                Focus Mode
              </button>
              <button
                className="add-new-task-button"
                onClick={() =>
                  onClickNewToDoTask(clickableButtons.NEW_TODO_TASK)
                }
              >
                <FontAwesomeIcon icon={faPlus} className="add-task-icon" /> Add
                New Task
              </button>
            </div>
          </div>
          <div className="task-list-container">
            {todoTasks.map((todoTask) => (
              <Task
                key={todoTask.id}
                taskId={todoTask.id}
                priority={priorityMap[todoTask.priority].text}
                priorityColor={priorityMap[todoTask.priority].color}
                taskGenre={todoTask.genre}
                taskName={todoTask.name}
                isFinish={todoTask.isFinish}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="right-wrapper">
        <div className="focus-mode-container">
          <div className="title">Focus Mode</div>
          <div className="hint">Stay focused for</div>
          <div className="time-container">
            <div className="time">120:00</div>
            <div className="setting-container">
              <button className="take-a-break-button">
                <FontAwesomeIcon icon={faCirclePause} /> Take a Break
              </button>
              <FontAwesomeIcon icon={faGear} className="setting-icon" />
            </div>
          </div>
          <div className="auto-break-container">
            <div className="left">
              Auto Breaks
              <FontAwesomeIcon icon={faCircleInfo} className="info-icon" />
            </div>
            <div className="right">toggle</div>
          </div>
          <div className="duration-container">
            <div className="top">
              <div className="left">
                <div className="title">Focused duration</div>
                <div className="duration">
                  <div className="text">120 min</div>
                  <FontAwesomeIcon icon={faClock} className="duration-icon" />
                </div>
              </div>
              <div className="right">
                <div className="title">Break duration</div>
                <div className="duration">
                  <div className="text">20 min</div>
                  <FontAwesomeIcon
                    icon={faHourglass}
                    className="duration-icon"
                  />
                </div>
              </div>
            </div>
            <button className="save-button">Save</button>
          </div>
        </div>
        <img
          src="https://plus.unsplash.com/premium_photo-1668359407785-ac5dca1de611?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="task-image"
        />
      </div>
    </Container>
  );
}

function Task({
  taskId,
  priority,
  priorityColor,
  taskGenre,
  taskName,
  isFinish,
}) {
  const [taskFinish, setTaskFinish] = useState(isFinish);
  async function handleOnChangeTask() {
    try {
      await updateToDoTaskIsFinish(taskId, !taskFinish);
      setTaskFinish((prev) => !prev);
    } catch (error) {
      console.error("Error change isFinish value:", error);
      alert("Failed to change task finish value: " + error.message);
    }
  }
  return (
    <TaskContainer $priorityColor={priorityColor}>
      <div className="left">
        <input
          type="checkbox"
          checked={taskFinish}
          onChange={handleOnChangeTask}
        />
        <label htmlFor="">
          <div>
            <FontAwesomeIcon icon={faBarsStaggered} className="list-icon" />
            <span>{taskGenre}</span>
          </div>
          <div>{taskName}</div>
        </label>
      </div>
      <div className="right">
        <div className="priority">
          <FontAwesomeIcon icon={faCircle} className="priority-icon" />
          {priority}
        </div>
        <FontAwesomeIcon icon={faTrashCan} className="delete-icon" />
      </div>
    </TaskContainer>
  );
}
