from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class GroupIn(BaseModel):
    focus_id: int


class GroupOut(BaseModel):
    id: int
    focus_id: int

class GroupOutWithAll(BaseModel):
    id: int
    focus_id: int
    name: str
    icon_photo: str
    chatroom_id: str

class GroupUpdateIn(BaseModel):
    name: str
    icon_photo: str


class GroupMemberIn(BaseModel):
    group_id: int


class GroupMemberOut(BaseModel):
    id: int
    group_id: int
    user_profile_id: int

class GroupRepository:
    def get_groups(self) -> Union[Error, List[GroupOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, focus_id
                        FROM groups
                        ORDER BY id;
                        """
                    )
                    return [
                        GroupOut(
                            id=record[0],
                            focus_id=record[1],
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
    #         return {"message": "Could not get groups"}

    # def get_one_group(self, group_id):
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     SELECT id, focus_id, name, icon_photo, chatroom_id
    #                     FROM groups
    #                     WHERE id = %s
    #                     """,
    #                     [group_id]
    #                 )

    def get_members_in_group(self, group_id: int, user_account_id: int):
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT user_profile.id, user_profile.first_name, pig.id
                    FROM user_profile
                    JOIN user_account AS UA profiles_in_group pig ON(user_profile.id = pig.user_profile_id)
                    WHERE pig.group_id = %s
                    """,
                    [group_id]
                )

                members = []
                rows = db.fetchall()
                for row in rows:
                    member = {
                        "id": row[0],
                        "first_name": row[1],
                    }
                    members.append(member)
                return members

    def update(self, group_id, group: GroupIn) -> Union[GroupUpdateIn, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE groups
                        SET name = %s, icon_photo = %s
                        WHERE group_id = %s
                        RETURNING id, group_id
                        """,
                        [
                            group.name,
                            group.icon_photo,
                            group_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.group_in_to_out(id, group_id, group)
        except Exception as e:
            print(e)

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
                        ]
                    )
                    print("testing")
                    id = result.fetchone()[0]
                    return self.group_in_to_out(id, group)
        except Exception as e:
            print(e)
            return {"message": "could not create group"}

    def create_group_member(self, group_member: GroupMemberIn, user_account_id: int) -> GroupMemberOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        FROM user_profile
                        WHERE user_account_id = %s
                        """,
                        [user_account_id]
                    )
                    profile_id = result.fetchone()[0]
                    print(profile_id)

                    result = db.execute(
                        """
                        SELECT profile.id, pig.id
                        FROM user_profile profile
                        JOIN profiles_in_group pig ON(profile.id = pig.user_profile_id)
                        WHERE pig.user_profile_id = %s
                        """,
                        [profile_id]
                    )
                    # print("print result:", result.fetchall())
                    # relational_id = result.fetchone()[1]
                    row = result.fetchone()
                    if row is not None and row[1] is not None:
                        return {"message": "You're already in this group"}

                    result = db.execute(
                        """
                        INSERT INTO profiles_in_group (
                            group_id, user_profile_id
                        )
                        VALUES (%s, %s)
                        RETURNING id
                        """,
                        [
                            group_member.group_id,
                            profile_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.group_member_in_to_out(id, profile_id, group_member)
                    # print(group_info)

        except Exception as e:
            print(e)
            return {"message": "could not add group member"}

    def group_member_in_to_out(self, id: int, profile_id: int, group_member: GroupMemberIn):
        old_data = group_member.dict()
        return GroupMemberOut(id=id, user_profile_id=profile_id, **old_data)

    def group_in_to_out(self, id: int, group: GroupIn):
        old_data = group.dict()
        return GroupOut(id=id, **old_data)
