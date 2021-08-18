import "./sidebar.css";
import { RssFeed, Bookmarks, Group, Chat } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Friend from "../friend/Friend";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';


export default function Sidebar() {
	const [friends, setFriends] = useState([]);
    const { user } = useContext(AuthContext)
	useEffect(() => {
        const fetchFriends = async () => {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const res = await axios.get('/api/users/followers/' + user.userId, config)
           	setFriends(res.data.result);
        }
        fetchFriends();

    }, [user.token, user.userId])
	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<ul className="sidebarList">
					<Link
						style={{ textDecoration: "none", color: "#000" }}
						to={"/timeline"}
					>
						<li className="sidebarListItem">
							<RssFeed></RssFeed>
							<span className="sidebarListItemText">Feed</span>
						</li>
					</Link>

					<li className="sidebarListItem">
						<Bookmarks></Bookmarks>
						<span className="sidebarListItemText">Bookmarks</span>
					</li>
					<li className="sidebarListItem">
						<Group></Group>
						<span className="sidebarListItemText">Group</span>
					</li>
					<Link
						style={{ textDecoration: "none", color: "#000" }}
						to={"/messenger"}
					>
						<li className="sidebarListItem">
							<Chat></Chat>
							<span className="sidebarListItemText">Chat</span>
						</li>
					</Link>
				</ul>
				<hr className="sidebarHr"></hr>
				<ul className='sidebarFriendList'>
					{friends.map(friend=><Friend key={friend._id} friend={friend}></Friend>)}
                </ul>
			</div>
		</div>
	);
}
