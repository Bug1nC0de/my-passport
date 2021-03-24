import { connect } from 'react-redux';
import { trashUser } from '../actions/auth';
import { Navbar, Button, Container } from 'react-bootstrap';

const Header = ({ isAuth, trashUser }) => {
  const logout = () => {
    trashUser();
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Login App</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {isAuth && (
                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { trashUser })(Header);
