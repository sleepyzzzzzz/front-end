import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";
import { addPost, filterPost, updatePost } from "../../../actions";
import { Post } from './post';

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            new_post: '',
            msg: '',
            search: '',
            img: '',
            post_edit: '',
            show_post: false,
            show_comment: false
        }
        this.upload = React.createRef();
        this.inputPost = React.createRef();
    }

    componentDidMount() {
        let method = this.state.search ? 'id' : '';
        this.props.filterPost(this.state.search, method);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: "",
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

    clearPost = () => {
        this.setState({ new_post: "", img: "" });
    }

    addPost = () => {
        this.props.addPost(this.props.accountname, this.state.new_post, this.state.img);
        this.clearPost();
    }

    handlePost = (text, pid, name) => {
        let id = name === 'post' ? -2 : -1;
        this.props.updatePost(text, pid, id);
    }

    displayPost = () => {
        let posts = this.props.posts;
        let displaypost = posts.map((post, index) => {
            return (
                <Post
                    key={index}
                    post={post}
                    handlePost={this.handlePost}
                />
            );
        });
        return displaypost;
    }

    render() {
        return (
            <Grid item xs={6} id='post-pg'>
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
                        <Button id="btn-post" type="submit" onClick={this.addPost}>
                            Post
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <InputGroup>
                                <FormControl
                                    id="search"
                                    name="search"
                                    value={this.state.search}
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
        addPost: (accountname, new_post, img) => dispatch(addPost(accountname, new_post, img)),
        filterPost: (value, method) => dispatch(filterPost(value, method)),
        updatePost: (text, pid, id) => dispatch(updatePost(text, pid, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);