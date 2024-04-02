import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () =>{
    return <div className="border-b flex justify-between px-10 py-4">
            <Link className="flex justify-center flex-col curson-pointer italic uppercase font-bold text-l " to={"/blogs"}>
                My Blogs
            </Link>
        <div className="flex justify-content">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-small rounded-full text-sm px-4 py-2 text-center me-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
            </Link>
            <Avatar size="big" name="Rutuja"/>
        </div>
    </div>
}