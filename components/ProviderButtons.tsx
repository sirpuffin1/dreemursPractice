import { signIn } from "next-auth/react";

const ProviderButtons = ({ providers }: any) => {
  return (
    <div className="flex flex-col items-center">
      {Object.values(providers).map(
        (provider: any) =>
          provider.name !== "Credentials" && (
            <button
              key={provider.name}
              className="btn btn-wide bg-primary"
              onClick={() =>
                signIn(provider.id)
              }
            >
              Sign in with {provider.name}
            </button>
          )
      )}
    </div>
  );
};

export default ProviderButtons;
