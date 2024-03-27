'use client';
import { signOut } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@nextui-org/react";

const UserAccountNav = ({ sessionId }) => {
  const [loading, setLoading] = useState(false)
    const handleSignOut = async e => {
      e.preventDefault()
      setLoading(true)
      try {
        await axios.patch(`/api/session/${sessionId}`, {
          endAt: new Date(),
        })
      } catch(error) {
        console.log('patch session failed')
      } finally {
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/done?session=${sessionId}`
        })
      }
    }


  return (
      <Button onClick={handleSignOut} className='fill-primary-foreground basis-full ' size="lg" color="primary" variant="solid" radius='full' isLoading={loading}>
        J'ai terminé 
      </Button>
  )
};

export default UserAccountNav;
