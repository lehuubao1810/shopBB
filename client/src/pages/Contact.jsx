import Header from "../components/Header";
import Footer from "../components/Footer";
import UpBtn from "../components/UpBtn";

import "../assets/css/ContactPage.css";

export default function Contact() {
  return (
    <div className="contactPage">
      <Header />
      <div className="contactPage__content">
        <div className="contactPage__content__info">
          <h3>Thông tin liên hệ</h3>
          <p>Phone: 0123456789</p>
          <p>Email:</p>
          <p>Address:</p>
        </div>
        <div className="contactPage__content__info">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2771.216307332875!2d106.71676790629064!3d10.804289550995684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293dceb22197%3A0x755bb0f39a48d4a6!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggLSBDxqEgc-G7nyAx!5e0!3m2!1svi!2s!4v1700625674483!5m2!1svi!2s" width="100%" height="600" style={{border:0, objectFit:"contain"}}allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <UpBtn />
      <Footer />
    </div>
  );
}
