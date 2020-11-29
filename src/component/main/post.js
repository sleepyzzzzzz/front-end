import React from 'react';
import { InputGroup, FormControl, Button, Image, ListGroup, Modal } from 'react-bootstrap';
import { Grid, Avatar, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { connect } from "react-redux";
import { addPost, filterPost, updatePost } from "../../actions";
import Commentlist from './comment';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            new_post: '',
            msg: '',
            search: '',
            post_display: [],
            img: '',
            post_edit: '',
            comment_edit: '',
            show_post: false,
            show_comment: false
        }
        this.upload = React.createRef();
        this.inputPost = React.createRef();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            msg: "",
            post_display: this.props.posts
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

    handleClose = () => {
        if (this.state.show_post) {
            this.setState({ show_post: false });
        }
        if (this.state.show_comment) {
            this.setState({ show_comment: false });
        }
    }

    edit = () => {
        this.setState({ show_post: true });
    }

    handlePost = (pid) => {
        this.props.updatePost(this.state.post_edit, pid, -2);
    }

    comment = () => {
        this.setState({ show_comment: true });
    }

    handleComment = (id) => {
        this.props.updateComment(this.state.comment_edit, id);
    }

    displayEdit = (show, post, name) => {
        return (
            <div>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Body>
                        <textarea
                            className="form-control"
                            id="post_edit"
                            name='post_edit'
                            value={this.state.post_edit}
                            onChange={this.onChange}
                            placeholder={name === 'post' ? post.text : ''}
                            rows="5"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handlePost}>
                            Update
                                    </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
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
                            <Avatar alt="img" src={post.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={post.author}
                            secondary={post.date}
                        />
                    </ListItem>
                    <div className="post-info">
                        <div className="post-text" ref={this.post_text}>
                            <span>{post.text}</span>
                        </div>
                        {this.displayEdit(this.state.show_post, post, 'post')}
                        <div className="post-img">
                            <Image className="images" src={post.images} style={{ display: post.images ? 'block' : 'none' }}></Image>
                        </div>
                    </div>
                    <br></br>
                    <Grid container spacing={3} className="post-info">
                        <Grid item xs={5}>
                            <Button id="btn-edit" type="submit" onClick={this.edit}>
                                Edit
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button id="btn-comment" type="submit" onClick={this.comment}>
                                Comment
                            </Button>
                            {this.displayEdit(this.state.show_comment, post, 'comment')}
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);