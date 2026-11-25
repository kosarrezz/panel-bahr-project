
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"; 
import { Row, Col} from "reactstrap";
import { DollarSign, UserCheck, BookOpen, Calendar } from "react-feather";
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import CardUserTimeline from '@src/views/ui-elements/cards/advance/CardUserTimeline'
import CourseListWidget from '../views/dashboard/CourseListWidget'
import CardMeetup from '../views/ui-elements/cards/analytics/CardMeetup'
import UsersListWidget from "../views/dashboard/UsersListWidget";

const Home = () => {
  return (
       <div id="dashboard-analytics">
              {/* چهارتا تا کارت بالا با استایل های اماده از horizontal*/}

      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<DollarSign size={21} />}
            color="primary"
            stats="$24,780"
            statTitle="مجموع درآمد"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<UserCheck size={21} />}
            color="success"
            stats="2,540"
            statTitle="دانشجویان فعال"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<BookOpen size={21} />}
            color="danger"
            stats="1,340"
            statTitle="دوره‌های ثبت‌شده"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            icon={<Calendar size={21} />}
            color="warning"
            stats="728"
            statTitle="رزروهای جدید"
          />
        </Col>
      </Row>

      {/* نمودار تحلیل و بخش فعالیت های اخیر */
      }
      <Row className="match-height">
          <Col lg="8" md="12">
            <RevenueReport />
          </Col>

        <Col lg="4" md="12">
        <CardMeetup />
        </Col>

          <Col  xs='12'>
        <CourseListWidget />
        </Col>
      
           <Col  xs='12'>
        <UsersListWidget />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
