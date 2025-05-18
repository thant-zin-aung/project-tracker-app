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
    display: none;
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
`;

export function NewTaskForm() {
    return (
        <NewTaskFormContainer>
            <TaskFormContainer>
                <TaskForm>
                    <h1>Hello from form</h1>    
                </TaskForm>    
            </TaskFormContainer>
            
        </NewTaskFormContainer>
    )
}