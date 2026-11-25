import { Card, CardBody,Spinner  } from "reactstrap";
import DataTable from 'react-data-table-component'
import { useState , useEffect } from "react";
import { Search ,Eye,Edit,CheckCircle,XCircle} from 'react-feather'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import {activeAndDeactiveNewsApi, getNewsListApi} from "../../services/news-services/news-services";
import AddStats from "../../pages/news/AddStats";
const News = () => {

  const navigate = useNavigate();
const[NewsDetail,setNewsDetail] = useState(null)
  const [searchTerm ,setsearchTerm] = useState('')
     const [debouncedSearch, setDebouncedSearch] = useState('')
  const[isLoading , setIsLoading] = useState(false) 
  const[hasError , setHasError] = useState(false)
  const [News, setNews] = useState([])
   const [isOpenDetail , setIsOpenDetail ] = useState(false)


    const fetchNews = async () => {
      
      setIsLoading(true)
      setHasError(false)
//ارسالیapi
      try{
        const data = await getNewsListApi({

          PageNumber: 1,
          RowsOfPage: 50,
          SortingCol: "InsertDate",
          SortType: "DESC",
          Query :debouncedSearch

          })

          if(data?.success === false){
            throw new Error(data.message || "دریافت اخبار ها انجام نشد")
          }

         setNews(data?.news ?? []);
         
        }catch(error){
          setHasError(true)

        const errorMessage  = error?.response?.data?.message || 'خطا در دریافت اخبار ها'
        toast.error(errorMessage)

      }finally{
        setIsLoading(false)
      }
    }
  //سرح
  useEffect(() => {
    fetchNews()
  }, [debouncedSearch ])
   useEffect(() => {
     const timer = setTimeout(() => {
       setDebouncedSearch(searchTerm)
     }, 500) 

     return () => clearTimeout(timer) 
   }, [searchTerm])


//جزییات اخبار
const handleOpenDetail = (news) => {
  setNewsDetail(news);
  setIsOpenDetail(true);
};

//اکنیو و دی اکتیو کردن اخبار ها
const handleToggleNewsStatus  = async (newStatus,id) => {
  try{
    const res = await activeAndDeactiveNewsApi(newStatus,id)
      if (res.success){
        toast.success(res.message || (newStatus ? 'اخبار فعال شد' : 'اخبار غیرفعال شد'))
        await fetchNews()
      }else{
        toast.error(res.message || 'خطا در غیرفعال کردن اخبار')
      }
} catch (error) {
     const serverMessage = error?.response?.data?.message
     toast.error(serverMessage || 'خطا در برقراری ارتباط با سرور')
   }
}




  const columns = [
  {
    name: 'عنوان خبر',
    selector: row => row.title,
    sortable: true,
      width: '210px',
              cell: row => (
    <span className="text-truncate d-inline-block w-100" title={row.title}>
      {row.title}
    </span>
  )
  },
  {
    name: ' عنوان دوم',
    selector: row => row.googleTitle,
    sortable: true,
      width: '190px',
              cell: row => (
    <span className="text-truncate d-inline-block w-100" title={row.googleTitle}>
      {row.googleTitle}
    </span>
  )
  },
   {
    name: ' تاریخ ایجاد ',
    selector: row => row.insertDate,
    sortable: true,
      width: '205px',
},
      {
    name: '   تاریخ آپدیت ',
    selector: row => row.updateDate,
    sortable: true,
      width: '205px',
      
  },
  {
    name: ' نویسنده خبر ',
    selector: row => row.addUserFullName,
    sortable: true,
      width: '180px',
  },

  {
    name: 'عملیات',
    minWidth: '110px',
    cell: row => (
      <div className="d-flex gap-1">
        <Eye 
        size={16} 
        style={{ cursor: 'pointer' }}
         onClick={() => handleOpenDetail(row)}
          />
     <span
       role='button' 
       className="cursor-pointer text-primary mx-1"
       onClick={() => navigate(`/news/edit/${row.id}`)}     
       title=" ویرایش"
                       >
         <Edit size={17}/>
         
         </span>
          {row.active ? (
            <span
              role='button' 
              className="cursor-pointer text-danger"
              onClick={() => handleToggleNewsStatus(false, row.id)}
              title="غیرفعال کردن اخبار"
            >
              <XCircle size={17} />
            </span>
          ) : (
            <span
              role='button' 
              className="cursor-pointer text-success"
              onClick={() => handleToggleNewsStatus(true, row.id)}
              title="فعال کردن اخبار"
            >
              <CheckCircle size={17} />
            </span>
          )}
         </div>
    )
  },


]
  
//استایل های شخصی

    const customStyles = {
      table: {
        style: {
          backgroundColor: 'transparent'
        }
      },
      tableWrapper: {
        style: {
          backgroundColor: 'transparent'
        }
      },
    headRow: {
      style: {
        backgroundColor: 'transparent',
        color: '#6e6b7b',
        borderBottomColor: '#ebe9f1'
      }
    },
    rows: {
      style: {
        backgroundColor: 'transparent',
        color: '#5e5873',
        borderBottomColor: '#ebe9f1'
      },
      highlightOnHoverStyle: {
        backgroundColor: '#f8f8f8'
      }
    },
    pagination: {
      style: {
        backgroundColor: 'transparent',
        color: '#5e5873',
        borderTopColor: '#ebe9f1'
      }
    },
  progress: {
  style: {
    backgroundColor: 'transparent',
    color: '#d0d2d6'
  }
}

    };

  return (
    <>

      <AddStats />
                 <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h4 className="mb-0 fw-bolder">News</h4>
            <small className="text-muted"> News Management </small>
          </div>

                        <div className="d-flex align-items-center gap-2">
            <div 
              className="d-flex align-items-center bg-transparent border rounded-pill px-2" 
              style={{ width: '260px', borderColor: '#404656' }}
            >
              <span className="text-muted ps-1">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control border-0 bg-transparent shadow-none text-body"

                placeholder="جستجو اخبار..."
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
              />
            </div>

          </div>
     
            <button className="btn btn-primary text-nowrap"
                        onClick={() => navigate ('/news/add')}

            >          + Add News</button>

        </div>

<Card >
     
     <CardBody>
 
        <DataTable
    className='react-dataTable'
    columns={columns}
     responsive
      noHeader
      pagination
      data={News}
      sortServer
      customStyles={customStyles}
    progressPending={isLoading}
      progressComponent={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '300px' }}
        >
          <Spinner color="primary" />
          <span className="ms-1">در حال بارگذاری اخبارها...</span>
        </div>
      }
      noDataComponent={
    hasError ? (
      <div className="p-3 text-center">
        <div className="mb-2">
          دریافت اخبار با خطا مواجه شد.
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={fetchNews}
        >
          تلاش مجدد
        </button>
      </div>
    ) : (
      <div className="p-3">
        اخباری یافت نشد
      </div>
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
        جزئیات خبر:{NewsDetail?.userName || 'خبر'}
        
          </ModalHeader>
        <ModalBody>
            {NewsDetail ? (
              <div className='row gy-2'>
                <div className='col-md-6'>
                  <span className='fw-bold' > نام خبر : </span>
                  <span>{NewsDetail.title || 'ثبت نشده'}</span>
                </div>
                <div className='col-md-6'>
                  <span className='fw-bold'> عنوان  : </span>
                    {NewsDetail.googleTitle  || 'نامشخص'}
                </div>
                      <div className='col-md-6'>
                  <span className='fw-bold'> عنوان دوم  :</span>
                  <span>{NewsDetail.googleDescribe || 'نامشخص'}</span>
                </div>
                  <div className='col-md-6'>
                    <span className='fw-bold'> تاریخ انتشار :</span>
                    <span>{NewsDetail.insertDate || 'نامشخص'}</span>
                  </div>
                 <div className='col-md-6'>
                  <span className='fw-bold'>  تاریخ آپدیت  : </span>
                  <span>{NewsDetail.updateDate || 'نامشخص'} </span>
                </div>
                <div className='col-md-6'>
                  <span className='fw-bold'>نویسنده خبر :  </span>
                  <span>{NewsDetail.addUserFullName || 'نامشخص'}  </span>
                </div>

                  <div className='col-12'>
                            <span className='fw-bold'> توضیحات کوتاه:</span>
                    <span>{NewsDetail.miniDescribe || 'نامشخص'}</span>
                  </div>
               <div className='col-12'>
                          <span className='fw-bold'> توضیحات کامل :</span>
                  <span>{NewsDetail.describe || 'نامشخص'} </span>
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

  )
}
export default News
