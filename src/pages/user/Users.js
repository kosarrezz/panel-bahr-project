import { Card, CardBody, Badge, Spinner } from "reactstrap";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Search, Eye, Edit } from "react-feather";
import toast from "react-hot-toast";
import { getUserListApi } from "../../services/user/user-services";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import UsersStats from "./UsersStats";

const Users = () => {
  const navigate = useNavigate();
  const [usersDetail, setUsersDetail] = useState(null);
  const [searchTerm, setsearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [users, setUsers] = useState([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    setHasError(false);
    //ارسالیapi
    try {
      const data = await getUserListApi({
        PageNumber: 1,
        RowsOfPage: 50,
        Query: debouncedSearchTerm,
      });

      if (data?.success === false) {
        throw new Error(data.message || "دریافت کاربر ها انجام نشد");
      }

      setUsers(data?.listUser ?? []);
    } catch (error) {
      setHasError(true);

      const errorMessage =
        error?.response?.data?.message || "خطا در دریافت کاربر ها";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  //سرح
  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  //جزییات کاربر
  const handleOpenDetail = (user) => {
    setUsersDetail(user);
    setIsOpenDetail(true);
  };

  //محتوای توی جدولل

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
            title=" ویرایش"
          >
            <Edit size={17} />
          </span>
        </div>
      ),
    },
    //استایل های شخصی
  ];
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
        color: "#6e6b7b",
        borderBottomColor: "#ebe9f1",
      },
    },
    rows: {
      style: {
        backgroundColor: "transparent",
        color: "#5e5873",
        borderBottomColor: "#ebe9f1",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f8f8f8",
      },
    },
    pagination: {
      style: {
        backgroundColor: "transparent",
        color: "#5e5873",
        borderTopColor: "#ebe9f1",
      },
    },
    progress: {
      style: {
        backgroundColor: "transparent",
        color: "#d0d2d6",
      },
    },
  };

  return (
    <>
      <UsersStats />

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h4 className="mb-0 fw-bolder">Users</h4>
          <small className="text-muted"> Users Management </small>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center bg-transparent border rounded-pill px-2"
            style={{ width: "260px", borderColor: "#404656" }}
          >
            <span className="text-muted ps-1">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none text-body"
              placeholder="جستجو کاربر..."
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn btn-primary text-nowrap"
          onClick={() => navigate("/users/add")}
        >
          {" "}
          + Add Users
        </button>
      </div>

      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            className="react-dataTable"
            responsive
            noHeader
            pagination
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
                    onClick={fetchUsers}
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
              جزئیات کاربر:{usersDetail?.userName || "کاربر"}
            </ModalHeader>
            <ModalBody>
              {usersDetail ? (
                <div className="row gy-2">
                  <div className="col-md-6">
                    <span className="fw-bold">نام : </span>
                    <span>{usersDetail.fName || "ثبت نشده"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold"> نام خانوادگی: </span>
                    {usersDetail.lName || "نامشخص"}
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold"> نام کاربری:</span>
                    <span>{usersDetail.userName || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold"> ایمیل:</span>
                    <span>{usersDetail.gmail || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold"> شماره تماس :</span>
                    <span>{usersDetail.phoneNumber || "نامشخص"} </span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">درباره کاربر: </span>
                    <span>{usersDetail.userAbout || "نامشخص"} </span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold"> لینک تلگرام:</span>
                    <span>{usersDetail.telegramLink || "نامشخص"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold"> آدرس منزل: </span>
                    <span>{usersDetail.homeAdderess || "نامشخص"} </span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold"> کد ملی: </span>
                    <span>{usersDetail.nationalCode || "نامشخص"} </span>
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
export default Users;
