import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return <div>
        <div role="status" className="animate-pulse">
            <div className="p-5 border-b-2 border-slate-100 pb-5 w-screen max-w-lg cursor-pointer">
                <div className="flex">
                    <div className="h-4 w-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="pl-2 flex justify-center flex-col">
                        <Circle />
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                </div>
                <div className="text-xl font-bold pt-2">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                </div>
                <div className="text-sm font-normal">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                </div>
                <div className="text-sm font-thin text-slate-500 pt-6">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
}