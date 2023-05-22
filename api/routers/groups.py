from fastapi import APIRouter, Depends, Response
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
