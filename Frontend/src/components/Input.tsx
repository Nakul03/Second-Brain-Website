interface Inputprops {
    placeholder:string; 
    reference?:any;
}

export function Input({placeholder, reference}: Inputprops) {
    return <div>
        <input ref={reference} placeholder = {placeholder} type={"text"} className="px-4 py-2 border rounded-md m-2"/>
    </div>
}