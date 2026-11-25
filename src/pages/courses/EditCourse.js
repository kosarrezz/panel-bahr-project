import { useParams ,useNavigate } from 'react-router-dom'
import {Spinner, Card, CardBody } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {getCourseDetailsApi,updateCourseApi  } from '../../services/courses/course.service'
import toast from 'react-hot-toast'


const EditCourse = () => {
  const {id} = useParams()
const [loading ,setLoading] = useState(true)
 const  navigate = useNavigate();

  const {control,handleSubmit ,reset,formState: {errors}} = useForm({
       defaultValues: {
      title: '',
      describe: '',
      capacity: '',
      cost: '',
      miniDescribe: '',
      startTime: '',
      endTime: '',
      TeacherId:''
    }
  })

   useEffect(() =>{
    const fetchId = async() =>{
      try{
        const res = await getCourseDetailsApi(id)
        
  
            reset({
          title: res.title ?? '',
          describe: res.describe ??  '',
          miniDescribe: res.miniDescribe ?? '',
          capacity: res.capacity ?? '',
          cost: res.cost ?? '',
           startTime: res.startTime ?? '',
              endTime: res.endTime ?? '',
              TeacherId: res.teacherId  ?? '' 
        })
                  
        
      }catch(error){
      } finally {
  setLoading(false); 
}
    }
    fetchId()
   },[id,reset])


  const onSubmit =  async(data) =>{
    

    try{
        const formData = new FormData()

    formData.append('Id', id)
    formData.append('Title', data.title)
    formData.append('Describe', data.describe)
    formData.append('MiniDescribe', data.miniDescribe)
    formData.append('Capacity', data.capacity)
    formData.append('Cost', data.cost)
    formData.append('StartTime', data.startTime)
    formData.append('EndTime', data.endTime)
    formData.append('TeacherId', data.TeacherId ) 

    for (const [key, value] of formData.entries()) {
    }

const updateResult = await updateCourseApi(formData)

toast.success('درخواست ویرایش ارسال شد')
navigate('/courses-page')

     }catch (error){
            if (error.response?.data) {

    }
  }
}



      if (loading) {
        return (
          <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '300px' }}>
            <Spinner color='primary' />
            <span className='ms-1'>در حال بارگذاری اطلاعات دوره...</span>
          </div>
        );
      }

  return (
    <div>
       <Card>
      <CardBody>
        <h4> Edit Co: {id}</h4>
        <form onSubmit={handleSubmit (onSubmit)}>
        <label htmlFor="title">نام دوره</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'نام دوره الزامی است' }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  id="title"
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                />
                {errors.title && (
                  <small className="text-danger">{errors.title.message}</small>
                )}
              </>
            )}
          />


        <label htmlFor="miniDescribe">توضیحات کوتاه دوره</label>
          <Controller
            name="miniDescribe"
            control={control}
             rules={{ required: ' توضیحات دوره الزامی است' }}

            render={({ field }) => (
              <>
              <input
                {...field}
                type="text"
                id='miniDescribe'
                className={`form-control ${errors.miniDescribe ? 'is-invalid' : ''}`}
              />
               {errors.miniDescribe && (
           <small className="text-danger">{errors.miniDescribe.message}</small>
         )}
          </>
            )}
          />


          <label htmlFor="describe">توضیحات  دوره</label>
          <Controller
            name="describe"
            control={control}
             rules={{ required: 'توضیحات دوره الزامی است' }}
            render={({ field }) => (
            <>
              <textarea
                {...field}
                id='describe'
                className={`form-control ${errors.describe ? 'is-invalid' : ''}`}
                rows="5"
              />
               {errors.describe && (
           <small className="text-danger">{errors.describe.message}</small>
         )}
         </>
            )}
          />

               <label htmlFor="capacity">ظرفیت  دوره</label>
          <Controller
            name="capacity"
            control={control}
             rules={{ required: 'ظرفیت دوره الزامی است' }}
            render={({ field }) => (
             <>
              <input
                {...field}
                type="number"
                id="capacity"
                className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
              />
               {errors.capacity && (
           <small className="text-danger">{errors.capacity.message}</small>
         )}
         </>
            )}
          
          />

               <label htmlFor="cost">قیمت  دوره</label>
          <Controller
            name="cost"
            control={control}
             rules={{ required: 'قیمت دوره الزامی است' }}
            render={({ field }) => (
              <>
              <input
                {...field}
                type="text"
                    id='cost'
                className={`form-control ${errors.cost ? 'is-invalid' : ''}`}
              />
               {errors.cost && (
           <small className="text-danger">{errors.cost.message}</small>
         )}
         </>
            )}
          />
               <label htmlFor="startTime">شروع   دوره</label>
          <Controller
            name="startTime"
            control={control}
             rules={{ required: 'تاریخ شروع دوره الزامی است' }}
            render={({ field }) => (
              <>
              <input
                {...field}
                type="text"
                 id='startTime'
                className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
              />
               {errors.startTime && (
           <small className="text-danger">{errors.startTime.message}</small>
         )}
         </>
            )}
          />
                 <label htmlFor="endTime">پایان دوره</label>
          <Controller
            name="endTime"
            control={control}
              rules={{ required: 'تاریخ پایان دوره الزامی است' }}
            render={({ field }) => (
              <>
              <input
                {...field}
                type="text"
                id='endTime'
                className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
              />
               {errors.endTime && (
           <small className="text-danger">{errors.endTime.message}</small>
         )}
         </>
            )}
          />

          
                <label htmlFor="TeacherId"> نام استاد</label>
                    <Controller
            name="TeacherId"
            control={control}
              rules={{ required: '  اسم استاد الزامی است' }}
            render={({ field }) => (
              <>
              <input
                {...field}
                type="text"
                id='TeacherId'
                className={`form-control ${errors.TeacherId  ? 'is-invalid' : ''}`}
              />
               {errors.TeacherId  && (
           <small className="text-danger">{errors.TeacherId.message}</small>
         )}
         </>
            )}
          />
           <button type="submit" className="btn btn-primary mt-2">
            ذخیره تغییرات
          </button>
          <button 
              type="button" 
              className="btn btn-outline-secondary mt-2 ms-1" 
              onClick={() => navigate('/courses-page')} 
            >
              انصراف
            </button>
        </form>
      </CardBody>
    </Card>
    </div>
  )
}

export default EditCourse