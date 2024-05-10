import Conversation from "./Conversation";
import LogoutButton from "./LogoutButton";

const Conversations = () => {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <LogoutButton />
    </div>
  );
};

export default Conversations;
