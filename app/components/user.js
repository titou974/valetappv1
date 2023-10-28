"use client"
import { useSession } from "next-auth/react";


const User = () => {
  const { data: session } = useSession();

  return (
    <pre className="text-black">{JSON.stringify(session)}</pre>
  )
}

export default User;
