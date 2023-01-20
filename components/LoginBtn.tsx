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
            <button onClick={() => signOut()}>Sign Out</button>
            </>
        )
    }
    return (
        <>
        {router.pathname !== '/auth' && (
                <button onClick={() => signIn()}>Sign In/ Sign Up</button>
        )}
            
        </>
    );
}

export default LoginBtn;