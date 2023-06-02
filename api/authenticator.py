import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.user_account import (
    UserAccountQueries,
    UserAccountOut,
    UserAccountOutWithPassword,
)


class AccountAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: UserAccountQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get_one(email)

    def get_account_getter(
        self,
        accounts: UserAccountQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: UserAccountOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: UserAccountOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.email, UserAccountOut(**account.dict())


authenticator = AccountAuthenticator(os.environ["SIGNING_KEY"])
