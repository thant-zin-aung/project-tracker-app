import styled from 'styled-components';

const ProjectForm = styled.div`
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
    & .input-field-container label {
        opacity: 0.7;
        margin-bottom: 5px;
        display: inline-block;
    }
    & .input-field-container input {
        border: 1px solid;
        border-color: #ededed;
        background-color: #f8f8f8;
        width: 100%;
        height: 30px;
        border-radius: 3px;
        padding-left: 10px;
        transition: border 0.3s ease;
        font-size: 12px;
    }
    & .input-field-container input:hover {
        border-color: #acb0f9;
    }
    & .input-field-container input:focus {
        outline-color: #acb0f9;
    }
    & .add-button {
        width: 100%;
        height: 40px;
        background-color: #4953d6;
        border: none;
        color: white;
        border-radius: 20px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    & .add-button:hover {
        box-shadow: 1px 1px 16px 1px #b7bbec;
    }

`;

export function NewProjectForm() {
    return (
        <ProjectForm>
                    <h2 className="form-title">Create New Project</h2>
                    <p className="form-sub-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam accusantium omnis saepe sed aperiam minima ipsum illo, facilis dolores at voluptatibus unde pariatur quasi nostrum, nam autem, architecto quia.</p>
                    <div className="input-field-container">
                        <div>
                                <label htmlFor="task-title">Project Title <span className='star-icon'>*</span></label>
                                <input type="text" id='task-title' spellCheck="false"/>
                        </div>
                        <button className="add-button">ADD</button>
                    </div>
        </ProjectForm>    
    )
}