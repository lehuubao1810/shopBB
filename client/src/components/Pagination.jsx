import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { StyledEngineProvider } from "@mui/material/styles";

export default function PaginationControlled() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //   const currentPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    setPage(value);
    searchParams.set("page", value);
    navigate({ search: searchParams.toString() });
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
  }, []);

  return (
    // <StyledEngineProvider injectFirst>
    <div className="pagination">
      <Stack spacing={2}>
        {!isMobile ? (
          <Pagination
            count={10}
            page={page}
            onChange={handleChange}
            size="large"
          />
        ) : (
          <Pagination
            count={10}
            page={page}
            onChange={handleChange}
          />
        )}
      </Stack>
    </div>
    // </StyledEngineProvider>
  );
}
