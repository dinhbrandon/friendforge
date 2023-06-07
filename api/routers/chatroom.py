from fastapi import APIRouter, Depends
from queries.chatroom import MessageRepository, MessageOut
from typing import List


connections = []


router = APIRouter()


@router.get("/messages/{group_id}", response_model=List[MessageOut])
def get_messages_by_group_id(
    group_id: int,
    repo: MessageRepository = Depends(),
):
    return repo.get_by_group_id(group_id)


@router.post("/messages")
async def create_message(
    content: str,
    profile_id: int,
    group_id: int,
    repo: MessageRepository = Depends(),
):
    return repo.create(int(profile_id), int(group_id), content)
