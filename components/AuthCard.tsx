import AuthForm from "./AuthForm";
import ProviderButtons from "./ProviderButtons";

const AuthCard = ({providers}: any) => {
    return (
        <div className="card w-96 glass">
        <div className="card-body">
          <ProviderButtons providers={providers}/>
          <div className="divider before:bg-white after:bg-white text-white">OR</div> 
          <AuthForm/>
        </div>
      </div>
    );
}

export default AuthCard;