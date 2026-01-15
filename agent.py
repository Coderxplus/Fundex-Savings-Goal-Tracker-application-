import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI

# ----------------------------
# FastAPI setup
# ----------------------------
app = FastAPI()

# Allow all origins for simplicity (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Environment variables
# ----------------------------
# Make sure to set GEMINI_API_KEY in your environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Please set the GEMINI_API_KEY environment variable.")

# ----------------------------
# App knowledge (static)
# ----------------------------
APP_KNOWLEDGE = """
This app helps users track financial goals.

Users can:
- Create goals with a target amount and deadline
- Add progress updates manually
- View active and completed goals on the dashboard

Here are the flows
FLOW 1: User Authentication
Launch Fundex → Login screen is displayed
Enter registered email address
Enter password
Select Sign In
System routes user to Dashboard

FLOW 2: Create a Savings Goal
Navigate to Goals from the sidebar
Select Create Goal
Provide goal parameters:
Goal Name
Target Amount
Target Date
Optional Description
Confirm creation → Goal becomes active

FLOW 3: Fund a Goal
Access goal from Dashboard or Goals list
Open goal details
Select Add Funds
Enter contribution amount
Confirm transaction → Progress updates instantly

FLOW 4: View Goal Details
Select any goal
System displays:
Target vs current amount
Completion percentage
Transaction history

Available actions:
Add funds
Edit goal
Close goal

FLOW 5: Review Transactions
Navigate to your transaction section
Here you can view your full activity history
Open transaction for detailed view

FLOW 6: Interact with AI Assistant
Open AI Assistant
Submit app query
Receive app knowledge based guidance

Iterate based on recommendations

The chatbot:
- Explains how features work
- Answers navigation questions
- Engages in friendly small talk
- Does NOT give financial advice or perform calculations
"""


SYSTEM_PROMPT = """
You are a conversational assistant for a financial goal tracking app.

Rules:
- You only explain how the app works.
- Engage in friendly, casual conversation.
- Do NOT give financial advice.
- Do NOT perform calculations.
- If a question is outside app usage or small talk, politely decline.

App Knowledge:
{app_knowledge}

Conversation:
{chat_history}

User: {question}
Assistant:
"""

# initialize llm
llm = ChatGoogleGenerativeAI(
    model="models/gemini-2.5-flash",
    api_key=GEMINI_API_KEY
)


class ChatRequest(BaseModel):
    question: str

# Chat endpoint
@app.post("/chat")
def chat(req: ChatRequest):
    try:
        prompt = SYSTEM_PROMPT.format(
            app_knowledge=APP_KNOWLEDGE,
            chat_history="",  
            question=req.question
        )
        response = llm.invoke(prompt)
        return {
            "question": req.question,
            "answer": response.content.strip()
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}


@app.get("/")
def root():
    return {"message": "Financial Tracker Chatbot API is running."}

