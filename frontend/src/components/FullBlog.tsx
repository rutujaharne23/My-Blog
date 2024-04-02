import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blog}) =>{
     return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 w-full max-w-screen-lg pt-12">
                <div className="col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="font-thin text-slate-500 text-sm pt-3">
                        Posted on Dec 24, 2023
                    </div>
                    <div className="pt-6 text-base">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-l">
                        Author
                    </div>
                    <div className="flex justify-content">
                        <div className="flex justify-center flex-col uppercase pr-5">
                            <Avatar size="big" name={blog.author.name}/>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention.
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        </div>
        
     </div>
} 