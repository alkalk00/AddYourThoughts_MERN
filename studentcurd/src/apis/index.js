import axios from 'axios';

// const url = 'http://localhost:5000/posts/';
// https://memories-cluster.herokuapp.com/posts/

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})


export const fetchPosts = () => API.get('/posts')
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost)
export const deletePost = (id) => API.delete(`/posts$/${id}`)
export const updatelike = (id) => API.patch(`/posts/${id}/likepost`)

export const signup = (formdata) => API.post('/user/singup', formdata);
export const signin = (formdata) => API.post('/user/signin', formdata);
