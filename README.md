## Inspiration
Phone addiction isn’t just about wasting time, it's about what we replace meaningful moments with. Most solutions try to block usage, but that rarely works long-term. I was inspired by a different idea, which is, instead of restricting behavior, lets replace it with something better.

What if the first thing you saw when you unlocked your phone wasn’t social media but a thought-provoking idea? Something small, interactive, and mentally rewarding. Philosophy felt like the perfect fit. It’s timeless, engaging, and naturally sparks curiosity. I wanted to turn passive scrolling into active thinking, even if just for a minute a day.

## What it does
Phil Swipe is an interactive philosophy widget that lives directly on your phone.
- Each day, it presents a bite-sized philosophical idea (like the Ship of Theseus or the Trolley Problem).
- Users can tap the widget to explore a more comprehensive explanation or different perspectives on the same idea.
Users then engage with the idea by choosing a stance or writing their own thoughts and the system responds with:
- A counterargument
- A related concept
- A follow-up question

## How we built it
I wanted to build a lightweight, fast, and interactive experience.
### Frontend (Widget):
- Built using Scriptable (JavaScript-based iOS widget framework)
- Displays daily prompts and handles user interaction

The content is a curated dataset of philosophical prompts and simplified explanations structured in JSON format.

### Backend / AI Integration:
Used an AI API to generate:
- Counterarguments
- Follow-up questions

### Interaction Flow:
- Widget displays daily concept
- User taps -> expanded view
- User selects or writes a response
- Response is sent to AI
- AI returns a tailored philosophical reply

## Challenges we ran into
- It was tempting to build a full philosophy app, but that would defeat the purpose. The real challenge was compressing deep ideas into 30–60 second interactions without losing their essence. 

- A technical challenge I ran into was integrating the MiniMax API into the script, the base URL endpoints were messy to manage and track.

- Another challenge was to nail the system prompt so that the AI model stays concise enough and on-track for the intended user experience.

## Accomplishments that we're proud of
- Turning a passive habit (scrolling) into an active one (thinking)
- Creating an experience that is minimal, fast but at the same time engaging and actually generates value to the user.
- Successfully integrating AI in a way that feels thoughtful, not gimmicky
- Designing something that users can realistically adopt into their daily routine

## What we learned
- AI is only as good as the prompt, I learned how important prompt design is in shaping meaningful, non-generic responses.
- Small interactions can have lasting impact, even a tiny 30-second moment of reflection can stay with someone throughout the day.
- Constraints drive better design, where working within widget limitations forced me to focus on what truly matters.

## What's next for phil swipe
- Personalization, I want to tailor philosophical content based on user interests and past responses
- Progress tracking, where I let users revisit past thoughts and see how their perspectives evolve over time
- Deeper interaction modes for example a “Debate mode” where users can go back-and-forth with the AI
- Expanded content, so more topics across philosophy, psychology, and ethics are integrated.
- Cross-platform support over both android and IOS.
