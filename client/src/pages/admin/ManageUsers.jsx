import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import SideBar from "../../components/admin/SideBar";
import TableDashboard from "../../components/admin/TableDashboard";

import { host } from "../../context/host";

import "../../assets/css/admin/ManageUsers.css";

export default function ManageUsers() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Quản lý nguời dùng | Admin";
  }, []);

  // const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);
  const [usersDisplay, setUsersDisplay] = useState([]);

  useEffect(() => {
    const accessToken = Cookies.get("access-token");
    const userId = Cookies.get("user-id");
    fetch(`${host.dev}/api/shop`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setUsersDisplay(data.data);
        // console.log(data.data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const result = users.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
    setUsersDisplay(result);
  }

  return (
    <div className="manageUsersPage">
      <SideBar />
      <div className="manageUsersPage__content">
        <div className="manageUsersPage__content__header">
          {/* <div className="manageUsersPage__content__header__notify__item">
            <i className="fa-solid fa-bell"></i>
          </div> */}
          <form className="search">
            <input
              type="text"
              placeholder="Nhập tên người dùng cần tìm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.replace(/\s+/g, " "));
              }}
            />
            <button
              onClick={(e) => handleSearch(e)}
              className="btnSearch"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          {/* <div
            className="manageUsersPage__content__header__item"
            // onClick={() => setIsShowDeleteModal(true)}
          >
            Thêm người dùng
          </div> */}
        </div>
        <div className="manageUsersPage__content__body">
          <div className="manageUsersPage__content__body__listUsers">
            <TableDashboard
              header={[
                "Tên khách hàng",
                "Email",
                "Số lượng đơn hàng",
                "Số lượt đánh giá",
                "Ngày đăng ký",
              ]}
              data={usersDisplay}
              type="user"
            />
          </div>
        </div>
        {false && <div className="overlay"></div>}
      </div>
    </div>
  );
}
