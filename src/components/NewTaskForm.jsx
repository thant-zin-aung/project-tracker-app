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
    }
`;

export function NewTaskForm() {
    return (
        <NewTaskFormContainer>
            <TaskFormContainer>
                <TaskForm>
                    <h2 className="form-title">Create New Task</h2>
                    <p className="form-sub-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam accusantium omnis saepe sed aperiam minima ipsum illo, facilis dolores at voluptatibus unde pariatur quasi nostrum, nam autem, architecto quia.</p>
                </TaskForm>    
            </TaskFormContainer>
            
        </NewTaskFormContainer>
    )
}