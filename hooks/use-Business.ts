import { useState, useEffect } from "react";
import axios from "axios";
import { Institution } from "@prisma/client";
import { useRouter } from "next/navigation";

export function useBusiness(institutionId: string | null | undefined, userId: string | null | undefined) {
    const [institution, setInstitution] = useState<Institution | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchInstitutionData = async () => {
        if (!institutionId) return null;

        try {
            const response = await axios.get(`/api/users/${userId}/institutions/${institutionId}`);
            if (response.status === 404) {
                console.log("Institution not found : ", response.status)
            } else {
                setInstitution(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        };

        fetchInstitutionData();
    }, [institutionId, router]);

    return institution;
}