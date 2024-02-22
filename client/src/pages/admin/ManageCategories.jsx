import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Editing,
  FilterRow,
  HeaderFilter,
  FilterPanel,
  FilterBuilderPopup,
  // Button,
  // Lookup,
} from "devextreme-react/data-grid";

import SideBar from "../../components/admin/SideBar";
import TableDashboard from "../../components/admin/TableDashboard";

import { host } from "../../context/host";

import "../../assets/css/admin/ManageCategories.css";
import "devextreme/dist/css/dx.light.css";

export default function ManageCategories() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Quản lý danh mục sản phẩm | Admin";
  }, []);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoriesDisplay, setCategoriesDisplay] = useState([]);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch(`${host.dev}/api/category`)
      .then((res) => res.json())
      .then((metadata) => {
        setCategories(metadata.data);
        setCategoriesDisplay(metadata.data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const result = categories.filter((category) => {
      return category.name.toLowerCase().includes(search.toLowerCase());
    });
    setCategoriesDisplay(result);
  }

  return (
    <div className="manageCategoriesPage">
      <SideBar />
      <div className="manageCategoriesPage__content">
        <div className="manageCategoriesPage__content__header">
          {/* <div className="manageCategoriesPage__content__header__notify__item">
            <i className="fa-solid fa-bell"></i>
          </div> */}
          <form className="search">
            <input
              type="text"
              placeholder="Nhập tên danh mục cần tìm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.replace(/\s+/g, " "));
              }}
            />
            <button
              onClick={e => handleSearch(e)}
              className="btnSearch"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div
            className="manageCategoriesPage__content__header__item"
            onClick={() => navigate("/admin/create-category")}
          >
            Thêm danh mục
          </div>
        </div>
        <div className="manageCategoriesPage__content__body">
          <div className="manageCategoriesPage__content__body__listCategories">
            <TableDashboard
              header={[
                "Tên danh mục",
                "Slug",
                "Số lượng sản phẩm",
                "Số thuộc tính",
                "Ngày cập nhật",
              ]}
              data={categoriesDisplay}
              type="category"
            />
          </div>
          <div className="manageCategoriesPage__content__body__listCategories">
            <DataGrid
              dataSource={categories}
              allowColumnReordering={true}
              rowAlternationEnabled={true}
              showBorders={true}
              width="100%"
              onContentReady={(e) => {
                if (!collapsed) {
                  e.component.expandRow(["EnviroCare"]);
                  setCollapsed(true);
                }
              }}
            >
              <FilterRow visible={true} />
              <FilterPanel visible={true} />
              <FilterBuilderPopup />
              <HeaderFilter visible={true} />
              <GroupPanel visible={true} />
              <SearchPanel visible={true} highlightCaseSensitive={true} />
              <Grouping autoExpandAll={false} />
              <Editing
                mode="row"
                useIcons={true}
                allowUpdating={true}
                allowDeleting={true}
                allowAdding={true}
                // startEditAction="dblClick"
                // selectTextOnEditStart={true}
              />
              {/* <Column type="buttons" width={110}>
                <Button name="edit" />
                <Button name="delete" />
              </Column> */}
              <Column dataField="name" caption="Name" />
              <Column dataField="slug" caption="Slug" alignment="center" />
              <Column
                dataField="createdAt"
                caption="Created At"
                dataType="date"
                alignment="center"
              />
              <Column
                dataField="updatedAt"
                caption="Updated At"
                dataType="date"
                alignment="center"
              />

              <Pager
                allowedPageSizes={[5, 10, 25, 100]}
                showPageSizeSelector={true}
              />
              <Paging defaultPageSize={10} />
            </DataGrid>
          </div>
        </div>
        {false && <div className="overlay"></div>}
      </div>
    </div>
  );
}
