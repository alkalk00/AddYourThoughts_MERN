import axios from 'axios';

const url = 'http://localhost:5000/posts/';
// https://memories-cluster.herokuapp.com/posts/

export const fetchPosts = () => axios.get(url)
export const createPost = (newPost) => axios.post(url, newPost)
export const updatePost = (id,updatedPost) => axios.patch(`${url}${id}`,updatedPost)
export const deletePost = (id) => axios.delete(`${url}${id}`)
export const updatelike = (id) => axios.patch(`${url}${id}/likepost`)