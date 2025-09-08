import {
    AppsOutline,
    GridOutline,
    HomeOutline,
    LogOutOutline,
    NewspaperOutline,
    NotificationsOutline,
    PeopleOutline,
    PieChartOutline,
} from "react-ionicons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    // const navLinks = [
    //     {
    //         title: "Home",
    //         icon: (
    //             <HomeOutline
    //                 color="#555"
    //                 width="22px"
    //                 height="22px"
    //             />
    //         ),
    //         active: false,
    //     },
    //     {
    //         title: "Boards",
    //         icon: (
    //             <AppsOutline
    //                 color="#555"
    //                 width="22px"
    //                 height="22px"
    //             />
    //         ),
    //         active: true,
    //     },
    //     {
    //         title: "Projects",
    //         icon: (
    //             <GridOutline
    //                 color="#555"
    //                 width="22px"
    //                 height="22px"
    //             />
    //         ),
    //         active: false,
    //     },
    //     {
    //         title: "Analytics",
    //         icon: (
    //             <PieChartOutline
    //                 color="#555"
    //                 width="22px"
    //                 height="22px"
    //             />
    //         ),
    //         active: false,
    //     },
    //     {
    //         title: "Workflows",
    //         icon: (
    //             <PeopleOutline
    //                 color="#555"
    //                 width="22px"
    //                 height="22px"
    //             />
    //         ),
    //         active: false,
    //     },
    //     {
    //         title: "Notifications",
    //         icon: (
    //             <NotificationsOutline
    //                 color="#555"
    //                 width="22px"
    //                 height="22px"
    //             />
    //         ),
    //         active: false,
    //     },
    //     {
    //         title: "Newsletter",
    //         icon: (
    //             <NewspaperOutline
    //                 color="#555"
    //                 width="22px"
    //                 height="22px"
    //             />
    //         ),
    //         active: false,
    //     },
    // ];
    return (
        <div className="fixed left-0 z-50 top-0 md:w-[230px] w-[60px] border-r overflow-hidden h-full flex flex-col">
            <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
                <span className="text-orange-400 font-semibold text-2xl md:block hidden">DashBoard.</span>
                <span className="text-orange-400 font-semibold text-2xl md:hidden block">DashBoard.</span>
            </div>
            <div className="w-full h-[calc(100vh-70px)]  flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative">
                <NavLink

                    to='/dashboard'
                    className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer }`}

                    style={({ isActive }) => ({
                        color: isActive
                            ? "orange"
                            : "black",
                        textDecoration: 'none'
                    })}

                >
                    <HomeOutline
                        color="#555"
                        width="22px"
                        height="22px"
                    />
                    <span className="font-medium text-[15px] md:block hidden">Home</span>
                </NavLink>
                <NavLink
                    to='/board'
                    className={`flex items-center gap-2  w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer `}
                    style={({ isActive }) => ({
                        color: isActive
                            ? "orange"
                            : "black",
                        textDecoration: 'none'
                    })}
                >
                    <AppsOutline
                        color="#555"
                        width="22px"
                        height="22px"
                    />
                    <span className="font-medium text-[15px] md:block hidden">Board</span>
                </NavLink>

                <NavLink
                    to='/'>
                    <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200">
                        <LogOutOutline />
                        <span className="font-medium text-[15px] md:block hidden">Log Out</span>
                    </div>
                </NavLink >

            </div>
        </div >
    );
};

export default Sidebar;
