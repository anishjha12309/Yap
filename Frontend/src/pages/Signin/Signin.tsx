import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useLogin from "@/hooks/useLogin";

const formSchema = z.object({
  password: z.string().min(8, { message: "Password is a required field" }),
  username: z.string().min(3, { message: "User name is a required field" }),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const { loading, login } = useLogin();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;
    await login(username, password);
  };

  return (
    <>
      <h1 className="text-[80px]">Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4 mt-[-50px]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </Form>
      <p>
        Don't have an account yet?
        <span>
          <Link to="/signup" className="text-[#0095f6] hover:text-[#097dc8]">
            {" "}
            Create
          </Link>
        </span>
      </p>
    </>
  );
}
