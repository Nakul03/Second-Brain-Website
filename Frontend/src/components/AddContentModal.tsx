import { useRef, useState } from "react";
import { CrossIcon } from "./ui/CrossIcon";
import { Button } from "./ui/Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "yt",
    Twitter = "x"
}

export function AddContentModal({open, onClose}){
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(BACKEND_URL + "/api/v1/content", {
            link,
            title,
            type
        },{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
    }

    return <div>
        {open && <div className="w-screen h-screen bg-slate-600 fixed top-0 left-0 bg-opacity-90 flex justify-center">
             <div className="flex justify-center flex-col">  
                <span className="bg-white p-4 rounded-md cursor-pointer">
                    <div className="flex justify-end" onClick={onClose} >
                        <CrossIcon />
                    </div>
                    <div>
                        <Input reference={titleRef} placeholder = {"Title"} /> 
                        <Input reference={linkRef} placeholder = {"Link"} />
                    </div>
                    <div>
                        <h1 className="flex justify-center items-center">Type of link</h1>
                        <div className="flex gap-7 p-4">
                            <Button size="sm" text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Youtube)
                            }}/>
                            <Button  size="sm" text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                setType (ContentType.Twitter)
                            }}/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={addContent} size="sm" variant="primary" text="Add brain"/>
                    </div>
                </span>
            </div>
        </div>}
    </div>
}
