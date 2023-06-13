from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, Optional
from queries.user_profile import ProfileRepository
from queries.response_types import Error
from queries.friendships import (
    FriendshipOut,
    FriendshipRepository,
)


router = APIRouter()


@router.post("/friendship")
def friend_request(
    receiver_id: int,
    message: Optional[str] = None,
    repo: FriendshipRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    profile_repository = ProfileRepository()
    sender_id = profile_repository.get_profile_id_by_user_account(
        user_account_id)

    friends = repo.get(sender_id)

    for friend in friends:
        if receiver_id != friend["id"] and receiver_id != sender_id:
            return repo.request(sender_id, receiver_id, message)
        else:
            return {"message": "Not an eligible friend request"}


@router.put("/friendship/{receiver_id}/{sender_id}/accept")
def accept_friend_request(
    # friend_request_id: int,
    sender_id: int,
    repo: FriendshipRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    receiver_account_id = account_data["id"]
    profile_repository = ProfileRepository()
    receiver_id = profile_repository.get_profile_id_by_user_account(
        receiver_account_id)
    return repo.accept(receiver_id, sender_id)


@router.put("/friendship/{receiver_id}/{sender_id}/reject")
def reject_friend_request(
    # friend_request_id: int,
    sender_id: int,
    repo: FriendshipRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    receiver_account_id = account_data["id"]
    profile_repository = ProfileRepository()
    receiver_id = profile_repository.get_profile_id_by_user_account(
        receiver_account_id)
    
    return repo.reject(receiver_id, sender_id)


@router.get("/friendship/{user_profile_id}")
def get_friends(
    user_profile_id: int,
    repo: FriendshipRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get(user_profile_id)
