import styles from "./RoomItem.module.css";
import { BsCurrencyDollar, BsPeople } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import Modal from "../../UI/Modal";
import CreateBookingForm from "../booking/CreateBookingForm";

function RoomItem({ room }) {
  const { imageURL, roomType, capacity, price, description, name } = room;
  return (
    <div className={styles.room}>
      <img src={imageURL} alt={name}></img>

      <div className={styles.details}>
        <p>{name}</p>
        <p>
          <BsCurrencyDollar />
          {price}
        </p>
        <p>
          <BiCategory />
          {roomType}
        </p>
        <p>
          <TbListDetails />
          {description}
        </p>
        <p>
          <BsPeople />
          {capacity}
        </p>
        <Modal>
          <Modal.Open opens="booking-form">
            <button>Book now</button>
          </Modal.Open>
          <Modal.Window name="booking-form">
            <CreateBookingForm room={room} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default RoomItem;
