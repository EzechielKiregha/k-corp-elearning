'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

export function useUser(userId: string | null | undefined) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
        if (!userId) return;

        try {
            const response = await axios.get(`/api/users/${userId}`);
            if (response.status === 404) {
                console.error('User data not found: ', response.status);
            } else {
            setUser(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        };

        fetchUserData();
    }, [userId, router]);

    return user;
}