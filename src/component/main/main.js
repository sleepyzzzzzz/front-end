import React from 'react';
import { InputGroup, FormControl, Button, Image } from 'react-bootstrap';
import { Grid, Divider } from '@material-ui/core';
import { connect } from "react-redux";
import { handleLogout, handleProfile, getStatus, updateStatus } from "../../actions";
import Follow from './follow';
import Posts from './post';
import "./main.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            msg: '',
            img: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: "",
            post_display: this.props.posts
        });
    }

    // User
    displayStatus = () => {
        this.props.getStatus();
        return (
            <span>
                {this.props.status}
            </span>
        );
    }

    updatestatus = () => {
        this.props.updateStatus(this.state.status);
        this.setState({ status: "" });
    }

    render() {
        return (
            <Grid container spacing={3} id="main-page">
                <Grid item xs={5}>

                    <Grid item xs={12} className="User-Info">
                        <Grid container spacing={3}>
                            <Grid item xs={6} className="links">
                                <Button onClick={() => this.props.handleLogout()}>Log Out</Button>
                            </Grid>
                            <Grid item xs={6} className="links">
                                <Button onClick={() => this.props.handleProfile()}>Profile</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <div id="user-info">
                                    <Image alt="" id="user-img" src={this.props.avatar} roundedCircle></Image>
                                    <h3>{this.props.accountname}</h3>
                                    {this.displayStatus()}
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            className="form-control"
                                            value={this.state.status}
                                            name="status"
                                            id="status"
                                            placeholder="New Status"
                                            onChange={this.onChange}
                                        />
                                        <InputGroup.Append>
                                            <Button id="btn-update" type="submit" onClick={this.updatestatus}>
                                                Update
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <br></br>
                    <Follow />

                </Grid>

                <Divider orientation="vertical" flexItem />

                <Posts />
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accountname: state.accountname,
        displayname: state.displayname,
        status: state.status,
        follow: state.follow,
        follow_info: state.follow_info,
        avatar: state.avatar,
        posts: state.posts,
        info: state.info,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleProfile: () => dispatch(handleProfile()),
        handleLogout: () => dispatch(handleLogout()),
        getStatus: () => dispatch(getStatus()),
        updateStatus: (status) => dispatch(updateStatus(status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);