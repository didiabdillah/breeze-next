'use client'

import { useAuth } from '@/hooks/auth'

const UserComponent = () => {
    const { user } = useAuth({ middleware: 'auth'});

    return (
        <div className="flex items-center">
            <div className="text-sm font-medium text-gray-900">
                {user?.name}
            </div>

            <div className="ml-2 text-sm text-gray-500">
                {user?.email}
            </div>
        </div>
    )
}

export default UserComponent