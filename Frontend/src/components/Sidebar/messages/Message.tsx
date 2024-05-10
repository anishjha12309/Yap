const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind css chat bubble component"
            src="../../../../public/default.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble text-[#ffff]">Hi! What is up!</div>
      <div className="chat-footer">12:42</div>
    </div>
  );
};

export default Message;
