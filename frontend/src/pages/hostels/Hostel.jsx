import { useNavigate } from "react-router-dom";
import styles from "./hotel.module.css";

function Hostel({ hotel }) {
  const { hotelId, name, address, imageURL } = hotel;
  const navigator = useNavigate();
  return (
    <li className={styles.hotel}>
      <img src={imageURL} alt={name} />
      <div>
        <p>{name}</p>
        <p>{address}</p>
        <button onClick={() => navigator(`/hotels/${hotelId}`)}>Explore</button>
      </div>
    </li>
  );
}

export default Hostel;
