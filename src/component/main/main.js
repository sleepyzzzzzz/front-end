import React from 'react';
import { InputGroup, FormControl, Button, Image, ListGroup } from 'react-bootstrap';
import { Grid, Avatar, ListItem, ListItemText, ListItemAvatar, Divider } from '@material-ui/core';
import { connect } from "react-redux";
import { handleLogout, handleProfile, updateStatus, getFollow, updateFollow, addPost, filterPost } from "../../actions";
import Commentlist from './comment';
import "./main.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            new_post: '',
            msg: '',
            search: '',
            post_display: [],
            img: ''
        }
        this.upload = React.createRef();
        this.inputPost = React.createRef();
        this.show = false;
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: "",
            post_display: this.props.posts
        });
    }

    // User
    updatestatus = () => {
        this.props.updateStatus(this.state.status);
        this.setState({ status: "" });
    }

    // Follower
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
        this.props.getFollow();
        let follow = this.props.follow;
        let displayfollow;
        if (follow) {
            displayfollow = follow.map(follow => {
                return (
                    <ListGroup className="follow" key={follow.username}>
                        <ListItem>
                            {/* <ListItemAvatar>
                                <Avatar alt="img.png" src={follow.picture} />
                            </ListItemAvatar> */}
                            <ListItemText
                                primary={follow.username}
                                secondary={follow.status}
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

    // Posts
    handleUpload = () => {
        this.upload.current.click();
    }

    handlePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
            this.setState({ img: URL.createObjectURL(e.target.files[0]) });
        }
    }

    clearPost = () => {
        this.setState({ new_post: "", img: "" });
    }

    addpost = () => {
        this.props.addPost(this.props.accountname, this.state.new_post, this.state.img);
        this.clearPost();
    }

    displayPost = () => {
        let method = this.state.search ? 'id' : ''
        this.props.filterPost(this.state.search, method);
        let posts = this.props.posts;
        let displaypost = posts.map(post => {
            return (
                <ListGroup key={post.pid}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="img" src={post.author_avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={post.author}
                            secondary={post.date}
                        />
                    </ListItem>
                    <div className="post-info">
                        <div>
                            <span>{post.text}</span>
                        </div >
                        <div className="post-img">
                            <Image className="images" src={post.images} style={{ display: post.images ? "block" : "none" }}></Image>
                        </div>
                    </div>
                    <br></br>
                    <Grid container spacing={3} className="post-info">
                        <Grid item xs={5}>
                            <Button id="btn-edit" type="submit">
                                Edit
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button id="btn-comment" type="submit">
                                Comment
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            {<Commentlist posts={post} />}
                        </Grid>
                    </Grid>
                    <br></br>
                </ListGroup>
            );
        });
        return displaypost;
    }

    render() {
        return (
            <Grid container spacing={3} id="main-page">
                <Grid item xs={5}>

                    <Grid item xs={12} className="User-Follow">
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
                                    <span>{this.props.status}</span>
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

                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={3} style={{ textAlign: "center" }}>
                            <input className="uploading" type="file" accept="image/*" ref={this.upload} onChange={this.handlePhoto} />
                            <Button className="btn-upload" variant="outline-primary" onClick={this.handleUpload}>
                                <img className="btn-upload-img" alt="" src={this.state.img} style={{ display: this.state.img ? "block" : "none" }} /><br></br>
                                <span className="btn-upload-text" style={{ display: this.state.img ? "none" : "block" }}>Add Image</span>
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <textarea
                                className="form-control"
                                id="new_post"
                                name="new_post"
                                value={this.state.new_post}
                                placeholder="Post something"
                                rows="5"
                                onChange={this.onChange}
                            />
                        </Grid>
                        <Grid item xs={6} className="btn-grid">
                            <Button id="btn-cancel" type="submit" onClick={this.clearPost}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} className="btn-grid">
                            <Button id="btn-post" type="submit" onClick={this.addpost}>
                                Post
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <InputGroup>
                                    <FormControl
                                        id="search"
                                        name="search"
                                        value={this.state.searchauthor}
                                        placeholder="Search Here"
                                        onChange={this.onChange}
                                    />
                                </InputGroup>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="wrapper-posts">
                            {this.displayPost()}
                        </Grid>
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
        avatar: state.avatar,
        posts: state.posts,
        info: state.info,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleProfile: () => dispatch(handleProfile()),
        handleLogout: () => dispatch(handleLogout()),
        updateStatus: (status) => dispatch(updateStatus(status)),
        getFollow: () => dispatch(getFollow()),
        updateFollow: (accountname, method) => dispatch(updateFollow(accountname, method)),
        addPost: (accountname, new_post, img) => dispatch(addPost(accountname, new_post, img)),
        filterPost: (value, method) => dispatch(filterPost(value, method)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);