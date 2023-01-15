import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next"
import RegistrationModal from "../components/RegistrationModal";
import { useUser } from "../context/UserContext";
import { useSession } from "next-auth/react";
import { ComponentWithAuth } from "../types/auth.utils";
import { AudioRecorder } from 'react-audio-voice-recorder';
import { useS3Upload } from "next-s3-upload";
import getBlobDuration from 'get-blob-duration'
import axios from "axios";
import transcriptionRequestHandler from "./api/requestTranscript";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const  session  = await unstable_getServerSession(context.req, context.res, authOptions)

    if(session) {
        const signedInUserId = await prisma?.user.findFirst({
            where: {
                id: session?.user as unknown as string
            }
        })

        const userPosts = await prisma?.user.findMany({
            where: {
                id: session?.user as unknown as string
            },
            select: {
                posts: true
            }
        })

        return {
            props: {username: signedInUserId?.username, posts: userPosts}
        }
    }

    return {
        props: {},
    }
}

const requestTranscription = async (userId: string, fileName: string) => {
    const audioUrl=  `https://dreamjournalbucket.s3.us-west-1.amazonaws.com/${userId}/${fileName}.mp3`

    const res = await axios.post("/api/requestTranscript", {
        audioUrl
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => console.log(error))
}

const home: ComponentWithAuth = (props: any) => {
    const { data: session } = useSession()
    const { username} = useUser()
    const { uploadToS3 } = useS3Upload();
    const userId = session?.user as unknown as string

    const addAudioElement = async (blob:any) => {
        const fileName = (Math.round(Math.random() * 1000)).toString()
        var file = new File([blob], fileName, { type: `.mp3`})
        const url = URL.createObjectURL(blob);
        const duration = await getBlobDuration(url)

        if(duration < 10) {
            return alert('Your post is not long enough.')
        }

        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        audio.setAttribute("controlsList", "nodownload")
        const container = document.querySelector('#audioContainer')
        
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

        await requestTranscription(userId, fileName)

        

    }

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
        
        <audio controls src="https://dreamjournalbucket.s3.us-west-1.amazonaws.com/63bdae3562975006a031576b/682"/>
        </div>
        <div className="flex justify-center items-center">
        <div className="card w-96 glass">
  <div className="card-body">
    <h2 className="card-title text-center">Tell us about your dream!</h2>
    <p>Just hit record below.</p>
    <div className="card-actions justify-end">
    <AudioRecorder onRecordingComplete={addAudioElement} />
    </div>
  </div>
</div>
</div>
            
        </>
    )
}
home.authenticationEnabled = true
export default home;

