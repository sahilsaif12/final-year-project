import React from 'react'
import item from './img/onion.jpg'
function Fooditem({other1st,name,other2nd,other3rd,quercetin,img}) {
  return (
    <div className="m-10 flex justify-center ">

    <div className="bg-slate-800/90 flex rounded-md w-4/5 p-5">
    <img className="rounded-md h-52"  src={img} alt="" />
    <div className="flex-grow">
    <div className="text-center text-xl text-gray-200/90">Food molecules present in <span className="  text-gray-200/90 font-bold">{name}</span> </div>
    <div className="flex justify-evenly  p-2 text-gray-200">
   

    <u className="no-underline text-lg self-end text-gray-300">
    Other molecules
        <li>{other1st}</li>
        <li>{other2nd}</li>
        <li>{other3rd}</li>
    </u>
    <div className="p-3 self-end text-xl max-h-14  bg-stone-900 rounded-lg border border-stone-700">
        Quercetin : {quercetin} ppm (standard)
    </div>        
    </div>

    </div>
    </div>
    </div>
  )
}

export default Fooditem