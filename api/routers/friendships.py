from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union
from queries.user_profile import ProfileRepository
from queries.response_types import Error
from queries.friendships import (
    FriendshipOut,
    FriendshipRepository,
)


router = APIRouter()


@router.post("/friendship", response_model=Union[FriendshipOut, Error])
def create_friendship(
    user_profile_id2: int,
    response: Response,
    repo: FriendshipRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    profile_repository = ProfileRepository()
    user_profile_id1 = profile_repository.get_profile_id_by_user_account(
        user_account_id)
    return repo.create(user_profile_id1, user_profile_id2)


@router.get("/friendship/{user_profile_id}")
def get_friends(
    user_profile_id: int,
    repo: FriendshipRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get(user_profile_id)
