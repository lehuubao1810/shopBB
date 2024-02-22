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
  // Lookup,
} from "devextreme-react/data-grid";

import SideBar from "../../components/admin/SideBar";
import TableDashboard from "../../components/admin/TableDashboard";

import { host } from "../../context/host";

import "../../assets/css/admin/ManageProducts.css";
import "devextreme/dist/css/dx.light.css";

export default function ManageProducts() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Quản lý sản phẩm | Admin";
  }, []);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([]);
  const [productsDisplay, setProductsDisplay] = useState([]);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch(`${host.dev}/api/product?perPage=1000`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products);
      setProductsDisplay(data.products);
      // console.log(data.products);
    })
    .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const result = products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
    setProductsDisplay(result);
  }

  return (
    <div className="manageProductsPage">
      <SideBar />
      <div className="manageProductsPage__content">
        <div className="manageProductsPage__content__header">
          {/* <div className="manageProductsPage__content__header__notify__item">
            <i className="fa-solid fa-bell"></i>
          </div> */}
          <form className="search">
            <input
              type="text"
              placeholder="Nhập tên sản phẩm cần tìm"
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
          <div
                className="manageProductsPage__content__header__item"
                onClick={() => navigate("/admin/create-product")}
              >
                Thêm sản phẩm
              </div>
        </div>
        <div className="manageProductsPage__content__body">
          <div className="manageProductsPage__content__body__listProducts">
            <TableDashboard
              header={[
                "Tên sản phẩm",
                "Giá bán",
                "Giảm giá",
                "Đã bán",
                "Tồn kho",
              ]}
              data={productsDisplay}
              type="product"
            />
          </div>
          <div className="manageProductsPage__content__body__listProducts">
          <DataGrid
        dataSource={products}
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
          mode="batch"
          useIcons={true}
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          // startEditAction="dblClick"
          // selectTextOnEditStart={true}
        />
        {/* <Column dataField="Product" groupIndex={0} /> */}
        {/* <Column
        dataField="Amount"
        caption="Sale Amount"
        dataType="number"
        format="currency"
        alignment="right"
      />
      <Column
        dataField="Discount"
        caption="Discount %"
        dataType="number"
        format="percent"
        alignment="right"
        allowGrouping={false}
        cellRender={DiscountCell}
        cssClass="bullet"
      />
      <Column dataField="SaleDate" dataType="date" />
      <Column dataField="Region" dataType="string" />
      <Column dataField="Sector" dataType="string" />
      <Column dataField="Channel" dataType="string" />
      <Column dataField="Customer" dataType="string" width={150} /> */}

        <Column dataField="name" caption="Name" />
        <Column
          dataField="price"
          caption="Price"
          dataType="number"
          format={{
            type: "currency",
            currency: "VND",
            precision: 0,
          }}
          alignment="center"
        />
        <Column
          dataField="discount"
          caption="Discount"
          dataType="number"
          format="percent"
          alignment="center"
        />

        <Column
          dataType="string"
          dataField="category"
          caption="Category"
          // cellRender={CategoryCell}
        >
        </Column>
        <Column dataType="number" dataField="sold" caption="Sold" />

        <Pager allowedPageSizes={[5,10,25,100]} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
          </div>
        </div>
        {false && <div className="overlay"></div>}
      </div>
    </div>
  );
}
