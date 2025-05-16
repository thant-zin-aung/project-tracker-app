import Header from "./Header/Header"
import { TaskContainer } from "./TaskContainer"
import PageStyle from './HomePage.module.css'

export function HomePage(props) {
    return (
        <div className={PageStyle.page}>
            <Header />
            <TaskContainer />
        </div>
    )
}