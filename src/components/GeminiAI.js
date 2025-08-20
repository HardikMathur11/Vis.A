import { useState } from 'react';
import Sidebar, { SidebarItem } from "./Sidebar";
import Navbar from "./Navbar";
import { Home as Homeicon, Flag, ChartNoAxesColumnIncreasing as Charts, Bot } from "lucide-react";

export default function Chatbot() {
  const [apiKey, setApiKey] = useState("");
  const [mess, setMess] = useState("");
  const [history, setHistory] = useState([]);
  const [chat, setChat] = useState([]);
  const[tempkey , settempkey] = useState("");
  async function sendMessage() {
    if (!mess.trim() || !apiKey.trim()) return;

    AddUserMessage(mess);
    setMess("");

    const userMsg = { role: "user", parts: [{ text: mess }] };
    const updatedHistory = [...history, userMsg];
    setHistory(updatedHistory);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              role: "system",
              parts: [
                {
                  text: "You are a DSA expert of my DSA visualiser website..."
                }
              ]
            },
            contents: updatedHistory
          })
        }
      );

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error getting response, Probably you have entered wrong API Key";
      AddBotMessage(botReply);

      setHistory(prev => [...prev, { role: "model", parts: [{ text: botReply }] }]);
    } catch (e) {
      AddBotMessage(" API request failed");
      console.error("Gemini API error:", e);
    }
  }

  function AddUserMessage(mess) {
    setChat(prev => [...prev, { text: mess, sender: "user" }]);
  }

  function AddBotMessage(botReply) {
    setChat(prev => [...prev, { text: botReply, sender: "bot" }]);
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 ">
     
      <div className="lg:hidden w-full relative px-4 pt-2 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Sidebar>
          <SidebarItem icon={<Homeicon size={20} />} text="Home" link="/" />
          <SidebarItem icon={<Charts size={20} />} text="Algorithms" link="/Category" />
          <SidebarItem icon={<Bot size={20} />} text="Chatbot" link="/Chatbot" />
          <SidebarItem icon={<Flag size={20} />} text="About" link="/About" />
        </Sidebar>
      </div>

      <div className="hidden lg:block w-full relative z-10 px-6 pt-6">
        <Navbar />
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col gap-4 border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Gemini AI Chatbot</h2>

          {!apiKey && (
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Enter your Gemini API Key"
                value={tempkey}
                onChange={e => settempkey(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-blue-300 bg-blue-50 text-gray-800"
              />
              <button
                onClick={() => setApiKey(tempkey.trim())}
                className="px-4 py-2 bg-green-500 text-white rounded-xl"
              >
                Use Key
              </button>
            </div>
          )} 

         
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[40vh] px-2">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`w-fit max-w-[80%] px-4 py-2 rounded-2xl shadow-md text-base mb-1 
                  ${msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gradient-to-r from-green-400 to-blue-300 text-gray-900 self-start mr-auto"}
                `}
                style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
              >
                {msg.text}
              </div>
            ))}
          </div>

     
          {apiKey && (
            <form
              className="flex gap-2 items-center mt-2"
              onSubmit={e => { e.preventDefault(); sendMessage(); }}
            >
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-xl border border-blue-300 focus:ring-2 focus:ring-blue-400 bg-blue-50 text-gray-800"
                placeholder="Ask something..."
                value={mess}
                onChange={e => setMess(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white">
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
