from fastapi.testclient import TestClient
from main import app
from queries.interests import InterestRepository

client = TestClient(app)


class EmptyInterestRepository:
    def get_all(self):
        return []


class CreateInterestRepository:
    def create(self, interest):
        result = {
            "id": 1,
            "name": "reading"
        }
        result.update(interest)
        return result


def test_get_all_interests():
    app.dependency_overrides[InterestRepository] = EmptyInterestRepository
    response = client.get("/interests")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_create_interest():
    app.dependency_overrides[InterestRepository] = CreateInterestRepository
    json = {
        "name": "Gaming"
    }
    expected = {
        "id": 1,
        "name": "Gaming"
    }

    response = client.post("/interests", json=json)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
