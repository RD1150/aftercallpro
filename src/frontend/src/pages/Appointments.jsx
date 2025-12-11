import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-[#1a2c45]">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 text-sm">
          Start using AfterCallPro in under 60 seconds.
        </p>

        {/* FORM */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md bg-white border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#1a2c45] focus:border-[#1a2c45] outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter a strong password"
                className="w-full rounded-md bg-white border border-gray-300 px-3 py-2 pr-10 focus:ring-2 focus:ring-[#1a2c45] focus:border-[#1a2c45] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#1a2c45] text-white font-semibold hover:bg-[#152335] transition"
          >
            Create Account
          </button>
        </form>

        {/* FOOTER LINK */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#1a2c45] font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
