import { useSelector,useDispatch } from "react-redux";
import { setToasts } from "../store/slice/MeetingSlice";

function useToast() {
  const toasts = useSelector((zoom) => zoom.meetings.toasts);
  const dispatch = useDispatch();
  const createToast = ({
    title,
    type,
  }) => {
    dispatch(
      setToasts(
        toasts.concat({
          id: new Date().toISOString(),
          title,
          color: type,
        })
      )
    );
  };
  return [createToast];
}

export default useToast;