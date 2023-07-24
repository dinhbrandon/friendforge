from fastapi import APIRouter, Depends
from authenticator import authenticator
from typing import Optional
from queries.user_profile import ProfileRepository
from queries.friendships import (
    FriendshipRepository,
)


router = APIRouter()


@router.post("/friendship/{receiver_id}")
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
    if friends:
        for friend in friends:
            if receiver_id != friend["id"] and receiver_id != sender_id:
                return repo.request(sender_id, receiver_id, message)
            else:
                return {"message": "Not an eligible friend request"}
    else:
        if receiver_id != sender_id:
            return repo.request(sender_id, receiver_id, message)
        else:
            return {"message": "Not an eligible friend request"}


@router.get("/friendship/{profile_id}/requests")
def get_friend_requests(
    repo: FriendshipRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    profile_repository = ProfileRepository()
    profile_id = profile_repository.get_profile_id_by_user_account(
        user_account_id)
    return repo.get_all_requests(profile_id)


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


@router.get("/friendship/check/{user_1}/{user_2}")
def friendship_status(
    user_1: int,
    user_2: int,
    repo: FriendshipRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.check_status(user_1, user_2)
