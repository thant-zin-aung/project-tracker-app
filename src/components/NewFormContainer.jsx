import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const FormContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    display: ${({$isShow}) => $isShow ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
`;
const Container = styled.div`
    width: 600px;
    height: max-content;
    padding: 5px;
    background-color: white;
    border-radius: 15px;
    position: relative;

    & .close-icon {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 22px;
        /* color: #333cad; */
        cursor: pointer;
        opacity: 0.5;
        transition: all 0.3s ease;
    }
    & .close-icon:hover {
        opacity: 1;
        font-size: 25px;
        color: red;
    }
`;

export function NewFormContainer({isShowNewFormContainer, onClickClose, children}) {
    return (
        <FormContainer $isShow={isShowNewFormContainer}>
            <Container>
                <FontAwesomeIcon icon={faCircleXmark} className='close-icon' onClick={onClickClose}/>
                 {children}
            </Container>
            
        </FormContainer>
    )
}