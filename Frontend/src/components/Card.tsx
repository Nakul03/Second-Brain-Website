import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "x" | "yt";
}

export function Card({title, link, type}: CardProps) {
    return <div>
        <div className="bg-white rounded-md shadow-md border-gray-200 border p-4 max-w-72 min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <ShareIcon size="md"/>
                    </div>
                    <span className="font-bold font-serif">
                        {title}
                    </span>
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <ShareIcon size="md"/>
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <ShareIcon size="md"/>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                { type==="yt" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "x" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}>
                    </a>
                </blockquote>}
            </div>
        </div>
    </div>
}

// https://twitter.com/username/status/807811447862468608