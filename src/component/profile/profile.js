import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Image, Card, Form, Button } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import { goMain, getAvatar, getInfo, handleEmail, handleZipcode, handlePhone, handleAvatar, handlePwd, } from "../../actions";
import "./profile.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayname: '',
            email: '',
            phone: '',
            zipcode: '',
            pwd: '',
            img: '',
            info: '',
            msg: []
        };
        this.upload = React.createRef();
    }

    componentDidMount() {
        this.props.getInfo();
    }

    validation = (field, value, msg, oldvalue, reg) => {
        let idx = msg.indexOf(field);
        let validate = reg.test(value);
        if (value === oldvalue || (!validate && field !== 'pwd')) {
            if (idx === -1) {
                msg.push(field);
            }
        }
        else {
            if (idx !== -1) {
                msg.splice(idx, 1);
            }
        }
    }

    onChange = (e) => {
        this.setState({ info: '' });
        this.setState({ [e.target.name]: e.target.value });
        let field = e.target.name;
        let msg = this.state.msg;
        let reg = '';
        switch (field) {
            case "email":
                reg = /^[^@]*@[^@]*\.[^@]*$/;
                this.validation(field, e.target.value, msg, this.props.email, reg);
                break;
            case "phone":
                reg = /^\d{3}-\d{3}-\d{4}$/;
                this.validation(field, e.target.value, msg, this.props.phone, reg);
                break;
            case "zipcode":
                reg = /^\d{5}$/;
                this.validation(field, e.target.value, msg, this.props.zipcode, reg);
                break;
            case "pwd":
                reg = /^\w\W$/;
                this.validation(field, e.target.value, msg, this.props.pwd, reg);
                break;
            default:
                break;
        }
        this.setState({ msg: msg });
    }

    notValidate = (field) => {
        return this.state.msg.indexOf(field) !== -1;
    }

    reset = () => {
        this.setState({
            accountname: '',
            displayname: '',
            email: '',
            phone: '',
            zipcode: '',
            pwd: '',
            img: '',
            info: '',
            msg: []
        });
    }

    handleUpload = () => {
        this.upload.current.click();
    }

    handlePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
            this.setState({ img: URL.createObjectURL(e.target.files[0]) });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let msg = this.state.msg;
        this.setState({ msg: msg });
        if (this.state.msg.length > 0) {
            return false;
        }
        else {
            if (this.state.email === "" && this.state.phone === "" && this.state.zipcode === "" && this.state.pwd === "" && this.state.img === "") {
                this.setState({ info: "No Information Change" });
            }
            else {
                this.reset();
                if (this.state.email) {
                    this.props.handleEmail(this.state.email);
                }
                if (this.state.zipcode) {
                    this.props.handleZipcode(this.state.zipcode);
                }
                if (this.state.phone) {
                    this.props.handlePhone(this.state.phone);
                }
                if (this.state.pwd) {
                    this.props.handlePwd(this.state.pwd);
                }
                if (this.state.img) {
                    this.props.handleAvatar(this.state.img);
                }
            }
        }
    }

    displayInfo = () => {
        return (
            <span>
                username: {this.props.accountname}<br />
                email: {this.props.email}<br />
                phone: {this.props.phone}<br />
                zipcode: {this.props.zipcode}<br />
                password: {this.props.pwd}<br />
            </span>
        );
    }

    render() {
        return (
            <Grid container id="profile-page">
                <Grid item xs={12} sm={10}>
                    <h5 className="title">Welcome to Profile Page</h5>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Link className="nav-link" to="/main" onClick={() => this.props.goMain()}>Main Page</Link>
                </Grid>
                <Grid item xs={6}>
                    <Grid item xs={6} id="profile-img">
                        <Image alt="img" id="user-img-profile" src={this.props.avatar} roundedCircle></Image>
                    </Grid>
                    <Grid item xs={6} className="updates">
                        <Container id="container_display">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Current Info</Card.Title>
                                    <Card.Text>
                                        {this.displayInfo()}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid item xs={6} className="updates">
                        <Form noValidate className="form-update" onSubmit={this.onSubmit}>
                            <h1>Update Info</h1>
                            <Grid item xs={3} style={{ textAlign: "center" }}>
                                <input className="uploading" type="file" accept="image/*" ref={this.upload} onChange={this.handlePhoto} />
                                <Button className="btn-upload" variant="outline-primary" onClick={this.handleUpload}>
                                    <img className="btn-upload-img" alt="" src={this.state.img} style={{ display: this.state.img ? "block" : "none" }} /><br></br>
                                    <span className="btn-upload-text" style={{ display: this.state.img ? "none" : "block" }}>Add Image</span>
                                </Button>
                            </Grid>
                            <Form.Row>
                                <Grid item xs={6}>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className={this.notValidate("email") ? "form-control is-invalid" : "form-control"}
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            type="text"
                                            id="email"
                                            name="email"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Input is either same as the old one or not valid: proper format is ###@##.##
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Grid>
                                <Grid item xs={6}>
                                    <Form.Group>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            className={this.notValidate("phone") ? "form-control is-invalid" : "form-control"}
                                            value={this.state.phone}
                                            onChange={this.onChange}
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="123-123-1234"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Input is either same as the old one or not valid: proper format is 123-123-1234
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Grid>
                            </Form.Row>
                            <Form.Row>
                                <Grid item xs={6}>
                                    <Form.Group>
                                        <Form.Label>Zipcode</Form.Label>
                                        <Form.Control
                                            className={this.notValidate("zipcode") ? "form-control is-invalid" : "form-control"}
                                            value={this.state.zipcode}
                                            onChange={this.onChange}
                                            type="text"
                                            id="zipcode"
                                            name="zipcode"
                                            placeholder="12345"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Input is either same as the old one or not valid: proper format is 12345
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Grid>
                                <Grid item xs={6}>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            className={this.notValidate("pwd") ? "form-control is-invalid" : "form-control"}
                                            value={this.state.pwd}
                                            onChange={this.onChange}
                                            type="password"
                                            id="pwd"
                                            name="pwd"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Input is same as the old one
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Grid>
                            </Form.Row>
                            <Form.Row id="profile-btn">
                                <Button id="btn-update-info" type="submit">
                                    Update Info
                            </Button>
                            </Form.Row>
                            <div>
                                <span id="update-info">{this.state.info}</span>
                            </div>
                        </Form>
                    </Grid>
                </Grid>
            </Grid >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accountname: state.accountname,
        displayname: state.displayname,
        email: state.email,
        phone: state.phone,
        zipcode: state.zipcode,
        pwd: state.pwd,
        avatar: state.avatar,
        status: state.status,
        info: state.info,
        path: state.path
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        goMain: () => dispatch(goMain()),
        getAvatar: () => dispatch(getAvatar()),
        getInfo: () => dispatch(getInfo()),
        handleEmail: (email) => dispatch(handleEmail(email)),
        handleZipcode: (zipcode) => dispatch(handleZipcode(zipcode)),
        handlePhone: (phone) => dispatch(handlePhone(phone)),
        handleAvatar: (avatar) => dispatch(handleAvatar(avatar)),
        handlePwd: (pwd) => dispatch(handlePwd(pwd)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);