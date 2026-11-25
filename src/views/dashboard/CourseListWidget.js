import { useCallback, useEffect, useState } from 'react'
import { Card, CardBody, Badge, Spinner } from 'reactstrap'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'
import { getCourseListApi } from '../../services/courses/course.service'
import ReactPaginate from 'react-paginate'
{/*این صفحه برای کورسس تو داشبورد هست*/}
{/*استایل های سفارشی */}
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
      color: 'inherit',
      borderBottomColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  rows: {
    style: {
      backgroundColor: 'transparent',
      color: 'inherit',
      borderBottomColor: 'rgba(255, 255, 255, 0.08)'
    },
    highlightOnHoverStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.04)'
    }
  }
}

const CourseListWidget = () => {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentPage,setCurrentPage] = useState(1)
const[totalCount,setTotalCount] = useState(0)
const rowsPerPage  = 5


const fetchCourses = useCallback(async (page = 1) => {
        setIsLoading(true)
    setHasError(false)

    try {
      const data = await getCourseListApi({
        PageNumber: page,
        RowsOfPage: rowsPerPage,
        SortingCol: 'title',
        SortType: 'asc',
        Query: ''
      })

      if (data?.success === false) {
        throw new Error(data.message || 'دریافت دوره‌ها انجام نشد')
      }

    setCourses(data?.courseDtos ?? [])
    setTotalCount(data?.totalCount ?? 0)   
 } catch (error) {
      setHasError(true)
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        'خطا در دریافت دوره‌ها'
      )
    } finally {
      setIsLoading(false)
    }
  }, [rowsPerPage])

  useEffect(() => {
    fetchCourses(currentPage)
  }, [fetchCourses , currentPage])

{/*استایل های خود جدول */}
  const columns = [
    {
      name: 'دوره',
      minWidth: '220px',
      cell: row => (
        <div className='d-flex align-items-center py-1'>
          {row.tumbImageAddress && (
            <img
              src={row.tumbImageAddress}
              alt={row.title || 'دوره'}
              className='rounded me-2'
              width='32'
              height='32'
              style={{ objectFit: 'cover' }}
            />
          )}
          <div className='d-flex flex-column'>
            <span className='fw-bolder'>{row.title}</span>
            <small className='text-muted'>{row.fullName || 'بدون مدرس'}</small>
          </div>
        </div>
      )
    },
    {
      name: 'ظرفیت',
      selector: row => `${row.capacity ?? 0} نفر`
    },
    {
      name: 'قیمت',
      selector: row =>
        row.cost == null
          ? 'نامشخص'
          : `${Number(row.cost).toLocaleString('fa-IR')} تومان`
    },
    {
      name: 'وضعیت',
      cell: row => (
        <Badge color={row.isActive ? 'light-success' : 'light-danger'} pill>
          {row.isActive ? 'فعال' : 'غیرفعال'}
        </Badge>
      )
    }
  ]
  {/*تابع اماده تغییر صفحه و  ساخت کامپوننت CustomPagination */}
const handlePagination = page => {
  setCurrentPage(page.selected + 1)
}

const CustomPagination = () => (
  <ReactPaginate
    previousLabel=''
    nextLabel=''
    forcePage={currentPage - 1}
    onPageChange={page => handlePagination(page)}
    pageCount={Math.ceil(totalCount / rowsPerPage) || 1}
    breakLabel='...'
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
    activeClassName='active'
    pageClassName='page-item'
    breakClassName='page-item'
    nextLinkClassName='page-link'
    pageLinkClassName='page-link'
    breakLinkClassName='page-link'
    previousLinkClassName='page-link'
    nextClassName='page-item next-item'
    previousClassName='page-item prev-item'
    containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
  />
)
  return (
    <>
       <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="mb-0 fw-bolder">Courses</h4>
  

 
      </div>
    <Card className='w-100'>
      <CardBody>

        <div className='react-dataTable'>
          <DataTable
            columns={columns}
            data={courses}
            className='react-dataTable'
            keyField='courseId'
            responsive
            dense
             pagination
            paginationServer
            paginationComponent={CustomPagination}
            customStyles={customStyles}
            progressPending={isLoading}
            progressComponent={
              <div className='d-flex align-items-center p-3'>
                <Spinner size='sm' color='primary' />
                <span className='ms-1'>در حال بارگذاری دوره‌ها...</span>
                
              </div>
            }
            noDataComponent={
              hasError ? (
                <div className='p-3 text-center'>
                  <div className='mb-2'>دریافت دوره‌ها با خطا مواجه شد.</div>
                  <button
                                    type='button'
                    className='btn btn-sm btn-outline-primary'
                    onClick={() => fetchCourses(currentPage)}
                                    >
                    تلاش مجدد
                  </button>
                </div>
              ) : (
                <div className='p-3'>دوره‌ای یافت نشد</div>
              )
            }
          />
        </div>
      </CardBody>
    </Card>
    </>

  )
}
export default CourseListWidget
