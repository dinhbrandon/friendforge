from fastapi.testclient import TestClient
from main import app
from queries.account_type import AccountTypeRepository

client = TestClient(app)


class EmptyAccountTypeRepository:
    def get_all(self):
        return []

class CreateAccountTypeRepository:
    def create(self, type):
        result = {
            "id": 1,
            "name": "Admin"
        }
        result.update(type)
        return result

def test_get_all_account_types():
    app.dependency_overrides[AccountTypeRepository] = EmptyAccountTypeRepository
    response = client.get("/account_types")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []
