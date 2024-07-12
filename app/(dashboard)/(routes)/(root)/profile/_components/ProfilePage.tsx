"use client"
import React, { useEffect, useState } from 'react';
import InstitutionInfoForm from './InstitutionInfoForm';
import UserInfoForm from './UserInfoForm';
import axios from 'axios';
import { UserProfile, useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';
import { useUser } from '@/hooks/use-User';

const ProfilePage = () => {
    const { userId } = useAuth();
    const user = useUser(userId)

    if (!user) {
        return <div>Loading</div>
    }

    return (
        <div className="bg-gradient-to-r from-sky-950 to-sky-600 h-full">
            <div className="flex flex-col items-center justify-center w-100 mx-auto">
                <UserProfile/>
                <div className='flex flex-row space-x-20'>
                    <UserInfoForm user={user} />
                    {user.role === 'BUSINESSOWNER' && <InstitutionInfoForm user={user} />}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
