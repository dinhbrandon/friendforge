from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class GroupIn(BaseModel):
    focus_id: int
    name: str
    icon_photo: str
    chatroom_id: str


class GroupOut(BaseModel):
    id: int
    focus_id: int
    name: str
    icon_photo: str
    chatroom_id: str


class GroupUpdateIn(BaseModel):
    name: str
    icon_photo: str


class GroupRepository:
    # def get_groups(self) -> Union[Error, List[GroupOut]]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT id, focus_id, name, icon_photo, user_profile, chatroom_id
    #                     from groups
    #                     ORDER BY id;
    #                     """
    #                 )
    #                 return [
    #                     GroupOut(
    #                         id=record[0],
    #                         focus_id=record[1],
    #                         name=record[2],
    #                         icon_photo=record[3],
    #                         user_profile=record[4],
    #                         chatroom_id=record[5],
    #                     )
    #                     for record in db
    #                 ]
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not get groups"}
    def update(self, group_id) -> Union[GroupUpdateIn, Error]:
        

    def create(self, group: GroupIn) -> GroupOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO groups (
                            focus_id,
                            name,
                            icon_photo,
                            chatroom_id
                        )
                        VALUES (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            group.focus_id,
                            group.name,
                            group.icon_photo,
                            group.chatroom_id,
                        ]
                    )
                    print("testing")
                    id = result.fetchone()[0]
                    return self.group_in_to_out(id, group)
        except Exception as e:
            print(e)
            return {"message": "could not create group"}

    def group_in_to_out(self, id: int, group: GroupIn):
        old_data = group.dict()
        return GroupOut(id=id, **old_data)
