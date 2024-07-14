import IconBadge from '@/components/icon-badge'
import { CircleDollarSign, File, LayoutDashboard, ListChecks, Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import UserField from '../../_components/user-fields'
import { useUser } from '@/hooks/use-User'
import UserImageForm from '../../_components/user-image-form'
import UserActions from '../../_components/user-actions'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { User } from '@prisma/client'

interface UserIdPageProps {
    userId : string | null;
    user : User | null;
}

const UserIdPage = ({
    user,
    userId,
} : UserIdPageProps) => {

    const [isDeleted, setIsDeleted] = useState(false)

    if(!user) return (
        <div></div>
    )
    return (
        <>
            <div className="flex mt-2">
                <UserImageForm
                    initialData = {user}
                    userId = {user?.id}
                />
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            Personal information
                        </h2>
                    </div>
                </div>
                <div className="grid grid-clos-1 md:grid-cols-2 gap-20 mt-6">
                    <div>
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
                        
                    </div>
                    <div className="space-y-2">
                        
                        <div>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserIdPage