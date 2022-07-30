import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../actions/actionTypes";

export default (posts = [], action)=> {
    switch (action.type) {
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
        case 'LIKE':
            return posts.filter((post)=> post._id != action.payload);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts;
    }
}