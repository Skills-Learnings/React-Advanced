import List from "./List";

export default function GenericComponentsExample() {
  return (
    <List items={[
      {id: 1, name: "Kyle"},
      {id: 2, name: "Sally"},
    ]}
    getKey={item => item.key}
    renderItem={item => <div>{item.name}</div>}
    />
  )
}
