import { Card, CardBody, Spinner, Badge,   Modal, ModalHeader, ModalBody, } from "reactstrap";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Search, Eye, XCircle, CheckCircle } from "react-feather";
import toast from "react-hot-toast";
import {
  getCourseReservesApi,
  sendReserveToCourseApi,
  getCourseReserveByIdApi 
} from "../../services/reserve/courseReserveService";
import ReseveState from "../../pages/reserve/ReserveState"

const CourseReserve = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reserves, setReserves] = useState([]);

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [reserveDetail, setreserveDetail] = useState(null);

  const fetchCourseReserves = async () => {
    setIsLoading(true);
    setHasError(false);
    //ارسالیapi
    try {
      const data = await getCourseReservesApi({
        PageNumber: 1,
        RowsOfPage: 30,
        Query: debouncedSearchTerm,
      });

      if (data?.success === false) {
        throw new Error(data.message || "دریافت رزرو ها انجام نشد");
      }

      setReserves(data || []);
    } catch (error) {
      setHasError(true);

      const errorMessage =
        error?.response?.data?.message || "خطا در دریافت رزرو ها";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptReserve = async (row) => {
    try {
      const payload = {
        courseId: row.courseId,
        courseGroupId: row.courseGroupId,
        studentId: row.studentId,
      };
      const response = await sendReserveToCourseApi(payload);

      if (response?.success === false) {
        throw new Error(response.message || "خطا در تایید رزرو");
      }
      toast.success("رزرو با موفقیت تایید شد و به دانشجو تبدیل شد");
      fetchCourseReserves();
    } catch (error) {
      const errorMessage = error?.response?.data?.message ||   error.message ||      "خطا در انجام عملیات";
      toast.error(errorMessage);
    }
  };

  //سرح
  useEffect(() => {
    fetchCourseReserves();
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);


  //جزییات رزرو
const handleOpenDetail = async (reserveId, courseId) => {
  try {
    const res = await getCourseReserveByIdApi(courseId);
    const selectedReserve = res.find((item) => item.id === reserveId);

    if (!selectedReserve) {
      toast.error("جزئیات این رزرو پیدا نشد");
      return;
    }

    setreserveDetail(selectedReserve);
    setIsOpenDetail(true);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "دریافت جزئیات رزرو با خطا مواجه شد",
    );
  }
};

  //محتوای توی جدولل

  const columns = [
    {
      name: "نام دوره",
      selector: (row) => row.courseName,
      sortable: true,
      minWidth: "250px",
    },
    {
      name: "نام دانشجو",
      selector: (row) => row.studentName,
      sortable: true,
      minWidth: "200px",
    },

    {
      name: "وضعیت",
      cell: (row) => (
        <Badge color={row.accept ? "light-success" : "light-warning"} pill>
          {row.accept ? "تایید شده" : "در انتظار تایید"}
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
        onClick={() => handleOpenDetail(row.id, row.courseId)}

            title="مشاهده جزئیات"
          >
            <Eye size={17} />
          </span>

          {!row.accept ? (
            <span
              role="button"
              className="cursor-pointer text-danger"
                onClick={() => handleAcceptReserve(row)}
              title="تایید رزرو"
            >
              <XCircle size={17} />
            </span>
          ) : (
            <span
              role="button"
              className="cursor-pointer text-success"
              onClick={() => {}}
              title="تایید شده"
            >
              <CheckCircle size={17} />
            </span>
          )}
        </div>
      ),
    },
  ];
  //استایل های شخصی

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
    <ReseveState />
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h4 className="mb-0 fw-bolder">Course Reserves</h4>
          <small className="text-muted"> Course Reserve Management </small>
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
              placeholder="جستجو در رزروها..."
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            className="react-dataTable"
            responsive
            noHeader
            pagination
            data={reserves}
            sortServer
            customStyles={customStyles}
            progressPending={isLoading}
            progressComponent={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "300px" }}
              >
                <Spinner color="primary" />
                <span className="ms-1">در حال بارگذاری رزروها...</span>
              </div>
            }
            noDataComponent={
              hasError ? (
                <div className="p-3 text-center">
                  <div className="mb-2">دریافت رزرو ها با خطا مواجه شد.</div>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={fetchCourseReserves}
                  >
                    تلاش مجدد
                  </button>
                </div>
              ) : (
                <div className="p-3">رزروها یافت نشد</div>
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
              جزئیات رزرو:
            </ModalHeader>
          <ModalBody>
            {reserveDetail ? (
              <div className='row gy-2'>
                <div className='col-md-6'>
                  <span className='fw-bold' > نام دانشجو : </span>
                  <span>{reserveDetail.studentName}</span>
                </div>
                <div className='col-md-6'>
                  <span className='fw-bold'>  نام دوره رزرو شده  : </span>
                    {reserveDetail.courseName  || 'نامشخص'}
                </div>
                      <div className='col-md-6'>
                  <span className='fw-bold'>  ایمیل  :</span>
                  <span>{reserveDetail.studentEmail || 'نامشخص'}</span>
                </div>
                  <div className='col-md-6'>
                  <span className='fw-bold'>  ایدی دانشجو  : </span>
                    {reserveDetail.studentId  || 'نامشخص'}
                </div>
                      <div className='col-md-6'>
                  <span className='fw-bold'>  ایدی درس  :</span>
                  <span>{reserveDetail.courseId || 'نامشخص'}</span>
                </div>
                  
             

              </div>
            ) : (
                            <div className='text-center p-3'>در حال دریافت اطلاعات...</div>
            )}
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    </>
  );
};
export default CourseReserve;