import UserField from "./user-fields";

interface UserFormProps {
    user: {
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        subscriptionPlan: string;
        coursesLimit: number;
        createdCourses: number;
    }
}

const UserForm = ({ user }: UserFormProps) => {
    return (
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
    )
}

export default UserForm