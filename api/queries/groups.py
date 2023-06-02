from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional
from queries.interests import InterestRepository
import numpy as np


class Error(BaseModel):
    message: str


class ProfileOut(BaseModel):
    id: int
    profile_photo: Optional[str]
    first_name: str
    relational_id: int


class GroupIn(BaseModel):
    focus_id: int


class GroupOut(BaseModel):
    group_id: int
    focus_id: int


class SingleGroupOut(BaseModel):
    id: int
    focus_id: int
    focus: str
    name: Optional[str]
    icon_photo: Optional[str]
    chatroom_id: Optional[str]
    members: Optional[list]
    number_of_members: Optional[int]


class GroupUpdateIn(BaseModel):
    name: str
    icon_photo: str


class GroupUpdateOut(BaseModel):
    id: int
    name: Optional[str]
    icon_photo: Optional[str]


class GroupMemberIn(BaseModel):
    group_id: int


class GroupMemberOut(BaseModel):
    id: int
    group_id: int
    user_profile_id: int


class GroupRepository:
    def generate_interest_vector(self, user_interests, all_interests):
        vector = np.zeros(len(all_interests), dtype=int)
        for i, interest in enumerate(all_interests):
            if interest.id in user_interests:
                vector[i] = 1
        return vector.tolist()

    def generate_user_interest_vector(self, user_profile_id):
        interest_repo = InterestRepository()
        all_interests = interest_repo.get_all()

        # only for if we want to use logged in user
        # profile_repo = ProfileRepository()
        # user_profile_id =
        # profile_repo.get_profile_id_by_user_account(user_account_id)
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT user_profile_id, interest_id
                        FROM user_profile_interests
                        WHERE user_profile_id = %s;
                        """,
                        [user_profile_id],
                    )
                    result = db.fetchall()
                    user_interests = [record[1] for record in result]
                    interest_array = self.generate_interest_vector(
                        user_interests, all_interests
                    )
                    vector = {user_profile_id: interest_array}

                    return vector
        except Exception as e:
            print(e)
            return {"message": "Could not generate interest vector for user."}

    def delete_member(self, group_id: int, profile_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT pig.user_profile_id
                        FROM profiles_in_group AS pig
                        JOIN user_profile ON
                        (pig.user_profile_id = user_profile.id)
                        WHERE pig.group_id = %s
                        """,
                        [group_id],
                    )
                    rows = db.fetchall()
                    members = [row[0] for row in rows]
                    print(members)

                    if profile_id in members:
                        db.execute(
                            """
                        DELETE FROM profiles_in_group
                        WHERE group_id = %s AND user_profile_id = %s
                        """,
                            [group_id, profile_id],
                        )
                        return True
                    return {"message": "Member not found in group"}

        except Exception as e:
            print(e)
            return {"message": "Issue with given group ID or profile ID."}

    def delete(self, group_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    rows = db.execute(
                        """
                        DELETE FROM groups
                        WHERE id = %s
                        """,
                        [group_id],
                    )
                    return rows > 0
        except Exception as e:
            print(e)
            return {"message": "This group does not exist."}

    def get_groups(self) -> Union[Error, List[SingleGroupOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                        FROM groups
                        ORDER BY id;
                        """
                    )
                    result = db.fetchall()

                    return [self.get_one_group(record[0]) for record in result]

        except Exception as e:
            print(e)
            return {"message": "Could not get groups"}

    def get_one_group(self, group_id) -> SingleGroupOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT g.id, g.focus_id, gf.name,
                        g.name, g.icon_photo, g.chatroom_id
                        FROM groups g
                        JOIN group_focus gf ON gf.id = g.focus_id
                        WHERE g.id = %s
                        """,
                        [group_id],
                    )

                    group_members = self.get_members_in_group(group_id)

                    members = []

                    for member in group_members:
                        members.append(member)

                    num_members = len(members)

                    rows = result.fetchall()
                    for row in rows:
                        group_info = {
                            "id": row[0],
                            "focus_id": row[1],
                            "focus": row[2],
                            "name": row[3],
                            "icon_photo": row[4],
                            "chatroom_id": row[5],
                            "members": members,
                            "number_of_members": num_members,
                        }

                    return group_info

        except Exception as e:
            print(e)
            return {"message": "Could not get group"}

    def get_members_in_group(self, group_id: int) -> ProfileOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:

                    result = db.execute(
                        """
                        SELECT pig.user_profile_id
                        FROM profiles_in_group AS pig
                        JOIN user_profile ON
                        (pig.user_profile_id = user_profile.id)
                        WHERE pig.group_id = %s
                        """,
                        [group_id],
                    )
                    members = []
                    rows = result.fetchall()

                    for row in rows:
                        member = {
                            "profile_id": row[0],
                        }
                        members.append(member["profile_id"])

                    for member in members:
                        result = db.execute(
                            """
                        SELECT UP.id, UP.profile_photo, UA.first_name, pig.id
                        FROM user_profile AS UP
                        JOIN user_account UA ON (UP.user_account_id = UA.id)
                        JOIN profiles_in_group pig ON
                        (UP.id = pig.user_profile_id)
                        WHERE pig.group_id = %s
                        """,
                            [group_id],
                        )

                    group_member_info_list = []
                    rows = result.fetchall()
                    for row in rows:
                        group_member_info = {
                            "id": row[0],
                            "profile_photo": row[1],
                            "first_name": row[2],
                            "relational_id": row[3],
                        }
                        group_member_info_list.append(group_member_info)
                    return group_member_info_list
        except Exception as e:
            print(e)
            return {"message": "Could not get members"}

    def get_profile_groups(self, profile_id: int) -> GroupUpdateOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT G.id, G.name, G.icon_photo
                        FROM groups AS G
                        JOIN profiles_in_group pig ON (G.id = pig.group_id)
                        WHERE pig.user_profile_id = %s
                        """,
                        [profile_id],
                    )
                    groups = result.fetchall()
                    group_list = []
                    for group in groups:
                        group_info = {
                            "group_id": group[0],
                            "name": group[1],
                            "photo": group[2],
                        }
                        group_list.append(group_info)
                    return group_list
        except Exception as e:
            print(e)
            return {"message": "Could not get user's groups"}

    def update(self, group_id, group: GroupUpdateIn) -> GroupUpdateOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE groups
                        SET name = %s, icon_photo = %s
                        WHERE groups.id = %s
                        RETURNING id
                        """,
                        [group.name, group.icon_photo, group_id],
                    )
                    id = result.fetchone()[0]
                    old_data = group.dict()
                    return GroupUpdateOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update group"}

    def create(self, group: GroupIn) -> GroupOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO groups (
                            focus_id
                        )
                        VALUES (%s)
                        RETURNING id;
                        """,
                        [
                            group.focus_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    group_out = GroupOut(group_id=id, focus_id=group.focus_id)
                    return group_out

        except Exception as e:
            print(e)
            return {"message": "could not create group"}

    def create_group_member(
        self, group_member: GroupMemberIn, user_account_id: int
    ) -> GroupMemberOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        FROM user_profile
                        WHERE user_account_id = %s
                        """,
                        [user_account_id],
                    )
                    profile_id = result.fetchone()[0]

                    result = db.execute(
                        """
                        SELECT profile.id, pig.id, pig.group_id
                        FROM user_profile profile
                        JOIN profiles_in_group pig ON
                        (profile.id = pig.user_profile_id)
                        WHERE pig.user_profile_id = %s
                        """,
                        [profile_id],
                    )
                    groups = []
                    rows = result.fetchall()
                    for row in rows:
                        groups.append(row[2])

                    group_members = self.get_members_in_group(
                        group_member.group_id
                    )

                    if group_member.group_id in groups:
                        return {"message": "You're already in this group"}
                    elif len(group_members) >= 5:
                        return {"message": "This group is full"}

                    result = db.execute(
                        """
                        INSERT INTO profiles_in_group (
                            group_id, user_profile_id
                        )
                        VALUES (%s, %s)
                        RETURNING id
                        """,
                        [group_member.group_id, profile_id],
                    )
                    id = result.fetchone()[0]
                    return self.group_member_in_to_out(
                        id, profile_id, group_member
                    )

        except Exception as e:
            print(e)
            return {"message": "could not add group member"}

    def group_member_in_to_out(
        self, id: int, profile_id: int, group_member: GroupMemberIn
    ):
        old_data = group_member.dict()
        return GroupMemberOut(id=id, user_profile_id=profile_id, **old_data)

    # Commented out this method as we are setting
    # all response models inside of function
    # def group_in_to_out(self, id: int, group: GroupIn):
    #     old_data = group.dict()
    #     print(id, group)
    #     return GroupOut(id=id, **old_data)
