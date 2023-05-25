from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List, Optional
from queries.groups import (
    Error,
    GroupIn,
    GroupOut,
    GroupOutWithAll,
    GroupRepository,
    GroupUpdateIn,
    GroupMemberIn,
    GroupMemberOut,
    SingleGroupOut
)

router = APIRouter()


@router.get("/groups", response_model=Union[List[GroupOutWithAll], Error])
def get_groups(
    repo: GroupRepository = Depends(),
):
    return repo.get_groups()


@router.post("/groups", response_model=Union[GroupOut, Error])
def create_group(
    group: GroupIn,
    response: Response,
    repo: GroupRepository = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data)
):
    print(group)
    return repo.create(group)

@router.put("/groups/{group_id}", response_model=Union[GroupOut, Error])
def edit_group(
    group: GroupUpdateIn,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    group_id = ["id"]
    return repo.update(group_id, group)

@router.get("/groups/{group_id}", response_model=SingleGroupOut)
def get_one(
    group_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get_one_group(group_id)

@router.post("/group/member", response_model=Union[GroupMemberOut, Error])
def add_member(
    group_member: GroupMemberIn,
    reponse: Response,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    return repo.create_group_member(group_member, user_account_id)

@router.get("/group/{group_id}/members")
def get_members(
    group_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_members_in_group(group_id)

@router.get("/profile/{profile_id}/groups")
def get_user_profile_groups(
    profile_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get_profile_groups(profile_id)
