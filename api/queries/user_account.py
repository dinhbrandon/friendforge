from pydantic import BaseModel
from typing import List, Union
import re

# from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class UserAccountIn(BaseModel):
    email: str
    username: str
    password: str
    date_of_birth: str
    first_name: str
    last_name: str
    phone_number: str
    account_type_id: int


class UserAccountOut(BaseModel):
    id: int
    email: str
    username: str
    date_of_birth: str
    first_name: str
    last_name: str
    phone_number: str
    account_type_id: int


class UserAccountOutWithPassword(UserAccountOut):
    hashed_password: str


class UserAccountQueries:  # Queries should be a parameter
    def get_one(self, email: str) -> UserAccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                          , email
                          , username
                          , password
                          , date_of_birth
                          , first_name
                          , last_name
                          , phone_number
                          , account_type_id
                        FROM user_account
                        WHERE email = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def get_account_detail(self, id: int) -> UserAccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , email
                            , username
                            , password
                            , date_of_birth
                            , first_name
                            , last_name
                            , phone_number
                            , account_type_id
                        FROM user_account
                        WHERE id = %s
                        """,
                        [id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def delete(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM user_account
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_all(self) -> Union[Error, List[UserAccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, email, username, date_of_birth, first_name,
                        last_name, phone_number, account_type_id
                        FROM user_account
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_user_account_out_np(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all user accounts"}

    def create(
        self, user_account: UserAccountIn, hashed_password: str
    ) -> UserAccountOutWithPassword:
        try:
            # Validate email
            email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
            if not re.match(email_pattern, user_account.email):
                return {"message": "Invalid email format"}
            # Validate phone number
            phone_pattern = r'^\d{10}$'
            if not re.match(phone_pattern, user_account.phone_number):
                return {"message": "Invalid phone number format"}

            # Validate and format first and last names
            if (not user_account.first_name.isalpha() or
                    not user_account.last_name.isalpha()):
                return {"message": "Names should only contain letters"}
            formatted_first_name = user_account.first_name.capitalize()
            formatted_last_name = user_account.last_name.capitalize()

            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            INSERT INTO user_account
                                (email, username, password, date_of_birth,
                                first_name, last_name,
                                phone_number, account_type_id)
                            VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                            RETURNING id;
                            """,
                        [
                            user_account.email,
                            user_account.username,
                            hashed_password,
                            user_account.date_of_birth,
                            formatted_first_name,
                            formatted_last_name,
                            user_account.phone_number,
                            user_account.account_type_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.user_account_in_to_out(
                        id, user_account, hashed_password
                    )  # Should be UserAccountOutWithPassword?
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    # def update(self, user_id: int, user_account: UserAccountIn,
    # hashed_password: str) -> Union[UserAccountOut, Error]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     UPDATE user_account
    #                     SET email = %s
    #                     , password = %s
    #                     , first_name = %s
    #                     , last_name = %s
    #                     , phone_number = %s
    #                     WHERE id = %s
    #                     """,
    #                     [
    #                         user_account.email,
    #                         user_account.password,
    #                         user_account.first_name,
    #                         user_account.last_name,
    #                         user_account.phone_number,
    #                         user_id
    #                     ]
    #                 )
    #                 return self.user_account_in_to_out(user_id, user_account)

    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not update user account"}

    def user_account_in_to_out(
        self, id: int, user_account: UserAccountIn, hashed_password: str
    ):
        prev_data = user_account.dict()
        return UserAccountOutWithPassword(
            id=id, hashed_password=hashed_password, **prev_data
        )

    def record_to_user_account_out(self, record) -> UserAccountOutWithPassword:
        return UserAccountOutWithPassword(
            id=record[0],
            email=record[1],
            username=record[2],
            hashed_password=record[3],
            date_of_birth=record[4],
            first_name=record[5],
            last_name=record[6],
            phone_number=record[7],
            account_type_id=record[8],
        )

    def record_to_user_account_out_np(self, record) -> UserAccountOut:
        return UserAccountOut(
            id=record[0],
            email=record[1],
            username=record[2],
            date_of_birth=record[3],
            first_name=record[4],
            last_name=record[5],
            phone_number=record[6],
            account_type_id=record[7],
        )
