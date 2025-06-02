import { useState } from "react";
import { addContributorIdsToProject } from "../../firestoreService";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const InviteForm = styled.div`
  width: 100%;
  padding: 30px;
  border: 2px solid;
  border-color: #e9e9e9;
  border-radius: 15px;

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
  .search-container {
    width: 100%;
    display: flex;
    gap: 15px;
    height: 35px;
    margin-bottom: 10px;
    position: relative;
  }
  .search-container input {
    width: 80%;
    height: 100%;
    padding: 0 10px;
    border: 1px solid #bbbbbb;
    border-radius: 5px;
  }
  .search-container input:focus {
    outline: none;
  }
  .search-container .add-button {
    width: 20%;
    height: 100%;
    border-radius: 5px;
    border: none;
    background-color: #333cad;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .search-container .add-button:hover {
    box-shadow: 1px 1px 8px 1px #8188ed;
  }
  .search-result-container {
    width: calc(80% - 13px);
    /* height: 200px; */
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: white;
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 1;
    border-radius: 10px;
    box-shadow: 1px 1px 8px 1px #dcdcdc;
    padding: 10px;
    display: none;
  }
  .search-result-container.visible {
    display: block;
  }

  .selected-root-container {
    width: 100%;
    min-height: 300px;
    max-height: 500px;
    overflow-y: auto;
    padding-right: 10px;
  }
  .selected-root-container::-webkit-scrollbar,
  .search-result-container::-webkit-scrollbar {
    width: 5px;
  }

  .selected-root-container::-webkit-scrollbar-track,
  .search-result-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1px;
  }

  .selected-root-container::-webkit-scrollbar-thumb,
  .search-result-container::-webkit-scrollbar-thumb {
    background-color: #a0a0a0;
    border: 1px solid #f1f1f1;
    width: 0px;
  }

  .selected-root-container::-webkit-scrollbar-thumb:hover,
  .search-result-container::-webkit-scrollbar-thumb:hover {
    background-color: #bbbbbb;
  }
`;
export function InviteUserForm({
  onClickClose,
  refreshTasks,
  allUser,
  loginUser,
  selectedProjectId,
  currentProject,
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isSearchBoxFocus, setIsSearchBoxFocus] = useState(false);

  async function handleInviteUserButton() {
    console.log(selectedProjectId + ":" + selectedUsers.map((user) => user.id));
    if (selectedUsers.length === 0) return;
    await addContributorIdsToProject(
      selectedProjectId,
      selectedUsers.map((user) => user.id)
    );
    onClickClose();
  }

  function handleOnClickAvailableUser(user) {
    setSelectedUsers((prevUsers) =>
      prevUsers.map((prevUser) => prevUser.id).includes(user.id)
        ? [...prevUsers]
        : [...prevUsers, user]
    );
  }

  function handleOnClickRemoveSelectedUser(selectedUser) {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((prevUser) => prevUser.id !== selectedUser.id)
    );
  }

  function handleSearchBoxFocus(e) {
    e.stopPropagation();
    setIsSearchBoxFocus(true);
  }

  return (
    <InviteForm onClick={() => setIsSearchBoxFocus(false)}>
      <h2 className="form-title">Invite New Contributor</h2>
      <p className="form-sub-title">
        Easily invite new contributors to join your project or platform,
        empowering them to collaborate, contribute, and enhance the overall
        experience for the project.
      </p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users to invite..."
          onClick={(e) => handleSearchBoxFocus(e)}
        />
        <button className="add-button" onClick={handleInviteUserButton}>
          Invite Users
        </button>
        <div
          className={`search-result-container ${
            isSearchBoxFocus ? "visible" : ""
          }`}
        >
          {selectedProjectId !== 0 &&
            allUser.map(
              (user) =>
                user.id !== loginUser.id &&
                !currentProject.contributors.includes(user.id) && (
                  <AvailableUser
                    key={user.id}
                    imageUrl={user.imageUrl}
                    userName={user.name}
                    userEmail={user.email}
                    onClickUser={() => handleOnClickAvailableUser(user)}
                  />
                )
            )}
        </div>
      </div>
      <div className="selected-root-container">
        {selectedUsers.map((selectedUser) => (
          <SelectedUser
            key={selectedUser.id}
            imageUrl={selectedUser.imageUrl}
            userName={selectedUser.name}
            userEmail={selectedUser.email}
            onClickRemove={() => handleOnClickRemoveSelectedUser(selectedUser)}
          />
        ))}
      </div>
    </InviteForm>
  );
}

const SelectedUserContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e4e4e4;
  border-width: 0 0 1px 0;

  .user-info-container {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .user-info-container img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 20px;
  }
  .user-info-container .name {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  .user-info-container .email {
    font-size: 13px;
    opacity: 0.7;
  }
  .delete-icon {
    font-size: 18px;
    margin-right: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .delete-icon:hover {
    transform: scale(1.4);
  }
`;

export function SelectedUser({ imageUrl, userName, userEmail, onClickRemove }) {
  return (
    <SelectedUserContainer>
      <div className="user-info-container">
        <img src={imageUrl} alt="User image" className="user-image" />
        <div className="right">
          <div className="name">{userName}</div>
          <div className="email">{userEmail}</div>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faTrashCan}
        className="delete-icon"
        onClick={onClickRemove}
      />
    </SelectedUserContainer>
  );
}

const AvailableUserContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ebebeb;
  }

  .left-container {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .left-container img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 15px;
  }
  .left-container .user {
    font-size: 13px;
    font-weight: 500;
  }
  .email {
    font-size: 13px;
    opacity: 0.7;
  }
`;
export function AvailableUser({ imageUrl, userName, userEmail, onClickUser }) {
  return (
    <AvailableUserContainer onClick={onClickUser}>
      <div className="left-container">
        <img src={imageUrl} alt="User image" />
        <div className="user">{userName}</div>
      </div>
      <div className="email">{userEmail}</div>
    </AvailableUserContainer>
  );
}
