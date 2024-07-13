"use client"
import { useBusiness } from '@/hooks/use-Business';
import { Institution, User } from '@prisma/client';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface InstitutionInfoFormProps {
    user : User
}

const InstitutionInfoForm = ( {
    user,
} : InstitutionInfoFormProps ) => {

    const { institution, isLoading, error } = useBusiness(user?.institutionId, user.id);
    
    const [formData, setFormData] = useState({
        name: institution?.name || '',
        address: institution?.address || '',
        contactEmail: institution?.contactEmail || '',
        contactPhone: institution?.contactPhone || '',
        website: institution?.website || '',
        registrationNumber: institution?.registrationNumber || '',
        institutionType: institution?.institutionTypeId || '',
        accreditationDetails: institution?.accreditationDetails || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Update institution information logic here
    };

    return (
        <form onSubmit={handleSubmit} className="institution-info-form mt-8">
            <h3 className="text-xl mb-4">Institution Information</h3>
            <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Address</label>
                <input 
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Contact Email</label>
                <input 
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Contact Phone</label>
                <input 
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Website</label>
                <input 
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Registration Number</label>
                <input 
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Institution Type</label>
                <input 
                    type="text"
                    name="institutionType"
                    value={formData.institutionType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Accreditation Details</label>
                <input 
                    name="accreditationDetails"
                    value={formData.accreditationDetails}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Update
            </button>
        </form>
    );
};

export default InstitutionInfoForm;
