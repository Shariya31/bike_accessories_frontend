'use client'
import { zSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ButtonLoading from './ButtonLoading'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { showToast } from '@/lib/showToast'
import API from '@/api/axios'

const OTPVerification = ({ email, onSubmit, loading }) => {
    const [otpResendLoading, setOtpResendLoading] = useState(false)
    const formSchema = zSchema.pick({
        otp: true, email: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            email: email
        }
    })

    const handleOtpVerification = async (values) => {
        onSubmit(values)
    }

    const resendOtp = async () => {
        try {
            setOtpResendLoading(true);
            const { data: otpResendResponse } = await API.post(`/api/v1/auth/resend-otp`, { email })
            if (!otpResendResponse.success) {
                throw new Error(otpResendResponse.data.message)
            }
            showToast('success', otpResendResponse.message)
        } catch (error) {
            console.log(error)
            showToast('error', error.message)
        } finally {
            setOtpResendLoading(false)
        }
    }

    return (
        <div>
            <form
                id="login-form"
                onSubmit={form.handleSubmit(handleOtpVerification)}
                className="space-y-4 mt-6"
            >
                <FieldGroup>
                    {/* OTP */}
                    <Controller
                        name="otp"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>OTP</FieldLabel>
                                <InputOTP maxLength={6} id="otp-verification" value={field.value}
                                    onChange={field.onChange} required>
                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator className="mx-2" />
                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
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
                        text="Verify"
                        loading={loading}
                        className='w-full cursor-pointer'
                    />
                    <div>
                        <button className='cursor-pointer' type='button' onClick={resendOtp}>{otpResendLoading ? 'Sending' : 'Re-send OTP'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default OTPVerification
