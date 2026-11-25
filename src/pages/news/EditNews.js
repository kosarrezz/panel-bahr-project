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
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getNewsListApi,
  updateNewsApi,
} from "../../services/news-services/news-services";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const EditNews = () => {
  // ** States

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [editingNews, setEditingNews] = useState(null);

  const defaultValues = {
    title: "",
    googleTitle: "",
    googleDescribe: "",
    miniDescribe: "",
    describe: "",
    keyword: "",
    newsCategoryId: "",
  };

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

  useEffect(() => {
    if (!id) return;

    const fetchNewsForEdit = async () => {
      try {
        const response = await getNewsListApi();
        const newsList = Array.isArray(response) ? response : response?.news;

        if (!Array.isArray(newsList)) {
          throw new Error("ساختار لیست خبرها مشخص نیست");
        }

        const foundNews = newsList.find(
          (item) => String(item.id) === String(id),
        );
        if (!foundNews) {
          throw new Error("خبر موردنظر در لیست پیدا نشد");
        }

        setEditingNews(foundNews);
        reset({
          title: foundNews.title ?? "",
          googleTitle: foundNews.googleTitle ?? "",
          googleDescribe: foundNews.googleDescribe ?? "",
          miniDescribe: foundNews.miniDescribe ?? "",
          describe: foundNews.describe ?? "",
          keyword: foundNews.keyword ?? "",
          newsCategoryId: foundNews.newsCatregoryId ?? "",
        });
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchNewsForEdit();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const payload = {
      id: id,
      title: data.title,
      googleTitle: data.googleTitle,
      googleDescribe: data.googleDescribe,
      miniDescribe: data.miniDescribe,
      keyword: data.keyword,
      describe: data.describe,
      newsCategoryId: data.newsCategoryId,
      isSlider: editingNews?.isSlider ?? false,
    };

    try {
      const result = await updateNewsApi(payload);

      if (result.success === true) {
        toast.success(result.message || "اخبار با موفقیت ویرایش شد");
        navigate("/news");
      } else {
        toast.error(result.message || "خطا در ویرایش خبر");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در برقراری ارتباط با سرور",
      );
    }
  };

  const onError = () => {
    toast.error("لطفاً تمام فیلدهای الزامی را به درستی تکمیل کنید");
  };

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4"> Edit News </CardTitle>
      </CardHeader>
      <CardBody className="my-2 py-50">
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="title">
                عنوان خبر
                <span className="text-danger">*</span>
              </Label>
              <Controller
                id="title"
                control={control}
                name="title"
                rules={{ required: "لطفاً عنوان خبر را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    placeholder="عنوان خبر "
                    invalid={errors.title && true}
                    {...field}
                  />
                )}
              />
              {errors.title && (
                <FormFeedback>{errors.title.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="googleTitle">
                عنوان دوم
                <span className="text-danger">*</span>
              </Label>
              <Controller
                id="googleTitle"
                control={control}
                name="googleTitle"
                rules={{ required: "لطفاً  عنوان دوم خبر را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    placeholder="googleTitle"
                    invalid={errors.googleTitle && true}
                    {...field}
                  />
                )}
              />
              {errors.googleTitle && (
                <FormFeedback>{errors.googleTitle.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="miniDescribe">
                توضیحات
                <span className="text-danger">* </span>
              </Label>
              <Controller
                id="miniDescribe"
                control={control}
                name="miniDescribe"
                rules={{ required: "لطفاً توضیحات  را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder=" توضیحات"
                    invalid={errors.miniDescribe && true}
                    {...field}
                  />
                )}
              />
              {errors.miniDescribe && (
                <FormFeedback>{errors.miniDescribe.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="googleDescribe">
                توضیحات کوتاه
                <span className="text-danger">* </span>
              </Label>
              <Controller
                id="googleDescribe"
                control={control}
                name="googleDescribe"
                rules={{
                  required: "لطفاً  توضیحات کوتاه را وارد کنید",
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="googleDescribe"
                    invalid={errors.googleDescribe && true}
                    {...field}
                  />
                )}
              />
              {errors.googleDescribe && (
                <FormFeedback>{errors.googleDescribe.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="describe">
                توضیحات اصلی
              </Label>
              <Controller
                id="describe"
                control={control}
                name="describe"
                rules={{ required: "لطفاً توضیحات اصلی را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="توضیحات اصلی"
                    invalid={!!errors.describe}
                    {...field}
                  />
                )}
              />
              {errors.describe && (
                <FormFeedback>{errors.describe.message}</FormFeedback>
              )}
            </Col>

            <Col md="6" className="mb-1">
              <Label className="form-label" for="keyword">
                کلمات کلیدی خبر
                <span className="text-danger">*</span>
              </Label>
              <Controller
                id="keyword"
                control={control}
                name="keyword"
                rules={{ required: "لطفاً کلمات کلیدی را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="کلمات کلیدی "
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
                دسته‌بندی خبر
                <span className="text-danger">*</span>
              </Label>
              <Controller
                id="newsCategoryId"
                control={control}
                name="newsCategoryId"
                rules={{ required: "لطفاً دسته‌بندی را وارد کنید" }}
                render={({ field }) => (
                  <Input
                    type="data"
                    placeholder="شناسه دسته‌بندی"
                    invalid={errors.newsCategoryId && true}
                    {...field}
                  />
                )}
              />
              {errors.newsCategoryId && (
                <FormFeedback>{errors.newsCategoryId.message}</FormFeedback>
              )}
            </Col>

            <Col xs="12" className="mt-2">
              <Button type="submit" className="me-1" color="primary">
                ویرایش اخبار
              </Button>
              <Button
                type="button"
                color="secondary"
                outline
                onClick={() => navigate("/news")}
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

export default EditNews;
