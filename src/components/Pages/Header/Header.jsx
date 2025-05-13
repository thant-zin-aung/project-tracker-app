import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import headerStyle from './Header.module.css';
export default function Header(props) {
    return (
        <header className={headerStyle.header}>
            <div className={headerStyle.searchBoxContainer}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={headerStyle.searchIcon} />
                <input type="text" placeholder='Search' spellCheck="false"/>
            </div>
        </header>
    );
}