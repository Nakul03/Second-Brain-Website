import { ReactElement } from "react"

export function SidebarItem({text, icon}: {
    text: string;
    icon: ReactElement;
}) {
    return <div className="flex font-medium text-slate-600 py-2 cursor-pointer hover:bg-slate-200 rounded-lg max-w-60 pl-4 transition-all duration-150">
        <div className="pr-2 ">
            {icon}
        </div>
        <div>
            {text}
        </div>
    </div>
}