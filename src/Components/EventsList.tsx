import { useState } from "react"
import { Event, EventsContext } from "../Context/Events"
import EventForm from "./EventForm"
import { useEvents } from "../Context/useEvents"

type EventsListProps = {
  events: Event[]
}

export default function EventsList({ events }: EventsListProps) {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)

  const { editEvent, deleteEvent } = useEvents()

  return (
    <div className="events">
      {events.map((event) => (
        <button
          onClick={() => setIsEditFormOpen(true)}
          key={event.id}
          className={`event ${event.allDay ? "all-day-event" : ""} ${
            event.color
          }`}
        >
          {event.allDay ? (
            <div className="event-name">{event.name}</div>
          ) : (
            <>
              <div className={`color-dot ${event.color}`}></div>
              <div className="event-time">{event.startTime}</div>
              <div className="event-name">{event.name}</div>
            </>
          )}
          <EventForm
            event={event}
            day={event.date}
            onSubmit={(e) => editEvent(event.id, e)}
            onDelete={() => deleteEvent(event.id)}
            isOpen={isEditFormOpen}
            onClose={() => setIsEditFormOpen(false)}
          />
        </button>
      ))}
    </div>
  )
}
