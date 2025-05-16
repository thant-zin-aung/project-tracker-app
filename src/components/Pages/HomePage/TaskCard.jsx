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
        color: #919191;
        font-size: 15px;
        margin-bottom: 20px;
    }
    & .progress-container {
        width: 100%;
        height: 3px;
        background-color: #eaeaea;
    }
    & .progress-container .current-progress {
        height: 100%;
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
                Create additional fields for payment flow. Update design system. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam iusto, cupiditate quis deserunt, porro alias non, a ullam debitis quibusdam ex recusandae odio expedita distinctio animi inventore corrupti similique vero.
            </div>
            <div className="progress-container">
                <div className="current-progress" style={{
                    width: '30%',
                    backgroundColor: '#ffc260'
                }}></div>
            </div>
        </Card>
    )
}