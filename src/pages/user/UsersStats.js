import { Cpu, CheckCircle, FileText, Users } from 'react-feather'
import { Row, Col } from 'reactstrap'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
{/*کارت های بالا توی داشبورد */}
const CourseStats = ({ data }) => {
  const statsData = [
    {
      title: 'کل کاربر',
      count: '6,821', 
      icon: <Cpu size={21} />,
      color: 'primary'
    },
    {
      title: 'کاربرهای فعال',
      count: '4,473', 
      icon: <CheckCircle size={21} />,
      color: 'success'
    },
    {
      title: 'در انتظار تایید',
      count: '1,420', 
      icon: <FileText size={21} />,
      color: 'warning'
    },
    {
      title: 'کل ثبت‌نام‌ها',
      count: '5893', 
      icon: <Users size={21} />,
      color: 'info'
    }
  ]

  return (
    <Row>
      {statsData.map((item, index) => (
        <Col key={index} lg='3' sm='6'>
          <StatsHorizontal
            icon={item.icon}
            color={item.color}
            stats={item.count}
            statTitle={item.title}
          />
        </Col>
      ))}
    </Row>
  )
}

export default CourseStats
