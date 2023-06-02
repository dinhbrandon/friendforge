from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.interests import (
    InterestIn,
    InterestOut,
    InterestRepository,
    Error,
)

router = APIRouter()


@router.post("/interests", response_model=Union[InterestOut, Error])
def create_interest(
    interest: InterestIn,
    response: Response,
    repo: InterestRepository = Depends(),
):
    return repo.create(interest)


@router.get("/interests", response_model=Union[List[InterestOut], Error])
def get_all(repo: InterestRepository = Depends()):
    return repo.get_all()


@router.put(
    "/interests/{interest_id}", response_model=Union[InterestOut, Error]
)
def update_interest(
    interest_id: int,
    interest: InterestIn,
    repo: InterestRepository = Depends(),
) -> Union[Error, InterestOut]:
    return repo.update(interest_id, interest)


@router.delete("/interests/{interest_id}", response_model=bool)
def delete_interest(
    interest_id: int,
    repo: InterestRepository = Depends(),
) -> bool:
    return repo.delete(interest_id)


@router.get("/interests/{interest_id}", response_model=Optional[InterestOut])
def get_one_interest(
    interest_id: int,
    response: Response,
    repo: InterestRepository = Depends(),
) -> InterestOut:
    interest = repo.get_one(interest_id)
    # if interest is None:
    #     response.status_code = 404
    return interest
