from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List, Optional
from queries.groups import (
    Error,
    GroupIn,
    GroupOut,
    GroupRepository,
)

router = APIRouter(prefix="/api")


@router.get("/groups", response_model=Union[List[GroupOut], Error])
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
    group_id: int,
    group: GroupIn,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.update(group_id, group)
