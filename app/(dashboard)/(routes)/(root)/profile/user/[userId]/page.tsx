import IconBadge from '@/components/icon-badge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react'
import { redirect } from 'next/navigation'
import UserField from '../../_components/user-fields'
import { useUser } from '@/hooks/use-User'
import UserImageForm from '../../_components/user-image-form'
import UserActions from '../../_components/user-actions'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'

const UserIdPage = async (
) => {
    const {userId} = useAuth()
    const user = useUser(userId)
    const [isDeleted, setIsDeleted] = useState(false)

    if (!userId || !user) {
        return redirect("/");
    }

    return (
        <>
            <div className="flex">
                <UserImageForm
                    initialData = {user}
                    userId = {user?.id}
                />
            </div>
            
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="gap-y-2 flex flex-col">
                        <h1 className="text-2xl font-medium">
                            user Setup
                        </h1>
                    </div>
                </div>
                <div className="grid grid-clos-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className="text-xl">
                                Customize your user
                            </h2>
                        </div>
                        <UserField
                            initialData={user.username}
                            userId={user.id}
                            field="username"
                            label="Username"
                        />
                        <UserField
                            initialData={user.email}
                            userId={user.id}
                            field="email"
                            label="Email"
                            type="email"
                        />
                        <UserField
                            initialData={user.firstName}
                            userId={user.id}
                            field="firstName"
                            label="First Name"
                        />
                        <UserField
                            initialData={user.lastName}
                            userId={user.id}
                            field="lastName"
                            label="Last Name"
                        />
                        <UserField
                            initialData={user.role}
                            userId={user.id}
                            field="role"
                            label="Role"
                        />
                        <UserField
                            initialData={user.subscriptionPlan}
                            userId={user.id}
                            field="subscriptionPlan"
                            label="Subscription Plan"
                        />
                        <UserField
                            initialData={user.coursesLimit}
                            userId={user.id}
                            field="coursesLimit"
                            label="Courses Limit"
                            type="number"
                        />
                        <UserField
                            initialData={user.createdCourses}
                            userId={user.id}
                            field="createdCourses"
                            label="Created Courses"
                            type="number"
                        />
                    </div>
                    <div className="space-y-2">
                        
                        <div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserIdPage