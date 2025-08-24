import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
type Form = {
  username: string,
  password: string
}

export default function Signin() {
  const navigate = useNavigate();
  const [validUser, setValidUser] = useState<boolean | null>()
  const [form, setForm] = useState<Form>({ username: "", password: "" })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form)

    const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
      username: form.username,
      password: form.password
    })

    if (typeof (res.data.token) == "string") {

      localStorage.setItem("authorization", res.data.token)
      console.log(res.data)
      navigate("/dashboard")
    } else {
      console.log(res.data.message)
      setValidUser(true)
    }
  }

  //@ts-ignore
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm(values => ({ ...values, [name]: value }))
  }
  return <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Sign In
      </h2>

      {/* Username */}
      <div className="mb-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="username"
          type="text"
          onChange={handleChange}
          value={form.username}
          placeholder="Enter Username"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
      </div>

      
      <div className="w-full flex flex-col justify-center">
        { validUser && <div className="flex items-center justify-center w-full max-w-md mx-auto p-3 mb-4 rounded-lg border border-red-300 bg-red-50 text-red-700 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="font-medium">Incorrect username or password</span>
        </div>}
        {/*sign in Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
        >
          Sign In
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <span>
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </form>
  </div>

}