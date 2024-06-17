import { useSelector } from "react-redux";
import styles from "./createBookingForm.module.css";
import { Controller, useForm } from "react-hook-form";
import useCreateBooking from "./useCreateBooking";
import { IsBooked } from "../../services/apiUser";

function CreateBookingForm({ room, onCloseModal }) {
  const { user } = useSelector((state) => state.auth);
  const { handleSubmit, reset, control, formState, setError, clearErrors } =
    useForm();
  const { booking, isCreating } = useCreateBooking();

  const { errors } = formState;

  if (isCreating) return <p>Loading...</p>;

  function onsubmit(data) {
    (data.userId = user.id),
      (data.roomId = room.roomId),
      (data.price = room.price);
    booking(
      {
        ...data,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onsubmit, onError)}>
      <div className={styles.form_control}>
        <label htmlFor="startDate">From</label>
        {/* <input
          type="date"
          id="startDate"
          placeholder="From Date"
          {...register("startDate", { required: "This is required" })} */}
        <div>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "This is required" }}
            render={({ field: { onChange, ...field } }) => (
              <input
                {...field}
                type="date"
                placeholder="From Date"
                onChange={(e) => {
                  onChange(e);
                  // setValue(
                  //   "totalPayable",
                  //   (getValues().totalAmount - e.target.value).toFixed(2)
                  // );
                  // e.target.value > 0 ? setIsPaying(true) : setIsPaying(false);
                  const checkBooked = IsBooked(room.roomId, e.target.value);

                  checkBooked.then((value) => {
                    value
                      ? setError(e.target.name, {
                          type: "manual",
                          message: "The room is already booked at this date",
                        })
                      : clearErrors(e.target.name);
                  });
                }}
              />
            )}
          />
          <p>{errors?.startDate && errors?.startDate?.message}</p>
        </div>
      </div>
      <div className={styles.form_control}>
        <label htmlFor="endDate">To</label>
        <div>
          <Controller
            name="endDate"
            control={control}
            rules={{ required: "This is required" }}
            render={({ field: { onChange, ...field } }) => (
              <input
                {...field}
                type="date"
                placeholder="To Date"
                onChange={(e) => {
                  onChange(e);
                  // setValue(
                  //   "totalPayable",
                  //   (getValues().totalAmount - e.target.value).toFixed(2)
                  // );
                  // e.target.value > 0 ? setIsPaying(true) : setIsPaying(false);
                  const checkBooked = IsBooked(room.roomId, e.target.value);

                  checkBooked.then((value) => {
                    value
                      ? setError(e.target.name, {
                          type: "manual",
                          message: "The room is already booked at this date",
                        })
                      : clearErrors(e.target.name);
                  });
                }}
              />
            )}
          />
          <p>{errors?.endDate && errors?.endDate?.message}</p>
        </div>
      </div>
      <button type="submit">Confirm</button>
    </form>
  );
}

export default CreateBookingForm;
