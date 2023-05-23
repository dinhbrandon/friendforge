from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.group_focus import (
    Error,
    GroupFocusIn,
    GroupFocusRepository,
    GroupFocusOut,
    )


router = APIRouter(prefix="/api")


@router.post("/group_focus", response_model=Union[GroupFocusOut, Error])
def create_focus(
    focus: GroupFocusIn,
    response: Response,
    repo: GroupFocusRepository = Depends(),
):

    return repo.create(focus)


@router.get("/group_focus", response_model=Union[List[GroupFocusOut], Error])
def get_group_focus(
    repo: GroupFocusRepository = Depends(),
):
    return repo.get_group_focus()


@router.put("/group_focus/{group_focus_id}", response_model=Union[GroupFocusOut, Error])
def update_group_focus(
    group_focus_id: int,
    focus: GroupFocusIn,
    repo: GroupFocusRepository = Depends(),
) -> Union[Error, GroupFocusOut]:
    return repo.update(group_focus_id, focus)


@router.delete("/group_focus/{group_focus_id}", response_model=bool)
def delete_group_focus(
    group_focus_id: int,
    repo: GroupFocusRepository = Depends(),
) -> bool:
    return repo.delete(group_focus_id)


@router.get("/group_focus/{group_focus_id}", response_model=Optional[GroupFocusOut])
def get_one_focus(
    group_focus_id: int,
    response: Response,
    repo: GroupFocusRepository = Depends(),
) -> GroupFocusOut:

    focus = repo.get_one(group_focus_id)
    if focus is None:
        response.status_code = 404
    return focus
