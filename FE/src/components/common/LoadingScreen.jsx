import { CircularProgress } from "@mui/material";
import "../../assets/css/common/LoadingScreen.css";

export const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <CircularProgress />
    </div>
  );
};
