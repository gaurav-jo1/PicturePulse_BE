import React, { useState, useEffect, useContext } from "react";

import { StreamChat } from "stream-chat";

import { Chat, Channel, Window, ChannelHeader, MessageInput, MessageList, ChannelList,} from "stream-chat-react";

import LoadingScreen from "../components/LoadingScreen";

import { ThemeContext } from "../context/ThemeContextProvider";

import "@stream-io/stream-chat-css/dist/scss/index.scss";
// import '@stream-io/stream-chat-css/dist/css/index.css';
import "../styling/ChatPage.scss";

import Navbar from "../components/Navbar";

const api_key = process.env.REACT_APP_STREAM_API_KEY;

const USER1 = {
  id: "user1",
  name: "user1",
  image:
    "https://imageio.forbes.com/specials-images/imageserve/5ed00f17d4a99d0006d2e738/0x0.jpg?format=jpg&crop=4666,4663,x154,y651,safe&height=416&width=416&fit=bounds",
};

const USER2 = {
  id: "user2",
  name: "user2",
  image:
    "https://resize.elle.fr/portrait_1280/var/plain_site/storage/images/people/la-vie-des-people/news/kanye-west-cet-enorme-coup-de-coeur-qui-va-lui-couter-tres-cher-3874440/93733554-1-fre-FR/Kanye-West-cet-enorme-coup-de-coeur-qui-va-lui-couter-tres-cher.jpg",
};

const USER3 = {
  id: "user3",
  name: "user3",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDa7U7VzED2iHuZjKWLPV_-Zzq0z3w6ZTIArsk4IsdChtDLy0Y5nbZKFqsFvTN1N-l8hQ&usqp=CAU",
};

const users = [USER1, USER2, USER3];

const getRandomUser = () => {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
};

function ChatPage() {
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    async function initChat() {
      const client = StreamChat.getInstance(api_key);

      const user = getRandomUser();

      client.connectUser(user, client.devToken(user.id));

      const channel = client.channel("team", "general", {
        name: "General",
        image: "https://i.ytimg.com/vi/59w6oOh_nng/maxresdefault.jpg",
      });

      await channel.create();
      channel.addMembers([user.id]);
      setChannel(channel);

      setChatClient(client);
    }

    initChat();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, []); // eslint-disable-line

  if (!chatClient || !channel) return <LoadingScreen />;

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
