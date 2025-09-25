import { SignUp, SignUpButton } from '@clerk/clerk-react'
// import React, { useEffect, useState } from 'react'
import Dashboard from '@/components/dashboard/dashboard'

 
const signup = () => {

  return (
     <div className="flex items-center justify-center min-h-screen bg-white">
      <SignUp

        appearance={{
          elements: {
            rootBox: "shadow-2xl rounded-2xl", 
          },
        }}
      />
    </div>
  )
}

export default signup

