import TimelineFeed from "../../components/timelineFeed/TimelineFeed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import './timeline.css'


export default function Home() {
    return (
        <>
            <Topbar></Topbar>
            <div className='homeContainer'>
                <Sidebar></Sidebar>
                <TimelineFeed/>
                <Rightbar></Rightbar>
            </div>
        </>
    )
}