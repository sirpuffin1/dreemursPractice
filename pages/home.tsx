import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import RegistrationModal from "../components/RegistrationModal";
import { useUser } from "../context/UserContext";
import { ComponentWithAuth } from "../types/auth.utils";
import WinkCard, { IWinkProps } from "../components/WinkCard";
import { useState } from "react";
import {useRouter} from 'next/router';
import { PrismaClient } from "@prisma/client"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient()
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    const signedInUser = await prisma.user.findUnique({
      where: {
        id: session?.user as unknown as string,
      },
      select: {
        username: true
      },
    });

    const userWinks = await prisma.posts.findMany({
      take: 7,
      where: {
        authorId: session?.user as unknown as string
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      props: { signedInUser, userWinks },
    };
  }

  return {
    props: {},
  };
};

const home: ComponentWithAuth = (props: any) => {
  const { username } = useUser();
  const router = useRouter();
  const [winkCount, setWinkCount] = useState(1)

  // console.log(props)
 
  // if (!props.signedInUser.username && !username) {
  //   return (
  //     <>
  //       <RegistrationModal />
  //     </>
  //   );
  // }

  const viewCountButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      const { value } = event.currentTarget
      setWinkCount(Number(value))
  }

  return (
    <>
    <div className="flex justify-center md:justify-end md:m-5 my-4 gap-2">
    <button className=" btn btn-primary" value={'1'} onClick={viewCountButtonHandler}>Most Recent</button>
    <button className=" btn btn-primary" value={'3'} onClick={viewCountButtonHandler}>Past Three</button>
    <button className=" btn btn-primary" value={'7'} onClick={viewCountButtonHandler}>Past Seven</button>
    </div>

    <div className="flex justify-center mt-9 my-9">
    <button className="btn btn-primary btn-wide hover:bg-sleepy-purple" onClick={() => router.push('/create')}>
    Create A New Wink</button> 
    </div>

      <div className={`${(winkCount == 1) ? "flex justify-center items-center gap-6 m-6" : "grid grid-cols-1 gap-6 m-6 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {props.userWinks.slice(0, winkCount).map((post: IWinkProps) => (
          <WinkCard
            createdAt={post.createdAt}
            transcription={post.transcription}
            category={post.category}
            winkCount={winkCount}
          />
        ))}
      </div>
      
    </>
  );
};
home.authenticationEnabled = true;
export default home;
