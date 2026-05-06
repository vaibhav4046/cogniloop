I had a small realization mid-exam-prep last semester:

I'd been "studying" with ChatGPT for two weeks, and when I closed it, I couldn't actually explain anything I'd just read. The summarizer was doing the thinking for me.

So I built Cogniloop — an AI tutor that won't let you do that.

It refuses to give answers. You paste a topic. It pulls out the concepts you need to master. Then asks you to explain one of them, in your own words. Grades you 0–3, calls out the gaps, and the next question targets your weakest spot. Concepts move from weak → shaky → solid → mastered as you go.

The trick isn't the model. ChatGPT or Claude can do the same Socratic dance — but one re-prompt later, they fold and just answer. Cogniloop's system prompt is locked, the UI only renders explain + grade, there's no exit door. The product IS the constraint.

Built it solo this past week:
• Next.js 16 (App Router) + React 19 + Tailwind v4
• Edge runtime, strict TypeScript, KaTeX for math
• Groq Llama 3.3 70B primary, Pollinations as no-key fallback
• BYOK Groq for unlimited speed, voice input via Web Speech API
• 100% client-side persistence (history, streak, sessions all in localStorage)
• 6 pre-loaded curriculum packs: JEE, NEET, GATE-CSE, MCAT, AP-CS, ML

Where it actually helps:
• Night-before-exam revision when you can't tell what you actually know
• ML / system-design interview prep on Expert mode (adversarial, first-principles only)
• Right after a lecture — paste your notes, see if you understood or just transcribed
• TAs generating personalized question banks for office hours

Live (free, no signup, no API key): https://cogniloop-vaibhav4046s-projects.vercel.app
Code: https://github.com/vaibhav4046/cogniloop

Open to AI/ML engineering roles. If tight, opinionated product engineering interests you, my DMs are open.

#AI #MachineLearning #NextJS #EdTech #FullStack #TypeScript #Engineering
