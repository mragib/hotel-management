import { useParams } from "react-router-dom";
import useHostel from "./useHostel";
import RoomItem from "./RoomItem";
import styles from "./HotelDetails.module.css";

function HotelDetails() {
  const { hotels, isLoading } = useHostel();
  const { hotelId } = useParams();
  if (isLoading) return <p>Loading</p>;

  const hotel = hotels.find((item) => item.hotelId === +hotelId);
  if (!hotel) <p>There is no hotel</p>;
  const { imageURL, name, address, rooms } = hotel;

  return (
    <div className={styles.hotelContainer}>
      <div className={styles.imageContainer}>
        <img src={imageURL} className={styles.image}></img>
        <p>{name}</p>
        <p>{address}</p>
      </div>

      {rooms.map((room) => (
        <RoomItem key={room.roomId} room={room} />
      ))}
    </div>
  );
}

export default HotelDetails;
