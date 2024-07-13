'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { Institution } from "@prisma/client";

export function useBusiness(institutionId: string | null | undefined, userId: string | null | undefined) {
    
    const [institution, setInstitution] = useState<Institution | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInstitutionData = async () => {
            if (!institutionId || !userId) {
                setInstitution(null);
                return;
            }
        try {
            const response = await axios.get(`/api/users/${userId}/institutions/${institutionId}`);
            if (response.status === 200) {
                console.log("Institution found : ", response.status)
                setInstitution(response.data);
            } else {
                console.log("Institution not found : ", response.status)
            }
        } catch (error) {
            console.error("Error fetching institution data:", error);
            setError("Failed to fetch institution data");
            setInstitution(null);
        } finally {
            setIsLoading(false);
        }
        };

        fetchInstitutionData();
    }, [institutionId, userId]);

    return { institution, isLoading, error };
}