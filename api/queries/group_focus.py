from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class GroupFocusIn(BaseModel):
    name: str


class GroupFocusOut(BaseModel):
    id: int
    name: str


class GroupFocusRepository:
    def get_one(self, group_focus_id: int) -> Optional[GroupFocusOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , name
                        FROM group_focus
                        WHERE id = %s
                        """,
                        [group_focus_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_group_focus_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that group focus"}

    def delete(self, group_focus_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM group_focus
                        WHERE id = %s
                        """,
                        [group_focus_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, group_focus_id: int, focus: GroupFocusIn
    ) -> Union[GroupFocusOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE group_focus
                        SET name = %s
                        WHERE id = %s
                        """,
                        [focus.name, group_focus_id],
                    )
                    return self.group_focus_in_to_out(group_focus_id, focus)
        except Exception as e:
            print(e)
            return {"message": "Could not update group focus"}

    def get_group_focus(self) -> Union[Error, List[GroupFocusOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name
                        from group_focus
                        ORDER BY id;
                        """
                    )
                    return [
                        GroupFocusOut(
                            id=record[0],
                            name=record[1],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all groups"}

    def create(self, focus: GroupFocusIn) -> GroupFocusOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO group_focus
                            (name)
                        VALUES
                            (%s)
                        RETURNING id;
                        """,
                        [focus.name],
                    )
                    id = result.fetchone()[0]
                    # old_data = focus.dict()
                    # return GroupFocusOut(id=id, **old_data)
                    return self.group_focus_in_to_out(id, focus)
        except Exception:
            return {"message": "Create did not work"}

    def group_focus_in_to_out(self, id: int, focus: GroupFocusIn):
        old_data = focus.dict()
        return GroupFocusOut(id=id, **old_data)

    def record_to_group_focus_out(self, record):
        return GroupFocusOut(
            id=record[0],
            name=record[1],
        )
