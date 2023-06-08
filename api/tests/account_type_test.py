from fastapi.testclient import TestClient
from main import app
from queries.account_type import AccountTypeRepository

client = TestClient(app)


class EmptyTypeRepository:
    def get_account_type(self):
        return []


def test_get_account_type():
    app.dependency_overrides[AccountTypeRepository] = (EmptyTypeRepository)
    response = client.get("/account_type")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []
