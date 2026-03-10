'use client'
import ButtonLoading from '@/components/application/ButtonLoading';
import OTPVerification from '@/components/application/OTPVerification';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zSchema } from '@/lib/zodSchema';
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoutes';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Logo from "@/public/assets/images/Logo.jpg";
import UpdatePassword from '@/components/application/UpdatePassword/UpdatePassword';
import { showToast } from '@/lib/showToast';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const ResetPasswordPage = () => {
    const [emailVerificationLoading, setEmailVerificationLoading] = useState(false)
    const [otpVerificationLoading, setOtpVerificationLoading] = useState(false)
    const [otpEmail, setOtpEmail] = useState()
    const [isOtpVerified, setIsOtpVerified] = useState(false)

    const formSchema = zSchema.pick({
        email: true,
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
        mode: "onSubmit",
    });

    const handleEmailVerification = async (values) => {
        try {
            setEmailVerificationLoading(true);
            const { data: sendOtpResponse } = await axios.post(`${baseUrl}/api/v1/auth/reset-password/send-otp`, values)
            setOtpEmail(values.email)
            showToast('success', sendOtpResponse.message)

        } catch (error) {
            const message =
                error.response?.data?.message || error.message;

            showToast('error', message);
        } finally {
            setEmailVerificationLoading(false)
        }
    }

    const handleOtpVerification = async (values) => {
        try {
            setOtpVerificationLoading(true);
            const { data: otpVerificationResponse } = await axios.post(`${baseUrl}/api/v1/auth/reset-password/verify-otp`, values)
            console.log(otpVerificationResponse)
            if (!otpVerificationResponse.success) {
                throw new Error(otpVerificationResponse.data.message)
            }
            showToast('success', otpVerificationResponse.message)
            setIsOtpVerified(true);
        } catch (error) {
            console.log(error)
            showToast('error', error.message)
        } finally {
            setOtpVerificationLoading(false)
        }
    }

    return (
        <Card className="w-112.5">
            <CardContent>
                {/* Logo */}
                <div className="flex justify-center">
                    <Image
                        src={Logo}
                        height={Logo.height}
                        width={Logo.width}
                        alt="logo"
                        className="max-w-37.5"
                    />
                </div>
                {!otpEmail ?
                    <>
                        {/* Title */}
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold">Reset Password</h1>
                            <p>Enter your email to resset password</p>
                        </div>

                        {/* Form */}
                        <form
                            id="login-form"
                            onSubmit={form.handleSubmit(handleEmailVerification)}
                            className="space-y-4 mt-6"
                        >
                            <FieldGroup>
                                {/* Email */}
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Email</FieldLabel>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="Enter your email"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                            </FieldGroup>

                            {/* Submit */}
                            <div className="mb-3">
                                <ButtonLoading
                                    type="submit"
                                    text="Sent OTP"
                                    loading={emailVerificationLoading}
                                    className='w-full cursor-pointer'
                                />
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                    <Link href={WEBSITE_LOGIN} className="text-primary">Back to login</Link>
                                </div>
                            </div>
                        </form>
                    </>
                    :
                    <>
                        {!isOtpVerified ?
                            <>
                                <OTPVerification email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading} />
                            </>
                            :
                            <>
                                <UpdatePassword email={otpEmail} />
                            </>}

                    </>}

            </CardContent>

            <CardFooter />
        </Card>
    )
}

export default ResetPasswordPage
