import Header from "./Header/Header"
import PageStyle from './Page.module.css'
export function Page(props) {
    return (
        <div className={PageStyle.page}>
            <Header />
        </div>
    )
}