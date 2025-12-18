import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context/AuthContext";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Camera, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

interface ProfileFormData {
  fullName: string;
  username: string;
}

const ProfileSettings = () => {
  const { authUser } = useAuthContext();
  const { updateProfile, loading } = useUpdateProfile();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: authUser?.fullName || "",
      username: authUser?.username || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024) { // 50KB limit
        toast.error("Image size too large. Max 50KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    await updateProfile({
      ...data,
      profilePic: previewImage || authUser?.profilePic || "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-lg border border-border/50">
        <div className="text-center space-y-2 relative">
          <div className="absolute left-0 top-0 h-full flex items-center">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
          <p className="text-muted-foreground">Customize your public profile</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Avatar 
              src={previewImage || authUser?.profilePic} 
              alt={authUser?.fullName} 
              size={120}
              className="border-4 border-background shadow-xl group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <p className="text-xs text-muted-foreground">Click to change avatar (Max 50KB)</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              {...register("fullName", { required: "Full Name is required" })} 
            />
            {errors.fullName && <span className="text-sm text-destructive">{errors.fullName.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              {...register("username", { required: "Username is required" })} 
            />
            {errors.username && <span className="text-sm text-destructive">{errors.username.message}</span>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
