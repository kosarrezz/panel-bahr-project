import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  Spinner,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { getUserListApi } from "../../services/user/user-services";
import { Eye, Edit } from "react-feather";
import ReactPaginate from "react-paginate";

const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  tableWrapper: {
    style: {
      backgroundColor: "transparent",
    },
  },
  headRow: {
    style: {
      backgroundColor: "transparent",
      color: "inherit",
      borderBottomColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  rows: {
    style: {
      backgroundColor: "transparent",
      color: "inherit",
      borderBottomColor: "rgba(255, 255, 255, 0.08)",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.04)",
    },
  },
};

const UsersListWidget = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 5;

  const [usersDetail, setUsersDetail] = useState(null);
  const [searchTerm, setsearchTerm] = useState("");
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const handleOpenDetail = (user) => {
    setUsersDetail(user);
    setIsOpenDetail(true);
  };

  const fetchUsers = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      setHasError(false);

      try {
        const data = await getUserListApi({
          PageNumber: page,
          RowsOfPage: rowsPerPage,
          SortingCol: "title",
          SortType: "asc",
          Query: "",
        });

        if (data?.success === false) {
          throw new Error(data.message || "دریافت کاربران انجام نشد");
        }

        setUsers(data?.listUser ?? []);
        setTotalCount(data?.totalCount ?? 0);
      } catch (error) {
        setHasError(true);
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "خطا در دریافت کاربران",
        );
        e.error("خطا در دریافت کاربران:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [rowsPerPage],
  );

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  const columns = [
    {
      name: "نام و نام خانوادگی",
      minWidth: "150px",
      cell: (row) => {
        const fullName =
          `${row.fName || ""} ${row.lName || ""}`.trim() || "بدون نام";
        const firstLetter = row.fName ? row.fName.charAt(0) : "U";

        return (
          <div className="d-flex align-items-center py-1">
            {row.tumbImageAddress || row.currentPictureAddress ? (
              <img
                src={row.tumbImageAddress || row.currentPictureAddress}
                alt={fullName}
                className="rounded me-2"
                width="40"
                height="40"
              />
            ) : (
              <div
                className="avatar bg-light-primary rounded me-2 d-flex align-items-center justify-content-center fw-bolder"
                style={{ width: "40px", height: "40px" }}
              >
                <span>{firstLetter}</span>
              </div>
            )}

            <div className="d-flex flex-column">
              <span className="fw-bolder">{fullName}</span>
            </div>
          </div>
        );
      },
    },
    {
      name: "نام کاربری",
      selector: (row) => row.userName || "---",
      sortable: true,
      width: "280px",
    },
    {
      name: "شماره تماس ",
      selector: (row) => row.phoneNumber || "---",
      sortable: true,
      width: "190px",
    },
    {
      name: "ایمیل",
      selector: (row) => row.gmail || "ثبت نشده",
      width: "280px",
    },
    {
      name: "وضعیت",
      cell: (row) => (
        <Badge color={row.active ? "light-success" : "light-danger"} pill>
          {row.active ? "فعال" : "غیر فعال"}
        </Badge>
      ),
    },
    {
      name: "عملیات",
      minWidth: "130px",
      cell: (row) => (
        <div className="column-action d-flex align-items-center gap-1">
          <span
            role="button"
            className="cursor-pointer text-secondary"
            onClick={() => {
              handleOpenDetail(row);
            }}
            title="مشاهده جزئیات"
          >
            <Eye size={17} />
          </span>
          <span
            role="button"
            className="cursor-pointer text-primary mx-1"
            onClick={() => navigate(`/users/edit/${row.id}`)}
            title="ویرایش"
          >
            <Edit size={17} />
          </span>
        </div>
      ),
    },
  ];
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage - 1}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(totalCount / rowsPerPage) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="mb-0 fw-bolder">Users</h4>
      </div>

      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            className="react-dataTable"
            responsive
            noHeader
            pagination
            paginationServer
            paginationComponent={CustomPagination}
            data={users}
            sortServer
            customStyles={customStyles}
            progressPending={isLoading}
            progressComponent={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "300px" }}
              >
                <Spinner color="primary" />
                <span className="ms-1">در حال بارگذاری کاربرها...</span>
              </div>
            }
            noDataComponent={
              hasError ? (
                <div className="p-3 text-center">
                  <div className="mb-2">دریافت کاربر با خطا مواجه شد.</div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => fetchUsers(currentPage)}
                  >
                    تلاش مجدد
                  </button>
                </div>
              ) : (
                <div className="p-3">کاربری یافت نشد</div>
              )
            }
          />
          <Modal
            isOpen={isOpenDetail}
            toggle={() => setIsOpenDetail(!isOpenDetail)}
            className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              toggle={() => setIsOpenDetail(!isOpenDetail)}
              className="bg-primary text-white"
            >
              جزئیات کاربر: {usersDetail?.userName || "کاربر"}
            </ModalHeader>
            <ModalBody>
              {usersDetail ? (
                <div className="row gy-2">
                  <div className="col-md-6">
                    <span className="fw-bold">نام: </span>
                    <span>{usersDetail.fName || "ثبت نشده"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">نام خانوادگی: </span>
                    <span>{usersDetail.lName || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">نام کاربری: </span>
                    <span>{usersDetail.userName || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">ایمیل: </span>
                    <span>{usersDetail.gmail || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">شماره تماس: </span>
                    <span>{usersDetail.phoneNumber || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">درباره کاربر: </span>
                    <span>{usersDetail.userAbout || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">لینک تلگرام: </span>
                    <span>{usersDetail.telegramLink || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">آدرس منزل: </span>
                    <span>{usersDetail.homeAdderess || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">کد ملی: </span>
                    <span>{usersDetail.nationalCode || "نامشخص"}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-3">در حال دریافت اطلاعات...</div>
              )}
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    </>
  );
};

export default UsersListWidget;
