from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from fastapi.responses import HTMLResponse
from queries.chatroom import MessageRepository
import json

# from authenticator import authenticator

router = APIRouter()


@router.get("/chatroom")
def homepage():
    with open("index.html") as f:
        return HTMLResponse(f.read())


connections = []
# print("#1", connections)


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    profile_id: int,
    group_id: int,
    repo: MessageRepository = Depends(),
):
    await websocket.accept()
    connections.append(websocket)
    print("2-connections", connections)
    print("5-websocket", websocket)
    try:
        while True:
            data = await websocket.receive_text()
            print(data)
            message = repo.create(profile_id, group_id, data)
            print("3", data)  # content of message sent
            print("6", message)
            for connection in connections:
                await connection.send_text(json.dumps(message))
                print("4", connection)
    except WebSocketDisconnect:
        connections.remove(websocket)
