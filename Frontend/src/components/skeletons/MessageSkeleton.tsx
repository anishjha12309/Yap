const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Received message skeleton */}
      <div className="flex gap-3 items-end">
        <div className="chat-skeleton w-9 h-9 rounded-full shrink-0" />
        <div className="flex flex-col gap-1">
          <div className="chat-skeleton h-12 w-48 rounded-2xl rounded-bl-md" />
          <div className="chat-skeleton h-3 w-12 rounded ml-2" />
        </div>
      </div>
      
      {/* Sent message skeleton */}
      <div className="flex gap-3 items-end justify-end self-end">
        <div className="flex flex-col gap-1 items-end">
          <div className="chat-skeleton h-12 w-40 rounded-2xl rounded-br-md" />
          <div className="chat-skeleton h-3 w-12 rounded mr-2" />
        </div>
        <div className="chat-skeleton w-9 h-9 rounded-full shrink-0" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
