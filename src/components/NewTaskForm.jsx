import styled from 'styled-components';

const NewTaskFormContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
`;

export function NewTaskForm() {
    return (
        <NewTaskFormContainer>
            <h1>Hello from form</h1>
        </NewTaskFormContainer>
    )
}