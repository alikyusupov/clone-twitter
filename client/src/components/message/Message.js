import "./message.css";
import { format } from "timeago.js";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Message({ sender, message, own }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [currentSender, setCurrentSender] = useState(null);

	const { user } = useContext(AuthContext);
	const config = {
		headers: { Authorization: `Bearer ${user.token}` }
	};

	useEffect(() => {
		const findUser = async () => {
			try {
				const res = await axios.get("users?userId=" + sender, config);
				setCurrentSender(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		findUser();
	}, [sender]);
	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				<div className="messageInfo">
					<img
						className="messageImg"
						src={currentSender?.profilePicture || PF + "/person/noAvatar.png"}
						alt=""
					></img>
					<p className="messageAuthor">{currentSender?.username}</p>
				</div>
				<p className="messageText">{message.text}</p>
			</div>
			<div className="messageBottom">{format(message.createdAt)}</div>
		</div>
	);
}
