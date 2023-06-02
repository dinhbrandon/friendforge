from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class AccountTypeIn(BaseModel):
    type: str


class AccountTypeOut(BaseModel):
    id: int
    type: str


class AccountTypeRepository:
    def get_one(self, account_type_id: int) -> Optional[AccountTypeOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            SELECT id
              , type
            FROM account_type
            WHERE id = %s
            """,
                        [account_type_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_type_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account type"}

    def delete(self, account_type_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
            DELETE FROM account_type
            WHERE id = %s
            """,
                        [account_type_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_account_type(self) -> Union[Error, List[AccountTypeOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            SELECT id, type
            FROM account_type
            ORDER BY id;
            """
                    )
                    return [
                        AccountTypeOut(id=record[0], type=record[1])
                        for record in result.fetchall()
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all account types"}

    def create(self, type: AccountTypeIn) -> AccountTypeOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            INSERT INTO account_type (type)
            VALUES (%s)
            RETURNING id;
            """,
                        [type.type],
                    )
                    id = result.fetchone()[0]
                    return self.account_type_in_to_out(id, type)
        except Exception as e:
            print(e)
            return {"message": "Could not create account type"}

    def account_type_in_to_out(self, id: int, type: AccountTypeIn):
        old_data = type.dict()
        return AccountTypeOut(id=id, **old_data)

    def record_to_account_type_out(self, record):
        return AccountTypeOut(id=record[0], type=record[1])
