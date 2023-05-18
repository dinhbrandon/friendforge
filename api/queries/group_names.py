from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class GroupNameIn(BaseModel):
    name: str

class GroupNameOut(BaseModel):
    id: int
    name: str


class GroupNameRepository:
    def create(self, group_name: GroupNameIn) -> GroupNameOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO group_names
                            (name)
                        VALUES
                            (%s)
                        RETURNING id;
                        """,
                        [
                            group_name.name
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.group_name_in_to_out(id, group_name)
        except Exception as e:
            print(e)
            return {"message": "Could not create group name"}

    def get_all(self) -> Union[Error, List[GroupNameOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name
                        FROM group_names
                        """
                    )
                    return [
                        GroupNameOut(
                        id=record[0],
                        name=record[1]
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not get all group names"}

    def update(self, group_name_id: int, group_name: GroupNameIn) -> Union[GroupNameOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE group_names
                        SET name = %s
                        WHERE id = %s
                        """,
                        [
                            group_name.name,
                            group_name_id
                        ]
                    )
                    return self.group_name_in_to_out(group_name_id, group_name)
        except Exception:
            return {"message": "Could not update group name"}

    def delete(self, group_name_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM group_names
                        WHERE id = %s
                        """,
                        [group_name_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_one(self, group_name_id: int) -> Optional[GroupNameOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name
                        FROM group_names
                        WHERE id = %s
                        """,
                        [group_name_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return GroupNameOut(
                        id=record[0],
                        name=record[1]
                    )

        except Exception as e:
            return {"message": "Could not get group name"}


    def group_name_in_to_out(self, id: int, group_name: GroupNameIn):
        old_data = group_name.dict()
        return GroupNameOut(id=id, **old_data)
