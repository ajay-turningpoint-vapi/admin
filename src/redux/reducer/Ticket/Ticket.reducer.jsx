import { ADD_TICKET, FETCH_TICKETS_FAILURE, FETCH_TICKETS_REQUEST, FETCH_TICKETS_SUCCESS, UPDATE_TICKET_STATUS } from "../../actions/Ticket/ticket.action";

  
  const initialState = {
    loading: false,
    tickets: [],
    error: null,
  };
  
  export const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TICKETS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_TICKETS_SUCCESS:
        return { ...state, loading: false, tickets: action.payload };
      case FETCH_TICKETS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADD_TICKET:
        return { ...state, tickets: [action.payload, ...state.tickets] };
        case UPDATE_TICKET_STATUS:
        return {
          ...state,
          tickets: state.tickets.map((ticket) =>
            ticket._id === action.payload._id
              ? { ...ticket, status: action.payload.status }
              : ticket
          ),
        };
      default:
        return state;
    }
  };
  