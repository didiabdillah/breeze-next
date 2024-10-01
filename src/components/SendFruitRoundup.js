'use client'

import axios from "@/lib/axios";
import { useState } from "react";
import Button from './Button';

export const SendFruitRoundup = () => {
    const [response, setResponse] = useState(null);
    const [errors, setErrors] = useState([]);

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const grabData = async ({ setErrors, setResponse, ...props }) => {

        await csrf();

        setErrors([]);

        axios
            .post('/api/send-fruit-email', props)
            .then(response => setResponse(response.data))
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });

    };

    const handleClick = () => {
        grabData({ setErrors, setResponse });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-sm rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-semibold text-gray-900">
                                Fruit Roundup
                            </div>
                            <div className="flex items-center ml-3">
                                <Button
                                    onClick={handleClick}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>

                        {response?.message && (
                            <div className="mt-4">
                                {response.message}
                            </div>
                        )}

                        {errors.length > 0 && (
                            <div className="mt-4">
                                {errors.map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}