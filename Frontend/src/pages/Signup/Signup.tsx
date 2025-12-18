import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import useSignup from "@/hooks/useSignup";
import { MessageCircle, Eye, EyeOff, User, Lock, UserCircle, Users } from "lucide-react";
import { useState } from "react";

const formSchema = z
  .object({
    fullName: z.string().min(6, { message: "Full name must be at least 6 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    gender: z.enum(["male", "female", "others"], {
      message: "Please select your gender",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const { loading, signup } = useSignup();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signup(values);
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
          <h1 className="auth-title">Join Yap</h1>
        </div>

        <p className="auth-subtitle">
          Create your account and start chatting
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {/* Full Name Field */}
          <div className="auth-input-wrapper">
            <label htmlFor="fullName" className="auth-label">
              Full Name
            </label>
            <div className="relative">
              <div 
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                <UserCircle className="w-[18px] h-[18px]" />
              </div>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="auth-input"
                {...register("fullName")}
              />
            </div>
            {errors.fullName && (
              <p className="auth-error">{errors.fullName.message}</p>
            )}
          </div>

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
                placeholder="Choose a username"
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
                placeholder="Create password"
                className="auth-input"
                autoComplete="new-password"
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

          {/* Confirm Password Field */}
          <div className="auth-input-wrapper">
            <label htmlFor="confirmPassword" className="auth-label">
              Confirm Password
            </label>
            <div className="relative">
              <div 
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                <Lock className="w-[18px] h-[18px]" />
              </div>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="auth-input"
                autoComplete="new-password"
                style={{ paddingRight: '2.75rem' }}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {showConfirmPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="auth-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Gender Field */}
          <div className="auth-input-wrapper">
            <label htmlFor="gender" className="auth-label">
              Gender
            </label>
            <div className="relative">
              <div 
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                <Users className="w-[18px] h-[18px]" />
              </div>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger 
                      className="auth-input h-auto"
                      style={{ paddingLeft: '2.75rem' }}
                    >
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent 
                      style={{ 
                        background: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))' 
                      }}
                    >
                      <SelectItem value="male" className="cursor-pointer">Male</SelectItem>
                      <SelectItem value="female" className="cursor-pointer">Female</SelectItem>
                      <SelectItem value="others" className="cursor-pointer">Others</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.gender && (
              <p className="auth-error">{errors.gender.message}</p>
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
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
