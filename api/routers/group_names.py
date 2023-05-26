from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.group_names import GroupNameIn, GroupNameOut, GroupNameRepository, Error

router = APIRouter()

@router.post("/group_names", response_model=Union[GroupNameOut, Error])
def create_group_name(
    group_name: GroupNameIn,
    response: Response,
    repo: GroupNameRepository = Depends()
):
    return repo.create(group_name)

@router.get("/group_names", response_model=Union[List[GroupNameOut], Error])
def get_all(
    repo: GroupNameRepository = Depends()
):
    return repo.get_all()

@router.put("/group_names/{group_name_id}", response_model=Union[GroupNameOut, Error])
def update_group_name(
    group_name_id: int,
    group_name: GroupNameIn,
    repo: GroupNameRepository = Depends(),
) -> Union[Error, GroupNameOut]:
    return repo.update(group_name_id, group_name)

@router.delete("/group_names/{group_name_id}", response_model=bool)
def delete_group_name(
    group_name_id: int,
    repo: GroupNameRepository = Depends(),
) -> bool:
    return repo.delete(group_name_id)

@router.get("/group_names/{group_name_id}", response_model=Optional[GroupNameOut])
def get_one_group_name(
    group_name_id: int,
    response: Response,
    repo: GroupNameRepository = Depends(),
) -> GroupNameOut:
    group_name = repo.get_one(group_name_id)
    if group_name is None:
        response.status_code = 404
    return group_name
