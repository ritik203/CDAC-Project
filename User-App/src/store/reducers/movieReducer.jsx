// reducers/movieReducer.js

import { BOOK_TICKET, SELECT_SEAT, VIEW_SHOWS, CANCEL_TICKET } from '../actions/movieActions';

// Initial State
const initialState = {
  shows: [],
  selectedSeats: [],
  ticketDetails: null,
  bookedTickets: [],
};

// Reducer Function
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_SHOWS:
      return {
        ...state,
        shows: action.payload,
      };
    case SELECT_SEAT:
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, action.payload],
      };
    case BOOK_TICKET:
      return {
        ...state,
        ticketDetails: action.payload,
        bookedTickets: [...state.bookedTickets, action.payload],
        selectedSeats: [],
      };
    case CANCEL_TICKET:
      return {
        ...state,
        bookedTickets: state.bookedTickets.filter(ticket => ticket.id !== action.payload),
      };
    default:
      return state;
  }
};

export default movieReducer;
