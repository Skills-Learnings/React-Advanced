import { ReactNode, createContext, useState } from "react"

export type Event = {
  id: string
  name: string
  allDay?: boolean
  startTime?: string
  endTime?: string
  date: Date
  color: string
}

type EventsContextProps = {
  events: Event[]
  addEvent: (event: Event) => void
  editEvent: (id: string, eventDetails: Event) => void
  deleteEvent: (id: string) => void
}

export const EventsContext = createContext<EventsContextProps | null>(null)

type EventProviderProps = {
  children: ReactNode
}

export default function EventsProvider({ children }: EventProviderProps) {
  const [events, setEvents] = useState<Event[]>([])

  function addEvent(eventData: Event) {
    setEvents((e) => [...e, { ...eventData, id: crypto.randomUUID() }])
  }

  function editEvent(id: string, eventDetails: Event) {
    setEvents((e) => {
      return e.map((event) => {
        return event.id === id ? { id, ...eventDetails } : event
      })
    })
  }

  function deleteEvent(id: string) {
    setEvents(e => e.filter(event => event.id !== id))
  }


  return (
    <EventsContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  )
}
