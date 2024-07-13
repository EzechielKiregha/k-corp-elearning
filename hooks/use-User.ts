'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@prisma/client";

export function useUser(userId: string | null | undefined) {
    
    const [user, setUser] = useState<User>();
    
    if (!userId) return null;
    
    useEffect(() => {
        const fetchUserData = async (userId: string | null | undefined) => {
        try {
            // console.log("??? USER ID : ", userId)
            const response = await axios.get(`/api/users/${userId}`);
            if (response.status === 200) {
                setUser(response.data);
                console.log('User data status: ', response.status);
            } else {
                console.log('User data not found: ', response.status);
            }
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
        };

        fetchUserData(userId);
    }, [userId]);

    return user;
}