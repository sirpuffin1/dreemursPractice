import AuthForm from "./AuthForm";
import ProviderButtons from "./ProviderButtons";

const AuthCard = ({providers}: any) => {
    return (
        <div className="card w-96 glass">
        <div className="card-body">
          <h2 className="card-title justify-center">Register</h2>
          <ProviderButtons providers={providers}/>
          <AuthForm/>
        </div>
      </div>
    );
}

export default AuthCard;