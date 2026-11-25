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
import {createNewsApi,getNewsCategoryListApi} from "../../services/news-services/news-services"
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const defaultValues = {
  title: "",
  googleTitle: "",
  googleDescribe: "",
  miniDescribe: "",
  describe: "",
  keyword: "",
  imageFile: null,
  newsCategoryId:""
};

const AddNews = () => {
  // ** States
  
   const navigate = useNavigate();
const [categories , setCategories] = useState([])

  // ** Hooks

 useEffect(() => {
  const getCategories = async () => {
    try {
      const result = await getNewsCategoryListApi();
      setCategories(result); 
    } catch (error) {
    }
  };

  getCategories();
}, []);


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
    
const newsData = {
  title: data.title,
  googleTitle: data.googleTitle,
  googleDescribe: data.googleDescribe,
  miniDescribe: data.miniDescribe,
  describe: data.describe,
  keyword: data.keyword,
  imageFile: data.imageFile,
  newsCategoryId: data.newsCategoryId,
};

  try {
    const result = await createNewsApi(newsData);

    if (result?.success) {
      toast.success(result?.message || "اخبار با موفقیت ایجاد شد");
      reset(defaultValues);
      navigate("/news");

    } else {
      toast.error(result?.message || "خطا در ثبت اخبار");
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
        <CardTitle tag="h4">افزودن خبر جدید</CardTitle>
      </CardHeader>
      <CardBody className="my-2 py-50">
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="title">
                نام خبر
                 <span className="text-danger">*</span>
              </Label>
              <Controller
                id="title"
                control={control}
                name="title"
                rules={{ required: "لطفاً نام  خبر را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    placeholder=" نام  خبر"
                    invalid={errors.title && true}
                    {...field}
                  />
                )}
              />
              {errors.title  && (
                <FormFeedback>{errors.title.message}</FormFeedback>
              )}
            </Col>
                        <Col md="6" className="mb-1">
              <Label className="form-label" for="googleTitle">
                عنوان اول  
                <span className="text-danger">*</span>
              </Label>
              <Controller
                id="googleTitle"
                control={control}
                name="googleTitle"
                rules={{ required: "لطفاً عنوان اول   را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    placeholder=" عنوان اول"
                    invalid={errors.googleTitle && true}
                    {...field}
                  />
                )}
              />
              {errors.googleTitle   && (
                <FormFeedback>{errors.googleTitle.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="googleDescribe">
                عنوان دوم  
                <span className="text-danger">* </span>
              </Label>
              <Controller
                id="googleDescribe"
                control={control}
                name="googleDescribe"
                rules={{ 
                required: "لطفاً عنوان دوم  را وارد کنید",
               
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="عنوان دوم"
                    invalid={errors.googleDescribe && true}
                    {...field}
                  />
                )}
              />
              {errors.googleDescribe  && (
                <FormFeedback>{errors.googleDescribe.message}</FormFeedback>
              )}
            </Col>


            <Col md="6" className="mb-1">
              <Label className="form-label" for="keyword">
کلمات کلیدی             
              <span className="text-danger">* </span>
              </Label>
              <Controller
                id="keyword"
                control={control}
                name="keyword"
                rules={{ required: "لطفاً  کلمات کلیدی  را وارد کنید" }}
                render={({ field }) => (
                <Input
                type="text"
                placeholder="keyword " 
                invalid={errors.keyword && true}
                {...field}
                />

                )}
              />
              {errors.keyword && (
            <FormFeedback>{errors.keyword.message}</FormFeedback>
            )}

            </Col>

            
            <Col md="6" className="mb-1">
              <Label className="form-label" for="newsCategoryId">
                دسته بندی خبر   
               <span className="text-danger">* </span>
              </Label>
              <Controller
                id="newsCategoryId"
                control={control}
                 name="newsCategoryId"
                    rules={{ required: "لطفاً دسته‌بندی خبر را انتخاب کنید" }}

                   render={({ field }) => (
                        <Input type="select" {...field} invalid={Boolean(errors.newsCategoryId)}>
                        <option value="">انتخاب دسته‌بندی</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                            {category.categoryName}
                            </option>
                        ))}
                        </Input>
                )}
              />
              {errors.newsCategoryId  && (
                <FormFeedback>{errors.newsCategoryId.message}</FormFeedback>
              )}
            </Col>


            <Col md="6" className="mb-1">
              <Label className="form-label" for="miniDescribe">
               توضیحات کوتاه   
               <span className="text-danger">* </span>
              </Label>
              <Controller
                id="miniDescribe"
                control={control}
                 name="miniDescribe"
                        rules={{ 
                        required: "لطفاً توضیحات کوتاه را وارد کنید",
                        
                        }}     
                   render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="توضیحات کوتاه"
                    invalid={errors.miniDescribe && true}
                    {...field}
                  />
                )}
              />
              {errors.miniDescribe  && (
                <FormFeedback>{errors.miniDescribe.message}</FormFeedback>
              )}
            </Col>



            <Col md="6" className="mb-1">
              <Label className="form-label" for="describe">
                  توضیحات کامل   
              <span className="text-danger">* </span>
              </Label>
              <Controller
                id="describe"
                control={control}
                name="describe"
                rules={{ required: "لطفاً توضیحات کامل  را وارد کنید" }}
                render={({ field }) => (
                <Input
                type="text"
                placeholder="توضیحاات کامل" 
                invalid={errors.describe && true}
                {...field}
                />

                )}
              />
              {errors.describe && (
            <FormFeedback>{errors.describe.message}</FormFeedback>
            )}

            </Col>


                        <Col md="6" className="mb-1">
            <Label className="form-label" for="imageFile">
                تصویر خبر <span className="text-danger"></span>
            </Label>

                <Controller
                id="imageFile"
                name="imageFile"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                    <Input
                    {...field}
                    type="file"
                    accept="image/*"
                    invalid={Boolean(errors.imageFile)}
                    onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        onChange(file);
                    }}
                    />
                )}
                />

            {errors.imageFile && (
                <FormFeedback>{errors.imageFile.message}</FormFeedback>
            )}
            </Col>


            <Col xs="12" className="mt-2">


              <Button type="submit" className="me-1" color="primary">
                ثبت اخبار
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
} ;

export default AddNews;
