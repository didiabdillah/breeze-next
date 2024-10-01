'use client'

import axios from "@/lib/axios";
import useSWR from "swr";

export const DisplayFruit = () => {
    const { data: fruits } = useSWR('/api/fruits', () => 
        axios
            .get('/api/fruits')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    ) 

    return (
        <div className="flex flex-col items-center justify-center"> 
            <div className="w-full max-w-md">
                <div className="bg-white shadow-sm rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-semibold text-gray-900">
                                Your Fruits
                            </div>

                            <div className="flex items-center ml-3">
                                {fruits?.map((fruit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                    >
                                        {fruit.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}