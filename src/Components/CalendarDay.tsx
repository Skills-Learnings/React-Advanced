import { endOfDay, format, isBefore, isSameMonth, isToday } from "date-fns"
import { useState } from "react"
import EventForm from "./EventForm"
import { Event } from "../Context/Events"
import EventsList from "./EventsList"
import { useEvents } from "../Context/useEvents"

type CalendarDayProps = {
  day: Date
  currentMonth: Date
  showWeekDays: boolean
  events: Event[]
}

export default function CalendarDay({
  day,
  currentMonth,
  showWeekDays,
  events,
}: CalendarDayProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  const { addEvent } = useEvents()

  return (
    <div
      className={`day ${
        !isSameMonth(day, currentMonth) ? "non-month-day" : ""
      } ${isBefore(endOfDay(day), currentMonth) ? "old-month-day" : ""}`}
    >
      <div className="day-header">
        {showWeekDays && <div className="week-name">{format(day, "EEE	")}</div>}
        <div className={`day-number ${isToday(day) ? "today" : ""}`}>
          {format(day, "dd")}
        </div>
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="add-event-btn"
        >
          +
        </button>
        <EventForm
          day={day}
          onSubmit={addEvent}
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
        />
      </div>
      <EventsList events={events} />
    </div>
  )
}
