import Post from '../post/Post'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import './timelineFeed.css'
import { AuthContext } from '../../context/AuthContext';

export default function TimelineFeed() {
    const [posts, setPosts] = useState([]);

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const res = await axios.get('/api/tweets/timeline/' + user.userId, config)
            setPosts(res.data.result.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }));
        }
        fetchPosts();

    }, [user.token, user.userId])
    return (
        <div className='feed'>
            <div className='feedWrapper'>
                {posts.map(post => (
                    <Post key={post._id} post={post}></Post>
                ))}
            </div>
        </div>
    )
}
