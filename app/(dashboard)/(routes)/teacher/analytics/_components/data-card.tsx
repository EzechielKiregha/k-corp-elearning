import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import formatPrice from '@/lib/format';
import React from 'react'


interface DataCardProps {
    label : string;
    value : number;
    shouldFormat? : boolean;
}

const DataCard = ({
    value,
    label,
    shouldFormat,
}: DataCardProps
) => {

    
    return (
        <Card>
            <CardHeader className='flex flex-col items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>
                    {shouldFormat ? formatPrice(value) : value}
                </div>
            </CardContent>
        </Card>
    )
}

export default DataCard