import Child from "./Child"

function Parent() {
  return <Child name="Sahil" age={23} address={{ street: "Hi", city: "city"}}>Hi I am Sahil</Child>
}

export default Parent
