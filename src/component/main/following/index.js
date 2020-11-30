import React from 'react';
import { InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import { Grid, Avatar, ListItem, ListItemText, ListItemAvatar, Divider } from '@material-ui/core';
import { connect } from "react-redux";
import { getFollow, updateFollow, filterPost } from "../../../actions";

class Follow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_followed_user: '',
            img: '',
            msg: ''
        }
    }

    componentDidMount() {
        this.props.getFollow();
        this.props.filterPost('', '');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.follow.length !== this.props.follow.length) {
            this.props.filterPost('', '');
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: ""
        });
    }

    unfollow = (e) => {
        this.props.updateFollow(e.target.id, "unfollow");
    }

    addFollowed = () => {
        if (this.state.new_followed_user !== "") {
            this.props.updateFollow(this.state.new_followed_user, "add");
            this.setState({ new_followed_user: "" });
        }
    }

    displayFollowedUsers = () => {
        let follow = this.props.follow_info;
        let displayfollow;
        if (follow) {
            displayfollow = follow.map(follow => {
                return (
                    <ListGroup className="follow" key={follow.username}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt="img.png" src={follow.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={follow.username}
                                secondary={follow.headline}
                            />
                            <Button className="btn-unfollow" type="submit" id={follow.username} onClick={this.unfollow}>
                                Unfollow
                            </Button>
                        </ListItem>
                        <Divider light />
                    </ListGroup>
                );
            });
        }
        else {
            displayfollow = "";
        }
        return displayfollow;
    }
    render() {
        return (
            <Grid item xs={12} className="User-Follow">
                <Grid>
                    <Grid item xs={12} className="wrapper-follower">
                        {this.displayFollowedUsers()}
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <InputGroup className="md-3">
                                <FormControl
                                    className="form-control"
                                    value={this.state.new_followed_user}
                                    name="new_followed_user"
                                    id="new_followed_user"
                                    placeholder="Username for user want to follow"
                                    onChange={this.onChange}
                                />
                                <InputGroup.Append>
                                    <Button id="btn-addfollow" type="submit" onClick={this.addFollowed}>
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                        <div className="follow-info">
                            <span>{this.props.info}</span>
                        </div>
                    </Grid>
                </Grid>
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
        getFollow: () => dispatch(getFollow()),
        updateFollow: (username, method) => dispatch(updateFollow(username, method)),
        filterPost: (value, method) => dispatch(filterPost(value, method)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow);