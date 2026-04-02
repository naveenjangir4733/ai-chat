import { GoogleGenAI } from "@google/genai";
import {
  LoaderCircle,
  MessageCircleCheck,
  MessageCircleDashed,
  Plus,
  SendHorizontal,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useAppContext } from "@/context/AppContext";
import type { FormattedAssistantMessageProps } from "./types";

const buildFallbackReply = (prompt: string) =>
  `Demo response for: "${prompt.trim()}". Add \`VITE_GEMINI_API_KEY\` to your environment to connect live AI replies in the browser.`;

async function generateAssistantReply(prompt: string) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return buildFallbackReply(prompt);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || buildFallbackReply(prompt);
  } catch {
    return "The AI provider could not be reached right now. Your message was saved, and you can try again in a moment.";
  }
}

function renderInlineContent(content: string) {
  const segments = content.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return segments.map((segment, index) => {
    if (!segment) {
      return null;
    }

    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code
          key={`${segment}-${index}`}
          className="rounded-md bg-black/30 px-1.5 py-0.5 font-mono text-[0.92em] text-cyan-200"
        >
          {segment.slice(1, -1)}
        </code>
      );
    }

    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={`${segment}-${index}`} className="font-semibold text-white">
          {segment.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${segment}-${index}`}>{segment}</span>;
  });
}

function FormattedAssistantMessage({
  content,
}: FormattedAssistantMessageProps) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let orderedBuffer: string[] = [];

  const flushBullets = (key: string) => {
    if (bulletBuffer.length === 0) {
      return;
    }

    elements.push(
      <ul key={key} className="list-disc space-y-2 pl-5 text-slate-100 marker:text-cyan-300">
        {bulletBuffer.map((item, index) => (
          <li key={`${key}-${index}`}>{renderInlineContent(item)}</li>
        ))}
      </ul>,
    );
    bulletBuffer = [];
  };

  const flushOrdered = (key: string) => {
    if (orderedBuffer.length === 0) {
      return;
    }

    elements.push(
      <ol key={key} className="list-decimal space-y-2 pl-5 text-slate-100 marker:text-cyan-300">
        {orderedBuffer.map((item, index) => (
          <li key={`${key}-${index}`}>{renderInlineContent(item)}</li>
        ))}
      </ol>,
    );
    orderedBuffer = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    const key = `line-${index}`;

    if (!line) {
      flushBullets(`${key}-bullets`);
      flushOrdered(`${key}-ordered`);
      return;
    }

    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      flushOrdered(`${key}-ordered`);
      bulletBuffer.push(bulletMatch[1]);
      return;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushBullets(`${key}-bullets`);
      orderedBuffer.push(orderedMatch[1]);
      return;
    }

    flushBullets(`${key}-bullets`);
    flushOrdered(`${key}-ordered`);

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key} className="text-lg font-semibold text-white">
          {renderInlineContent(line.slice(4))}
        </h3>,
      );
      return;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key} className="text-xl font-semibold text-white">
          {renderInlineContent(line.slice(3))}
        </h2>,
      );
      return;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key} className="text-2xl font-semibold text-white">
          {renderInlineContent(line.slice(2))}
        </h1>,
      );
      return;
    }

    if (line === "---") {
      elements.push(<hr key={key} className="border-white/10" />);
      return;
    }

    elements.push(
      <p key={key} className="whitespace-pre-wrap text-slate-100">
        {renderInlineContent(rawLine)}
      </p>,
    );
  });

  flushBullets("final-bullets");
  flushOrdered("final-ordered");

  return <div className="space-y-3">{elements}</div>;
}

function Home() {
  const {
    activeChat,
    appendMessage,
    createChat,
    selectChat,
    sessionUser,
    toggleTemporary,
    updateLastAssistantMessage,
  } = useAppContext();
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isSending]);

  const handleSend = async () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isSending) {
      return;
    }

    let currentChatId = activeChat?.id;
    if (!currentChatId) {
      currentChatId = createChat();
      selectChat(currentChatId);
    }

    appendMessage(currentChatId, {
      role: "user",
      content: trimmedQuestion,
    });
    appendMessage(currentChatId, {
      role: "assistant",
      content: "Thinking...",
    });
    setQuestion("");
    setIsSending(true);

    const answer = await generateAssistantReply(trimmedQuestion);
    updateLastAssistantMessage(currentChatId, answer);
    setIsSending(false);
  };

  const handleEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  const temporaryIcon = activeChat?.isTemporary
    ? MessageCircleCheck
    : MessageCircleDashed;
  const TemporaryIcon = temporaryIcon;

  return (
    <div className="relative min-h-full overflow-hidden bg-[linear-gradient(180deg,_rgba(2,6,23,0.96),_rgba(15,23,42,0.98))] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%)]" />

      <div className="relative flex min-h-full flex-col">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
              Chat
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              {activeChat?.title || "New chat"}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Signed in as {sessionUser?.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => createChat()}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
            >
              <Plus size={16} />
              New chat
            </button>
            <button
              type="button"
              onClick={() => activeChat && toggleTemporary(activeChat.id)}
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
            >
              <TemporaryIcon size={16} />
              {activeChat?.isTemporary ? "Temporary on" : "Temporary off"}
            </button>
          </div>
        </header>

        <div className="flex-1 px-4 py-6 sm:px-8">
          <div className="mx-auto flex h-full max-w-5xl flex-col rounded-[30px] border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6">
              {activeChat?.messages.length ? (
                activeChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-3xl rounded-[24px] px-4 py-3 text-sm leading-7 shadow-lg ${
                        message.role === "user"
                          ? "bg-cyan-400 text-slate-950"
                          : "border border-white/10 bg-slate-950/70 text-slate-100"
                      }`}
                    >
                      {message.role === "user" ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <FormattedAssistantMessage content={message.content} />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full items-center justify-center px-4 py-12">
                  <div className="max-w-xl rounded-[28px] border border-dashed border-white/12 bg-slate-950/40 p-8 text-center">
                    <h2 className="text-2xl font-semibold">
                      Start a conversation
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      Your messages are saved to the active chat and listed in
                      the sidebar. If a Gemini API key is available, replies come
                      from the model. Otherwise, the app still works with a safe
                      demo fallback.
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 p-4 sm:p-5">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-3 shadow-xl">
                <textarea
                  rows={3}
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={handleEnter}
                  placeholder="Send a message..."
                  className="w-full resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <div className="mt-3 flex items-center justify-between gap-3 px-2">
                  <p className="text-xs text-slate-500">
                    Press Enter to send, Shift + Enter for a new line.
                  </p>

                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={isSending || !question.trim()}
                    className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
                  >
                    {isSending ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <SendHorizontal size={16} />
                    )}
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
