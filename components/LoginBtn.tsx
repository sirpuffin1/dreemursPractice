import { useSession, signIn, signOut } from "next-auth/react"
import { useUser } from "../context/UserContext"
import {useRouter} from 'next/router';

const LoginBtn = () => {
    const { data: session } = useSession()
    const {username} = useUser()
    const router = useRouter()
    if(session) {
        return (
            <>
{username} <br />
            <button onClick={() => signOut()} className="pr-4">Sign Out</button>
            </>
        )
    }
    return (
        <>
        {router.pathname !== '/auth' && (
                <button onClick={() => signIn()} className="pr-4">Sign In / Sign Up</button>
        )}
            
        </>
    );
}

export default LoginBtn;