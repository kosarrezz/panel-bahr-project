import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'

import { List, MoreVertical } from 'react-feather'

import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import jsonImg from '@src/assets/images/icons/json.png'

import avatar6 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar7 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
import avatar8 from '@src/assets/images/portrait/small/avatar-s-8.jpg'
import avatar9 from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import avatar20 from '@src/assets/images/portrait/small/avatar-s-20.jpg'
{/*این صفحه اماده و گرفته شده از فول پکیج برای تایم لاین داشبورد هست */}
const avatarGroupArr = [
  {
    title: 'علی رضایی',
    img: avatar9,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  },
  {
    title: 'نگار محمدی',
    img: avatar6,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  },
  {
    title: 'امیرحسین کریمی',
    img: avatar8,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  },
  {
    title: 'مریم احمدی',
    img: avatar7,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  },
  {
    title: 'رضا کاظمی',
    img: avatar20,
    placement: 'bottom',
    imgHeight: 33,
    imgWidth: 33
  }
]

const data = [
  {
    title: 'فصل جدید دوره React منتشر شد',
    content: 'فصل مدیریت State و هوک‌های کاربردی به دوره اضافه شد.',
    meta: '12 دقیقه پیش',
    metaClassName: 'me-1',
    customContent: (
      <div className='d-flex align-items-center'>
        <img className='me-1' src={jsonImg} alt='course-asset' height='23' />
        <div className='mb-0'>React - فصل 4</div>
      </div>
    )
  },
  {
    title: 'ثبت‌نام دانشجوی جدید در دوره JavaScript',
    content: 'دانشجوی جدید فرایند ثبت‌نام در دوره را تکمیل کرد.',
    meta: '45 دقیقه پیش',
    metaClassName: 'me-1',
    color: 'warning',
    customContent: (
      <div className='d-flex align-items-center'>
        <Avatar img={avatar9} />
        <div className='ms-50'>
          <h6 className='mb-0'>سارا احمدی (دانشجو)</h6>
          <span>دوره JavaScript مقدماتی تا پیشرفته</span>
        </div>
      </div>
    )
  },
  {
    title: 'تمرین جدید توسط دانشجویان ارسال شد',
    content: 'تمرین ساخت فرم ورود با اعتبارسنجی تحویل داده شد.',
    color: 'info',
    meta: '2 روز پیش',
    metaClassName: 'me-1',
    customContent: <AvatarGroup data={avatarGroupArr} />
  },
  {
    title: 'درس جدید به دوره اضافه شد',
    content: 'درس اتصال API با Axios توسط مدرس دوره منتشر شد.',
    color: 'success',
    meta: '5 روز پیش',
    metaClassName: 'me-1'
  }
]

const UserTimeline = () => {
  return (
    <Card className='card-user-timeline'>
      <CardHeader>
        <div className='d-flex align-items-center'>
          <CardTitle tag='h4'> User Timeline</CardTitle>
        </div>
        <MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <CardBody>
        <Timeline className='ms-50 mb-0' data={data} />
      </CardBody>
    </Card>
  )
}

export default UserTimeline
