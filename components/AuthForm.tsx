const AuthForm = () => {
    return (
        <div className="form-control">
            <form>
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Me@myemail.com"
                className="input input-bordered w-full max-w-xs text-black"
              />

<label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="Shhhhh"
                className="input input-bordered w-full max-w-xs text-black"
              />
              <label className="label">
                <span className="label-text text-white">Username</span>
              </label>
              <input
                type="text"
                placeholder="BigStepper45"
                className="input input-bordered w-full max-w-xs text-black"
              />

              <div className="card-actions justify-center mt-5">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
    );
}

export default AuthForm;