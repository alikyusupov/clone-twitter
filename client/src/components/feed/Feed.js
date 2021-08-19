import Post from "../post/Post";
import { useState, useEffect, useContext } from "react";
import Share from "../share/Share";
import axios from "axios";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(AuthContext);
	const config = {
		headers: { Authorization: `Bearer ${user.token}` }
	};
	useEffect(() => {
		const fetchPosts = async () => {
			const res = username
				? await axios.get("/posts/profile/" + username, config)
				: await axios.get(`/posts/timeline/${user._id}`, config);
			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
		};
		fetchPosts();
	}, [username, user._id]);
	return (
		<div className="feed">
			<div className="feedWrapper">
				{(!username || username === user.username) && <Share />}
				{posts.map((post) => (
					<Post key={post._id} post={post}></Post>
				))}
			</div>
		</div>
	);
}
