"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Bot, Check, ChevronDown, CircleHelp, Command, Cpu, ExternalLink, Github, Globe2, Layers3, Menu, MessageCircle, Moon, Plus, Send, ShieldCheck, Sparkles, TerminalSquare, WandSparkles, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };
const starters = [
  { icon: Layers3, title: "مشاريع وأعمال", text: "ساعدني أفهم شلون أرتب فكرة مشروع وأحوّلها إلى خطة واضحة." },
  { icon: Cpu, title: "ذكاء اصطناعي وبرمجة", text: "أريد أتعلم الذكاء الاصطناعي والبرمجة من البداية، شنو المسار المناسب؟" },
  { icon: Sparkles, title: "حل المشكلات", text: "عندي مشكلة ومحتاج أحللها وأقارن بين الحلول الممكنة." },
  { icon: Globe2, title: "TREND و SULY", text: "عرّفني على مشاريع TREND وSULY AI وSULUM Agency." },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(value = input) {
    const content = value.trim();
    if (!content || loading) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "تعذر الاتصال بالمساعد.");
      setMessages([...next, { role: "assistant", content: data.answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "صار خطأ غير متوقع.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function newChat() {
    setMessages([]);
    setInput("");
    setError("");
    setMobileMenu(false);
    inputRef.current?.focus();
  }

  return (
    <main className="shell relative flex min-h-screen overflow-hidden">
      <div className="grid-glow pointer-events-none absolute inset-0 opacity-50" />
      <aside className={`${mobileMenu ? "translate-x-0" : "translate-x-full"} fixed right-0 top-0 z-40 flex h-screen w-[285px] flex-col border-l border-white/[.08] bg-[#0b1012] p-5 transition-transform duration-300 md:relative md:z-10 md:w-[260px] md:translate-x-0`}>
        <div className="mb-9 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3" aria-label="SULYverse home">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-[#64e7d0]/25 bg-[#64e7d0]/10 text-[#64e7d0]"><Sparkles size={21} /></div>
            <div>
              <div className="text-[16px] font-bold tracking-tight" dir="ltr">SULYverse <span className="mint">AI</span></div>
              <div className="mt-0.5 text-[10px] tracking-[.22em] text-white/35" dir="ltr">INTELLIGENCE, WITH PURPOSE</div>
            </div>
          </a>
          <button onClick={() => setMobileMenu(false)} className="rounded-lg p-2 text-white/50 hover:bg-white/5 md:hidden" aria-label="إغلاق القائمة"><X size={18} /></button>
        </div>

        <button onClick={newChat} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[.045] px-4 py-3 text-sm transition hover:border-[#64e7d0]/40 hover:bg-[#64e7d0]/[.06]">
          <span className="flex items-center gap-2.5"><Plus size={17} className="mint" /> محادثة جديدة</span>
          <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/35">⌘ K</span>
        </button>

        <div className="mt-9">
          <p className="mb-3 px-2 text-[10px] font-semibold tracking-[.2em] text-white/30">EXPLORE</p>
          <div className="space-y-1">
            {[
              { icon: Layers3, label: "المشاريع والأعمال", hint: "TREND · SULUM" },
              { icon: Cpu, label: "الذكاء الاصطناعي", hint: "AI · CODE · IDEAS" },
              { icon: WandSparkles, label: "حل المشكلات", hint: "THINK · PLAN · BUILD" },
              { icon: TerminalSquare, label: "التعلّم والتطوير", hint: "LEARN · GROW" },
            ].map((item) => <button key={item.label} onClick={() => { setInput(item.label === "المشاريع والأعمال" ? "عرّفني على مشاريع TREND وSULY AI وSULUM Agency." : item.label === "الذكاء الاصطناعي" ? "شلون أبدأ بتعلم الذكاء الاصطناعي والبرمجة؟" : item.label === "حل المشكلات" ? "ساعدني أحلل مشكلة وأوصل إلى حل عملي." : "ابنِ لي خطة تعلم عملية تناسب مستواي.") ; inputRef.current?.focus(); setMobileMenu(false); }} className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition hover:bg-white/[.045]">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[.045] text-white/50 transition group-hover:bg-[#64e7d0]/10 group-hover:text-[#64e7d0]"><item.icon size={17} /></span>
                <span className="min-w-0 flex-1"><span className="block text-[13px] text-white/75">{item.label}</span><span className="mt-1 block text-[9px] tracking-[.1em] text-white/25" dir="ltr">{item.hint}</span></span>
                <ArrowLeft size={14} className="text-white/20 opacity-0 transition group-hover:opacity-100" />
              </button>)}
          </div>
        </div>

        <div className="mt-auto">
          <div className="rounded-2xl border border-[#64e7d0]/15 bg-gradient-to-br from-[#64e7d0]/[.08] to-transparent p-4">
            <div className="mb-3 flex items-center gap-2 text-[#64e7d0]"><ShieldCheck size={16} /><span className="text-xs font-semibold">خصوصيتك أولاً</span></div>
            <p className="text-[11px] leading-6 text-white/45">مساعد مصمم لتقديم أفكار واضحة وحلول عملية. لا تشارك معلومات حساسة أو كلمات مرور.</p>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-white/[.07] pt-4 text-[10px] text-white/30">
            <span dir="ltr">SULYverse AI · v1.0</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#64e7d0]" /> جاهز للاستكشاف</span>
          </div>
        </div>
      </aside>

      {mobileMenu && <button className="fixed inset-0 z-30 bg-black/65 md:hidden" onClick={() => setMobileMenu(false)} aria-label="إغلاق القائمة" />}

      <section className="relative z-10 flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/[.07] px-4 sm:px-7 lg:px-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenu(true)} className="rounded-lg p-2 text-white/60 hover:bg-white/5 md:hidden" aria-label="فتح القائمة"><Menu size={20} /></button>
            <div className="flex items-center gap-2 rounded-full border border-white/[.08] bg-white/[.025] px-3 py-1.5 text-[11px] text-white/55"><span className="h-1.5 w-1.5 rounded-full bg-[#64e7d0]" /> مساعدك الذكي</div>
            <span className="hidden text-xs text-white/25 sm:inline">/</span>
            <span className="hidden text-xs text-white/45 sm:inline">مساحة الأفكار</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={newChat} title="محادثة جديدة" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/50 transition hover:bg-white/5 hover:text-white"><Plus size={15} /><span className="hidden sm:inline">محادثة جديدة</span></button>
            <div className="mx-1 h-5 w-px bg-white/10" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#64e7d0]/20 bg-[#64e7d0]/10 text-[#64e7d0]"><Bot size={17} /></div>
          </div>
        </header>

        <div ref={scrollRef} className="scrollbar-hide flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="relative mx-auto flex min-h-[calc(100vh-150px)] w-full max-w-[900px] flex-col items-center justify-center px-5 pb-10 pt-12 sm:px-8">
              <div className="absolute left-[18%] top-[16%] hidden h-24 w-24 rounded-full bg-[#64e7d0]/[.04] blur-2xl sm:block" />
              <div className="mb-7 flex items-center gap-2 rounded-full border border-[#64e7d0]/20 bg-[#64e7d0]/[.055] px-3.5 py-2 text-[11px] text-[#8cebd9]"><Sparkles size={13} /> مساحة تفكير، تعلّم، وإنجاز</div>
              <div className="mb-5 text-center">
                <h1 className="text-4xl font-semibold leading-[1.35] tracking-tight sm:text-5xl lg:text-[58px]">كل فكرة كبيرة،<br /><span className="mint">تبدأ بسؤال.</span></h1>
                <p className="mx-auto mt-6 max-w-[530px] text-sm leading-8 text-white/45 sm:text-[15px]">خلّينا نفكّر بيها سويّة. اسأل عن مشروع، تعلّم مهارة جديدة، حلّل مشكلة، أو اكتشف شنو ممكن تسوي بالذكاء الاصطناعي.</p>
              </div>

              <div className="mt-7 grid w-full max-w-[740px] grid-cols-1 gap-3 sm:grid-cols-2">
                {starters.map((card) => <button key={card.title} onClick={() => sendMessage(card.text)} className="group rounded-2xl border border-white/[.085] bg-white/[.025] p-4 text-right transition duration-200 hover:-translate-y-0.5 hover:border-[#64e7d0]/30 hover:bg-[#64e7d0]/[.035] sm:p-5">
                  <div className="mb-4 flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[.07] bg-white/[.035] text-[#64e7d0] transition group-hover:border-[#64e7d0]/20 group-hover:bg-[#64e7d0]/10"><card.icon size={18} /></span><ArrowLeft size={16} className="text-white/20 transition group-hover:-translate-x-1 group-hover:text-[#64e7d0]" /></div>
                  <h2 className="text-[14px] font-semibold text-white/85">{card.title}</h2><p className="mt-2 text-[12px] leading-6 text-white/40">{card.text}</p>
                </button>)}
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] text-white/25"><span className="flex items-center gap-1.5"><ShieldCheck size={12} /> إجابات مسؤولة</span><span className="flex items-center gap-1.5"><Sparkles size={12} /> أفكار قابلة للتطبيق</span><span className="flex items-center gap-1.5"><MessageCircle size={12} /> حوار طبيعي</span></div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[820px] space-y-7 px-4 py-8 sm:px-8 sm:py-10">
              {messages.map((message, index) => <div key={index} className={`flex gap-3.5 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${message.role === "assistant" ? "border border-[#64e7d0]/20 bg-[#64e7d0]/10 text-[#64e7d0]" : "border border-white/10 bg-white/[.06] text-white/65"}`}>{message.role === "assistant" ? <Sparkles size={16} /> : <span className="text-xs font-semibold">أنت</span>}</div>
                <div className={`max-w-[calc(100%-48px)] rounded-2xl px-4 py-3.5 text-[13px] leading-8 sm:px-5 sm:text-sm ${message.role === "user" ? "rounded-tl-md border border-[#64e7d0]/15 bg-[#64e7d0]/[.07] text-white/90" : "rounded-tr-md border border-white/[.07] bg-white/[.025] text-white/75"}`}><p className="whitespace-pre-wrap break-words">{message.content}</p></div>
              </div>)}
              {loading && <div className="flex gap-3.5"><div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#64e7d0]/20 bg-[#64e7d0]/10 text-[#64e7d0]"><Sparkles size={16} /></div><div className="flex items-center gap-1 rounded-2xl border border-white/[.07] bg-white/[.025] px-5 py-4"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#64e7d0]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#64e7d0] [animation-delay:120ms]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#64e7d0] [animation-delay:240ms]" /></div></div>}
              {error && <div className="mr-11 rounded-xl border border-red-400/20 bg-red-400/[.06] px-4 py-3 text-xs leading-6 text-red-200/80">{error}<button onClick={() => sendMessage(messages[messages.length - 1]?.content || "")} className="mr-2 underline">إعادة المحاولة</button></div>}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 w-full px-3 pb-3 pt-2 sm:px-7 sm:pb-5">
          <div className="mx-auto max-w-[820px]">
            {messages.length > 0 && error && <div className="mb-2 text-center text-[10px] text-white/30">تأكد من إعداد OPENAI_API_KEY إذا كنت تدير الموقع.</div>}
            <form onSubmit={handleSubmit} className="glass relative rounded-[22px] p-2 transition focus-within:border-[#64e7d0]/25">
              <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="اسأل عن فكرة، مشروع، أو أي شيء تريد تفهمه..." rows={1} className="max-h-36 min-h-[48px] w-full resize-y bg-transparent px-3 py-3 text-[13px] leading-6 text-white/90 outline-none placeholder:text-white/25 sm:px-4 sm:text-sm" />
              <div className="flex items-center justify-between px-1 pb-1">
                <div className="flex items-center gap-1.5 px-2 text-[10px] text-white/25"><Command size={12} /><span>Enter للإرسال</span><span className="mx-1 text-white/15">·</span><span>Shift + Enter لسطر جديد</span></div>
                <button type="submit" disabled={!input.trim() || loading} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#64e7d0] text-[#06110f] transition hover:bg-[#8bf0de] disabled:cursor-not-allowed disabled:opacity-30" aria-label="إرسال الرسالة">{loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06110f]/30 border-t-[#06110f]" /> : <ArrowUp size={19} />}</button>
              </div>
            </form>
            <p className="mt-3 text-center text-[10px] leading-5 text-white/25">قد يخطئ الذكاء الاصطناعي. تحقّق من المعلومات المهمة ولا تشارك بيانات حساسة.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
