import Button from "./Button"
import Child from "./Child"
import Input from "./Input"
import GenericComponentsExample from "./components/GenericComponentsExample/GenericComponentsExample"
import UseContextExample from "./components/UseContextExample/UseContextExample"
import UseReducerExample from "./components/UseReducerExample/UseReducerExample"
import UseRefExample from "./components/UseRefExample/UseRefExample"


export default function App() {
  // General use of typescript for declaring prop types.
  /* return <Child><div>Sahil</div></Child> */
  // HTML Elament Prop types in typescript example
  /* return <Button outline disabled>Hi I am a button</Button> */
  // useState with typescript example
  /* return <Input/> */
  /* // useState with typescript example
  return <UseRefExample /> */
  // useReducer with typescript example
  /* return <UseReducerExample /> */
  // useContext with typescript example
  /* return <UseContextExample /> */
  // generic components with typescript example
  return <GenericComponentsExample />
}
