import SearchInput from "./SearchInput";
import Conversations from "./Conversations";

const Sidebar = () => {
  return (
    <div className="border-r p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3 h-1" />
      <Conversations />
    </div>
  );
};

export default Sidebar;
