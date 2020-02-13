import React, { useState } from "react"; // use des ass to get useState
import useForm from "./useForm";

// A resource-heavy function that initialize the state first time
// -> run this is little as possible
function expensiveInitialState() {
  // heavy performance here
  return 10;
}

// Functional compo
function App() {
  // useState() returns an arr -> can des ass that arr -> write like this: `const [stateName,sateNameSetter] = useState(initialVal)`
  // const [count, setCount] = useState(expensiveInitialState); // runs everytme the app rerender -> bad
  const [count1, setCount1] = useState(() => expensiveInitialState()); // runs only 1 time starting the app, not run when app rerender
  // ---
  // here we set a state to an obj with 2 props: count2 and count3 and we also des ass to take all data from that obj
  // when dealing with complicated state -> recommend breaking state to smaller chunks and write useState() for each chunk
  const [{ count2, count3 }, setTwoCount] = useState({
    count2: 15,
    count3: 20
  });
  // ---
  // using normal hooks to handle form input
  const [email, setEmail] = useState(""); // initial value of the input field for email is an empty string
  const [password, setPassword] = useState(""); // initial value of the input field for password is an empty string
  // ---
  // using custom hooks to handle form input
  // pass an obj to custom hook -> form
  const [formData, setFormData] = useForm({ email: "", password: "" });

  return (
    <div className="App">
      <div>{count1}</div>
      <button onClick={() => setCount1(count1 + 1)}>Click to add count1</button>
      {/* <button onClick={setCount1(count1 + 1)}>Click to add count1</button> will cause error too many rerender, cause when you pass setCount1() into onClick, setCount1() will always run -> state variable count1 will always be changed -> app will always be rerender, and state is changed -> too many rerender error */}
      {/* <button onClick={() => setCount1(currentCount1 => currentCount1 + 1)}>Click to add count1</button> is better, dont know why yet */}
      <div>{count2}</div>
      <div>{count3}</div>
      <button
        onClick={() =>
          setTwoCount(currentStateObj => ({
            ...currentStateObj, // keeping all data from the state
            count2: currentStateObj.count2 + 1 // only change 1 prop inside a state, which is count2 here
          }))
        }
      >
        Click to add count2 and count3
      </button>
      {/* in hooks, if omit the line ...currentStateObj, only data from count2 will be kept -> count3 data will be lost -> state will be changed from having 2 props to only 1 prop -> bad -> use spread operator 1st to preserve data of the state, then modify the state */}
      <input
        type="email"
        name="email"
        value={email}
        onChange={eventObj => setEmail(eventObj.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={eventObj => setPassword(eventObj.target.value)}
      />
      {/* typical example of using hooks
      - input HTML ele has 2 things, a prop called value contains the data type inside it, and the GlobalEventHandler.onChange() 
      - input is a HTML ele -> is a HTMLElement, which implements GlobalEventHandlers -> input has onChange()
      - onChange must be pass a func, with 1 arg which is an obj (this obj are called event, as it can access many things, including the target which trigger onChange(), which is input ele in this situation)
      - whenever data inside input is changed -> onChange() fires -> func inside onChange() fires, which is a state setter -> state changed -> app rerender --> each time type sth to input ele, app rerender (write a log into app to check each time rerender)
      above is a normal way to handle 
      */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={setFormData}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={setFormData}
      />
      {/*  */}
    </div>
  );
}
export default App;
