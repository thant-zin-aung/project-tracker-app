import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

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

    & .star-icon {
        font-size: 13px;
        color: red;
    }
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
    & .image-container input {
        display: none;
    }
    & .image-container .task-image-label {
        width: 100%;
        height: 200px;
        background-color: #f8f8f8;
        border: 2px dashed #acb0f9;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: 1;
        cursor: pointer;
    }
    & .image-container .task-image-label .upload-cloud-icon {
        font-size: 80px;
        color: #6b71ec;
        margin-bottom: 5px;
        text-align: center;
        margin-bottom: 15px;
    }
    & .image-container .task-image-label .hint-text {
        width: 100%;
        text-align: center;
        font-size: 17px;
        opacity: 1;
        font-weight: 500;
    }
    & .image-container .task-image-label .hint-text u {
        color: #6b71ec;
        cursor: pointer;
        font-weight: 700;
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
                            <label htmlFor="task-due-date">Finish Due Date <span className='star-icon'>*</span></label>
                            <input type="date" name="due-date" id="task-due-date" />
                        </div>
                        <div className='desc-container'>
                            <label htmlFor="task-desc">Description <span className='star-icon'>*</span></label>
                            <br />
                            <textarea name="" id="task-desc"  spellCheck="false" ></textarea>
                        </div>
                        <div className="image-container">
                            <label htmlFor="">Image</label>
                            <br />
                            <label htmlFor="task-image" className='task-image-label'>
                                <FontAwesomeIcon icon={faCloudArrowUp} className='upload-cloud-icon' />
                                <div className="hint-text"><u>Browse</u> Files to upload</div>
                            </label>
                            <input type="file" name="task-image" id="task-image" />
                        </div>
                    </div>
                </TaskForm>    
            </TaskFormContainer>
            
        </NewTaskFormContainer>
    )
}