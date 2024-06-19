import React from 'react'

function Table({name,food,accuracy,prediction,refValue}) {
    return (
        <div>
            <div class="containe w-2/4 mx-auto my-4 px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-3xl font-semibold leading-tight">{name} Prediction</h2>
                    </div>
                    <div class="-mx-4 sm:-mx-8  px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table class="min-w-full  leading-normal border-4 border-gray-600  bg-slate-800/90">
                                <thead  >
                                    <tr>
                                        <th
                                            class="px-5 py-3  border-r border-gray-400 text-center bg-gray-300 text-sm font-semibold text-gray-700 capitalize tracking-wider"
                                        >
                                            Food item
                                        </th>
                                        <th
                                            class="px-5 py-3  border-r border-gray-400 text-center bg-gray-200 text-sm font-semibold text-gray-700 capitalize tracking-wider"
                                        >
                                            Refference Quercetin (ppm)
                                        </th>
                                        <th
                                            class="px-5 py-3  border-r border-gray-400 text-center bg-gray-200 text-sm font-semibold text-gray-700 capitalize tracking-wider"
                                        >
                                            {name} Predicted Quercetin (ppm)
                                        </th>
                                        <th
                                            class="px-5 py-3  border-r border-gray-400 text-center bg-gray-200 text-sm font-semibold text-gray-700 capitalize tracking-wider"
                                        >
                                            Prediction accuracy
                                        </th>
                                       
                                    </tr>
                                </thead>
                                <tbody className="text-gray-200">
                                    <tr>
                                        <td class="px-5 py-5 border-r border-gray-400  ">

                                            <div class="ml-3">
                                                <p class=" capitalize whitespace-no-wrap">
                                                    {food}
                                                </p>
                                            </div>
                                        </td>
                                        <td class="px-5 py-5  border-r border-gray-400 ">
                                            <p class=" text-center whitespace-no-wrap">{refValue}</p>
                                        </td>
                                        <td class="px-5 py-5  border-r border-gray-400 ">
                                            <p class=" text-center whitespace-no-wrap">{prediction}</p>
                                        </td>
                                        <td class="px-5 py-5  border-r border-gray-400 ">
                                            <p class=" text-center whitespace-no-wrap">{accuracy} %</p>

                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table