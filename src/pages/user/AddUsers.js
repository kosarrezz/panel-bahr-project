// ** React Imports

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
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import {createUsers} from "../../services/user/user-services"
import { useNavigate } from "react-router-dom";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const defaultValues = {
    firstName:" ",
    lastName:" ",
    gmail:" ",
    password:" ",
    phoneNumber:" ",
    role: ""
};

const AddUsers = () => {
  // ** States
  
   const navigate = useNavigate();


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


const onSubmit = async (data) => {

  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    gmail: data.gmail,
    password: data.password,
    phoneNumber: data.phoneNumber,
    isStudent: data.role === "student",
    isTeacher: data.role === "teacher",
  };

  try {
    const result = await createUsers(payload);

    if (result?.success) {
      toast.success(result?.message || "کاربر با موفقیت ایجاد شد");
      reset(defaultValues);
      navigate("/users");

    } else {
      toast.error(result?.message || "خطا در ثبت کاربر");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "خطا در برقراری ارتباط با سرور"
    );
  }

};


  const onError = () => {
    toast.error("لطفاً تمام فیلدهای الزامی را به درستی تکمیل کنید");
  };

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">افزودن کاربر جدید</CardTitle>
      </CardHeader>
      <CardBody className="my-2 py-50">
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="firstName">
                نام 
                 <span className="text-danger">*</span>
              </Label>
              <Controller
                id="firstName"
                control={control}
                name="firstName"
                rules={{ required: "لطفاً نام  کاربر را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    placeholder="نام "
                    invalid={errors.firstName && true}
                    {...field}
                  />
                )}
              />
              {errors.firstName  && (
                <FormFeedback>{errors.firstName.message}</FormFeedback>
              )}
            </Col>
                        <Col md="6" className="mb-1">
              <Label className="form-label" for="lastName">
                نام خانوادگی 
                <span className="text-danger">*</span>
              </Label>
              <Controller
                id="lastName"
                control={control}
                name="lastName"
                rules={{ required: "لطفاً نام خانوادگی کاربر را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    placeholder="نام خانوادگی..."
                    invalid={errors.lastName && true}
                    {...field}
                  />
                )}
              />
              {errors.lastName   && (
                <FormFeedback>{errors.lastName.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="gmail">
               ایمیل کاربر  
                <span className="text-danger">* </span>
              </Label>
              <Controller
                id="gmail"
                control={control}
                name="gmail"
                rules={{ 
                required: "لطفاً ایمیل کاربر را وارد کنید",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "فرمت ایمیل وارد شده نامعتبر است"
                }
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="مثال: ....@gmail.com"
                    invalid={errors.gmail && true}
                    {...field}
                  />
                )}
              />
              {errors.gmail  && (
                <FormFeedback>{errors.gmail.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="password">
               پسوورد   
               <span className="text-danger">* </span>
              </Label>
              <Controller
                id="password"
                control={control}
                 name="password"
                        rules={{ 
                        required: "لطفاً پسوورد را وارد کنید",
                        minLength: {
                            value: 6,
                            message: "رمز عبور باید حداقل ۶ کاراکتر باشد"
                        }
                        }}     
                   render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="پسوورد"
                    invalid={errors.password && true}
                    {...field}
                  />
                )}
              />
              {errors.password  && (
                <FormFeedback>{errors.password.message}</FormFeedback>
              )}
            </Col>



            <Col md="6" className="mb-1">
              <Label className="form-label" for="phoneNumber">
                 شماره تماس   
              <span className="text-danger">* </span>
              </Label>
              <Controller
                id="phoneNumber"
                control={control}
                name="phoneNumber"
                rules={{ required: "لطفاً شماره تماس را وارد کنید" }}
                render={({ field }) => (
                <Input
                type="text"
                placeholder="شماره تماس..."
                invalid={errors.phoneNumber && true}
                {...field}
                />

                )}
              />
              {errors.phoneNumber && (
            <FormFeedback>{errors.phoneNumber.message}</FormFeedback>
            )}

            </Col>


<Col md="6" className="mb-1">
  <Label className="form-label">نوع کاربر</Label>

  <Controller
    name="role"
    control={control}
    rules={{
      required: "لطفاً نوع کاربر را انتخاب کنید",
    }}
    render={({ field }) => (
      <>
        <div>
          <Input
            type="radio"
            id="student"
            name={field.name}
            value="student"
            checked={field.value === "student"}
            onChange={() => field.onChange("student")}
            onBlur={field.onBlur}
            innerRef={field.ref}
          />
          <Label for="student" className="ms-1">
            دانشجو
          </Label>
        </div>

        <div>
          <Input
            type="radio"
            id="teacher"
            name={field.name}
            value="teacher"
            checked={field.value === "teacher"}
            onChange={() => field.onChange("teacher")}
            onBlur={field.onBlur}
            innerRef={field.ref}
          />
          <Label for="teacher" className="ms-1">
            استاد
          </Label>
        </div>
      </>
    )}
  />

  {errors.role && (
    <FormFeedback className="d-block">
      {errors.role.message}
    </FormFeedback>
  )}
</Col>



            <Col xs="12" className="mt-2">


              <Button type="submit" className="me-1" color="primary">
                ثبت کاربر
              </Button>
                            <Button
                type="button"
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

export default AddUsers;
