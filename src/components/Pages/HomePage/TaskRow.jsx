import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const RowContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 33.3%;
    margin-top: 30px;
`;

const RowTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    
    & .left-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    & .left-container .title {
        font-size: 20px;
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
    }
    & .right-container .add-new-task-button .plus-icon {
        color: #333cad;
        margin-right: 5px;
    }
`;

export function TaskRow(props) {
    return (
        <RowContainer>
            <RowTitleContainer>
                <div className="left-container">
                    <div className="title">Task title <span className="total-task">(26)</span> </div>
                </div>
                <div className="right-container">
                    <button className="add-new-task-button"><FontAwesomeIcon icon={faPlus} className="plus-icon" /> New task</button>            
                </div>
            </RowTitleContainer>
        </RowContainer>
    )
}