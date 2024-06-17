import { useSelector } from "react-redux";
import useBookings from "./useBookings";
import useHostel from "../hostels/useHostel";
import { findUserStays } from "../../services/apiUser";
import styles from "./Booking.module.css";
import { differenceInDays } from "date-fns";

function Bookings() {
  const { user } = useSelector((state) => state.auth);

  const { bookings, isLoading: loadingBooking } = useBookings(user.id);
  const { hotels, isLoading: loadingHotels } = useHostel();
  if (loadingBooking || loadingHotels) return <p>Loading</p>;

  const UserStaying = findUserStays(user.id, hotels, bookings);

  return (
    <div className={styles.container}>
      {UserStaying.map((item, index) => (
        <UserBooking key={index} staying={item} />
      ))}
    </div>
  );
}

export default Bookings;

function UserBooking({ staying }) {
  const { hotelName, roomName, startDate, endDate, totalAmount, image } =
    staying;
  console.log(differenceInDays(startDate, endDate));
  // return (
  //   <div className={styles.item}>
  //     <p>{hotelName}</p>
  //     <p>{roomName}</p>
  //     <p>{startDate}</p>
  //     <p>{endDate}</p>
  //     <p>{totalAmount}</p>
  //   </div>
  // );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles["banner-image"]}>
          <img src={image} alt={roomName}></img>{" "}
        </div>
        <h1> {hotelName}</h1>
        <h2> {roomName}</h2>
        <p>
          {`${startDate} ${
            differenceInDays(startDate, endDate) !== 0 ? `To ${endDate}` : ""
          }`}
        </p>
        <h2> ${totalAmount}</h2>
      </div>
    </div>
  );
}
