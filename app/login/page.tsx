"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/app/api/authApi";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

type FormMode = "login" | "register";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<FormMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/pages/dashboard");
    }
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setEmailError("");

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      if (mode === "register") {
        const response = await registerUser({
          email,
          password,
        });

        toast.success("Account created successfully!");

        toast.success(response.message || "Registration successful");

        setMode("login");
        setPassword("");

        return;
      }

      const response = await loginUser({
        email,
        password,
      });

      toast.success("Login successful!");

      localStorage.setItem("token", response.token);

      router.push("/pages/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4">
      {/* Logo */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
            ✓
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Task Management App
          </h1>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Professional Task Management
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-slate-200">
        {/* Tabs */}
        <div className="mb-8 flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition cursor-pointer ${
              mode === "login"
                ? "bg-white shadow text-slate-900"
                : "text-slate-500"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition cursor-pointer ${
              mode === "register"
                ? "bg-white shadow text-slate-900"
                : "text-slate-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {message && (
          <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
            {message}
          </div>
        )}

        <form onSubmit={submit} noValidate className="space-y-5 text-black">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />

            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>

              {/* <button
                type="button"
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot Password?
              </button> */}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Password must be at least 8 characters
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 cursor-pointer"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 leading-5">
            By continuing, you agree to our{" "}
            <span className="text-blue-600 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
          </p>
        </form>
      </div>
    </div>
  );
}
