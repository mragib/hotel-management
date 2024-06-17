import axios from "axios";
import { differenceInDays, isWithinInterval, parseISO } from "date-fns";

export async function login({ username, password }) {
  const { data } = await axios.post(
    "login",
    {
      username,
      password,
    },
    { withCredentials: true }
  );

  axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

  return data;
}

export async function getHotels() {
  const res = await axios.get("http://localhost:8000/hotels");
  if (res.status !== 200) throw new Error("Something went wrong!🔥");
  const { data } = res;
  delete data.imageURL;
  const res1 = await axios.post("http://localhost:8000/bookings", data);
  if (res1.status !== 201) throw new Error("Something went wrong!🔥");
  return res.data;
}

export async function addBooking(data) {
  console.log(data);
  const { startDate, endDate, roomId } = data;
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validate overlapping bookings except those with status CANCELLED
  const overlappingBookings = await findOverlappingBookings(roomId, start, end);

  console.log(overlappingBookings);

  if (overlappingBookings.length > 0) {
    throw new Error("The room is already booked for the selected date range.");
  }

  const stay = differenceInDays(endDate, startDate) + 1;

  data.numOfStay = stay;
  data.totalAmount = stay * data.price;
  const res = await axios.post("http://localhost:8000/bookings", data);
  if (res.status !== 201) throw new Error("Something went wrong!🔥");

  return res.data;
}

export async function getBookings(id) {
  const res = await axios.get("http://localhost:8000/bookings");
  if (res.status !== 200) throw new Error("Something went wrong!🔥");
  const filterBookings = res.data.filter((item) => item.userId === id);
  return filterBookings;
}

export async function getAllBookings() {
  const res = await axios.get("http://localhost:8000/bookings");
  if (res.status !== 200) throw new Error("Something went wrong!🔥");

  return res.data;
}

const findOverlappingBookings = async (roomId, start, end) => {
  const bookings = await getAllBookings();

  const overlappingBookings = bookings.filter((booking) => {
    const { startDate, endDate } = booking;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    return (
      booking.roomId === roomId &&
      ((startDateObj <= end && endDateObj >= start) ||
        (startDateObj <= start && endDateObj >= end))
    );
  });

  return overlappingBookings;
};

export async function IsBooked(roomId, date) {
  // Parse the input date string into a Date object
  const inputDate = parseISO(date);

  const bookings = await getAllBookings();
  const found = bookings.find((booking) => {
    const { startDate, endDate } = booking;
    const startDateObj = parseISO(startDate);
    const endDateObj = parseISO(endDate);

    // Check if inputDate is within the range of startDateObj and endDateObj (inclusive)
    return (
      booking.roomId === roomId &&
      isWithinInterval(inputDate, { start: startDateObj, end: endDateObj })
    );
  });

  return !!found;
}

export function findUserStays(userId, hotels, bookings) {
  // Helper function to validate the booking
  function isValidBooking(booking) {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    return (
      startDate <= endDate && booking.numOfStay > 0 && booking.totalAmount > 0
    );
  }

  // Get the valid bookings for the given user
  const userBookings = bookings.filter(
    (booking) => booking.userId === userId && isValidBooking(booking)
  );

  // Create a map of roomId to hotel details
  const roomToHotelMap = {};
  hotels.forEach((hotel) => {
    hotel.rooms.forEach((room) => {
      roomToHotelMap[room.roomId] = {
        hotelName: hotel.name,
        roomName: room.name,
        image: room.imageURL,
      };
    });
  });

  // Find stays with valid bookings
  const stays = userBookings.map((booking) => {
    const hotelDetails = roomToHotelMap[booking.roomId];
    return {
      hotelName: hotelDetails.hotelName,
      roomName: hotelDetails.roomName,
      bookingId: booking.id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalAmount: booking.totalAmount,
      image: hotelDetails.image,
    };
  });

  return stays;
}
