import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next"
import RegistrationModal from "../components/RegistrationModal";
import { useUser } from "../context/UserContext";
import { useSession } from "next-auth/react";
import { ComponentWithAuth } from "../types/auth.utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const  session  = await unstable_getServerSession(context.req, context.res, authOptions)

    // if(!session) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false
    //         }
    //     }
    // }

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

const home: ComponentWithAuth = (props: any) => {
    const { data: session } = useSession()
    const { username} = useUser()
    console.log('home rendered')

    if(!props.username && !username) {
        return (
            <>
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
home.authenticationEnabled = true
export default home;

