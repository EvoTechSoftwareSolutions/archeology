const Header = () => {


return (

<header
className="
h-16
bg-white
shadow
flex
items-center
justify-between
px-6
"
>


<h2 className="text-xl font-semibold">

Dashboard

</h2>



<div className="flex items-center gap-4">


<div>

Admin User

</div>


<button
className="
bg-red-500
text-white
px-4
py-2
rounded
"
>

Logout

</button>


</div>


</header>


);


};


export default Header;