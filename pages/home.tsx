import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next"
import RegistrationModal from "../components/RegistrationModal";
import { useUser } from "../context/UserContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const  session  = await unstable_getServerSession(context.req, context.res, authOptions)
    console.log(session, 'line 6')
    if(session) {
        const signedInUserId = await prisma.user.findFirst({
            where: {
                id: session?.user
            }
        })
        return {
            props: {username: signedInUserId.username}
        }
    }

    return {
        props: {},
    }
}

const home = (props: any) => {
    const { username} = useUser()

    if(!props.username && !username) {
        return (
            <>
            {/* The button to open modal */}
            <RegistrationModal/>
            </>
        )
    }

    return (
        <h1>
            helloo
        </h1>
    )
}

export default home;