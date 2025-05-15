import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown, faUserPlus, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faBell } from '@fortawesome/free-regular-svg-icons';
import userProfileImage from '../../../assets/img/user-profile.jpg';
import person1 from '../../../assets/img/person-1.jpg';
import person2 from '../../../assets/img/person-2.jpg';
import person3 from '../../../assets/img/person-3.jpg';
import person4 from '../../../assets/img/person-4.jpg';
import headerStyle from './Header.module.css';
import clsx from 'clsx';

export default function Header(props) {
    return (
        <header className={headerStyle.header}>
            <div className={headerStyle.topContainer}>
                <div className={headerStyle.searchBoxContainer}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={headerStyle.searchIcon} />
                    <input type="text" placeholder='Search' spellCheck="false"/>
                </div>
                <div className={headerStyle.rightContainer}>
                    <div className={headerStyle.dateContainer}>
                        <label htmlFor="date-range"><FontAwesomeIcon icon={faCalendar} className={headerStyle.calendarIcon} /> <span>10 May - 23 June</span> </label>
                        <input type="date" name="date-range" id="date-range" />
                    </div>
                    <div className={headerStyle.notiContainer}>
                        <FontAwesomeIcon icon={faBell} className={headerStyle.notiIcon}/>
                    </div>
                    <div className={headerStyle.userInfoContainer}>
                        <img src={userProfileImage} className={headerStyle.profileImage}/>
                        <div className={headerStyle.username}>
                            John Alby <FontAwesomeIcon icon={faAngleDown} className={headerStyle.downArrow} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={headerStyle.bottomContainer}>
                <div className={headerStyle.leftContainer}>
                    <div className={headerStyle.peopleContainer}>
                        <img src={person1} className={headerStyle.peopleIcon}/>
                        <img src={person2} className={headerStyle.peopleIcon}/>
                        <img src={person3} className={headerStyle.peopleIcon}/>
                        <img src={person4} className={headerStyle.peopleIcon}/>
                    <div className={clsx(headerStyle.remainingPeople, headerStyle.peopleIcon)}>4</div>
                    </div>
                    <div className={headerStyle.invitePeopleContainer}>
                        <FontAwesomeIcon icon={faUserPlus} className={headerStyle.addPeopleIcon} /> Invite People
                    </div>
                </div>
                <div className={headerStyle.rightContainer}>
                    <div className={headerStyle.statusContainer}>
                        <FontAwesomeIcon icon={faCircle} className={headerStyle.statusIcon} style={{color: "#3e3ab4",}}/> important
                    </div>
                    <div className={headerStyle.statusContainer}>
                        <FontAwesomeIcon icon={faCircle} className={headerStyle.statusIcon} style={{color: "#ffc260",}}/> irrelevant
                    </div>
                    <div className={headerStyle.statusContainer}>
                        <FontAwesomeIcon icon={faCircle} className={headerStyle.statusIcon} style={{color: "#ced5de",}} /> default
                    </div>
                </div>
            </div>
        </header>
    );
}