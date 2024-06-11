import { useEffect, useId, useRef, useState } from "react"
import { Event } from "../Context/Events"
import Modal from "./Modal"
import { format } from "date-fns"

type EventFormType = {
  day: Date
  isOpen: boolean
  event?: Event
  onClose: () => void
  onSubmit: (event: Event) => void
  onDelete?: () => void
}

export default function EventForm({
  day,
  event,
  onSubmit,
  onDelete,
  ...modalProps
}: EventFormType) {
  const isNew = event == null

  const formId = useId()

  const nameRef = useRef<HTMLInputElement>(null)
  const [isAllDay, setIsAllDay] = useState(event?.allDay || false)
  const [startTime, setStartTime] = useState(event?.startTime || "")
  const endTimeRef = useRef<HTMLInputElement>(null)
  const [selectedColor, setSelectedColor] = useState(event?.color || "red")

  useEffect(() => {}, [isAllDay])

  function handleSubmit(e) {
    e.preventDefault()

    const name = nameRef.current?.value
    const endTime = endTimeRef.current?.value

    if (name == null || name == "") return

    const commonEventData = {
      name,
      date: day,
      color: selectedColor,
    }

    let newEvent: Event

    if (isAllDay) {
      newEvent = {
        ...commonEventData,
        allDay: true,
      }
    } else {
      if (
        startTime == "null" ||
        startTime === "" ||
        endTime == null ||
        endTime === ""
      ) {
        return
      }
      newEvent = {
        ...commonEventData,
        allDay: false,
        startTime,
        endTime,
      }
    }

    modalProps.onClose()
    onSubmit(newEvent)
  }

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div>{isNew ? "Add" : "Edit"} Event</div>
        <small>{format(day, "dd/M/yy")}</small>
        <button onClick={modalProps.onClose} className="close-btn">
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input
            required
            defaultValue={event?.name}
            type="text"
            name="name"
            id={`${formId}-name`}
            ref={nameRef}
          />
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="all-day"
            id="all-day"
            checked={isAllDay}
            onChange={() => setIsAllDay((e) => !e)}
          />
          <label htmlFor="all-day">All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-start-time`}>Start Time</label>
            <input
              type="time"
              name="start-time"
              id={`${formId}-start-time`}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={isAllDay}
              required={!isAllDay}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input
              type="time"
              name="end-time"
              min={startTime}
              id={`${formId}-end-time`}
              defaultValue={event?.endTime}
              ref={endTimeRef}
              disabled={isAllDay}
              required={!isAllDay}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            <input
              type="radio"
              name="color"
              value="blue"
              id={`${formId}-blue`}
              className="color-radio"
              checked={selectedColor === "blue"}
              onChange={() => setSelectedColor("blue")}
            />
            <label htmlFor={`${formId}-blue`}>
              <span className="sr-only">Blue</span>
            </label>
            <input
              type="radio"
              name="color"
              value="red"
              id={`${formId}-red`}
              className="color-radio"
              checked={selectedColor === "red"}
              onChange={() => setSelectedColor("red")}
            />
            <label htmlFor={`${formId}-red`}>
              <span className="sr-only">Red</span>
            </label>
            <input
              type="radio"
              name="color"
              value="green"
              id={`${formId}-green`}
              className="color-radio"
              checked={selectedColor === "green"}
              onChange={() => setSelectedColor("green")}
            />
            <label htmlFor={`${formId}-green`}>
              <span className="sr-only">Green</span>
            </label>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success" type="submit">
            {isNew ? "Add" : "Edit"}
          </button>
          {onDelete != null && (
            <button onClick={onDelete} className="btn btn-delete" type="button">
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  )
}
