'use client'

import { Toggle } from '@/components/ui/toggle'
import { DynamicIcon } from 'lucide-react/dynamic'


import React, { useState } from 'react'

export const CustomToggle = ({ icon, value }: { icon: string, value?: boolean }) => {
    const [isPressed, setIsPressed] = useState<Boolean>(false);


    const handlePressedChange = (e: boolean) => {
        setIsPressed(e)
    }

    return (
        <Toggle className={`border`}
            onPressedChange={handlePressedChange} >
            <DynamicIcon name={icon as any} color={`${isPressed ? 'blue' : 'gray'}`} />
        </Toggle>
    )
}
