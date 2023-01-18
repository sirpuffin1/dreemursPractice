import axios from "axios";
import getBlobDuration from "get-blob-duration";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import Loader from "../components/Loader";
import { ComponentWithAuth } from "../types/auth.utils";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    const lastUserPost = await prisma?.user.findFirst({
      
      where: {
        id: session?.user as unknown as string,
      },
      select: {
        posts: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            createdAt: true,
          },
        },
      },
    });

    return {
      props: { lastUserPost },
    };
  }

  return {
    props: {},
  };
};

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const createPost: ComponentWithAuth = (props: any) => {
  const { data: session } = useSession();
  const { uploadToS3 } = useS3Upload();
  const date1 = props.lastUserPost.posts[0].createdAt
  const [transcription, setTranscription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const userId = session?.user as unknown as string;

  const [remainingTime, setRemainingTime] = useState<Number>();

  const compareDates = (date1: Date) => {
    if (remainingTime !== undefined) {
      return;
    }

    const date2 = new Date();
    var diff = date2.getTime() - date1.getTime();

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    console.log(12 - hh, "the remaining amount of hours");

    if (hh < 12) {
      setRemainingTime(12 - hh);
    }
  };

  compareDates(date1);

  const requestTranscription = async (userId: string, fileName: string) => {
    const audioUrl = `https://dreamjournalbucket.s3.us-west-1.amazonaws.com/${userId}/${fileName}.mp3`;

    const response = await axios.post("/api/requestTranscript", { audioUrl });
    const transcriptId = response.data.id;
    let transcriptData = response.data;
    setStatus("Transcribing");

    while (
      transcriptData.status !== "completed" &&
      transcriptData.status !== "error"
    ) {
      await wait(1000);
      const response = await axios.post("/api/getTranscripts", {
        transcriptId,
      });

      transcriptData = response.data;
    }

    return transcriptData;
  };

  const addAudioElement = async (blob: any) => {
    const fileName = Math.round(Math.random() * 1000).toString();
    var file = new File([blob], fileName, { type: `.mp3` });
    const url = URL.createObjectURL(blob);
    const duration = await getBlobDuration(url);

    if (duration < 10) {
      return alert("Your post is not long enough.");
    }

    await uploadToS3(file, {
      endpoint: {
        request: {
          headers: {},
          body: {
            userId: session?.user,
          },
        },
      },
    });

    setStatus("Uploading");
    try {
      const data = await requestTranscription(userId, fileName);
      setStatus("");
      setTranscription(data.text);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      setError(String({ message }));
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="card w-96 glass">
        <div className="card-body">
          <h2 className="card-title text-center">Tell us about your dream!</h2>
          <p>Just hit record below.</p>
          <div className="card-actions justify-end">
            <AudioRecorder onRecordingComplete={addAudioElement} />
          </div>
          {error && (
            <>
              <h1>Oh no.. something went wrong</h1>
            </>
          )}

          {status && (
            <>
              <h2 className="text-center">{status}</h2>
              <Loader />
            </>
          )}
          <h1>{transcription}</h1>
        </div>
      </div>
    </div>
  );
};

createPost.authenticationEnabled = true;
export default createPost;
