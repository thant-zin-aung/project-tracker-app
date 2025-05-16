import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Card = styled.div`
    width: 100%;
    height: auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    
    & .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    & .title-container .left-container {
        display: flex;
        align-items: center;
    }
    & .title-container .left-container .status-icon {
        font-size: 7px;
        margin-right: 10px;
    }
    & .title-container .left-container .card-title {
        font-size: 16px;
    }
    & .title-container .right-container {
        display: flex;
        align-items: center;
        color: grey;
    }
    & .title-container .right-container .pin-icon {
        font-size: 15px;
        margin-right: 10px;
    }
    & .title-container .right-container .pin-number {
        font-size: 15px;
    }
    & .desc-container {
        width: 100%;
        text-align: left;
        color: grey;
        font-size: 15px;
    }
`

export function TaskCard(props) {
    return (
        <Card>
            <div className="title-container">
                <div className="left-container">
                    <FontAwesomeIcon icon={faCircle} className='status-icon' style={{color: "#ffc260",}} />
                    <span className='card-title'>Design</span>
                </div>
                <div className="right-container">
                    <FontAwesomeIcon icon={faPaperclip} className='pin-icon' />
                    <span className='pin-number'>1</span>
                </div>
            </div>
            <div className="desc-container">
                Create additional fields for payment flow. Update design system.
            </div>
        </Card>
    )
}