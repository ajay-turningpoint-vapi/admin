import toast from "react-hot-toast";
import { url } from "../../../services/url.service";
import apiClient from "../../../services/apiClient";
export const FETCH_TICKETS_REQUEST = "FETCH_TICKETS_REQUEST";
export const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_TICKETS_FAILURE";
export const ADD_TICKET = "ADD_TICKET";
export const UPDATE_TICKET_STATUS = "UPDATE_TICKET_STATUS";

// Fetch tickets
export const fetchTickets = () => async (dispatch) => {
  dispatch({ type: FETCH_TICKETS_REQUEST });
  try {
    const response = await apiClient.get(`${url}/ticket`);
    console.log(response);

    dispatch({ type: FETCH_TICKETS_SUCCESS, payload: response.data.tickets });
  } catch (error) {
    toast.error("Failed to load tickets. Please try again.");
    dispatch({ type: FETCH_TICKETS_FAILURE, payload: error.message });
  }
};

export const fetchTicketsAdmin = () => async (dispatch) => {
  dispatch({ type: FETCH_TICKETS_REQUEST });
  try {
    const response = await apiClient.get(`${url}/ticket/admin`);


    dispatch({ type: FETCH_TICKETS_SUCCESS, payload: response.data.tickets });
  } catch (error) {
    toast.error("Failed to load tickets. Please try again.");
    dispatch({ type: FETCH_TICKETS_FAILURE, payload: error.message });
  }
};

// Add ticket
export const addTicket = (ticketData) => async (dispatch) => {
  try {
    const response = await apiClient.post(`${url}/ticket`, ticketData);
    console.log(response);

    dispatch({ type: ADD_TICKET, payload: response.data.ticket });
  } catch (error) {
    console.error("Failed to add ticket:", error);
    toast.error("Failed to submit the ticket. Please try again.");
  }
};

export const updateTicketStatus = (_id, newStatus) => async (dispatch) => {
  try {
    const response = await apiClient.put(`${url}/ticket/${_id}`, {
      status: newStatus,
    });
    dispatch({
      type: UPDATE_TICKET_STATUS,
      payload: { _id, status: newStatus },
    });
  } catch (error) {
    console.error("Failed to update ticket status:", error);
  }
};
