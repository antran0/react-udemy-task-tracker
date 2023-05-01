import Section from "../UI/Section";
import TaskItem from "./TaskItem";
import classes from "./Tasks.module.css";

const Tasks = (props) => {
  let taskList = <h2>No tasks found. Start adding some!</h2>;

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task, index) => (
          <TaskItem key={task.id}>
            <div>{task.text}</div>
            <button type="button" onClick={() => clickHandler(index)}>
              &#10003;
            </button>
          </TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = "Loading tasks...";
  }

  function clickHandler(index) {
    const task = props.items[index];
    const url =
      "https://react-udemy-task-tracker-default-rtdb.firebaseio.com/tasks/".concat(
        `${task.id}.json`
      );

    const requestConfig = {
      url: url,
      method: "DELETE",
    };

    props.onFetch(requestConfig, (data) => {});
    props.onDeleteTask(index);
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
