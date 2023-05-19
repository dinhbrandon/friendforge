from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class InterestIn(BaseModel):
    name: str

class InterestOut(BaseModel):
    id: int
    name: str

class InterestsOut(BaseModel):
    interests: list[InterestOut]


class InterestRepository:
    def create(self, interest: InterestIn) -> InterestOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO interests
                            (name)
                        VALUES
                            (%s)
                        RETURNING id;
                        """,
                        [
                            interest.name
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.interest_in_to_out(id, interest)
        except Exception as e:
            print(e)
            return {"message": "Could not create interest"}

    def get_all(self) -> Union[Error, List[InterestOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name
                        FROM interests
                        """
                    )
                    return [
                        InterestOut(
                        id=record[0],
                        name=record[1]
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not get all interests"}

    def update(self, interest_id: int, interest: InterestIn) -> Union[InterestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE interests
                        SET name = %s
                        WHERE id = %s
                        """,
                        [
                            interest.name,
                            interest_id
                        ]
                    )
                    return self.interest_in_to_out(interest_id, interest)
        except Exception:
            return {"message": "Could not update interest"}

    def delete(self, interest_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM interests
                        WHERE id = %s
                        """,
                        [interest_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_one(self, interest_id: int) -> Optional[InterestOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name
                        FROM interests
                        WHERE id = %s
                        """,
                        [interest_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return InterestOut(
                        id=record[0],
                        name=record[1]
                    )

        except Exception as e:
            return {"message": "Could not get interest"}


    def interest_in_to_out(self, id: int, interest: InterestIn):
        old_data = interest.dict()
        return InterestOut(id=id, **old_data)
