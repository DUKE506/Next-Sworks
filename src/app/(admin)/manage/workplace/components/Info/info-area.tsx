

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { CustomToggle } from '../custom-toggle/custom-toggle'

export const InfoArea = () => {
    return (
        <Card className='flex-2/5 w-full'>
            <CardContent>
                <CustomToggle icon={'drill'} />
            </CardContent>
        </Card>
    )
}
