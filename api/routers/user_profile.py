from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.user_profile import (
    ProfileIn,
    ProfileOut,
    ProfileOutCreation,
    ProfileRepository,
    Error,
    ProfileInterestIn,
    ProfileInterestOut,
    JunctionsOut,
)

# from queries.interests import InterestsOut, Error
from authenticator import authenticator


router = APIRouter()

# Added function for front-end use


@router.get("/profile_id/get", response_model=Union[int, Error])
def get_profile_id(
    user_id: int,
    repo: ProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    profile_id = repo.get_profile_id_by_user_account(user_id)
    return profile_id


@router.put(
    "/profile/{profile_id}", response_model=Union[ProfileOutCreation, Error]
)
def update_profile(
    profile: ProfileIn,
    repo: ProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    # profile_id = repo.get_profile_id_by_user_account(user_account_id)
    return repo.update(user_account_id, profile)


@router.post("/profile", response_model=Union[ProfileOutCreation, Error])
def create_profile(
    profile: ProfileIn,
    response: Response,
    repo: ProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    profile_id = repo.get_profile_id_by_user_account(user_account_id)
    if profile_id is None:
        return repo.create(user_account_id, profile)
    else:
        return {"Error": "Only one profile per account allowed."}


@router.get("/profile", response_model=Union[List[ProfileOutCreation], Error])
def get_all_profiles(
    repo: ProfileRepository = Depends(),
):
    return repo.get_all()


@router.get("/profile/{profile_id}", response_model=Optional[ProfileOut])
def get_one_profile(
    profile_id: int,
    response: Response,
    repo: ProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ProfileOut:
    profile = repo.get_one(profile_id)
    return profile


@router.get(
    "/profile/{profile_id}/interests",
    response_model=Union[JunctionsOut, Error],
)
def get_user_profile_interests(
    profile_id: int,
    repo: ProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    records = repo.get_interests_user_profile(profile_id)
    print(records)
    return {"interests": records}


@router.post(
    "/profile/interests", response_model=Union[ProfileInterestOut, Error]
)
def create_user_profile_interest(
    profile_interest: ProfileInterestIn,
    response: Response,
    repo: ProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    return repo.create_user_profile_interest(profile_interest, user_account_id)


@router.get(
    "/database_interest_junctions",
    response_model=Union[List[ProfileInterestOut], Error],
)
def get_all_interest_junctions(repo: ProfileRepository = Depends()):
    return repo.get_all_interest_junctions()


@router.delete("/profile/interests/{junction_id}", response_model=bool)
def delete_user_profile_interest(
    junction_id: int,
    response: Response,
    repo: ProfileRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    profile_id = repo.get_profile_id_by_user_account(user_account_id)

    if profile_id:
        user_interests = repo.get_interests_user_profile(profile_id)
        list_user_interests = [
            interest["user_profile_interest_id"] for interest in user_interests
        ]

        if junction_id in list_user_interests:
            return repo.delete_interests_profile_junction(junction_id)
        else:
            return {"error": "Relational ID does not exist"}
    else:
        return {"error": "Profile not found"}
