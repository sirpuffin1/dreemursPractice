import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import RegistrationModal from "../components/RegistrationModal";
import { useUser } from "../context/UserContext";
import { ComponentWithAuth } from "../types/auth.utils";
import WinkCard, { IWinkProps } from "../components/WinkCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    const signedInUser = await prisma?.user.findUnique({
      where: {
        id: session?.user as unknown as string,
      },
      select: {
        username: true,
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return {
      props: { signedInUser },
    };
  }

  return {
    props: {},
  };
};

const home: ComponentWithAuth = (props: any) => {
  const { username } = useUser();
 
  if (!props.signedInUser.username && !username) {
    return (
      <>
        <RegistrationModal />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center">
        {props.signedInUser.posts.map((post: IWinkProps) => (
          <WinkCard
            createdAt={post.createdAt}
            transcription={post.transcription}
          />
        ))}
      </div>
    </>
  );
};
home.authenticationEnabled = true;
export default home;
