import { Link, useLocation } from "react-router-dom";

import { FaHome, FaDatabase, FaPowerOff } from 'react-icons/fa';
import logo from '../img/logo-white.svg';

const Nav = (props) => {
    let location = useLocation();
    console.log(location)
    const navItems = [
        // {
        //     name: "Overview",
        //     path: "/",
        //     icon: <FaHome />,
        // },
        {
            name: "Stats",
            path: "/stats",
            icon: <FaDatabase />,
        },
    ]

    return (
        <>
        <nav className="flex flex-col w-full md:w-2/12">
            <div className="flex flex-row items-center justify-center my-10">
                <img src={logo} alt="Chippin Logo" className="w-[100px]" />
                {/* <span className="border-l-[1px] border-pink ml-5 pl-5 text-xs">Dashboard</span> */}
            </div>

            <div className="flex flex-row md:flex-col w-full h-full justify-between md:w-auto">
                <div id="nav" className="flex flex-row md:flex-col text-sm">
                {navItems.map((item, index) => (
                    <Link key={index} id={location.pathname === item.path ? 'active' : null} to={item.path} className={index === 0 ? "flex flex-row items-center p-4 border-t-[1px]" : "flex flex-row items-center p-4 border-y-[1px]"}>
                        <div className="mr-2 hidden md:block">{item.icon}</div>
                        {item.name}
                    </Link>
                ))}
                </div>

                <div>
                    <div className="flex items-center p-4 text-sm hover:text-pink transition-colors cursor-pointer" onClick={() => props.logout()}>
                        <FaPowerOff className="mr-3" /> <span className="hidden md:block">Logout</span>
                    </div>
                </div>
            </div>

        </nav>
        </>
    );
}
 
export default Nav;