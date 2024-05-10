import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

const formSchema = z.object({
  messageInput: z.string().min(1),
});

const MessageInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messageInput: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="px-4 my-3">
        <FormField
          control={form.control}
          name="messageInput"
          render={({ field }) => {
            return (
              <FormItem className="w-full relative">
                <FormControl>
                  <Input
                    placeholder="Send a message"
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          type="submit"
          className="absolute bottom-0 end-0 flex items-center pe-3 mb-[13px]"
        >
          <SendHorizonal />
        </Button>
      </form>
    </Form>
  );
};

export default MessageInput;
