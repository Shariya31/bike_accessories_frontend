'use client'
import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'

const VerifyEmailPage = ({ params }) => {
  const [isVerified, setIsVerified] = useState(false)
  const { token } = use(params)
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  useEffect(() => {
    const verify = async () => {
      const { data: verificationResponse } = await axios.post(`${baseUrl}/api/v1/auth/verify-email`, { token })

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
