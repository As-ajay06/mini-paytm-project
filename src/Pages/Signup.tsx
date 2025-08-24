import axios from "axios";
import { useState } from "react";
import { Link } from "react-router"

type Form = {
    username: string,
    password: string,
    email: string
}

export default function Signup() {
    const [form, setForm] = useState<Form>({ username: '', password: '', email: '' })


    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
            username: form.username,
            password: form.password,
            email: form.email
        })

        console.log(res.data)
    }

    // @ts-ignore
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm((values) => ({ ...values, [name]: value }))
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
            >
                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                {/* Username */}
                <div className="mb-4">
                    <input
                        name="username"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        type="text"
                        value={form.username}
                        placeholder="Username"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <input
                        name="email"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        type="email"
                        value={form.email}
                        placeholder="Email"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <input
                        name="password"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        type="password"
                        value={form.password}
                        placeholder="Password"
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
                >
                    Submit
                </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-700">
                <span>
                    Already have an account?{" "}
                    <Link to="/" className="text-indigo-500 hover:underline">
                        Sign In
                    </Link>
                </span>
            </div>
        </div>

    )
}