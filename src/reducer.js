import {
    goLogin, goRegister, handleInfo, handleProfile, handleMain,
    handleLogin, handleRegister, handleLogout,
    updateStatus, getFollow, updateFollow, addPost, filterPost,
    handleUpdate, getInfo, getAvatar, getStatus
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
    posts: [],
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
                path: '/profile'
            }
        case handleMain:
            return {
                ...state,
                path: '/main'
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
                path: "/main"
            };
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
            };
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
        case getFollow:
            return {
                ...state,
                follow: action.data.following
            }
        case updateFollow:
            return {
                ...state,
                follow: action.data.following
            }
        case addPost:
            return {
                ...state,
                posts: action.data.articles
            };
        case filterPost:
            return {
                ...state,
                posts: action.data.articles
            }
        case handleUpdate:
            return {
                ...state,
            };
        case getInfo:
            console.log(action);
            return {
                ...state,
                email: action.data.email,
                zipcode: action.data1.zipcode
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