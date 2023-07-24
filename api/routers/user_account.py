from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from pydantic import BaseModel
from typing import Union, List, Optional
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from queries.user_account import (
    Error,
    DuplicateAccountError,
    UserAccountIn,
    UserAccountQueries,
    UserAccountOut,
)


class UserAccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UserAccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UserAccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/users", response_model=AccountToken | HttpError)
async def create_user_account(
    user_account: UserAccountIn,
    request: Request,
    response: Response,
    repo: UserAccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(user_account.password)
    try:
        account = repo.create(user_account, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account already exists with this email.",
        )
    form = UserAccountForm(
        username=user_account.email, password=user_account.password
    )
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/users", response_model=Union[List[UserAccountOut], Error])
def get_all_user_accounts(
    repo: UserAccountQueries = Depends(),
):
    return repo.get_all()


# @router.put("/users/{user_id}",
# response_model = Union[UserAccountOut, Error])
# def update_user_account(
#         user_id: int,
#         user_account: UserAccountIn,
#         repo: UserAccountQueries = Depends(),
#         account_data: dict = Depends(authenticator.get_current_account_data)
# ):
#         hashed_password = authenticator.hash_password(user_account.password)
#         try:
#                 account = repo.update(user_account, hashed_password)
#         except DuplicateAccountError:
#                 raise HTTPException(
#                         status_code=status.HTTP_400_BAD_REQUEST,
#                         detail="Could not update account.",
#                 )
#         form = AccountUpdateForm(username=user_account.email,
# password=user_account.password,
# first_name=user_account.first_name, last_name=user_account.last_name,
# phone_number=user_account.phone_number)
#         return repo.update(user_id, user_account)


@router.delete("/users/{user_id}", response_model=bool)
def delete_user_account(
    user_id: int,
    repo: UserAccountQueries = Depends(),
) -> bool:
    return repo.delete(user_id)


@router.get("/users/{user_id}", response_model=Optional[UserAccountOut])
def get_one_user_account(
    user_id: int,
    response: Response,
    repo: UserAccountQueries = Depends(),
) -> UserAccountOut:
    user_account = repo.get_account_detail(user_id)
    if user_account is None:
        response.status_code = 404
    return user_account
