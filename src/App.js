import React, { useState } from "react"; // notice here useState is called using destructuring

function expensiveInitialState() {
  // some heavy for loop here
  return 10;
}

function App() {
  // useState returns an arr, but people usually do it like this
  const [count, setCount] = useState(() => expensiveInitialState()); // write like this -> call only the first time render, not everytime the compo rerender

  const [{ count1, count2 }, setSpecificCount] = useState({
    count1: 15,
    count2: 20
  }); // this state is an obj with 2 props

  // setCount can be pass a function to it -> pass an update func inside hooks func
  /* this is ok setCount(count + 1)
  this is better setCount(currentCount => currentCount + 1) (Why: to avoid race condition things and having many updates at the same time)
  
  if when hooks state is an obj -> has many props, while you only wanna update 1 prop -> you need to write rest operator before changing the only prop you wanna change in the state obj
  example when calling state func to change a state obj:           
  setSpecificCount(currentState => ({...currentState,count1: currentState.count1 + 1}))
  ...currentState to keep all other props with the same value, else Hooks will turn a state obj to a state primitive value (cause 1 prop usually will be a primitive value)
  then after that, write the code to change the only prop wanna change

  1 way to make this simpler is to break obj state into smaller primitive var, then use lots of useState for ez code
  */

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>+</button>
      <button
        onClick={() =>
          setSpecificCount(currentState => ({
            ...currentState,
            count1: currentState.count1 + 1
          }))
        }
      >
        ++
      </button>

      <div>{count}</div>
      <div>{count1}</div>
      <div>{count2}</div>
    </div>
  );
}
export default App;
