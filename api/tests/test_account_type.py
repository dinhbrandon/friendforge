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


class EmptyOneRepository:
    def get_one(self, account_type_id):
        return {"id": account_type_id, "type": "Type"}


def test_get_one_type():
    app.dependency_overrides[AccountTypeRepository] = EmptyOneRepository
    account_type_id = 1
    response = client.get(f"/account_type/{account_type_id}")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"id": account_type_id, "type": "Type"}
