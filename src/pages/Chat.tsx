import React, { useState } from "react";
import BusinessCard from "../components/BusinessCard";
import Members from "../components/Members";
import { profiles } from "../assets/json/profiles";
import style from "../styles/Chat.module.css";
import Footer from "../components/Footer";
import Chatting from "../components/Chatting";
import axios from "axios";

type defaultChat = {
  type: "default-chat";
  data: {
    name: string;
    comment: string;
    img: string;
  };
};

type userChat = {
  type: "user-chat";
  data: {
    comment: string;
  };
};

function Chat() {
  const [profile, setProfile] = useState(profiles[0]);
  const [message, setMessage] = useState("");
  const [chattings, setChattings] = useState<(defaultChat | userChat)[]>([
    {
      type: "default-chat",
      data: {
        name: profile.name,
        comment: profile.comment,
        img: profile.img,
      },
    },
  ]);
  const changeMember = (idx: number) => {
    const changeDefaultChat: defaultChat = {
      type: "default-chat",
      data: {
        name: profiles[idx].name,
        comment: profiles[idx].comment,
        img: profiles[idx].img,
      },
    };

    setChattings([changeDefaultChat]);
    setProfile(profiles[idx]);
  };

  const inputedMessage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const newChatting: userChat = {
      type: "user-chat",
      data: { comment: message },
    };

    const response = axios.post("http://localhost:3000/message", {
      name: profile.name,
      message: message,
    });

    console.log(response);

    setChattings([...chattings, newChatting]);
    setMessage("");
  };

  return (
    <div className={style.Body}>
      <img src="/images/logo.svg" className={style.logo} />
      <Members profiles={profiles} changeMember={changeMember} />
      <BusinessCard profile={profile} />

      <Chatting chattings={chattings} />

      <div className={style["message-container"]}>
        <div className={style["input-container"]}>
          <input
            placeholder="텍스트 입력"
            value={message}
            onChange={inputedMessage}
          />
        </div>
        <img
          src="/images/sendButton.png"
          alt="sendButton"
          onClick={sendMessage}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
