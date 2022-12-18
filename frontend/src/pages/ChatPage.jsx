import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { StreamChat } from "stream-chat";
import { AuthContext } from "../context/AuthContext";
import { Chat, Channel, Window, ChannelHeader, MessageInput, MessageList,  ChannelList,} from "stream-chat-react";
import LoadingScreen from "../components/LoadingScreen";

import { ThemeContext } from "../context/ThemeContextProvider";

import "@stream-io/stream-chat-css/dist/scss/index.scss";
import "../styling/ChatPage.scss";

import Navbar from "../components/Navbar";

const api_key = process.env.REACT_APP_STREAM_API_KEY;

function ChatPage() {
  const [chatClient, setChatClient] = useState(null);

  const [userfistName, setUserfirstName] = useState(null);
  const [username, setUsername] = useState(null);
  const [userimage, setUsermage] = useState(null);
  const [isUser, setIsUser] = useState(true);
  const { authTokens, loading } = useContext(AuthContext);

  const { theme } = useContext(ThemeContext);

  const { data: userinfos } = useQuery(["userinfos"],() => {
      return fetch("http://127.0.0.1:8000/userinfo/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }).then((response) => response.json());
    },
    { enabled: !loading }
  );

  if (userinfos && isUser) {
    setUserfirstName(userinfos[0].user.first_name)
    setUsername(userinfos[0].user.username)
    setUsermage(userinfos[0].picture)
    setIsUser(false)
  }

  const getUser = {
    id: username,
    name: userfistName,
    image: `http://127.0.0.1:8000${userimage}`,
  };

  useEffect(() => {

      async function initChat() {
        const client = StreamChat.getInstance(api_key);
  
        const user = getUser;

        client.connectUser(user, client.devToken(username));
  
        setChatClient(client);
      }

      if(!isUser){
        initChat();
      }


      return () => {
        if (chatClient) chatClient.disconnectUser();
      };
  
  }, []); // eslint-disable-line

  if (!chatClient) return <LoadingScreen />;

  return (
    <div className={`ChatPage_container_${theme}`}>
      <div className={`ChatPage_Navbar-container_${theme}`}>
        <Navbar />
      </div>
      <div className="ChatPage_chat_container">
        <Chat client={chatClient} theme={`messaging ${theme}`}>
          <ChannelList />
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </Chat>
      </div>
    </div>
  );
}

export default ChatPage;
