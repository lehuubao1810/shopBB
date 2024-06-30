import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../assets/css/Policy.css";

export default function Policy() {
  const { policyName } = useParams();

  useEffect(() => {
    let title = '';
    if (policyName === "warranty-policy") {
      title = "Chính sách bảo hành";
    }
    if (policyName === "shipping-policy") {
      title = "Chính sách vận chuyển";
    }
    if (policyName === "return-policy") {
      title = "Chính sách đổi trả";
    }
    document.title = `${title} | Shop BB`;
  }, [policyName]);

  return (
    <div className="policyPage">
      <Header />
      <div className="policyPage__content">
        {policyName === "warranty-policy" ? (
          <div className="policy-content">
            <h2 className="policy-title">Chính sách bảo hành</h2>

            <p className="policy-info">
              <span>Đối tượng áp dụng: </span>Tất cả các sản phẩm điện tử được
              bán trên shop thương mại điện tử.
            </p>

            <p className="policy-info">
              <span>Thời hạn bảo hành: </span>
              <br />
              * Đối với sản phẩm chính hãng: * Máy tính, laptop: 24 tháng. *
              Điện thoại: 12 tháng.
              <br />* Đối với sản phẩm OEM: * Máy tính, laptop: 12 tháng. * Điện
              thoại: 06 tháng.
            </p>

            <p className="policy-info">
              <span>Điều kiện bảo hành: </span>
              <br />* Sản phẩm còn trong thời hạn bảo hành.
              <br />
              * Sản phẩm có tem bảo hành chính hãng còn nguyên vẹn.
              <br />* Sản phẩm bị hư hỏng do lỗi kỹ thuật của nhà sản xuất.
            </p>

            <p className="policy-info">
              <span>Phạm vi bảo hành: </span>
              <br />* Bảo hành sửa chữa miễn phí các lỗi kỹ thuật của nhà sản
              xuất. <br />* Không bảo hành các lỗi do người dùng gây ra như: rơi
              vỡ, va đập, ngấm nước, cháy nổ,...
            </p>

            <p className="policy-info">
              <span>Quy trình bảo hành: </span> <br />* Khách hàng mang sản phẩm
              đến cửa hàng hoặc gửi sản phẩm về cho shop. <br />* Shop tiếp nhận
              sản phẩm và kiểm tra tình trạng. <br />* Nếu sản phẩm thuộc diện
              được bảo hành, shop sẽ tiến hành sửa chữa hoặc thay thế linh kiện
              miễn phí. <br />* Thời gian bảo hành tùy thuộc vào mức độ hư hỏng
              của sản phẩm.
            </p>
          </div>
        ) : (
          ""
        )}
        {policyName === "shipping-policy" ? (
          <div className="policy-content">
            <h2>Chính sách vận chuyển</h2>

            <p className="policy-info">
              <span>Đối tượng áp dụng: </span>Tất cả các đơn hàng được đặt trên
              shop thương mại điện tử.
            </p>

            <p className="policy-info">
              <span>Phí vận chuyển: </span>
              <br />
              * Miễn phí vận chuyển cho đơn hàng từ 1 triệu đồng trở lên.
              <br />* Phí vận chuyển sẽ được tính dựa trên trọng lượng và khoảng
              cách vận chuyển.
            </p>

            <p className="policy-info">
              <span>Hình thức vận chuyển: </span>* Shop sử dụng dịch vụ vận
              chuyển của các đơn vị uy tín như Giao hàng nhanh, Viettel Post,...
            </p>

            <p className="policy-info">
              <span>Thời gian vận chuyển: </span>
              <br />
              * Nội thành: 1-2 ngày làm việc.
              <br />* Ngoại thành: 2-3 ngày làm việc.
            </p>
          </div>
        ) : (
          ""
        )}
        {policyName === "return-policy" ? (
          <div className="policy-content">
            <h2>Chính sách hoàn trả</h2>

            <p className="policy-info">
              <span>Đối tượng áp dụng: </span>Tất cả các đơn hàng được đặt trên
              shop thương mại điện tử.
            </p>

            <p className="policy-info">
              <span>Thời hạn đổi trả: </span>* Trong vòng 07 ngày kể từ ngày
              nhận hàng.
            </p>

            <p className="policy-info">
              <span>Điều kiện đổi trả: </span>
              <br />* Sản phẩm còn nguyên vẹn, chưa qua sử dụng. <br />* Sản
              phẩm còn nguyên tem, nhãn mác. <br />* Có hóa đơn mua hàng.
            </p>
            <p className="policy-info">
              <span>Quy trình đổi trả: </span>
              <br />* Khách hàng liên hệ với shop qua hotline hoặc email để
              thông báo về nhu cầu đổi trả. <br />* Shop sẽ tiếp nhận thông tin
              và hướng dẫn khách hàng thực hiện đổi trả. <br />* Khách hàng mang
              sản phẩm đến cửa hàng hoặc gửi sản phẩm về cho shop. <br />* Shop
              tiếp nhận sản phẩm và kiểm tra tình trạng. <br />* Nếu sản phẩm
              đáp ứng các điều kiện đổi trả, shop sẽ tiến hành đổi sản phẩm mới
              hoặc hoàn tiền cho khách hàng.
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
}
