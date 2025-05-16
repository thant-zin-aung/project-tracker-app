import { TaskRow } from "./TaskRow";

const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '50px',
}

export function TaskContainer(props) {
    return (
        <section style={sectionStyle}>
            <TaskRow />
            <TaskRow />
            <TaskRow />
        </section>
    );
}