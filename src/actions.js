import axios from 'axios';
export const url = path => `http://localhost:3000${path}`;
// export const url = path => `https://yz166-hw6-backend.herokuapp.com${path}`;
axios.defaults.withCredentials = true;

export const goLogin = () => ({
    type: goLogin
});

export const goRegister = () => ({
    type: goRegister
});

export const handleInfo = () => ({
    type: handleInfo
});

export const handleProfile = () => ({
    type: handleProfile
});

export const handleMain = () => ({
    type: handleMain
});

// Landing
export const handleLogin = (accountname, pwd) => {
    let user = {
        username: accountname,
        password: pwd
    };
    return (dispatch) => {
        axios.post(url('/login'), user, { crossDomain: true }).then((res) => {
            const data = res.data;
            console.log(data);
            return dispatch({
                type: handleLogin,
                accountname,
                pwd,
                data
            })
        }).catch(e => {
            const data = e.response;
            return dispatch({
                type: handleLogin,
                data
            })
        })
    }
};

export const handleRegister = (accountname, email, phone, birthdate, zipcode, password, avatar, displayname) => {
    let user = {
        username: accountname,
        email: email,
        dob: birthdate,
        zipcode: zipcode,
        password: password,
        avatar: avatar
    };
    return (dispatch) => {
        axios.post(url('/register'), user, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: handleRegister,
                accountname, email, phone, birthdate, zipcode, password, avatar, displayname, data
            })
        }).catch(e => {
            const data = e.response;
            return dispatch({
                type: handleRegister,
                data
            })
        })
    }
};

// Main
export const handleLogout = () => {
    return (dispatch) => {
        axios.put(url('/logout'), { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: handleLogout,
                data
            })
        })
    }
};

export const getStatus = () => {
    return (dispatch) => {
        axios.get(url('/headline'), { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: getStatus,
                data
            })
        })
    };
}

export const updateStatus = (status) => {
    let headline = {
        headline: status
    };
    return (dispatch) => {
        axios.put(url('/headline'), headline, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: updateStatus,
                status, data
            })
        })
    }
};

export const getFollow = () => {
    return (dispatch) => {
        axios.get(url('/following'), { crossDomain: true }).then((res) => {
            const data = res.data;
            axios.get(url('/followinginfo'), { crossDomain: true }).then((res1) => {
                const data1 = res1.data;
                return dispatch({
                    type: getFollow,
                    data,
                    data1
                })
            })
        })
    };
}

export const updateFollow = (accountname, method) => {
    if (method === 'add') {
        return (dispatch) => {
            axios.put(url('/following/' + accountname), { crossDomain: true }).then((res) => {
                const data = res.data;
                return dispatch({
                    type: updateFollow,
                    accountname,
                    method,
                    data
                })
            })
        };
    }
    else {
        return (dispatch) => {
            axios.delete(url('/following/' + accountname), { crossDomain: true }).then((res) => {
                const data = res.data;
                return dispatch({
                    type: updateFollow,
                    accountname,
                    method,
                    data
                })
            })
        };
    }
};

export const addPost = (accountname, new_post, img) => {
    let post = {
        text: new_post,
        img: img
    };
    return (dispatch) => {
        axios.post(url('/article'), post, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: addPost,
                accountname,
                new_post,
                img,
                data
            })
        })
    }
};

export const filterPost = (value, method) => {
    if (method) {
        return (dispatch) => {
            axios.get(url('/articles/' + value), { crossDomain: true }).then((res) => {
                const data = res.data;
                return dispatch({
                    type: filterPost,
                    value,
                    method,
                    data
                })
            })
        };
    }
    else {
        return (dispatch) => {
            axios.get(url('/articles'), { crossDomain: true }).then((res) => {
                const data = res.data;
                return dispatch({
                    type: filterPost,
                    value,
                    method,
                    data
                })
            })
        };
    }
};

export const handleEmail = (email) => {
    let new_email = {
        email: email
    }
    return (dispatch) => {
        axios.put(url('/email'), new_email, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: handleEmail,
                email,
                data
            })
        })
    }
}

export const handlePhone = (phone) => {
    let new_phone = {
        phone: phone
    }
    return (dispatch) => {
        axios.put(url('/phone'), new_phone, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: handlePhone,
                phone,
                data
            })
        })
    }
}

export const handleZipcode = (zipcode) => {
    let new_zipcode = {
        zipcode: zipcode
    }
    return (dispatch) => {
        axios.put(url('/zipcode'), new_zipcode, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: handleZipcode,
                zipcode,
                data
            })
        })
    }
}

export const handleAvatar = (avatar) => {
    let new_avatar = {
        avatar: avatar
    }
    return (dispatch) => {
        axios.put(url('/avatar'), new_avatar, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: handleAvatar,
                avatar,
                data
            })
        })
    }
}


export const handlePwd = (pwd) => {
    let new_password = {
        password: pwd
    }
    return (dispatch) => {
        axios.put(url('/password'), new_password, { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: handlePwd,
                pwd,
                data
            })
        })
    }
}

export const getInfo = () => {
    return (dispatch) => {
        axios.get(url('/email'), { crossDomain: true }).then((res) => {
            const data = res.data;
            axios.get(url('/zipcode'), { crossDomain: true }).then((res1) => {
                const data1 = res1.data;
                axios.get(url('/phone'), { crossDomain: true }).then((res2) => {
                    const data2 = res2.data;
                    return dispatch({
                        type: getInfo,
                        data,
                        data1,
                        data2
                    })
                })
            })
        })
    };
};

export const getAvatar = () => {
    return (dispatch) => {
        axios.get(url('/avatar'), { crossDomain: true }).then((res) => {
            const data = res.data;
            return dispatch({
                type: getAvatar,
                data
            })
        })
    };
};