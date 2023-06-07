# @router.websocket("/ws")
# async def websocket_endpoint(
#     websocket: WebSocket,
#     profile_id: int,
#     group_id: int,
#     repo: MessageRepository = Depends(),
# ):
#     await websocket.accept()
#     connections[websocket] = (profile_id, group_id)
#     try:
#         while True:
#             data = await websocket.receive_text()
#             message = repo.create(profile_id, group_id, data)
#             for connection in connections:
#                 await connection.send_text(message.json())
#     except WebSocketDisconnect:
#         del connections[websocket]
