import React from 'react'

function Loader() {
    return (
        <div className="absolute top-0 w-screen flex justify-center items-center h-full bg-gray-900/60" >
             <div class="flex justify-center">
                            <div class="relative">
                                <div class="w-12 h-12 rounded-full absolute
                            border-4 border-dashed border-transparent"></div>

                                <div class="w-12 h-12 rounded-full animate-spin  absolute
                            border-4 border-dashed border-gray-400 border-t-transparent"></div>
                                <div class="w-12 h-12 rounded-full animate-spin  absolute
                            border-8  border-dashed border-gray-400 border-t-transparent"></div>
                            </div>
                        </div>

        </div>

    )
}

export default Loader