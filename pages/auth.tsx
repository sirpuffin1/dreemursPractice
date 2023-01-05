import AuthCard from "../components/AuthCard";
import { getProviders } from "next-auth/react"

export async function getServerSideProps() {
    return {
        props: {
            providers: await getProviders()
        }
    }
}

const auth = ({providers}: any) => {
  return (
    <div className="bg-auth-pattern bg-cover h-screen flex justify-center items-center">
      <AuthCard providers={providers}/>
    </div>
  );
};

export default auth;
