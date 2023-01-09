import { useSession, signIn, signOut } from "next-auth/react"

const LoginBtn = () => {
    const { data: session } = useSession()
    console.log(session)
    if(session) {
        return (
            <>
{session?.user} <br />
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