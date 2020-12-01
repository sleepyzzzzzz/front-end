import {
    goLogin, goRegister, handleInfo, handleProfile, handleMain,
    handleLogin, googleLogin, handleRegister, handleLogout,
    updateStatus, getAll, getFollow, updateFollow, addPost, filterPost, updatePost,
    handleEmail, handleZipcode, handlePhone, handleAvatar, handlePwd,
    getInfo, getAvatar, getStatus
} from "./actions";

const initialState = {
    accountname: '',
    displayname: '',
    email: '',
    phone: '',
    birthdate: '',
    zipcode: '',
    pwd: '',
    status: '',
    avatar: '',
    follow: [],
    follow_info: [],
    posts: [],
    all: [],
    info: '',
    path: '/'
}

export function frontend(state = initialState, action) {
    switch (action.type) {
        case goLogin:
            return {
                ...state,
                path: '/login',
                info: ""
            }
        case goRegister:
            return {
                ...state,
                path: '/register',
                info: ""
            }
        case handleInfo:
            return {
                ...state,
                info: ""
            }
        case handleProfile:
            return {
                ...state,
                path: '/profile',
                info: ""
            }
        case handleMain:
            return {
                ...state,
                path: '/main',
                info: ""
            }
        case handleLogin:
            if (action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            return {
                ...state,
                accountname: action.data.username,
                pwd: action.pwd.replace(/./g, "*"),
                path: "/main",
                info: ''
            };
        case googleLogin:
            return {
                ...state
            }
        case handleRegister:
            if (action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            return {
                ...state,
                info: 'Successfully Registered',
                path: '/register'
            }
        case handleLogout:
            return {
                ...state,
                login_user: '',
                accountname: '',
                displayname: '',
                email: '',
                phone: '',
                birthdate: '',
                zipcode: '',
                pwd: '',
                status: '',
                avatar: '',
                follow: [],
                follow_info: [],
                posts: [],
                filtered_posts: [],
                info: '',
                path: '/'
            }
        case getStatus:
            return {
                ...state,
                status: action.data.headline
            }
        case updateStatus:
            return {
                ...state,
                status: action.status
            }
        case getAll:
            let all_users = [];
            if (action.data.users) {
                for (let i = 0; i < action.data.users.length; i++) {
                    let username = action.data.users[i].username;
                    let avatar = action.data.users[i].avatar;
                    all_users.push({ username: username, avatar: avatar });
                }
            }
            return {
                ...state,
                all: all_users
            }
        case getFollow:
            return {
                ...state,
                follow: action.data.following,
                follow_info: action.data1.info,
                info: ''
            }
        case updateFollow:
            if (action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            return {
                ...state,
                follow: action.data.following,
                follow_info: action.data1.info,
                info: ''
            }
        case addPost:
            return {
                ...state,
                posts: action.data.articles
            }
        case filterPost:
            return {
                ...state,
                posts: action.data.articles
            }
        case updatePost:
            if (action.data.status === 401) {
                return {
                    ...state,
                    info: action.data.data
                }
            }
            return {
                ...state,
                posts: action.data.articles,
                info: ''
            }
        case handleEmail:
            return {
                ...state,
                email: action.data.email
            };
        case handleZipcode:
            return {
                ...state,
                zipcode: action.data.zipcode
            };
        case handlePhone:
            return {
                ...state,
                phone: action.data.phone
            };
        case handleAvatar:
            return {
                ...state,
                avatar: action.data.avatar
            };
        case handlePwd:
            let new_pwd = new Array(action.pwd.length + 1).join('*');
            return {
                ...state,
                pwd: new_pwd
            }
        case getInfo:
            return {
                ...state,
                email: action.data.email,
                zipcode: action.data1.zipcode,
                phone: action.data2.phone
            }
        case getAvatar:
            return {
                ...state,
                avatar: action.data.avatar
            }
        default:
            return { ...state };
    }
}