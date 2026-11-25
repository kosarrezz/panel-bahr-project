// ** React Imports
import { Link ,useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";

const UserDropdown = () => {
    const navigate = useNavigate();
      const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };
  const userEmail = localStorage.getItem("email") || "ادمین ";

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
<div className="user-nav d-sm-flex d-none">
  <span className="user-name fw-bold">{userEmail}</span>
  <span className="user-status">ادمین </span>
</div>

<Avatar
  icon={<User size={20} />}
  className="bg-light-primary"
  status="online"
/>

      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">پروفایل</span>
        </DropdownItem>



        <DropdownItem
          tag={Link}
          to="/pages/"
          onClick={(e) => e.preventDefault()}
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">تنظیمات</span>
        </DropdownItem>


<DropdownItem onClick={handleLogout}>
  <Power size={14} className="me-75" />
  <span className="align-middle">خروج از حساب کاربری</span>
</DropdownItem>

      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
