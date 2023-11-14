

import SideBar from "../components/Sidebar";
import Nav from "../components/Nav";

export default function Dashboard() {

    return (
        <div className="dashBoard">
            <SideBar />
            <div className="content">
                 <Nav />
            </div>
           
        </div>
    )
}