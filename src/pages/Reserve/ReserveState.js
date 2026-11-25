import { Cpu, CheckCircle, FileText, Users } from 'react-feather'
import { Row, Col } from 'reactstrap'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
{/*کارت های بالا توی داشبورد */}
const CourseStats = ({ data }) => {
  const statsData = [
    {
      title: 'کل رزرو ها',
      count: '2,و821', 
      icon: <Cpu size={21} />,
      color: 'primary'
    },
    {
      title: 'رزروهای فعال',
      count: '990', 
      icon: <CheckCircle size={21} />,
      color: 'success'
    },
    {
      title: 'در انتظار تایید',
      count: '1,831', 
      icon: <FileText size={21} />,
      color: 'warning'
    },
    {
      title: 'غیرفعال',
      count: '693', 
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
