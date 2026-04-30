'use client'
import API from '@/api/axios'
import { Card, CardContent } from '@/components/ui/card'
import React, { use, useEffect, useState } from 'react'

const VerifyEmailPage = ({ params }) => {
  const [isVerified, setIsVerified] = useState(false)
  const { token } = use(params)
  useEffect(() => {
    const verify = async () => {
      const { data: verificationResponse } = await API.post(`/api/v1/auth/verify-email`, { token })

      if (verificationResponse.success) {
        setIsVerified(true)
      }
    }
    verify()
  }, [token])
  return (
    <div>
      <Card>
        <CardContent>
          {isVerified ? <div>Email Verified</div> : <div>Email Verification Failed</div>}
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmailPage
