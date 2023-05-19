from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.user_profile import ProfileIn, ProfileOut, ProfileRepository, Error, ProfileInterestIn, ProfileInterestOut
from queries.interests import InterestsOut, InterestRepository, Error

router = APIRouter(prefix="/api")

@router.post("/profile", response_model=Union[ProfileOut, Error])
def create_profile(
    profile: ProfileIn,
    response: Response,
    repo: ProfileRepository = Depends()
):
    return repo.create(profile)

@router.get("/profile/{profile_id}", response_model=Optional[ProfileOut])
def get_one_profile(
    profile_id: int,
    response: Response,
    repo: ProfileRepository = Depends()
) -> ProfileOut:
    profile = repo.get_one(profile_id)
    return profile

@router.get("/profile/{profile_id}/interests", response_model=Union[InterestsOut, Error])
def get_user_profile_interests(
    profile_id: int,
    repo: ProfileRepository = Depends(),
):
    records = repo.get_interests_user_profile(profile_id)
    return {"interests": records}

@router.post("/profile/interests", response_model=Union[ProfileInterestOut, Error])
def create_user_profile_interest(
    profile_interest: ProfileInterestIn,
    response: Response,
    repo: ProfileRepository = Depends()
):
    return repo.create_user_profile_interest(profile_interest)
