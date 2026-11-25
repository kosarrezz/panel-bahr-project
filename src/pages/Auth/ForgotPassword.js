// ** React Imports
import { Link,useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form'
import { useState } from "react";
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub, Phone } from "react-feather";



// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/register-v2.svg";
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { registerAPI,verifyMessageAPI,sendVerifyMessageAPI } from "../../services/authService/authService";
import toast from "react-hot-toast";



const Register = () => {
  // ** Hooks
  const { skin } = useSkin();

  const navigate = useNavigate();
  const [serverError , setServerError] = useState('')
const [step,setStep] = useState(1);
const [userEmail, setUserEmail] = useState('');

  const{
    control,
    handleSubmit,
    formState:{errors},
  }=useForm({
     defaultValues: {
      phoneNumber: "",
      email: "",
      password: "",
       verifyCode: "",
    },
  })
const onSubmit = async (data) => {
  setServerError('');

  try{
    if(step === 1){
      const res = await sendVerifyMessageAPI(data.email);
      toast.success(res?.message || 'کد تایید به ایمیل شما ارسال شد');
      setUserEmail(data.email);
      setStep(2);
    }else if (step === 2){
      
      const res = await verifyMessageAPI(userEmail , data.verifyCode);
            toast.success(res?.message || 'کد تایید شد');
  setStep(3);
    } else if (step === 3){
      const res = await registerAPI({
        gmail: userEmail,
        password:data.password,
        phoneNumber: data.phoneNumber
      });
                  toast.success(res?.message || 'ثبت نام با موفقیت انجام شد  ');
                  navigate('/login');
    }
  }catch (error){
   const errMsg = error.response?.data?.message || "خطایی در ثبت‌نام رخ داد";
      setServerError(errMsg);
    toast.error(errMsg); 
  }
};

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">Vuexy</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Adventure starts here 🚀
            </CardTitle>
            <CardText className="mb-2">
              Make your app management easy and fun!
            </CardText>
            <Form
              className="auth-register-form mt-2"
               onSubmit={handleSubmit(onSubmit)}                            >


                  <div className="mb-1">
                    <Label className="form-label" for="register-email">
                      Email
                    </Label>
                    
                    <Controller
                      control={control}
                      name="email"
                      rules={{
                        required: "ایمیل الزامی است",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "فرمت ایمیل نامعتبر است"
                        }
                      }}
                      render={({ field }) => (
                        <Input
                          type="email"
                          disabled={step > 1} 
                          id="register-email"
                          placeholder="john@example.com"
                          invalid={errors.email ? true : false}
                          {...field}
                        />
                      )}
                    />

                    {errors.email && (
                      <span className="text-danger">{errors.email.message}</span>
                    )}
                  </div>
                    {step === 2 &&(
                      <div className="mb-1">
                        <Label className="form-label" for="verifycode">
                          کد تایید
                        </Label>
                      <Controller
                        id="verifyCode"
                        name="verifyCode"
                       control={control}
                       rules={{required :'کد تایید الزامی است'}}
                       render={({field}) => (
                        <Input
                        {...field}
                        placeholder="123456"
                        invalid={!!errors.verifyCode}
                         autoFocus

                        />
                       )}
                          />
                          {errors.verifyCode && <FormFeedback>{errors.verifyCode.message}</FormFeedback>}
                      </div>
                    )}



              {step === 3 && (
                     <div className="mb-1">
                  <Label className="form-label" for="register-username">
                    phoneNumber
                  </Label>
                  
                  <Controller
                    control={control}
                    name="phoneNumber"
                    rules={{ required: "شماره تلفن الزامی است" }}
                    render={({ field }) => (
                      <Input
                        type="text"
                        id="register-phoneNumber"
                        placeholder="phoneNumber"
                        autoFocus
                        invalid={errors.phoneNumber ? true : false}
                        {...field}
                      />
                    )}
                  />

                  {errors.phoneNumber  && (
                    <span className="text-danger">{errors.phoneNumber.message}</span>
                  )}
                </div>
                    )}
                    {step === 3 && (
                    <div className="mb-1">
                      <Label className="form-label" for="login-password">Password</Label>
                      <Controller
                        name="password"
                        control={control}
                          rules={{
                            required: "رمز عبور را وارد کنید",
                            minLength: {
                              value: 6,
                              message: "رمز عبور باید حداقل ۶ کاراکتر باشد"
                            }
                          }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="password"
                            id="login-password"
                            invalid={!!errors.password}
                          />
                        )}
                      />
                      {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                                      )}


              <div className="form-check mb-1">
                <Input type="checkbox" id="terms" />
                <Label className="form-check-label" for="terms">
                  I agree to
                  <a
                    className="ms-25"
                    href="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    privacy policy & terms
                  </a>
                </Label>
              </div>
              {serverError && (
                <div className="text-danger small mb-1 text-center">
                  {serverError}
                </div>
              )}

                <Button color="primary" block type="submit">            
                    {step === 1 && 'ارسال کد تایید'}
                      {step === 2 && 'تایید کد'}
                      {step === 3 && 'تکمیل و ساخت حساب'}
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">از قبل حساب کاربری دارید؟</span>
              <Link to="/login">
                <span>وارد شوید</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
