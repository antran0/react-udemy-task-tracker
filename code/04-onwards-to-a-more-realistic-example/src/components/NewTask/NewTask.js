import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useHttp();

  const addNewTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = (taskText) => {
    const requestConfig = {
      url: "https://react-udemy-task-tracker-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    };

    // The first argument is 'this' and is set to null because
    // we don't need 'this' here.
    // The second argument, taskText, will be the first argument passed to
    // addNewTask while 'data' will still be passed as usual.
    //
    // This needs to be done to ensure that taskText received from the form is
    // made available to the callbackfn 'addNewTask' that is passed to useHttp
    // because this callbackfn is called with only one argument.
    sendRequest(requestConfig, addNewTask.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
