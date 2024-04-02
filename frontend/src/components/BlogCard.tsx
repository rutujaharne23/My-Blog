import { Link } from "react-router-dom";

interface BlogCardProps{
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-5 border-b-2 border-slate-100 pb-5 w-screen max-w-lg cursor-pointer">
            <div className="flex">
                <div className="uppercase flex justify-center">
                    <Avatar size = "small" name={authorName}/>
                </div> 
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-bold pt-2">
                {title}
            </div>
            <div className="text-sm font-normal">
                {content.slice(0, 133) + "..."}
            </div>
            <div className="text-sm font-thin text-slate-500 pt-6">
                {`${Math.ceil(content.length/100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export const Circle = () => {
    return <div className="h-1 w-1 rounded-full bg-slate-400">

    </div>
}

export const Avatar = ({ name, size = "small" }: { name: string, size: "small" | "big" }) => {
    return <div>
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 border border-slate-400 ${size === "small" ? "w-6 h-6" : "w-8 h-8"}`}>
            <span className={`${size === "small" ? "text-sm" : "text-l"}  text-gray-700 dark:text-gray-300`}>{name[0]}</span>
        </div>
    </div>
}