import {
  Card,
  CardBody,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import {
  getCourseListApi,
  activeAndDeactiveCourseApi,
  getCourseDetailsApi,
} from "../../services/courses/course.service";
import { Eye, Edit, XCircle, Search, CheckCircle } from "react-feather";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CourseStats from "./CourseStats";

const renderDescription = (describeString) => {
  if (!describeString) return "توضیحاتی ثبت نشده";
  try {
    const parsed =
      typeof describeString === "string"
        ? JSON.parse(describeString)
        : describeString;

    if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
      return parsed.blocks.map((blocks) => blocks.data?.text).join("");
    }
    return describeString;
  } catch (e) {
    return describeString;
  }
};

const Courses = () => {
  const navigate = useNavigate();

  const [searchTerm, setsearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [courseDetail, setCourseDetail] = useState(null);

  const fetchCourses = async () => {
    setIsLoading(true);
    setHasError(false);
    //ارسالیapi
    try {
      const data = await getCourseListApi({
        PageNumber: 1,
        RowsOfPage: 50,
        SortingCol: "title",
        Query: debouncedSearchTerm,
      });

      if (data?.success === false) {
        throw new Error(data.message || "دریافت دوره ها انجام نشد");
      }

      setCourses(data?.courseDtos ?? []);
    } catch (error) {
      setHasError(true);

      const errorMessage =
        error?.response?.data?.message || "خطا در دریافت دوره ها";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  //سرح
  useEffect(() => {
    fetchCourses();
  }, [debouncedSearchTerm]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  //اکنیو و دی اکتیو کردن دوره ها
  const handleToggleCourseStatus = async (newStatus, courseId) => {
    try {
      const res = await activeAndDeactiveCourseApi(newStatus, courseId);
      if (res.success) {
        toast.success(
          res.message || (newStatus ? "دوره فعال شد" : "دوره غیرفعال شد"),
        );
        await fetchCourses();
      } else {
        toast.error(res.message || "خطا در غیرفعال کردن دوره");
      }
    } catch (error) {
      const serverMessage = error?.response?.data?.message;
      toast.error(serverMessage || "خطا در برقراری ارتباط با سرور");
    }
  };
  //جزییات دوره
  const handleOpenDetail = async (courseId) => {
    try {
      const res = await getCourseDetailsApi(courseId);
      if (res) {
        setCourseDetail(res);
        setIsOpenDetail(true);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "دریافت جزئیات دوره با خطا مواجه شد",
      );
    }
  };

  //محتوای توی جدولل

  const columns = [
    {
      name: "دوره",
      minWidth: "300px",

      cell: (row) => (
        <div className=" d-flex align-items-center py-1 ">
          <img
            src={row.tumbImageAddress || "https://via.placeholder.com/50"}
            alt={row.title}
            className="rounded me-2"
            width="40"
            height="40"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/50";
            }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.title}</span>
            <small className="text-muted">{row.fullName || "بدون مدرس"}</small>
          </div>
        </div>
      ),
    },
    {
      name: "ظرفیت",
      selector: (row) => `${row.capacity || 0}نفر`,
      sortable: true,
    },
    {
      name: "قیمت",
      selector: (row) => `${row.cost?.toLocaleString("fa-IR")} تومان`,
    },
    {
      name: "وضعیت",
      cell: (row) => (
        <Badge color={row.isActive ? "light-success" : "light-danger"} pill>
          {row.isActive ? "فعال" : "غیر فعال"}
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
              handleOpenDetail(row.courseId);
            }}
            title="مشاهده جزئیات"
          >
            <Eye size={17} />
          </span>
          <span
            role="button"
            className="cursor-pointer text-primary mx-1"
            onClick={() => navigate(`/courses/edit/${row.courseId}`)}
            title=" ویرایش"
          >
            <Edit size={17} />
          </span>
          {row.isActive ? (
            <span
              role="button"
              className="cursor-pointer text-danger"
              onClick={() => handleToggleCourseStatus(false, row.courseId)}
              title="غیرفعال کردن دوره"
            >
              <XCircle size={17} />
            </span>
          ) : (
            <span
              role="button"
              className="cursor-pointer text-success"
              onClick={() => handleToggleCourseStatus(true, row.courseId)}
              title="فعال کردن دوره"
            >
              <CheckCircle size={17} />
            </span>
          )}
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
      <CourseStats />

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h4 className="mb-0 fw-bolder">Courses</h4>
          <small className="text-muted"> courses Management </small>
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
              placeholder="جستجو دوره..."
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn btn-primary text-nowrap"
          onClick={() => navigate("/courses/add")}
        >
          {" "}
          + Add Course
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
            data={courses}
            sortServer
            customStyles={customStyles}
            progressPending={isLoading}
            progressComponent={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "300px" }}
              >
                <Spinner color="primary" />
                <span className="ms-1">در حال بارگذاری دوره‌ها...</span>
              </div>
            }
            noDataComponent={
              hasError ? (
                <div className="p-3 text-center">
                  <div className="mb-2">دریافت دوره‌ها با خطا مواجه شد.</div>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={fetchCourses}
                  >
                    تلاش مجدد
                  </button>
                </div>
              ) : (
                <div className="p-3">دوره‌ای یافت نشد</div>
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
              جزئیات دوره: {courseDetail?.title || "در حال بارگذاری..."}
            </ModalHeader>
            <ModalBody>
              {courseDetail ? (
                <div className="row gy-2">
                  <div className="col-md-6">
                    <span className="fw-bold">نام مدرس: </span>
                    <span>{courseDetail.teacherName || "ثبت نشده"}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">وضعیت دوره: </span>
                    <Badge color="light-info" pill>
                      {courseDetail.statusName ||
                        courseDetail.courseStatusName ||
                        "نامشخص"}
                    </Badge>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">ظرفیت کل: </span>
                    <span>
                      {courseDetail.capacity
                        ? `${courseDetail.capacity} نفر`
                        : "نامشخص"}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">قیمت دوره: </span>
                    <span>
                      {courseDetail.cost
                        ? `${courseDetail.cost.toLocaleString("fa-IR")} تومان`
                        : "رایگان"}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">تعداد دانشجویان: </span>
                    <span>{courseDetail.studentCount} نفر</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-bold">امتیاز دوره: </span>
                    <span>{courseDetail.courseRate} از ۵</span>
                  </div>
                  {courseDetail.describe && (
                    <div className="col-12 mt-2">
                      <span className="fw-bold d-block mb-1">
                        توضیحات دوره:
                      </span>
                      <p className="text-muted border p-2 rounded">
                        {renderDescription(courseDetail.describe)}
                      </p>
                    </div>
                  )}
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
export default Courses;
