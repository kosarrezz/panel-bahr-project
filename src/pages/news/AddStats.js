import { Cpu, CheckCircle, FileText, Users } from 'react-feather'
import { Row, Col } from 'reactstrap'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
{/*کارت های بالا توی داشبورد */}
const CourseStats = ({ data }) => {
  const statsData = [
    {
      title: 'کل اخبار',
      count: '821', 
      icon: <Cpu size={21} />,
      color: 'primary'
    },
    {
      title: 'اخبارهای فعال',
      count: '473', 
      icon: <CheckCircle size={21} />,
      color: 'success'
    },
    {
      title: 'در انتظار تایید',
      count: '384', 
      icon: <FileText size={21} />,
      color: 'warning'
    },
    {
      title: 'اخبار مهم ',
      count: '93', 
      icon: <Cpu size={21} />,
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
