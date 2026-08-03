import { FaMapMarkerAlt } from "react-icons/fa";

export default function Marker({left,top,onClick}){

return(

<button
className="absolute -translate-x-1/2 -translate-y-full"
style={{
left:`${left}%`,
top:`${top}%`
}}
onClick={onClick}
>

<FaMapMarkerAlt
size={26}
className="text-red-600 animate-bounce"
/>

</button>

)

}