// ** React Imports
import { useState, useEffect } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormFeedback,
} from "reactstrap";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

// ** Services
import http from "../../services/http-service.js/http-service";
import { createCourse } from "../../services/courses/course.service";

// ** Utils
import { selectThemeColors } from "@utils";
import { useNavigate } from "react-router-dom";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const defaultValues = {
  Title: "",
  Describe: "",
  MiniDescribe: "",
  Capacity: "",
  Cost: "",
  TeacherId: "",
  StartTime: "",
  EndTime: "",
  CourseLvlId: "",
  CourseStatusId: "",
};

const AddCourse = () => {
  // ** States
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [courseStatuses, setCourseStatuses] = useState([]);
  const [courseLevels, setCourseLevels] = useState([]);

  // ** Hooks
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  // ** Effects
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await http.get("/Home/GetTeachers");
        const formattedTeachers =
          response.data?.map((teacher) => ({
            value: teacher.teacherId || teacher.id,
            label: teacher.fullName || teacher.name,
          })) || [];
        setTeachers(formattedTeachers);
      } catch (error) {
      }
    };

    const fetchOptions = async () => {
      try {
        const response = await http.get("/Course/GetCreate");
        setCourseStatuses(response.data?.statusDtos || []);
        setCourseLevels(response.data?.courseLevelDtos || []);
      } catch (error) {
      }
    };

    fetchTeachers();
    fetchOptions();
  }, []);

  const onSubmit = async (data) => {

    const startDate = data.StartTime
      ? new Date(data.StartTime).toISOString()
      : "";

    const endDate = data.EndTime ? new Date(data.EndTime).toISOString() : "";

    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("GoogleTitle", data.Title);
    formData.append("Capacity", Number(data.Capacity));
    formData.append("Cost", Number(data.Cost));
    formData.append("MiniDescribe", data.MiniDescribe);
    formData.append("Describe", data.Describe);
    formData.append("TeacherId", Number(data.TeacherId));
    formData.append("StartTime", startDate);
    formData.append("EndTime", endDate);
    formData.append("CourseLvlId", data.CourseLvlId);
    formData.append("CourseStatusId", data.CourseStatusId);

    try {
      const result = await createCourse(formData);
      if (result?.success) {
        toast.success(result?.message || "دوره با موفقیت ایجاد شد");
        reset();
        navigate("/courses-page");
      } else {
        toast.error(result?.message || "خطا در ثبت دوره");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در برقراری ارتباط با سرور",
      );
    }
  };

  const onError = (formErrors) => {
    toast.error("لطفاً تمام فیلدهای الزامی را به درستی تکمیل کنید");
  };

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">افزودن دوره جدید</CardTitle>
      </CardHeader>
      <CardBody className="my-2 py-50">
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="Title">
                نام دوره <span className="text-danger">*</span>
              </Label>
              <Controller
                id="Title"
                control={control}
                name="Title"
                rules={{ required: "لطفاً نام دوره را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    placeholder="node.js, React..."
                    invalid={errors.Title && true}
                    {...field}
                  />
                )}
              />
              {errors.Title && (
                <FormFeedback>{errors.Title.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="Capacity">
                ظرفیت دوره <span className="text-danger">*</span>
              </Label>
              <Controller
                id="Capacity"
                control={control}
                name="Capacity"
                rules={{ required: "لطفاً ظرفیت دوره را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="مثال: 50"
                    invalid={errors.Capacity && true}
                    {...field}
                  />
                )}
              />
              {errors.Capacity && (
                <FormFeedback>{errors.Capacity.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="Cost">
                قیمت دوره <span className="text-danger">*</span>
              </Label>
              <Controller
                id="Cost"
                control={control}
                name="Cost"
                rules={{ required: "لطفاً قیمت دوره را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="قیمت به تومان"
                    invalid={errors.Cost && true}
                    {...field}
                  />
                )}
              />
              {errors.Cost && (
                <FormFeedback>{errors.Cost.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="TeacherId">
                مدرس دوره <span className="text-danger">*</span>
              </Label>
              <Controller
                control={control}
                name="TeacherId"
                rules={{ required: "لطفاً مدرس دوره را انتخاب کنید" }}
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    className={`react-select ${
                      errors.TeacherId ? "is-invalid" : ""
                    }`}
                    classNamePrefix="select"
                    options={teachers}
                    noOptionsMessage={() => "مدرسی یافت نشد"}
                    theme={selectThemeColors}
                    value={
                      teachers.find((c) => c.value === Number(field.value)) ||
                      null
                    }
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value || "")
                    }
                  />
                )}
              />
              {errors.TeacherId && (
                <FormFeedback className="d-block">
                  {errors.TeacherId.message}
                </FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="MiniDescribe">
                توضیحات کوتاه
              </Label>
              <Controller
                id="MiniDescribe"
                control={control}
                name="MiniDescribe"
                render={({ field }) => (
                  <Input
                    type="textarea"
                    placeholder="توضیحات کوتاه دوره..."
                    {...field}
                  />
                )}
              />
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="Describe">
                توضیحات کامل
              </Label>
              <Controller
                id="Describe"
                control={control}
                name="Describe"
                render={({ field }) => (
                  <Input
                    type="textarea"
                    rows="3"
                    placeholder="توضیحات کامل دوره..."
                    {...field}
                  />
                )}
              />
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="StartTime">
                تاریخ شروع دوره <span className="text-danger">*</span>
              </Label>
              <Controller
                control={control}
                name="StartTime"
                rules={{ required: "لطفاً تاریخ شروع دوره را انتخاب کنید" }}
                render={({ field }) => (
                  <Input
                    type="date"
                    id="StartTime"
                    invalid={!!errors.StartTime}
                    {...field}
                  />
                )}
              />
              {errors.StartTime && (
                <FormFeedback>{errors.StartTime.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="EndTime">
                تاریخ پایان دوره <span className="text-danger">*</span>
              </Label>
              <Controller
                control={control}
                name="EndTime"
                rules={{ required: "لطفاً تاریخ پایان دوره را انتخاب کنید" }}
                render={({ field }) => (
                  <Input
                    type="date"
                    id="EndTime"
                    invalid={!!errors.EndTime}
                    {...field}
                  />
                )}
              />
              {errors.EndTime && (
                <FormFeedback>{errors.EndTime.message}</FormFeedback>
              )}
            </Col>


            <Col md="6" className="mb-1">
              <Label className="form-label" for="CourseLvlId">
                سطح دوره <span className="text-danger">*</span>
              </Label>
              <Controller
                control={control}
                name="CourseLvlId"
                rules={{ required: "لطفاً سطح دوره را انتخاب کنید" }}
                render={({ field }) => (
                  <Input
                    type="select"
                    id="CourseLvlId"
                    name={field.name}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    innerRef={field.ref}
                    invalid={!!errors.CourseLvlId}
                  >
                    <option value="">انتخاب سطح دوره</option>
                    {courseLevels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.levelName}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.CourseLvlId && (
                <FormFeedback>{errors.CourseLvlId.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="CourseStatusId">
                وضعیت دوره <span className="text-danger">*</span>
              </Label>
              <Controller
                control={control}
                name="CourseStatusId"
                rules={{ required: "لطفاً وضعیت دوره را انتخاب کنید" }}
                render={({ field }) => (
                  <Input
                    type="select"
                    id="CourseStatusId"
                    name={field.name}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    innerRef={field.ref}
                    invalid={!!errors.CourseStatusId}
                  >
                    <option value="">انتخاب وضعیت دوره</option>
                    {courseStatuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.statusName}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.CourseStatusId && (
                <FormFeedback>{errors.CourseStatusId.message}</FormFeedback>
              )}
            </Col>

            <Col xs="12" className="mt-2">
              <Button type="submit" className="me-1" color="primary">
                {" "}
                ثبت دوره{" "}
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => reset()}
              >
                انصراف
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddCourse;
