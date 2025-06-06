import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TaskCard } from "./TaskCard";

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.3%;
  margin-top: 30px;

  @media (max-width: 1920px) {
    margin-top: 40px;
  }
`;

const RowTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;

  & .left-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  & .left-container .title {
    font-size: 18px;
    font-weight: bold;
  }
  & .left-container .title .total-task {
    font-weight: 400;
    color: grey;
  }
  & .right-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  & .right-container .add-new-task-button {
    padding: 8px 20px;
    border-radius: 20px;
    border: none;
    background-color: #f1f5fd;
    font-size: 14px;
    cursor: pointer;
  }
  & .right-container .add-new-task-button .plus-icon {
    font-size: 13px;
    color: #333cad;
    margin-right: 5px;
  }

  @media (max-width: 1920px) {
    .left-container .title {
      font-size: 17px;
    }
    .right-container .add-new-task-button {
      padding: 9px 18px;
      font-size: 13px;
    }
  }
`;

export function TaskRow({
  loginUser,
  allUser,
  onClickNewTask,
  taskRowTitle,
  tasks,
  showTaskDetailPage,
  onChangeSelectedTaskId,
}) {
  return (
    <RowContainer>
      <RowTitleContainer>
        <div className="left-container">
          <div className="title">
            {taskRowTitle} <span className="total-task">({tasks.length})</span>{" "}
          </div>
        </div>
        <div className="right-container">
          <button className="add-new-task-button" onClick={onClickNewTask}>
            <FontAwesomeIcon icon={faPlus} className="plus-icon" /> New task
          </button>
        </div>
      </RowTitleContainer>
      {/* <TaskCard taskImage={taskImage} /> */}

      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          showTaskDetailPage={showTaskDetailPage}
          onChangeSelectedTaskId={onChangeSelectedTaskId}
          loginUser={loginUser}
          allUser={allUser}
        />
      ))}
    </RowContainer>
  );
}
