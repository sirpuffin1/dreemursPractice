import { useSession } from "next-auth/react";

const home = () => {
    const { data: session } = useSession()

    return (
        <div>
            {session?.user.id}
        </div>
    );
}

export default home;