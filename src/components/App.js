import React from "react";
import moment from "moment";
import BigCalendar from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./../styles/App.css";

const localizer = BigCalendar.momentLocalizer(moment);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date(2023, 2, 21),
      filter: "all",

      events: [
        {
          id: 1,
          title: "Event 1",
          location: "Location 1",
          start: new Date(2023, 2, 1),
          end: new Date(2023, 2, 1)
        },
        {
          id: 2,
          title: "Event 2",
          location: "Location 2",
          start: new Date(2023, 2, 7),
          end: new Date(2023, 2, 7)
        },
        {
          id: 3,
          title: "Event 3",
          location: "Location 3",
          start: new Date(2023, 2, 10),
          end: new Date(2023, 2, 10)
        },
        {
          id: 4,
          title: "Event 4",
          location: "Location 4",
          start: new Date(2023, 2, 13),
          end: new Date(2023, 2, 13)
        },
        {
          id: 5,
          title: "Event 5",
          location: "Location 5",
          start: new Date(2023, 2, 15),
          end: new Date(2023, 2, 15)
        },
        {
          id: 6,
          title: "Event 6",
          location: "Location 6",
          start: new Date(2023, 2, 18),
          end: new Date(2023, 2, 18)
        },
        {
          id: 7,
          title: "Event 7",
          location: "Location 7",
          start: new Date(2023, 2, 22),
          end: new Date(2023, 2, 22)
        },
        {
          id: 8,
          title: "Event 8",
          location: "Location 8",
          start: new Date(2023, 2, 24),
          end: new Date(2023, 2, 24)
        },
        {
          id: 9,
          title: "Event 9",
          location: "Location 9",
          start: new Date(2023, 2, 27),
          end: new Date(2023, 2, 27)
        },
        {
          id: 10,
          title: "Event 10",
          location: "Location 10",
          start: new Date(2023, 2, 30),
          end: new Date(2023, 2, 30)
        }
      ],

      showCreatePopup: false,
      showEventPopup: false,

      selectedEvent: null,
      selectedDate: new Date(2023, 2, 21),

      title: "",
      location: "",

      editingEventId: null
    };
  }

  // -----------------------------
  // FILTER EVENTS
  // -----------------------------

  getFilteredEvents = () => {
    const { events, filter } = this.state;

    const today = moment("2023-03-21");

    if (filter === "past") {
      return events.filter(event =>
        moment(event.start).isBefore(today, "day")
      );
    }

    if (filter === "upcoming") {
      return events.filter(event =>
        moment(event.start).isSameOrAfter(today, "day")
      );
    }

    return events;
  };

  // -----------------------------
  // EVENT COLORS
  // -----------------------------

  eventStyleGetter = event => {
    const today = moment("2023-03-21");

    const isPast = moment(event.start).isBefore(today, "day");

    return {
      style: {
        backgroundColor: isPast
          ? "rgb(222, 105, 135)"
          : "rgb(140, 189, 76)",
        border: "none",
        borderRadius: "4px"
      }
    };
  };

  // -----------------------------
  // CREATE EVENT
  // -----------------------------

  openCreatePopup = () => {
    this.setState({
      showCreatePopup: true,
      title: "",
      location: "",
      selectedDate: this.state.currentDate,
      editingEventId: null
    });
  };

  closeCreatePopup = () => {
    this.setState({
      showCreatePopup: false,
      title: "",
      location: "",
      editingEventId: null
    });
  };

  handleSelectSlot = ({ start }) => {
    this.setState({
      showCreatePopup: true,
      title: "",
      location: "",
      selectedDate: start,
      editingEventId: null
    });
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  saveEvent = () => {
    const {
      title,
      location,
      events,
      selectedDate
    } = this.state;

    if (!title.trim()) {
      return;
    }

    const eventDate = selectedDate || new Date(2023, 2, 21);

    const newEvent = {
      id: Date.now(),
      title: title,
      location: location,
      start: eventDate,
      end: eventDate
    };

    this.setState({
      events: [...events, newEvent],
      showCreatePopup: false,
      title: "",
      location: "",
      selectedDate: null
    });
  };

  // -----------------------------
  // EVENT DETAILS
  // -----------------------------

  handleSelectEvent = event => {
    this.setState({
      selectedEvent: event,
      showEventPopup: true
    });
  };

  closeEventPopup = () => {
    this.setState({
      showEventPopup: false,
      selectedEvent: null
    });
  };

  // -----------------------------
  // EDIT EVENT
  // -----------------------------

  editEvent = () => {
    const { selectedEvent } = this.state;

    this.setState({
      showEventPopup: false,
      showCreatePopup: true,
      title: selectedEvent.title,
      location: selectedEvent.location,
      selectedDate: selectedEvent.start,
      editingEventId: selectedEvent.id
    });
  };

  saveEditedEvent = () => {
    const {
      events,
      editingEventId,
      title,
      location,
      selectedDate
    } = this.state;

    if (!title.trim()) {
      return;
    }

    const updatedEvents = events.map(event => {
      if (event.id === editingEventId) {
        return {
          ...event,
          title: title,
          location: location,
          start: selectedDate,
          end: selectedDate
        };
      }

      return event;
    });

    this.setState({
      events: updatedEvents,
      showCreatePopup: false,
      editingEventId: null,
      title: "",
      location: "",
      selectedDate: null
    });
  };

  // -----------------------------
  // DELETE EVENT
  // -----------------------------

  deleteEvent = () => {
    const {
      events,
      selectedEvent
    } = this.state;

    const updatedEvents = events.filter(
      event => event.id !== selectedEvent.id
    );

    this.setState({
      events: updatedEvents,
      showEventPopup: false,
      selectedEvent: null
    });
  };

  // -----------------------------
  // CALENDAR NAVIGATION
  // -----------------------------

  handleNavigate = date => {
    this.setState({
      currentDate: date
    });
  };

  // -----------------------------
  // RENDER
  // -----------------------------

  render() {
    const {
      currentDate,
      showCreatePopup,
      showEventPopup,
      selectedEvent,
      title,
      location,
      editingEventId
    } = this.state;

    return (
      <div className="app">

        {/* HEADER */}

        <div className="header">
          <h1>Event Tracker</h1>
        </div>

        {/* BUTTONS */}

        <div className="filter-container">

          {/* 0 - CREATE EVENT */}

          <button
            className="btn"
            onClick={this.openCreatePopup}
          >
            Create Event
          </button>

          {/* 1 - ALL */}

          <button
            className="btn"
            onClick={() =>
              this.setState({
                filter: "all"
              })
            }
          >
            All
          </button>

          {/* 2 - PAST */}

          <button
            className="btn"
            onClick={() =>
              this.setState({
                filter: "past"
              })
            }
          >
            Past
          </button>

          {/* 3 - UPCOMING */}

          <button
            className="btn"
            onClick={() =>
              this.setState({
                filter: "upcoming"
              })
            }
          >
            Upcoming
          </button>

        </div>

        {/* CALENDAR */}

        <div className="calendar-wrapper">

          <BigCalendar
            localizer={localizer}
            events={this.getFilteredEvents()}
            startAccessor="start"
            endAccessor="end"
            date={currentDate}
            onNavigate={this.handleNavigate}
            onSelectSlot={this.handleSelectSlot}
            onSelectEvent={this.handleSelectEvent}
            selectable
            popup
            views={["month"]}
            defaultView="month"
            eventPropGetter={this.eventStyleGetter}
          />

        </div>

        {/* CREATE / EDIT POPUP */}

        {showCreatePopup && (
          <div className="mm-popup">

            <div className="mm-popup__box">

              <div className="mm-popup__box__header">
                {editingEventId
                  ? "Edit Event"
                  : "Create Event"}
              </div>

              <div className="mm-popup__box__body">

                <input
                  type="text"
                  placeholder="Event Title"
                  value={title}
                  onChange={this.handleTitleChange}
                />

                <input
                  type="text"
                  placeholder="Event Location"
                  value={location}
                  onChange={this.handleLocationChange}
                />

              </div>

              <div className="mm-popup__box__footer">

                <button
                  className="mm-popup__btn"
                  onClick={this.closeCreatePopup}
                >
                  Cancel
                </button>

                <div className="mm-popup__box__footer__right-space">

                  <button
                    className="mm-popup__btn"
                    onClick={
                      editingEventId
                        ? this.saveEditedEvent
                        : this.saveEvent
                    }
                  >
                    Save
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* EVENT DETAILS POPUP */}

        {showEventPopup && selectedEvent && (
          <div className="mm-popup">

            <div className="mm-popup__box">

              <div className="mm-popup__box__header">
                {selectedEvent.title}
              </div>

              <div className="mm-popup__box__body">

                <p>
                  <strong>Location:</strong>{" "}
                  {selectedEvent.location}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {moment(selectedEvent.start).format(
                    "DD MMM YYYY"
                  )}
                </p>

              </div>

              <div className="mm-popup__box__footer">

                <button
                  className="mm-popup__btn mm-popup__btn--info"
                  onClick={this.editEvent}
                >
                  Edit
                </button>

                <button
                  className="mm-popup__btn mm-popup__btn--danger"
                  onClick={this.deleteEvent}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    );
  }
}

export default App;
