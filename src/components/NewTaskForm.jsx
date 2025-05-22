import styled from 'styled-components';

const NewTaskFormContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TaskFormContainer = styled.div`
    width: 600px;
    height: max-content;
    padding: 5px;
    background-color: white;
    border-radius: 15px;
`;
const TaskForm = styled.div`
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
    & .input-field-container {
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        font-size: 13px;
    }
    & .input-field-container > div {
        margin-bottom: 20px;
    }
    & .input-field-container .first-row-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /* margin-bottom: 20px; */
        gap: 20px
    }
    & .input-field-container .first-row-container > div {
        width: 100%;
    }
    & .input-field-container label {
        opacity: 0.7;
        margin-bottom: 5px;
        display: inline-block;
    }
    & .input-field-container input,textarea {
        border: 1px solid;
        border-color: #ededed;
        background-color: #f8f8f8;
        width: 100%;
        height: 30px;
        border-radius: 3px;
        padding-left: 10px;
    }
    & textarea {
        height: 100px;
        padding: 10px;
    }
    & .star-icon {
        font-size: 13px;
        color: red;
    }
`;

export function NewTaskForm() {
    return (
        <NewTaskFormContainer>
            <TaskFormContainer>
                <TaskForm>
                    <h2 className="form-title">Create New Task</h2>
                    <p className="form-sub-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam accusantium omnis saepe sed aperiam minima ipsum illo, facilis dolores at voluptatibus unde pariatur quasi nostrum, nam autem, architecto quia.</p>
                    <div className="input-field-container">
                        <div className="first-row-container">
                            <div>
                                <label htmlFor="task-title">Title <span className='star-icon'>*</span></label>
                                <input type="text" id='task-title' spellCheck="false"/>
                            </div>
                            <div>
                                <label htmlFor="task-status">Status <span className='star-icon'>*</span></label>
                                <input type="text" id='task-status' spellCheck="false" />
                            </div>
                        </div>
                        <div className='date-container'>
                            <label htmlFor="task-due-date">Assignee <span className='star-icon'>*</span></label>
                            <input type="date" name="due-date" id="task-due-date" />
                        </div>
                        <div className='desc-container'>
                            <label htmlFor="task-title">Description <span className='star-icon'>*</span></label>
                            <br />
                            <textarea name="" id=""  spellCheck="false" ></textarea>
                        </div>
                    </div>
                </TaskForm>    
            </TaskFormContainer>
            
        </NewTaskFormContainer>
    )
}