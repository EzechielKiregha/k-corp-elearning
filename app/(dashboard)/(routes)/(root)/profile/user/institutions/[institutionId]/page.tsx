import IconBadge from '@/components/icon-badge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react'
import { redirect } from 'next/navigation'
import Banner from '@/components/banner'
import InstitutionImageForm from '../../../_components/inst-image-form'
import AttachmentInstitutionForm from '../../../_components/attachment-Institution'
import InstitutionActions from '../../../_components/inst-actions'
import InstitutionField from '../../../_components/inst-fields'
import InstitutionTypeForm from '../../../_components/inst-type-form'
import PaymentStatusHandler from '../_components/ActivationStatus'

const InstitutionIdPage = async ({
    params
} : {
    params : { institutionId: string }
}) => {
    const {userId} = auth();
   

    if (!userId) {
        return redirect("/");
    }
    const institution = await db.institution.findUnique({
        where : {
            id : params.institutionId,
        }, include : {
            supportingDocuments:{
                orderBy : {
                    createdAt: 'desc',
                },
            },
        },
    })
    const institutionTypes = await db.institutionType.findMany({
        orderBy : {
            name : "asc"
        }
    })

    if(!institution){
        return redirect("/dashboard");
    }

    const requiredFields = [
        institution.name,
        institution.address,
        institution.contactPhone,
        institution.registrationNumber,
        institution.institutionTypeId,
        institution.website,
        institution.imageUrl,
        institution.supportingDocuments,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`
    const isComplete = requiredFields.every(Boolean);



    return (
        <>
            <PaymentStatusHandler userId={userId} institutionId={institution.id} />
            <div className="flex">
                <InstitutionImageForm
                    initialData = {institution}
                    institutionId = {institution.id}
                />
            </div>
            {!institution.isActivated && (
                <Banner
                    variant="warning"
                    label="This institution is not Active. it will not be visible to the other users."
                />
            )}
            
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="gap-y-2 flex flex-col">
                        <h1 className="text-2xl font-medium">
                            institution Setup
                        </h1>
                        <span className="text-sm text-slate-700  dark:text-slate-400">
                            complete all fields {completionText}
                        </span>
                    </div>
                    <InstitutionActions
                        disabled={!institution.isActivated}
                        institutionId={params.institutionId}
                        isActivated={institution.isActivated}
                    />
                </div>
                <div className="grid grid-clos-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className="text-xl">
                                Customize your institution
                            </h2>
                        </div>
                        <InstitutionField
                            initialData={institution.name}
                            institutionId={institution.id}
                            field="name"
                            label="Institution Name"
                        />
                        <InstitutionField
                            initialData={institution.address}
                            institutionId={institution.id}
                            field="address"
                            label="Address"
                        />
                        <InstitutionField
                            initialData={institution.registrationNumber}
                            institutionId={institution.id}
                            field="registrationNumber"
                            label="Registration Number"
                        />
                        <InstitutionField
                            initialData={institution.contactEmail}
                            institutionId={institution.id}
                            field="contactEmail"
                            label="Contact Email"
                        />
                        <InstitutionField
                            initialData={institution.contactPhone}
                            institutionId={institution.id}
                            field="contactPhone"
                            label="Contact Phone"
                        />
                        <InstitutionField
                            initialData={institution.website}
                            institutionId={institution.id}
                            field="website"
                            label="Website"
                        />
                    </div>
                    <div className="space-y-2">
                        
                        <div>
                        <div className="flex items-center gap-x-2">
                                <IconBadge icon={File} />
                                <h2 className="text-xl">
                                    Institution Type & Attachments
                                </h2>
                            </div>
                            <InstitutionTypeForm
                                initialData = {institution}
                                institutionId = {institution.id}
                                options={
                                    institutionTypes.map((institutionType) => ({
                                        label : institutionType.name,
                                        value : institutionType.id,
                                    }))
                                }
                            />
                            <AttachmentInstitutionForm
                                initialData = {institution }
                                institutionId = {institution.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InstitutionIdPage