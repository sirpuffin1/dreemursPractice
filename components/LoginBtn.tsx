import { useSession, signIn, signOut } from "next-auth/react"

const LoginBtn = () => {
    const { data: session } = useSession()
    if(session) {
        return (
            <>
{session?.user?.email} <br />
            <button onClick={() => signOut()}>Sign Out</button>
            </>
        )
    }
    return (
        <>
            <button onClick={() => signIn()}>Sign In/ Sign Up</button>
        </>
    );
}

export default LoginBtn;