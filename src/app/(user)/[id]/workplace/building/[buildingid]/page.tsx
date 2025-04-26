

import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Activity, Building2, Layers, LayoutGrid, Monitor } from 'lucide-react'
import React from 'react'

const Page = () => {
    return (
        <div>
            <div className='flex flex-col gap-4'>
                <span className='text-xl font-bold'>건물</span>
                <div className='w-full h-80 flex justify-center items-center rounded-sm bg-accent '>
                    <Building2 className='w-10 h-10 text-ring' />
                </div>
                <div className='w-full flex justify-between'>
                    <InfoCard label='건물명칭' value='강남우체국' />
                    <InfoCard label='전화번호' value='02-714-5124' />
                    <InfoCard label='주소' value='서울특별시 강남구 개포로 619' />
                    <InfoCard label='건물명칭' value='강남우체국' />
                </div>
                <IconAccordion label='기본 정보' icon={Monitor} />
                <IconAccordion label='면적 및 구조' icon={Layers} />
                <IconAccordion label='설비 정보' icon={Activity} />
                <IconAccordion label='부대 시설' icon={LayoutGrid} />
            </div>


        </div>
    )
}

interface CardProps {
    label: string,
    value: string,
}

const InfoCard = ({ label, value }: CardProps) => {
    return (
        <Card >
            <CardContent className='flex flex-col gap-4 min-w-80'>
                <span className='text-[var(--description-title-color)] text-sm'>
                    {label}
                </span>
                <span className='font-bold text-sm'>{value}</span>
            </CardContent>

        </Card>
    )
}

interface IconAccordionProps {
    label: string,
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const IconAccordion = ({
    label,
    icon: Icon
}: IconAccordionProps) => {
    return (
        <Accordion type="single" collapsible className="w-full border">
            <AccordionItem className='' value="item-1">
                <AccordionTrigger className='flex gap-6 px-4 justify-between'>
                    <div className='flex gap-6 '>
                        <Icon className='w-5' />
                        <span>{label}</span>
                    </div>


                </AccordionTrigger>
                <AccordionContent>
                    <span>
                        gd
                    </span>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}

export default Page