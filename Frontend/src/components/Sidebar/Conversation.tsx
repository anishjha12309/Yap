const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center p-2 py-1 rounded cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="../../../public/default.jpg" alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="conversation">Anish Kumar</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
// Have to add hover color for both dark mode and light mode
