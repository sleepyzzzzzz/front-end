import React from 'react';
import { connect } from "react-redux";
import { Nav, Navbar, Button } from 'react-bootstrap';
import { goLogin, goRegister } from "../../actions";
import { Grid } from '@material-ui/core';
import "./app.css";

class App extends React.Component {

  render() {
    return (
      <Grid>
        <Navbar className="navbar">
          <Grid item xs={12} sm={10}>
            <h1 className="title">Welcome</h1>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Nav defaultActiveKey="/">
              <Nav.Item>
                <Button onClick={() => this.props.goLogin()}>LOGIN</Button>
              </Nav.Item>
              <Nav.Item>
                <Button onClick={() => this.props.goRegister()}>REGISTER</Button>
              </Nav.Item>
            </Nav>
          </Grid>
        </Navbar>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.info
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    goLogin: () => dispatch(goLogin()),
    goRegister: () => dispatch(goRegister()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);