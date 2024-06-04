type ListProps<Item> = {
  items: []
  getKey: (item: Item) => React.Key
  renderItem: (item: Item) => React.ReactNode
}

export default function List<Item>({ items, getKey, renderItem }: ListProps<Item>) {
  return (
    <div>
      {items.map((item) => (
        <div key={getKey(item)}>{renderItem(item)}</div>
      ))}
    </div>
  )
}
