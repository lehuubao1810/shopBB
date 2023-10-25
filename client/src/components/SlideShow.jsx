import { useState, useEffect, useMemo } from "react";

// { images }
function SlideShow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = useMemo(
    () => [
      {
        id: 1,
        url: "https://lh3.googleusercontent.com/YSEh7mEEW8a_KbVD42Mut-z-NVGg_x9d8YBLcI8ZHZxX0PPVLz30TqanefsaJITaHRRimZ8W75k2SD6WXoqEogPcpqj4EePL=w1920-rw",
      },
      {
        id: 2,
        url: "https://lh3.googleusercontent.com/vkMMX2cvl_1ii0c_vw5TGy4ixhRc-l7OlMWnmx4-oxquqHo_A9aET_lWxDmxbh-GMZTr3O5JS4kGNa0Ka7hcctxo2lj0xoUR=w1920-rw",
      },
      {
        id: 3,
        url: "https://lh3.googleusercontent.com/KU0g__QTkLdAAyt_Oa18jVsgyXlIkWGSoEZNHKSjLtSB91w-442-nKtaUDOFantvGyLslr22rM_kJVkWARby5s75UFrXWUo=w1920-rw"
      },
      {
        id: 4,
        url: "https://lh3.googleusercontent.com/ryKnRM6pBr5ZGqtuLq8Quys5eiwxBFtnNlKSOwPFCDY0kJY46D6NofSl-71_LpfDNqHptA9DGjJLHwNKp7qukpSFy9GUEoti=w1920-rw"
      },
      {
        id: 5,
        url: "https://lh3.googleusercontent.com/NEyGqAS4HkBmVGWbdLxRCJ7v4n7Xz-Xcfs6ffoxCNZMHBg0txwJk7L0FVyBvjZ9mwdFsV915-uAWlcX_JPHD1yJSq2EYfeV6=w1920-rw"
      },
      {
        id: 6,
        url: "https://lh3.googleusercontent.com/mlKfpZQs80dvjAYeeB4MwQe4-rJvb3ZTJ_s5PS9v1PCPxY4T-QD9EjhBKNyRUMnvQwZBwntSHPAoQpPVdddH-ZTJot08WqC3=w1920-rw"
      },
      {
        id: 7,
        url: "https://lh3.googleusercontent.com/7fLNK64SX-6-xlW1aHfS0kbJOs8XxPpVPvDJIhL_3PS34Vo9VXTZTzaFRRtdoY38r2_XYbjonorwEmSUQgYkZXnSuVqSTvmB=w1920-rw"
      }
    ],
    []
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="slideShow">
      {images.map((image, index) => (
        <img
          key={image.url}
          src={image.url}
          alt={`Slide ${index}`}
          style={{
            display: index === currentImageIndex ? "block" : "none",
            width: "100%",
            height: "600px",
            objectFit: "cover",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor:
                index === currentImageIndex
                  ? "#0248b8"
                  : "rgba(255, 255, 255, 0.5)",
              margin: "0 5px",
              cursor: "pointer",
            }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default SlideShow;
