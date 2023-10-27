import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const notify = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast(message);
        break;
    }
  };
  return (
    <>
      <button onClick={() => notify("success", "Success")}>Notify</button>
      <ToastContainer />
    </>
  );
}
