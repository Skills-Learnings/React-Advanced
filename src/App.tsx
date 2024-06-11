import Calendar from "./Components/Calendar"
import EventsProvider, { EventsContext } from "./Context/Events"

function App() {
  return (
    <EventsProvider>
      <Calendar/>
    </EventsProvider>
  )
}

export default App
