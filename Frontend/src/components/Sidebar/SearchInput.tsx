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
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import useConversation from "@/zustand/useConversation";
import useGetConversations from "@/hooks/useGetConversations";
import toast from "react-hot-toast";

const formSchema = z.object({
  searchInput: z.string(),
});

const SearchInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchInput: "",
    },
  });

  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.searchInput) return;

    if (values.searchInput.length <= 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(values.searchInput.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      form.reset();
    } else toast.error(`No such user found with name ${values.searchInput}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center gap-2"
      >
        <FormField
          control={form.control}
          name="searchInput"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder="Search..." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">
          <Search />
        </Button>
      </form>
    </Form>
  );
};

export default SearchInput;
