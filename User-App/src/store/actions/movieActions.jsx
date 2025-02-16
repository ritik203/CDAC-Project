// actions/movieActions.js

// Action Types
export const BOOK_TICKET = 'BOOK_TICKET';
export const SELECT_SEAT = 'SELECT_SEAT';
export const VIEW_SHOWS = 'VIEW_SHOWS';
export const CANCEL_TICKET = 'CANCEL_TICKET';

// Action Creators
export const bookTicket = (ticketDetails) => ({
  type: BOOK_TICKET,
  payload: ticketDetails,
});

export const selectSeat = (seatId) => ({
  type: SELECT_SEAT,
  payload: seatId,
});

export const viewShows = (shows) => ({
  type: VIEW_SHOWS,
  payload: shows,
});

export const cancelTicket = (ticketId) => ({
  type: CANCEL_TICKET,
  payload: ticketId,
});
