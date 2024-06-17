import Hostel from "./Hostel";
import useHostel from "./useHostel";
import styles from "./hotels.module.css";

function Hotels() {
  const { hotels, isLoading } = useHostel();
  if (isLoading) return <p>Loading</p>;
  return (
    <ul className={styles.hotels}>
      {hotels.map((hotel) => (
        <Hostel hotel={hotel} key={hotel.hotelId} />
      ))}
    </ul>
  );
}

export default Hotels;
