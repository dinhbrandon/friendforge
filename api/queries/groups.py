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
    name: Optional[str]
    icon_photo: Optional[str]
    chatroom_id: Optional[str]

class SingleGroupOut(BaseModel):
    id: int
    focus_id: int
    name: Optional[str]
    icon_photo: Optional[str]
    chatroom_id: Optional[str]
    members: Optional[list]

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
    def get_groups(self) -> Union[Error, List[GroupOutWithAll]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, focus_id, name, icon_photo, chatroom_id
                        FROM groups
                        ORDER BY id;
                        """
                    )

                    return [
                        GroupOutWithAll(
                            id=record[0],
                            focus_id=record[1],
                            name = record[2],
                            icon_photo = record[3],
                            chatroom_id = record[4],
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not get groups"}

    def get_one_group(self, group_id) -> SingleGroupOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, focus_id, name, icon_photo, chatroom_id
                        FROM groups
                        WHERE id = %s
                        """,
                        [group_id]
                    )

                    group_members = self.get_members_in_group(group_id)

                    members = []
                    for member in group_members:
                        members.append(member)


                    rows = result.fetchall()
                    for row in rows:
                        group_info = {
                            "id": row[0],
                            "focus_id": row[1],
                            "name": row[2],
                            "icon_photo": row[3],
                            "chatroom_id": row[4],
                            "members": members
                        }

                    return group_info
    
        except Exception as e:
            print(e)
            return {"message": "Could not get group"}

    def get_members_in_group(self, group_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:

                    result = db.execute(
                        """
                        SELECT pig.user_profile_id
                        FROM profiles_in_group AS pig
                        JOIN user_profile ON (pig.user_profile_id = user_profile.id)
                        WHERE pig.group_id = %s
                        """,
                        [group_id]
                        # search PIG from group ID -> return user_profiles
                    )
                    
                    members = []
                    rows = result.fetchall()
                

                    for row in rows:
                        member = {
                            "profile_id": row[0],
                            # "profile_photo": row[1],
                            # "first_name": row[2],
                        }
                        members.append(member["profile_id"])
                
                    
                    for member in members:
                        result = db.execute(
                        """
                        SELECT UP.id, UP.profile_photo, UA.first_name, pig.id
                        FROM user_profile AS UP
                        JOIN user_account UA ON (UP.user_account_id = UA.id)
                        JOIN profiles_in_group pig ON (UP.id = pig.user_profile_id)
                        WHERE pig.group_id = %s
                        """,
                        [group_id]
                    )
                    
                    group_member_info_list = []
                    rows = result.fetchall()
                    for row in rows:
                        group_member_info = {
                            "id": row[0],
                            "profile_url": row[1],
                            "first_name": row[2],
                            "relational_id": row[3] 
                        }
                        group_member_info_list.append(group_member_info)
                    
                    return group_member_info_list
        except Exception as e:
            print(e)
            return {"message": "Could not get members"}
    
            
    def get_profile_groups(self, profile_id: int):
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
                        [profile_id]
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

                    result = db.execute(
                        """
                        SELECT profile.id, pig.id, pig.group_id
                        FROM user_profile profile
                        JOIN profiles_in_group pig ON(profile.id = pig.user_profile_id)
                        WHERE pig.user_profile_id = %s
                        """,
                        [profile_id]
                    )
                    groups = []
                    rows = result.fetchall()
                    for row in rows:
                        groups.append(row[2])

                    if group_member.group_id in groups:
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

        except Exception as e:
            print(e)
            return {"message": "could not add group member"}

    def group_member_in_to_out(self, id: int, profile_id: int, group_member: GroupMemberIn):
        old_data = group_member.dict()
        return GroupMemberOut(id=id, user_profile_id=profile_id, **old_data)

    def group_in_to_out(self, id: int, group: GroupIn):
        old_data = group.dict()
        return GroupOut(id=id, **old_data)
