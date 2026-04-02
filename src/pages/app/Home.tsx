import { GoogleGenAI } from "@google/genai";
import {
  MessageCircleCheck,
  MessageCircleDashed,
  UserRoundPlus,
} from "lucide-react";
import { useEffect, useState } from "react";

function Home() {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  const [isTemporary, setIsTemporary] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);
  const Icon = isTemporary ? MessageCircleCheck : MessageCircleDashed;

  const toggleMode = () => setIsTemporary((prev) => !prev);
  const handleQuestion = async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
    });
    setAnswer((prev) => [...prev, response.text || ""]);
    console.log("response", answer);
  };

  useEffect(() => {
    console.log("question", question);
  }, [question]);
  return (
    <div className="h-screen flex flex-col bg-linear-to-b from-gray-900/80 to-black/50 backdrop-blur-sm relative overflow-hidden border-r border-white/10">
      {/* Animated background particles - toned down to match sidebar */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500/10 rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex p-6 justify-between w-full relative z-10">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-sm">
            Welcome Back!
          </h1>
        </div>
        <div className="flex gap-4">
          <UserRoundPlus className="w-8 h-8 cursor-pointer text-gray-300 hover:text-purple-300 transition-all duration-300 hover:scale-110" />
          <Icon
            className="w-8 h-8 cursor-pointer text-gray-300 hover:text-purple-300 transition-all duration-300 hover:scale-110"
            onClick={toggleMode}
          />
        </div>
      </div>

      <div className="border-2 border-white/20 backdrop-blur-xl bg-white/10 flex-1 flex items-center justify-center rounded-4xl m-8 shadow-2xl shadow-purple-500/20">
        <div className="w-full max-w-2xl px-6">
          <div className="flex items-center gap-3 backdrop-blur-lg bg-white/5 border-2 border-white/10 text-white rounded-4xl  px-4 py-3 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <input
              type="text"
              placeholder="Message ChatGPT..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 bg-transparent outline-none placeholder-gray-300 text-lg py-2"
            />
            <button
              onClick={handleQuestion}
              className="backdrop-blur-sm bg-white/10 border border-white/20 text-white px-8 py-2 rounded-2xl font-semibold hover:bg-linear-to-r hover:from-emerald-500/20 hover:to-blue-500/20 hover:border-emerald-400/50 hover:shadow-md hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
            >
              Send →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
