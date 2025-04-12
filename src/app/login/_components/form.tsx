'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from 'zod'
import ky from 'ky'

import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    account: z.string().min(2, { message: '두 글자 이상 입력해주새요.' }),
    password: z.string().min(2, { message: '두 글자 이상 입력해주세요.' }),
})

export const LoginForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            account: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof schema>) => {
        console.log(values)
        const res = await ky.post('http://localhost:3001/auth/login', { json: values }).json()
        console.log('결과 : ', res)
    }
    return (

        <Card className="w-130 min-w-100 flex justify-center items-center gap-12">
            <CardHeader className="flex flex-col gap-2 w-full px-18">
                <CardTitle className="text-2xl">Welcome S-Works</CardTitle>
                <CardDescription>에스텍시스템의 시설물관리 플랫폼</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <CardContent className="flex flex-col gap-6 w-full px-18">
                        <FormField
                            control={form.control}
                            name="account"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account</FormLabel>
                                    <FormControl>
                                        <Input className="rounded-sm" placeholder="아이디" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input className="rounded-sm" placeholder="비밀번호" {...field} type="password" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer ">Sign In</Button>
                    </CardContent>
                </form>

            </Form>

        </Card>
    )
}
