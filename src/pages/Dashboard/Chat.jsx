import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Header from "../../components/Header/Header";
import AppLayout from "../../layouts/AppLayout";

// const socket = io("http://localhost:3000");

const Chat = () => {
  const [hatlar, setHatlar] = useState([]);
  const [mess, setMess] = useState();

  // useEffect(() => {
  //   socket.on("client_message", (message) => {
  //     setHatlar({ ...hatlar, hat: message });
  //     console.log(hatlar.length > 0);
  //   });
  // }, [socket]);

  // const sendMessage = (message) => {
  //   socket.emit("message", message);
  // };

  return (
    <AppLayout>
      <>
        <Header>
          <h1 className="text-lg font-bold">Chat</h1>
        </Header>

        <section className="flex flex-col items-center p-5">
          <textarea
            onChange={(e) => setMess(e.target.value)}
            className="border rounded-lg p-5 w-96 h-48 focus:outline-none"
            placeholder="Write comment"
          ></textarea>

          <div className="mt-4">
            <button
              className="bg-slate-700 rounded-lg text-white px-5 py-2 font-bold"
              // onClick={() => sendMessage(mess)}
            >
              SEND
            </button>
          </div>

          <main className="border rounded-lg my-4 bg-gray-900 w-full h-1/6">
            {hatlar.length > 0 &&
              hatlar.map((message, index) => {
                return (
                  <div key={index}>
                    <h1>{message}</h1>
                  </div>
                );
              })}
          </main>
        </section>
      </>
    </AppLayout>
  );
};

export default Chat;
