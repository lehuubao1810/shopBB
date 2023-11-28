import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { host } from "../context/host";

function Footer() {

  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${host.dev}/api/category`)
      .then((res) => res.json())
      .then((metadata) => {
        setCategories(metadata.data);
      });
  }, []);

  return (
    <footer>
      <div className="footer__row">
        <div className="footer__col">
          <div className="footer__col__title">Danh mục sản phẩm</div>
          {/* <a href="/laptop" className="footer__col__item">
            Laptop
          </a> */}
          {
            categories.map((category) => (
              <a key={category._id} onClick={()=> navigate(`/${category.slug}`)} className="footer__col__item">
                {category.name}
              </a>
            ))
          }

        </div>
        <div className="footer__col">
          <div className="footer__col__title">Cộng đồng Shop BB</div>
          <div className="footer__col__item">
            Gọi mua hàng (miễn phí) 1800.1060
          </div>
          <div className="footer__col__item">Gọi khiếu nại 1800.1062</div>
          <a href="#" className="footer__col__item">
            Facebook Shop BB
          </a>
          <a href="#" className="footer__col__item">
            Instagram Shop BB
          </a>
          <a href="#" className="footer__col__item">
            Youtube Shop BB
          </a>
        </div>
        <div className="footer__col">
          <div className="footer__col__title">Liên hệ</div>
          <div className="footer__col__item">
            Hỗ trợ khách hàng:
            <a href="mailto:cskh@bb.com">cskh@bb.com</a>
          </div>
          <div className="footer__col__item">
            Hỗ trợ bảo hành:
            <a href="mailto:htbh@bb.com">htbh@bb.com</a>
          </div>
          <div className="footer__col__item">
            Góp ý, khiếu nại:
            <a href="mailto:kn@bb.com">kn@bb.com</a>
          </div>
          <a href="/contact" className="footer__col__item">
            Liên hệ, feedback
          </a>
        </div>
        <div className="footer__col">
          <div className="footer__col__title">Chính sách</div>
          <a onClick={()=> navigate('/policy/return-policy')} className="footer__col__item">
            Chính sách đổi trả
          </a>
          <a onClick={()=> navigate('/policy/warranty-policy')} className="footer__col__item">
            Chính sách bảo hành
          </a>
          <a onClick={()=> navigate('/policy/shipping-policy')} className="footer__col__item">
            Chính sách vận chuyển
          </a>
        </div>
      </div>
      <div className="footer__row">
        <div className="footer__col">
          <div className="footer__col__title">Phương thức thanh toán</div>
          <div className="footer__payment">
            {/* <div className="payment__item">
              <i className="fa-solid fa-qrcode"></i>
              <p>QR Code</p>
            </div> */}
            <div className="payment__item">
              <i className="fa-solid fa-money-bill"></i>
              <p>Tiền mặt</p>
            </div>
            <div className="payment__item">
              <i className="fa-brands fa-cc-visa"></i>
              <p>Thẻ Visa, Master, JCB</p>
            </div>
          </div>
        </div>
        <div className="footer__col bank">
          <div className="footer__col__title">
            Danh sách các ngân hàng có thể thanh toán
          </div>
          <img
            src="https://shopfront-cdn.tekoapis.com/static/vnpay_banks.png"
            alt="vnpay-banks"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
