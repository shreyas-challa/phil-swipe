// ═══════════════════════════════════════════
// SECTION 1: CONFIGURATION
// ═══════════════════════════════════════════

const API_KEY = "YOUR_MINIMAX_API_KEY_HERE";
const API_ENDPOINT = "https://api.minimax.io/v1/chat/completions";
const MODEL_NAME = "MiniMax-M2.7";

const COLORS = {
  bgStart: "#0a0e27",
  bgEnd: "#1a1040",
  gold: "#d4a853",
  white: "#ffffff",
  lightGray: "#cccccc",
  mutedGray: "#888888",
  cardBg: "#151530",
  userBubble: "#2a2040",
  aiBubble: "#1a1535",
  inputBg: "#1e1a35",
  border: "rgba(212,168,83,0.3)",
};

// ═══════════════════════════════════════════
// SECTION 2: PHILOSOPHICAL IDEAS DATABASE
// ═══════════════════════════════════════════

const PHILOSOPHY_IDEAS = [
  {
    id: "cave",
    title: "Plato's Cave",
    widgetDesc: "Are you seeing reality, or just shadows on a wall?",
    fullExplanation: "In Plato's Republic, prisoners chained in a cave see only shadows cast on a wall by a fire behind them. They believe these shadows are reality. When one prisoner is freed and sees the sun, he realizes everything he knew was an illusion. Plato argues most people live like these prisoners — mistaking appearances, social conventions, and inherited beliefs for truth.",
    question: "What is one belief you hold that might be a 'shadow' — something you accept without having examined it directly?",
    category: "Epistemology",
    thinker: "Plato",
  },
  {
    id: "theseus",
    title: "Ship of Theseus",
    widgetDesc: "If every part is replaced, is it still the same thing?",
    fullExplanation: "An ancient ship is preserved by gradually replacing each plank as it decays. Eventually every original piece has been swapped out. Is it still the same ship? And if someone built a second ship from all the old planks — which one is the 'real' Ship of Theseus? This puzzle strikes at the heart of identity — what makes something (or someone) the same over time.",
    question: "You replace every cell in your body roughly every 7-10 years. Are you the same person you were a decade ago? What makes you 'you'?",
    category: "Metaphysics",
    thinker: "Plutarch",
  },
  {
    id: "eternal-return",
    title: "Eternal Return",
    widgetDesc: "Would you live this exact life infinite times over?",
    fullExplanation: "Nietzsche posed a thought experiment: what if a demon told you that you must relive your life — every joy, every pain, every boring afternoon — exactly as it happened, for eternity? Would you despair, or would you embrace it? He saw this as the ultimate test of how much you truly affirm your own existence.",
    question: "If you had to relive today on an infinite loop, would you change anything about how you're living it?",
    category: "Existentialism",
    thinker: "Nietzsche",
  },
  {
    id: "trolley",
    title: "The Trolley Problem",
    widgetDesc: "Is it moral to sacrifice one to save five?",
    fullExplanation: "A runaway trolley is headed toward five people. You can pull a lever to divert it to a side track, where it will kill one person instead. Most people say pulling the lever is acceptable. But what if instead of a lever, you had to push a large man off a bridge to stop the trolley? The outcome is identical — one dies, five live — yet most people's intuitions shift dramatically.",
    question: "Why does the method of causing harm change our moral judgment, even when the outcome is identical?",
    category: "Ethics",
    thinker: "Philippa Foot",
  },
  {
    id: "cogito",
    title: "Cogito Ergo Sum",
    widgetDesc: "The one thing you cannot doubt is that you are doubting.",
    fullExplanation: "Descartes stripped away every belief he could possibly doubt — his senses could deceive him, he might be dreaming, an evil demon might be fabricating his entire reality. But one thing survived: the very act of doubting proved that something was doing the doubting. 'I think, therefore I am' became the foundation upon which he rebuilt all knowledge.",
    question: "If you can't fully trust your senses or your reasoning, what (if anything) can you be absolutely certain about?",
    category: "Epistemology",
    thinker: "Descartes",
  },
  {
    id: "absurd",
    title: "The Absurd",
    widgetDesc: "Life has no inherent meaning — so what do you do now?",
    fullExplanation: "Camus argued that humans desperately seek meaning in a universe that offers none. This collision — our need for purpose against a silent cosmos — is 'the Absurd.' But rather than despair or leap into religion, Camus proposed a third path: accept the absurdity and live fully anyway. Revolt against meaninglessness by creating your own meaning through passionate engagement with life.",
    question: "If you learned definitively that the universe has no built-in purpose, would it change how you live tomorrow?",
    category: "Existentialism",
    thinker: "Camus",
  },
  {
    id: "dichotomy",
    title: "Dichotomy of Control",
    widgetDesc: "You suffer because you try to control what you cannot.",
    fullExplanation: "Epictetus, a former slave turned philosopher, taught that everything falls into two buckets: things within your control (your judgments, intentions, desires) and things outside it (other people's actions, your reputation, the weather, death). Suffering comes from confusing the two — from desperately clinging to outcomes you cannot determine. Freedom comes from focusing exclusively on what you can control.",
    question: "What is one thing causing you stress right now that is actually outside your control? What would it feel like to let it go?",
    category: "Ethics",
    thinker: "Epictetus",
  },
  {
    id: "veil",
    title: "Veil of Ignorance",
    widgetDesc: "Design society without knowing your place in it.",
    fullExplanation: "John Rawls proposed a thought experiment: imagine you must design the rules of society from behind a 'veil of ignorance' — you don't know whether you'll be rich or poor, healthy or disabled, part of a majority or a minority. What kind of society would you build if you might end up in any position? Rawls argued this would naturally lead to fair institutions that protect the most vulnerable.",
    question: "If you didn't know your race, gender, wealth, or abilities, what is the first rule you would establish for society?",
    category: "Political",
    thinker: "Rawls",
  },
  {
    id: "sisyphus",
    title: "Sisyphus & Happiness",
    widgetDesc: "Can meaning come from the struggle itself?",
    fullExplanation: "Sisyphus was condemned by the gods to roll a boulder up a hill for eternity — each time it reaches the top, it rolls back down. Camus used this myth as a metaphor for human existence: repetitive, seemingly pointless labor. Yet his radical conclusion was: 'One must imagine Sisyphus happy.' The struggle itself, fully owned and embraced, can be enough.",
    question: "Is there a repetitive part of your life that you could find meaning in, not despite its repetition, but because of it?",
    category: "Existentialism",
    thinker: "Camus",
  },
  {
    id: "induction",
    title: "Problem of Induction",
    widgetDesc: "The sun rose every day so far. Must it rise tomorrow?",
    fullExplanation: "David Hume pointed out a fundamental gap in human reasoning: we observe patterns (the sun rises, fire burns, bread nourishes) and assume they will continue. But no amount of past observations can logically guarantee the future will resemble the past. Our entire framework of science and daily life rests on an assumption we cannot prove — that nature is uniform.",
    question: "How much of what you 'know' is actually just pattern recognition that could break down at any moment?",
    category: "Epistemology",
    thinker: "Hume",
  },
  {
    id: "amor-fati",
    title: "Amor Fati",
    widgetDesc: "Love your fate — even the painful parts.",
    fullExplanation: "Nietzsche's concept of 'amor fati' (love of fate) goes beyond mere acceptance of what happens to you. It demands that you love everything that happens — including suffering, loss, and failure — as necessary parts of your story. Not 'this happened to me and I survived it' but 'I would not wish it away because it made me who I am.'",
    question: "Is there a painful experience from your past that you can honestly say you're grateful for? What would it take to feel that way about your current struggles?",
    category: "Existentialism",
    thinker: "Nietzsche",
  },
  {
    id: "beetle",
    title: "Wittgenstein's Beetle",
    widgetDesc: "Can anyone truly know what another person feels?",
    fullExplanation: "Wittgenstein imagined everyone carrying a box they call a 'beetle.' No one can look in anyone else's box. We all use the word 'beetle' but might have completely different things inside — or nothing at all. This is an analogy for subjective experience: when you say 'I feel pain,' I understand the word, but I can never access your actual experience. Language works, but does it truly communicate inner life?",
    question: "When someone says they understand exactly how you feel, do you believe them? Is true empathy possible, or are we always just guessing?",
    category: "Mind",
    thinker: "Wittgenstein",
  },
  {
    id: "hedonic-paradox",
    title: "Paradox of Hedonism",
    widgetDesc: "The harder you chase happiness, the more it escapes you.",
    fullExplanation: "The paradox of hedonism observes that people who make happiness their direct goal often fail to find it. Happiness seems to arise as a side effect of engaging in meaningful activities, deep relationships, and challenging work — not from pursuing pleasure itself. The person who chases joy catches anxiety; the person who chases meaning catches joy along the way.",
    question: "Think of your happiest recent memory. Were you actively trying to be happy in that moment, or were you absorbed in something else entirely?",
    category: "Ethics",
    thinker: "Sidgwick",
  },
  {
    id: "ambiguity",
    title: "Ethics of Ambiguity",
    widgetDesc: "Freedom is not a gift — it is a burden you must carry.",
    fullExplanation: "Simone de Beauvoir argued that human existence is fundamentally ambiguous — we are both free and constrained, both subjects who act and objects acted upon. Unlike Sartre's stark 'radical freedom,' she acknowledged that oppression genuinely limits freedom. But she insisted that recognizing this ambiguity is itself liberating: we must act despite uncertainty, choose despite incomplete knowledge, and fight for others' freedom as inseparable from our own.",
    question: "When was the last time you made a meaningful choice despite not having all the information? How did you decide?",
    category: "Existentialism",
    thinker: "de Beauvoir",
  },
  {
    id: "prisoners-dilemma",
    title: "Prisoner's Dilemma",
    widgetDesc: "Rationality for the individual can be irrational for the group.",
    fullExplanation: "Two suspects are arrested and interrogated separately. Each can either cooperate (stay silent) or defect (betray the other). If both cooperate, they get light sentences. If both defect, they get heavy sentences. But if one defects while the other cooperates, the defector goes free and the cooperator gets the harshest sentence. Individual rationality says 'always defect' — but mutual cooperation gives the best collective outcome.",
    question: "In your daily life, where do you choose individual advantage over collective benefit? Where do you cooperate even when you could 'defect'?",
    category: "Ethics",
    thinker: "Tucker",
  },
  {
    id: "memento-mori",
    title: "Memento Mori",
    widgetDesc: "Remembering death makes life more vivid.",
    fullExplanation: "The Stoics practiced 'memento mori' — remember that you will die. Not as morbid pessimism, but as a tool for living well. Marcus Aurelius wrote his Meditations while leading Rome through plague and war, constantly reminding himself of mortality. The point isn't to fear death but to let awareness of it burn away the trivial. When you remember life is finite, you stop wasting it on things that don't matter.",
    question: "If you knew you had exactly one year left, what would you stop doing immediately? Why are you still doing it now?",
    category: "Existentialism",
    thinker: "Marcus Aurelius",
  },
  {
    id: "is-ought",
    title: "The Is-Ought Problem",
    widgetDesc: "You cannot derive what should be from what is.",
    fullExplanation: "Hume noticed a logical sleight of hand in moral arguments: people observe how things are ('humans are naturally competitive') and leap to how things should be ('therefore competition is good'). But no amount of factual statements can logically produce a moral conclusion without smuggling in a value judgment. Every 'ought' requires a hidden premise about what we value — and that premise itself cannot come from facts alone.",
    question: "Think of a moral belief you hold strongly. Can you trace it back to pure facts, or does it ultimately rest on a value you simply chose to hold?",
    category: "Ethics",
    thinker: "Hume",
  },
  {
    id: "leap-of-faith",
    title: "Leap of Faith",
    widgetDesc: "Some truths cannot be reached by reason alone.",
    fullExplanation: "Kierkegaard argued that the most important questions in life — Does God exist? What should I commit my life to? Who should I love? — cannot be answered by rational analysis alone. At some point, you must make a 'leap of faith,' a commitment that goes beyond what evidence and logic can support. This isn't irrationality; it's recognizing that some choices are too personal and too profound for detached reasoning.",
    question: "What is one major commitment in your life (a relationship, a career, a belief) that you chose with your heart rather than your head?",
    category: "Existentialism",
    thinker: "Kierkegaard",
  },
  {
    id: "panopticon",
    title: "The Panopticon",
    widgetDesc: "You behave differently when you think you're being watched.",
    fullExplanation: "Bentham designed a prison where a single guard could observe all inmates without them knowing if they were being watched at any given moment. Foucault saw this as a metaphor for modern society: we internalize surveillance and police ourselves. Social media, cameras, performance reviews — we live in a soft panopticon where the 'guard' might be an algorithm, a boss, or our own anxiety about judgment.",
    question: "How differently would you behave today if you knew with certainty that absolutely no one was watching or judging you?",
    category: "Political",
    thinker: "Foucault",
  },
  {
    id: "fox-hedgehog",
    title: "The Fox & The Hedgehog",
    widgetDesc: "Do you know one big thing, or many small things?",
    fullExplanation: "The ancient Greek poet Archilochus wrote: 'The fox knows many things, but the hedgehog knows one big thing.' Isaiah Berlin turned this into a framework for understanding thinkers: hedgehogs (Plato, Nietzsche, Dostoevsky) view the world through a single defining idea; foxes (Aristotle, Shakespeare, Montaigne) draw on multiple perspectives without forcing unity. Neither is superior — but knowing which you are changes how you approach problems.",
    question: "Are you a fox or a hedgehog? Do you have one big idea that organizes your worldview, or do you navigate with many different lenses?",
    category: "Epistemology",
    thinker: "Isaiah Berlin",
  },
];

// ═══════════════════════════════════════════
// SECTION 3: DAILY TOPIC SELECTION
// ═══════════════════════════════════════════

function getTodayDateString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function getTodayIdea() {
  const now = new Date();
  const epoch = new Date(2026, 0, 1);
  const daysSinceEpoch = Math.floor((now - epoch) / 86400000);
  const index =
    ((daysSinceEpoch % PHILOSOPHY_IDEAS.length) + PHILOSOPHY_IDEAS.length) %
    PHILOSOPHY_IDEAS.length;
  return PHILOSOPHY_IDEAS[index];
}

// ═══════════════════════════════════════════
// SECTION 4: PERSISTENCE LAYER
// ═══════════════════════════════════════════

function getConversationPath() {
  const fm = FileManager.local();
  const dir = fm.joinPath(fm.documentsDirectory(), "philosophy_widget");
  if (!fm.fileExists(dir)) {
    fm.createDirectory(dir, true);
  }
  return fm.joinPath(dir, "conversation.json");
}

function loadConversation() {
  const fm = FileManager.local();
  const path = getConversationPath();
  const todayStr = getTodayDateString();

  if (fm.fileExists(path)) {
    const data = JSON.parse(fm.readString(path));
    if (data.date === todayStr) {
      return data;
    }
  }
  return {
    date: todayStr,
    ideaId: getTodayIdea().id,
    messages: [],
    stanceChosen: null,
  };
}

function saveConversation(conv) {
  const fm = FileManager.local();
  fm.writeString(getConversationPath(), JSON.stringify(conv));
}

// ═══════════════════════════════════════════
// SECTION 5: MINIMAX API INTEGRATION
// ═══════════════════════════════════════════

function buildSystemPrompt(idea) {
  return `You are a Socratic philosophy companion. Your role is to help the user think more deeply about philosophical ideas — not to lecture, but to engage in genuine dialogue.

Today's topic: "${idea.title}" — ${idea.fullExplanation}

The central question for reflection: ${idea.question}

Guidelines:
- When the user agrees with an idea, play devil's advocate. Present the strongest counterargument.
- When the user disagrees, steelman the position they rejected. Help them see its merits.
- When the user is unsure, help them clarify their intuitions by asking targeted questions.
- Keep responses concise (2-4 sentences). End with a question or a provocative thought.
- Reference other philosophers and ideas that connect to the topic when relevant.
- Never be preachy or condescending. Treat the user as an intellectual equal.
- Use plain language. Avoid jargon unless explaining a specific term.
- Occasionally offer a concrete real-world example or thought experiment.
- Be warm but intellectually rigorous.`;
}

function trimHistory(messages, maxPairs) {
  maxPairs = maxPairs || 10;
  if (messages.length > maxPairs * 2) {
    return messages.slice(messages.length - maxPairs * 2);
  }
  return messages;
}

async function callMiniMaxAPI(userMessage, conversationHistory, idea) {
  const messages = [
    { role: "system", content: buildSystemPrompt(idea) },
    ...trimHistory(conversationHistory.messages),
    { role: "user", content: userMessage },
  ];

  const req = new Request(API_ENDPOINT);
  req.method = "POST";
  req.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
  req.body = JSON.stringify({
    model: MODEL_NAME,
    messages: messages,
    temperature: 0.9,
    max_tokens: 1024,
  });
  req.timeoutInterval = 30;

  try {
    const resp = await req.loadJSON();
    if (resp.choices && resp.choices.length > 0) {
      let content = resp.choices[0].message.content;
      // Strip <think>...</think> reasoning tags from MiniMax response
      content = content.replace(/<think>[\s\S]*?<\/think>\s*/g, "");
      return content.trim() || "[DEBUG] Response was empty after stripping think tags";
    }
    return "[DEBUG] Unexpected API response: " + JSON.stringify(resp).substring(0, 300);
  } catch (e) {
    return "[DEBUG] API call failed: " + String(e);
  }
}

function buildStancePrompt(stance, idea) {
  const stanceMap = {
    Agree: `I find the idea of "${idea.title}" compelling and I agree with it. ${idea.question}`,
    Disagree: `I disagree with "${idea.title}". I don't think this holds up to scrutiny. ${idea.question}`,
    Unsure: `I'm genuinely unsure about "${idea.title}". I can see merit on both sides. ${idea.question}`,
  };
  return stanceMap[stance];
}

// ═══════════════════════════════════════════
// SECTION 6: WIDGET RENDERING
// ═══════════════════════════════════════════

async function createWidget() {
  const widget = new ListWidget();
  const idea = getTodayIdea();

  // Background gradient
  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [new Color(COLORS.bgStart), new Color(COLORS.bgEnd)];
  gradient.startPoint = new Point(0, 0);
  gradient.endPoint = new Point(1, 1);
  widget.backgroundGradient = gradient;
  widget.setPadding(14, 16, 14, 16);

  // Tap action
  widget.url = "scriptable:///run/PhilosophyWidget";

  // Header row
  const headerStack = widget.addStack();
  headerStack.layoutHorizontally();
  headerStack.centerAlignContent();

  const dot = headerStack.addText("◆");
  dot.font = Font.systemFont(8);
  dot.textColor = new Color(COLORS.gold);

  headerStack.addSpacer(6);

  const headerLabel = headerStack.addText("DAILY PHILOSOPHY");
  headerLabel.font = Font.semiboldMonospacedSystemFont(10);
  headerLabel.textColor = new Color(COLORS.gold);

  headerStack.addSpacer();

  const categoryTag = headerStack.addText(idea.category.toUpperCase());
  categoryTag.font = Font.mediumSystemFont(9);
  categoryTag.textColor = new Color(COLORS.mutedGray);

  widget.addSpacer(10);

  // Title
  const title = widget.addText(idea.title);
  title.font = Font.boldSystemFont(18);
  title.textColor = Color.white();
  title.minimumScaleFactor = 0.8;
  title.lineLimit = 1;

  widget.addSpacer(6);

  // Widget description
  const desc = widget.addText(idea.widgetDesc);
  desc.font = Font.lightSystemFont(14);
  desc.textColor = new Color(COLORS.lightGray);
  desc.lineLimit = 2;
  desc.minimumScaleFactor = 0.9;

  widget.addSpacer();

  // Footer
  const footerStack = widget.addStack();
  footerStack.layoutHorizontally();
  footerStack.addSpacer();
  const footer = footerStack.addText("Tap to ponder →");
  footer.font = Font.italicSystemFont(11);
  footer.textColor = new Color(COLORS.mutedGray);

  // Refresh at next midnight
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  widget.refreshAfterDate = tomorrow;

  return widget;
}

// ═══════════════════════════════════════════
// SECTION 7: IN-APP INTERACTIVE UI
// ═══════════════════════════════════════════

function buildChatHTML(idea, conversation) {
  const existingMessages = conversation.messages
    .map((m) => {
      const isUser = m.role === "user";
      const bubbleClass = isUser ? "user-msg" : "ai-msg";
      const label = isUser ? "You" : "Philosopher";
      const escaped = m.content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
      return `<div class="msg ${bubbleClass}"><span class="msg-label">${label}</span>${escaped}</div>`;
    })
    .join("");

  const stanceHidden = conversation.stanceChosen ? "display:none;" : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, system-ui, sans-serif;
    background: ${COLORS.bgStart};
    color: ${COLORS.white};
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .header {
    padding: 16px 20px 12px;
    background: linear-gradient(135deg, ${COLORS.bgStart}, ${COLORS.bgEnd});
    border-bottom: 1px solid ${COLORS.border};
    flex-shrink: 0;
  }
  .header-label {
    font-size: 11px;
    font-weight: 600;
    color: ${COLORS.gold};
    letter-spacing: 1.5px;
    margin-bottom: 4px;
  }
  .header-title {
    font-size: 20px;
    font-weight: 700;
    color: ${COLORS.white};
  }
  .header-thinker {
    font-size: 12px;
    color: ${COLORS.mutedGray};
    margin-top: 2px;
  }

  .scroll-area {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;
    -webkit-overflow-scrolling: touch;
  }

  .idea-card {
    background: ${COLORS.cardBg};
    border: 1px solid ${COLORS.border};
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
  }
  .idea-explanation {
    font-size: 15px;
    line-height: 1.6;
    color: ${COLORS.lightGray};
    margin-bottom: 16px;
  }
  .idea-question {
    font-size: 15px;
    line-height: 1.5;
    color: ${COLORS.gold};
    font-style: italic;
    border-left: 3px solid ${COLORS.gold};
    padding-left: 12px;
  }

  .stance-row {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
  }
  .stance-btn {
    flex: 1;
    padding: 12px 8px;
    border: 1.5px solid ${COLORS.gold};
    border-radius: 24px;
    background: transparent;
    color: ${COLORS.gold};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .stance-btn:active {
    background: ${COLORS.gold};
    color: ${COLORS.bgStart};
  }

  .chat-container { }

  .msg {
    max-width: 85%;
    padding: 12px 16px;
    border-radius: 18px;
    margin-bottom: 10px;
    font-size: 15px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .msg-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 4px;
    opacity: 0.7;
  }
  .user-msg {
    background: ${COLORS.userBubble};
    margin-left: auto;
    border-bottom-right-radius: 6px;
    color: ${COLORS.white};
  }
  .user-msg .msg-label { color: ${COLORS.gold}; }
  .ai-msg {
    background: ${COLORS.aiBubble};
    margin-right: auto;
    border-bottom-left-radius: 6px;
    color: ${COLORS.lightGray};
  }
  .ai-msg .msg-label { color: #9b8ec4; }

  .typing {
    display: none;
    padding: 12px 16px;
    background: ${COLORS.aiBubble};
    border-radius: 18px;
    border-bottom-left-radius: 6px;
    max-width: 80px;
    margin-bottom: 10px;
  }
  .typing.visible { display: block; }
  .typing-dots {
    display: flex;
    gap: 5px;
    align-items: center;
    height: 20px;
  }
  .typing-dots span {
    width: 7px; height: 7px;
    background: ${COLORS.mutedGray};
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
  }
  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }

  .input-bar {
    display: flex;
    gap: 10px;
    padding: 12px 16px;
    background: ${COLORS.bgEnd};
    border-top: 1px solid ${COLORS.border};
    flex-shrink: 0;
    align-items: flex-end;
    padding-bottom: max(12px, env(safe-area-inset-bottom));
  }
  .input-bar textarea {
    flex: 1;
    background: ${COLORS.inputBg};
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    color: ${COLORS.white};
    font-size: 15px;
    padding: 10px 16px;
    resize: none;
    outline: none;
    font-family: -apple-system, system-ui, sans-serif;
    max-height: 100px;
    line-height: 1.4;
  }
  .input-bar textarea::placeholder { color: ${COLORS.mutedGray}; }
  .send-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${COLORS.gold};
    border: none;
    color: ${COLORS.bgStart};
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }
  .send-btn:active { opacity: 0.7; }
</style>
</head>
<body>

<div class="header">
  <div class="header-label">◆ DAILY PHILOSOPHY</div>
  <div class="header-title">${idea.title}</div>
  <div class="header-thinker">${idea.thinker} · ${idea.category}</div>
</div>

<div class="scroll-area" id="scrollArea">
  <div class="idea-card">
    <div class="idea-explanation">${idea.fullExplanation}</div>
    <div class="idea-question">${idea.question}</div>
  </div>

  <div class="stance-row" id="stanceRow" style="${stanceHidden}">
    <button class="stance-btn" onclick="onStance('Agree')">I Agree</button>
    <button class="stance-btn" onclick="onStance('Disagree')">I Disagree</button>
    <button class="stance-btn" onclick="onStance('Unsure')">I'm Unsure</button>
  </div>

  <div class="chat-container" id="chatContainer">
    ${existingMessages}
  </div>

  <div class="typing" id="typing">
    <div class="typing-dots"><span></span><span></span><span></span></div>
  </div>
</div>

<div class="input-bar">
  <textarea id="chatInput" rows="1" placeholder="Share your thoughts..." oninput="autoResize(this)"></textarea>
  <button class="send-btn" onclick="onSend()">↑</button>
</div>

<script>
  var scrollArea = document.getElementById('scrollArea');
  var chatContainer = document.getElementById('chatContainer');
  var typingEl = document.getElementById('typing');
  var stanceRow = document.getElementById('stanceRow');
  var chatInput = document.getElementById('chatInput');

  function scrollToBottom() {
    setTimeout(function() { scrollArea.scrollTop = scrollArea.scrollHeight; }, 50);
  }

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }

  function addUserMessage(text) {
    var escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\\n/g,'<br>');
    var div = document.createElement('div');
    div.className = 'msg user-msg';
    div.innerHTML = '<span class="msg-label">You</span>' + escaped;
    chatContainer.appendChild(div);
    scrollToBottom();
  }

  function addAssistantMessage(text) {
    typingEl.classList.remove('visible');
    var escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\\n/g,'<br>');
    var div = document.createElement('div');
    div.className = 'msg ai-msg';
    div.innerHTML = '<span class="msg-label">Philosopher</span>' + escaped;
    chatContainer.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    typingEl.classList.add('visible');
    scrollToBottom();
  }

  // Queue for actions from user (buttons/send)
  var actionQueue = [];
  var actionResolver = null;

  function emitAction(data) {
    if (actionResolver) {
      var r = actionResolver;
      actionResolver = null;
      r(data);
    } else {
      actionQueue.push(data);
    }
  }

  function waitForUserAction() {
    if (actionQueue.length > 0) {
      return Promise.resolve(actionQueue.shift());
    }
    return new Promise(function(resolve) {
      actionResolver = resolve;
    });
  }

  function onStance(stance) {
    stanceRow.style.display = 'none';
    var labels = { Agree: 'I agree with this idea.', Disagree: 'I disagree with this idea.', Unsure: "I'm unsure about this idea." };
    addUserMessage(labels[stance]);
    showTyping();
    emitAction({ action: 'stance', stance: stance });
  }

  function onSend() {
    var msg = chatInput.value.trim();
    if (!msg) return;
    chatInput.value = '';
    chatInput.style.height = 'auto';
    addUserMessage(msg);
    showTyping();
    emitAction({ action: 'send_message', message: msg });
  }

  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  });

  scrollToBottom();
</script>
</body>
</html>`;
}

async function runInteractiveMode() {
  const idea = getTodayIdea();
  const conversation = loadConversation();

  // Show the idea and question first
  let infoAlert = new Alert();
  infoAlert.title = idea.title;
  infoAlert.message = idea.fullExplanation + "\n\n💭 " + idea.question;
  infoAlert.addAction("I Agree");
  infoAlert.addAction("I Disagree");
  infoAlert.addAction("I'm Unsure");
  infoAlert.addCancelAction("Close");
  const stanceIdx = await infoAlert.presentAlert();

  if (stanceIdx === -1) return; // cancelled

  const stances = ["Agree", "Disagree", "Unsure"];
  const chosenStance = stances[stanceIdx];
  const userMsg = buildStancePrompt(chosenStance, idea);

  // Call API
  let reply = await callMiniMaxAPI(userMsg, conversation, idea);
  const stanceLabels = {
    Agree: "I agree with this idea.",
    Disagree: "I disagree with this idea.",
    Unsure: "I'm unsure about this idea.",
  };
  conversation.stanceChosen = chosenStance;
  conversation.messages.push(
    { role: "user", content: stanceLabels[chosenStance] },
    { role: "assistant", content: reply },
  );
  saveConversation(conversation);

  // Show AI response and allow continued conversation
  let shouldContinue = true;
  while (shouldContinue) {
    let replyAlert = new Alert();
    replyAlert.title = "Philosopher";
    replyAlert.message = reply;
    replyAlert.addTextField("Share your thoughts...", "");
    replyAlert.addAction("Send");
    replyAlert.addCancelAction("Done");
    const replyIdx = await replyAlert.presentAlert();

    if (replyIdx === -1) {
      shouldContinue = false;
      break;
    }

    const userText = replyAlert.textFieldValue(0).trim();
    if (!userText) continue;

    reply = await callMiniMaxAPI(userText, conversation, idea);
    conversation.messages.push(
      { role: "user", content: userText },
      { role: "assistant", content: reply },
    );
    saveConversation(conversation);
  }
}

// ═══════════════════════════════════════════
// SECTION 8: MAIN ENTRY POINT
// ═══════════════════════════════════════════

if (config.runsInWidget) {
  const widget = await createWidget();
  Script.setWidget(widget);
  Script.complete();
} else {
  await runInteractiveMode();
  Script.complete();
}
