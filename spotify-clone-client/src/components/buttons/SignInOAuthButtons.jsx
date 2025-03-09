import { useSignIn } from '@clerk/clerk-react'
import React from 'react'
import { Button } from "@/components/ui/button"

const SignInOAuthButtons = () => {
    const {signIn, isLoaded}  = useSignIn();

if(!isLoaded)
{
    return null;
}

const signInWithGoogle = async () => {
    signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/auth-callback",
    })
}

  return (
   <Button onClick = {signInWithGoogle} variant={"secondary"} className = "w-full text-white border-zinc-200 h-11"  >
    Continue to Google
   </Button>
  )
}

export default SignInOAuthButtons