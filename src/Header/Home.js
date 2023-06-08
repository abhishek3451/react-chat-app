import { Link } from "react-router-dom";
import "../App.css";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Auth-Slice";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavLink,
} from "react-bootstrap";
import { mailActions } from "../Store/Mail-slice";

const Home = () => {
  const count = useSelector((state) => state.mail.count);
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(mailActions.onLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <>
      <Navbar>
        <Container fluid>
          <NavbarBrand>Welcome to mail-Box!!!!</NavbarBrand>

          <Nav style={{ fontVariant: "light" }}>
            {auth && (
              <Link to="/compose" className={"LINK"}>
                <Button size="sm" className="py-0">
                  Compose
                </Button>
              </Link>
            )}
            {auth && (
              <Link to="/inbox" className={"LINK"}>
                <Button size="sm" className="py-0 btn btn-success">
                  inbox <b>({count})</b>
                </Button>
              </Link>
            )}
            {auth && (
              <Link to="/sent" className={"LINK"}>
                <Button size="sm" className="py-0 btn btn-success">
                  Sent
                </Button>
              </Link>
            )}

            {auth && (
              <Link to="/" className={"LINK"}>
                <Button
                  onClick={handleLogout}
                  size="sm"
                  className="py-0 btn btn-danger"
                >
                  Logout
                </Button>
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <hr width="100%" />
    </>
  );
};
export default Home;
