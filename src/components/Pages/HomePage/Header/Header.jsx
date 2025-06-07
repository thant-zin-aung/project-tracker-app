import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleDown,
  faUserPlus,
  faCircle,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faBell } from "@fortawesome/free-regular-svg-icons";
import userProfileImage from "../../../../assets/img/user-profile.jpg";
import person1 from "../../../../assets/img/person-1.jpg";
import person2 from "../../../../assets/img/person-2.jpg";
import person3 from "../../../../assets/img/person-3.jpg";
import person4 from "../../../../assets/img/person-4.jpg";
import headerStyle from "./header.module.css";
import clsx from "clsx";

export default function Header({
  loginUser,
  allUser,
  currentProject,
  onClickInviteUser,
  clickableButtons,
}) {
  function handleInviteUser() {
    onClickInviteUser(clickableButtons.INVITE_USER_FORM);
  }
  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.topContainer}>
        <div className={headerStyle.searchBoxContainer}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={headerStyle.searchIcon}
          />
          <input type="text" placeholder="Search" spellCheck="false" />
        </div>
        <div className={headerStyle.rightContainer}>
          <div className={headerStyle.dateContainer}>
            <label htmlFor="date-range">
              <FontAwesomeIcon
                icon={faCalendar}
                className={headerStyle.calendarIcon}
              />{" "}
              <span>10 May - 23 June</span>{" "}
            </label>
            <input type="date" name="date-range" id="date-range" />
          </div>
          <div className={headerStyle.notiContainer}>
            <FontAwesomeIcon icon={faBell} className={headerStyle.notiIcon} />
          </div>
          <div className={headerStyle.userInfoContainer}>
            <img
              src={loginUser.imageUrl}
              className={headerStyle.profileImage}
            />
            <div className={headerStyle.username}>
              {loginUser.name}{" "}
              <FontAwesomeIcon
                icon={faAngleDown}
                className={headerStyle.downArrow}
              />
            </div>
            <button
              className={headerStyle.logoutButton}
              onClick={() => signOut(auth)}
            >
              LOGOUT{" "}
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={headerStyle.logoutIcon}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={headerStyle.bottomContainer}>
        <div className={headerStyle.leftContainer}>
          <div className={headerStyle.peopleContainer}>
            {currentProject?.contributors?.length > 0 &&
              allUser
                .filter((user) => currentProject.contributors.includes(user.id))
                .slice(0, 4)
                .map((user) => (
                  <img
                    key={user.id}
                    src={user.imageUrl}
                    className={headerStyle.peopleIcon}
                  />
                ))}
            {/* <img src={person1} className={headerStyle.peopleIcon} />
            <img src={person2} className={headerStyle.peopleIcon} />
            <img src={person3} className={headerStyle.peopleIcon} />
            <img src={person4} className={headerStyle.peopleIcon} /> */}
            {currentProject?.contributors?.length - 4 > 0 && (
              <div
                className={clsx(
                  headerStyle.remainingPeople,
                  headerStyle.peopleIcon
                )}
              >
                +
                {currentProject.contributors.length - 4 <= 0
                  ? 0
                  : currentProject.contributors.length - 4}
              </div>
            )}
          </div>
          <div
            className={headerStyle.invitePeopleContainer}
            onClick={handleInviteUser}
            style={{
              transform: `translateX(-${
                currentProject?.contributors?.length === 1
                  ? 0
                  : currentProject?.contributors?.length + 0.5
              }0px)`,
            }}
          >
            <FontAwesomeIcon
              icon={faUserPlus}
              className={headerStyle.addPeopleIcon}
            />{" "}
            Invite People
          </div>
        </div>
        <div className={headerStyle.rightContainer}>
          <div className={headerStyle.statusContainer}>
            <FontAwesomeIcon
              icon={faCircle}
              className={headerStyle.statusIcon}
              style={{ color: "#3e3ab4" }}
            />{" "}
            important
          </div>
          <div className={headerStyle.statusContainer}>
            <FontAwesomeIcon
              icon={faCircle}
              className={headerStyle.statusIcon}
              style={{ color: "#ffc260" }}
            />{" "}
            irrelevant
          </div>
          <div className={headerStyle.statusContainer}>
            <FontAwesomeIcon
              icon={faCircle}
              className={headerStyle.statusIcon}
              style={{ color: "#ced5de" }}
            />{" "}
            default
          </div>
        </div>
      </div>
    </header>
  );
}
