from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.account_type import (
  Error,
  AccountTypeIn,
  AccountTypeOut,
  AccountTypeRepository,
  )

router = APIRouter()

@router.post("/account_type", response_model=Union[AccountTypeOut, Error])
def create_account_type(
  type: AccountTypeIn,
  response: Response,
  repo: AccountTypeRepository = Depends(),
):
  return repo.create(type)

@router.get("/account_type", response_model=Union[List[AccountTypeOut], Error])
def get_account_type(
  repo: AccountTypeRepository = Depends(),
):
  return repo.get_account_type()

@router.delete("/account_type/{account_type_id}", response_model=bool)
def delete_account_type(
  account_type_id: int,
  repo: AccountTypeRepository = Depends(),
) -> bool:
  return repo.delete(account_type_id)

@router.get("/account_type/{account_type_id}", response_model=Optional[AccountTypeOut])
def get_one_account_type(
  account_type_id: int,
  response: Response,
  repo: AccountTypeRepository = Depends(),
) -> AccountTypeOut:

  type = repo.get_one(account_type_id)
  if type is None:
    response.status_code = 404
  return type
