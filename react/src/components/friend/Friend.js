import './friend.css'

export default function Friend({friend}) {
    return (
        <li className='sidebarFriend'>
            <img className='sidebarFriendImg' alt='' src="/assets/person/noAvatar.png" />
            <span className='sidebarFriendName'>{friend.name}</span>
        </li>
    )
}
