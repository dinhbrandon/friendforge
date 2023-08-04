from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union
from queries.user_profile import ProfileRepository
from queries.response_types import Error
from queries.private_messages import (
    PrivateMessageOut,
    PrivateMessageRepository,
)


router = APIRouter()


@router.post("/private_message", response_model=Union[
    PrivateMessageOut, Error])
def create_private_message(
    user_profile_id2: int,
    content: str,
    response: Response,
    repo: PrivateMessageRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    profile_repository = ProfileRepository()
    user_profile_id1 = profile_repository.get_profile_by_user_account(
        user_account_id)
    return repo.create(user_profile_id1, user_profile_id2, content)


@router.get("/private_message/{user_profile_id}")
def get_friends(
    user_profile_id: int,
    repo: PrivateMessageRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get(user_profile_id)
