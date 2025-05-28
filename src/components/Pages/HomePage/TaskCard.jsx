import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faPaperclip,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import userProfileImage from "../../../assets/img/user-profile.jpg";
import person1 from "../../../assets/img/person-1.jpg";
import person2 from "../../../assets/img/person-2.jpg";
import person3 from "../../../assets/img/person-3.jpg";
import person4 from "../../../assets/img/person-4.jpg";

const Card = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 20px;

  & .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  & .title-container .left-container {
    display: flex;
    align-items: center;
  }
  & .title-container .left-container .status-icon {
    font-size: 7px;
    margin-right: 10px;
    color: ${({ $statusColor }) => $statusColor};
  }
  & .title-container .left-container .card-title {
    font-size: 16px;
  }
  & .title-container .right-container {
    display: flex;
    align-items: center;
    color: grey;
  }
  & .title-container .right-container .pin-icon {
    font-size: 15px;
    margin-right: 10px;
  }
  & .title-container .right-container .pin-number {
    font-size: 15px;
  }
  & .desc-container {
    width: 100%;
    text-align: left;
    color: #919191;
    font-size: 15px;
    margin-bottom: 20px;
  }
  & .task-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 7px;
    margin-bottom: 20px;
  }
  & .due-day-container {
    font-size: 13px;
    color: grey;
    font-weight: 300;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  & .due-day-container .clock-icon {
    font-size: 15px;
    margin-right: 7px;
  }
  & .progress-container {
    width: 100%;
    height: 3px;
    background-color: #eaeaea;
    margin-bottom: 15px;
  }
  & .progress-container .current-progress {
    height: 100%;
  }
  & .bottom-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .contributor-container {
  }
  & .contributor-container img {
    width: 27px;
    height: 27px;
    border-radius: 100%;
    object-fit: cover;
    border: 2px solid white;
  }
  & .menu-icon {
    color: grey;
    cursor: pointer;
  }
`;

export function TaskCard({ task, taskImage }) {
  const taskStatusColor = {
    important: "rgb(62, 58, 180)",
    irrelevant: "rgb(255, 194, 96)",
    default: "rgb(206, 213, 222)",
  };
  return (
    <Card
      $statusColor={taskStatusColor[task.status] || taskStatusColor.default}
    >
      <div className="title-container">
        <div className="left-container">
          <FontAwesomeIcon
            icon={faCircle}
            className="status-icon"
            // style={{ color: "#ffc260" }}
          />
          <span className="card-title">{task.name}</span>
        </div>
        <div className="right-container">
          <FontAwesomeIcon icon={faPaperclip} className="pin-icon" />
          <span className="pin-number">1</span>
        </div>
      </div>
      <div className="desc-container">
        {/* Create additional fields for payment flow. Update design system. Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Ipsam iusto,
        cupiditate quis deserunt, porro alias non, a ullam debitis quibusdam ex
        recusandae odio expedita distinctio animi inventore corrupti similique
        vero. */}
        {task.description}
      </div>
      {taskImage && <img src={taskImage} alt="Task" className="task-image" />}
      <div className="due-day-container">
        <FontAwesomeIcon icon={faClock} className="clock-icon" />{" "}
        <span className="text">Due in 3 days</span>
      </div>
      <div className="progress-container">
        <div
          className="current-progress"
          style={{
            width: "30%",
            backgroundColor: "#ffc260",
          }}
        ></div>
      </div>
      <div className="bottom-wrapper">
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
        <FontAwesomeIcon icon={faEllipsis} className="menu-icon" />
      </div>
    </Card>
  );
}
