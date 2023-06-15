from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List
from queries.response_types import Error
from queries.groups import (
    GroupIn,
    GroupOut,
    GroupRepository,
    GroupUpdateIn,
    GroupUpdateOut,
    GroupMemberIn,
    GroupMemberOut,
    SingleGroupOut,
)

router = APIRouter()


@router.post("/forge")
def enter_forge(
    focus_id: int,
    response: Response,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_account_id = account_data["id"]
    return repo.forge(int(focus_id), user_account_id)


@router.get("/match_strength")
def get_match_strength(
        user_profile_id_1: int,
        user_profile_id_2: int,
        repo: GroupRepository = Depends(),
        account_data: dict = Depends(authenticator.get_current_account_data),

):
    return repo.get_match_percentage(user_profile_id_1, user_profile_id_2)


@router.get("/interest_vector")
def get_user_interest_vector(
    user_profile_id=None,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.generate_user_interest_vector(user_profile_id)


@router.get("/groups", response_model=Union[List[SingleGroupOut], Error])
def get_groups(
    repo: GroupRepository = Depends(),
):
    return repo.get_groups()


@router.post("/groups", response_model=Union[GroupOut, Error])
def create_group(
    focus: GroupIn,
    response: Response,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.create(focus)


@router.delete(
    "/groups/{group_id}/members/{profile_id}",
    response_model=Union[bool, Error],
)
def remove_member(
    group_id: int,
    profile_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_member(group_id, profile_id)


@router.delete("/groups/{group_id}", response_model=Union[bool, Error])
def delete_group(
    group_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(group_id)


@router.put("/groups/{group_id}", response_model=Union[GroupUpdateOut, Error])
def edit_group(
    group_id: int,
    group: GroupUpdateIn,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    # group_id = ["id"]
    return repo.update(group_id, group)


@router.get("/groups/{group_id}", response_model=Union[SingleGroupOut, Error])
def get_one(
    group_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
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


# Figure out how to accept a response model, list is not working
@router.get("/profile/{profile_id}/groups")
def get_user_profile_groups(
    profile_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_profile_groups(profile_id)


# FORGE ALGORITHM
# 1. Create a dictionary or a map to represent the staging pool.
#    - The key would be the group focus.
#    - The value would be a list of users interested in that group focus.

# 2. When a user wants to join a group with a specific focus:
#    - Check if the group focus exists in the staging pool.
#      - If it exists, add the user to the corresponding list.
#      - If it doesn't exist, create a new key in
# the staging pool with the group focus and add the user to that list.

# 3. Dynamically form groups based on compatibility metrics:
#    - While there are users in the staging pool:
#      - Iterate through the staging pool and select the group focus with
# the highest number of users.
#      - Retrieve the list of users for that group focus.
#      - Sort the users in the list based on a compatibility metric
# (e.g., cosine similarity) with the user who
# initiated the match-making system.
#      - Form a group with the user who initiated the match-making system and
# the users with the highest compatibility scores.
#      - Remove the formed group members from the staging pool.

# 4. If the group is not full, fill it with remaining users:
#    - Retrieve the remaining users in the staging pool.
#    - Sort the remaining users based on the compatibility
# metric with the user who initiated the match-making system.
#    - Add the remaining users to the group until it
# reaches the maximum capacity.
#    - Remove the added users from the staging pool.

# 5. Repeat the process to form additional groups if needed.

# 6. Update the staging pool dynamically:
#    - Allow users to leave the staging pool or change their group focus.
#    - When a user leaves the staging pool, remove
# them from the corresponding group focus list.
#    - When a user changes their group focus, move them
# from the previous group focus list to the new group focus list.

# 7. Continuously evaluate and adjust group compositions:
#    - Periodically re-evaluate the compatibility
# metrics and adjust group compositions if necessary.
#    - Consider factors like new user additions,
# user departures, or changes in user preferences.

# 8. Output the final formed groups.
