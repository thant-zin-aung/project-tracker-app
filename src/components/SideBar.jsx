import { styled } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faBox, faPaperclip, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faClock, faCircleCheck } from "@fortawesome/free-regular-svg-icons"

const Nav = styled.nav`
    width: 300px;
    height: 100vh;
    background-color:rgb(255, 255, 255);
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
    }
    & .list-item:hover .sub-list {
        height: 130px;
    }
    & .list-item .sub-list {
        margin-top: 10px;
        padding-left: 30px;
        overflow-y: hidden;
        height: 0;
        transition: height 0.5s ease;
    }
    & .list-item .sub-list li {
        padding: 10px 0;
        cursor: pointer;
        opacity: 0.7;
    }
`;


export function SideBar({onClickNewTask, clickableButtons}) {
    return (
        <Nav>
            <div className="header-container">
                <h1>Projects</h1>
                <button className="add-project-button" onClick={() => onClickNewTask(clickableButtons.NEW_PROJECT)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <ul>
                <ListItem icon={faBox} title="All projects" />
                <ListItem icon={faPaperclip} title="Pinned" />
                <ListItem icon={faClock} title="In process" />
                <ListItem icon={faCircleCheck} title="Done" />
            </ul>
        </Nav>
    )
}


function ListItem({icon, title}) {
    return (
        <li className="list-item">
            <div className="left-container">
                <div>
                    <FontAwesomeIcon icon={icon} className="item-icon"/>
                    {title}
                </div>
                <div>
                    <FontAwesomeIcon icon={faAngleRight} className="arrow-icon"/>
                </div>
            </div>
            <ul className="sub-list">
                <li className="sub-list-item">Item 1</li>
                <li className="sub-list-item">Item 2</li>
                <li className="sub-list-item">Item 3</li>
                <li className="sub-list-item">Item 4</li>
            </ul>
        </li>
    )
}   