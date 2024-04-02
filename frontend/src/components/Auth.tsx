import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@rutujaharne/my-blog";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: {type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    })
    const [errors, setErrors] = useState<string>("");

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs")
        }catch(error: any){
            if(error.response && error.response.data && error.response.data.message){
                setErrors(error.response.data.message);
            } 
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            {errors && <ShowAlert message={errors} onClose={() => setErrors("")} />}
                <div className="px-10">
                    <div className="text-4xl text-center font-bold">
                        Create an account
                    </div>
                    <div className="text-l text-center text-slate-600 pt-2">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"} 
                        <Link className="underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign up" :  "Sign in"}</Link>
                    </div>
                </div>
                <div className="pt-4">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Name" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />: null}
                    <LabelledInput label="Username" placeholder="Username" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                    <LabelledInput type="password" label="Password" placeholder="Password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    
                </div>
                <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4">{type === "signin" ? "Sign in" : "Sign up"}</button>
            </div>
        </div>
    </div>
}

interface LabelledInputType{
     label: string;
     placeholder: string;
     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
     type?: string;
}
function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType){
    return <div>
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white pt-4">{label}</label>
                <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
            </div>
        </div>
}
function ShowAlert({ message, onClose }: { message: string; onClose: () => void; }){
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 3000); // Adjust the duration (in milliseconds) as needed

        return () => clearTimeout(timeout);
    }, [onClose]);
    
    return <div>
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 relative" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="flex-grow">
                <span className="font-medium">Error</span> {message}
            </div>
            <button onClick={onClose} className="text-red-600 hover:text-red-800 focus:outline-none absolute top-0 right-0 mt-4 mr-4">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M13.348 6.652a.5.5 0 0 0-.707 0L10 9.293 6.357 5.652a.5.5 0 0 0-.707.708L9.293 10l-3.64 3.643a.5.5 0 0 0 .707.707L10 10.707l3.643 3.64a.5.5 0 0 0 .707-.707L10.707 10l3.64-3.643a.5.5 0 0 0 0-.707z" />
                </svg>
            </button>
        </div>
    </div>
}