from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class GroupIn(BaseModel):
    focus: str
    name: str
    icon_photo: str
    user_profile: str
    chatroom: str


class GroupOut(BaseModel):
    id: int
    focus: str
    name: str
    icon_photo: str
    user_profile: str
    chatroom: str


class GroupRepository:
    def get_groups(self) -> Union[Error, List[GroupOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, focus, name, icon_photo, user_profile, chatroom
                        from groups
                        ORDER BY id;
                        """
                    )
                    return [
                        GroupOut(
                            id=record[0],
                            focus=record[1],
                            name=record[2],
                            icon_photo=record[3],
                            user_profile=record[4],
                            chatroom=record[4],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get groups"}
