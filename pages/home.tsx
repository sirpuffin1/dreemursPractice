import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next"
import RegistrationModal from "../components/RegistrationModal";
import { useUser } from "../context/UserContext";
import { useSession } from "next-auth/react";
import { ComponentWithAuth } from "../types/auth.utils";
import { AudioRecorder } from 'react-audio-voice-recorder';
import { useS3Upload } from "next-s3-upload";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const  session  = await unstable_getServerSession(context.req, context.res, authOptions)

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
    const { uploadToS3 } = useS3Upload();

    const addAudioElement = async (blob:any) => {
        var file = new File([blob], (Math.round(Math.random() * 1000)).toString(), { type: `${blob.type}`})
        console.log(file.name, file.type)
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        audio.setAttribute("controlsList", "nodownload")
        const container = document.querySelector('#audioContainer')
        console.log(container)
        if(container) {
            container.appendChild(audio);
        }

        await uploadToS3(file, {
            endpoint: {
                request: {
                    headers: {
                    },
                    body: {
                        userId: session?.user
                    }
                    
                }
            }
        })
        
      };

    if(!props.username && !username) {
        return (
            <>
            <RegistrationModal/>
            </>
        )
    }

    return (
        <>
        <div id="audioContainer">
        <AudioRecorder onRecordingComplete={addAudioElement} />
        <audio controls src="https://dreamjournalbucket.s3.us-west-1.amazonaws.com/63bdae3562975006a031576b/682"/>
        </div>
            
        </>
    )
}
home.authenticationEnabled = true
export default home;

