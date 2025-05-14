import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import headerStyle from './Header.module.css';
export default function Header(props) {
    return (
        <header className={headerStyle.header}>
            <div className={headerStyle.topContainer}>
                <div className={headerStyle.searchBoxContainer}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={headerStyle.searchIcon} />
                    <input type="text" placeholder='Search' spellCheck="false"/>
                </div>
                <div className={headerStyle.leftContainer}>
                    <div className={headerStyle.dateContainer}>
                        <label for="date-range"><FontAwesomeIcon icon={faCalendar} className={headerStyle.calendarIcon} /> <span>10 May - 23 June</span> </label>
                        <input type="date" name="date-range" id="date-range" />
                    </div>
                </div>
            </div>
        </header>
    );
}