import { useLogin } from "./viewmodels/uselogin";

export const Login = () => {
  const { role, userCred, setRole, errors, setUserCred, handleLogin } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl border border-gray-500">
        <form onSubmit={handleLogin} className="text-center space-y-4">
          <h2 className="text-3xl font-semibold font-Montserrat">Login</h2>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              className={`px-6 py-2 rounded-full border font-Lato ${
                role === "owner"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setRole("owner")}
            >
              Owner
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded-full border  font-Lato ${
                role === "buyer"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setRole("buyer")}
            >
              Buyer
            </button>
          </div>
          {role === "owner" ? (
            <>
              <div className="text-left">
                <input
                  type="email"
                  placeholder="Email"
                  value={userCred.email}
                  onChange={(e) =>
                    setUserCred({
                      ...userCred,
                      email: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded-lg focus:ring-2 ${
                    errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="text-left">
                <input
                  type="password"
                  placeholder="Password"
                  value={userCred.password}
                  onChange={(e) =>
                    setUserCred({
                      ...userCred,
                      password: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded-lg focus:ring-2 ${
                    errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500"
                  }`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </>
          ) : (
            <div className="text-left">
              <input
                type="tel"
                placeholder="Phone Number"
                value={userCred.phone}
                onChange={(e) =>
                  setPhone({
                    ...userCred,
                    phone: e.target.value,
                  })
                }
                className={`w-full p-2 border rounded-lg focus:ring-2 ${
                  errors.phone ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400"
            disabled={Object.keys(errors).length > 0}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
