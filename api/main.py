from fastapi import FastAPI
from authenticator import authenticator
from routers import user_account
from fastapi.middleware.cors import CORSMiddleware
from routers import group_focus
import os
from routers import interests
from routers import groups
from routers import user_profile
from routers import chatroom
from routers import account_type
from routers import friendships
from routers import private_messages
from routers import locations


app = FastAPI()
app.include_router(group_focus.router)
app.include_router(user_account.router)
app.include_router(authenticator.router)
app.include_router(interests.router)
app.include_router(groups.router)
app.include_router(user_profile.router)
app.include_router(chatroom.router)
app.include_router(account_type.router)
app.include_router(friendships.router)
app.include_router(private_messages.router)
app.include_router(locations.router)


origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
