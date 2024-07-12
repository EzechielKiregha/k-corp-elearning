import { User } from "@prisma/client";

export function isTeacher(user: User | null): boolean {
    if (
        user &&
        (user.subscriptionPlan === "Entreprise" ||
        user.role === "BUSINESSOWNER" ||
        user.subscriptionPlan === "Pro" ||
        user.role === "INSTRUCTOR")
    ) {
        return true;
    }

    return false;
}