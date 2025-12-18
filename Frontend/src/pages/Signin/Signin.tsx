import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import { MessageCircle, Eye, EyeOff, User, Lock } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const { loading, login } = useLogin();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;
    await login(username, password);
  };

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="auth-bg-gradient" />
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />
      <div className="auth-noise" />

      {/* Auth Card */}
      <div className="auth-card">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--auth-gradient-mid)))'
            }}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <h1 className="auth-title">Welcome back</h1>
        </div>
        
        <p className="auth-subtitle">
          Sign in to continue your conversations
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {/* Username Field */}
          <div className="auth-input-wrapper">
            <label htmlFor="username" className="auth-label">
              Username
            </label>
            <div className="relative">
              <div 
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                <User className="w-[18px] h-[18px]" />
              </div>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="auth-input"
                {...register("username")}
              />
            </div>
            {errors.username && (
              <p className="auth-error">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="auth-input-wrapper">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <div className="relative">
              <div 
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                <Lock className="w-[18px] h-[18px]" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="auth-input"
                autoComplete="current-password"
                style={{ paddingRight: '2.75rem' }}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>
            {errors.password && (
              <p className="auth-error">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-button mt-3"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-spinner" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
