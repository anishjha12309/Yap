import Sidebar from "@/components/Sidebar/Sidebar";
import MessageContainer from "@/components/Sidebar/messages/MessageContainer";
import { useState, useEffect } from "react";
import useConversation from "@/zustand/useConversation";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { selectedConversation }  = useConversation();
  
  // On mobile, when a conversation is selected, hide sidebar and show chat
  useEffect(() => {
    if (selectedConversation) {
      setShowSidebar(false);
    }
  }, [selectedConversation]);
  
  // Handle back button - show sidebar, hide chat
  const handleBack = () => {
    setShowSidebar(true);
  };

  return (
    <div className="chat-layout">
      {/* Sidebar - visible on desktop always, on mobile only when showSidebar is true */}
      <div className={`chat-sidebar-wrapper ${showSidebar ? 'show' : 'hide'}`}>
        <Sidebar onSelectConversation={() => setShowSidebar(false)} />
      </div>
      
      {/* Chat area - visible on desktop always, on mobile only when showSidebar is false */}
      <div className={`chat-main-wrapper ${!showSidebar ? 'show' : 'hide'}`}>
        <MessageContainer onBack={handleBack} showBackButton={!showSidebar} />
      </div>
    </div>
  );
};

export default Home;
