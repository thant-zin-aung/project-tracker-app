import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import userProfileImage from "../../../assets/img/user-profile.jpg";
import person1 from "../../../assets/img/person-1.jpg";
import person2 from "../../../assets/img/person-2.jpg";
import person3 from "../../../assets/img/person-3.jpg";
import person4 from "../../../assets/img/person-4.jpg";

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 20px;

  & .left-wrapper {
    flex: 2;
  }
  & .right-wrapper {
    flex: 1;
  }
  .task-outline-container,
  .profile-container {
    width: 100%;
    height: 120px;
    background-color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 20px;
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
`;

export function TaskDetailPage() {
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
      </div>
      <div className="right-wrapper"></div>
    </Container>
  );
}
