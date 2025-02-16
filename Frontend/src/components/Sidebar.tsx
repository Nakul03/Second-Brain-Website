import { BrainIcon } from "./ui/BrainIcon";
import { SidebarItem } from "./ui/SidebarItem";
import { TwitterIcon } from "./ui/TwitterIcon";
import { YoutubeIcon } from "./ui/YoutubeIcon";

export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-4">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-900 font-extrabold">
                <BrainIcon />
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon />}/>
            <SidebarItem text="Youtube" icon={<YoutubeIcon/ >}/>
        </div>
    </div>
}