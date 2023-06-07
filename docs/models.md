# Models

## Interests
| name | type               |          |
|------|--------------------|----------|
| id   | serial primary key | not null |
| name | varchar            | not null |

## Group Focus
| name | type               |          |
|------|--------------------|----------|
| id   | serial primary key | not null |
| name | varchar            | not null |

## Account Type
| name | type               |          |
|------|--------------------|----------|
| id   | serial primary key | not null |
| name | varchar            | not null |

## User Account
| name            | type               |          |                             |
|-----------------|--------------------|----------|-----------------------------|
| id              | serial primary key | not null |                             |
| email           | varchar            | not null | unique                      |
| username        | varchar            | not null | unique                      |
| password        | varchar            | not null |                             |
| date_of_birth   | varchar            | not null |                             |
| first_name      | varchar            | not null |                             |
| last_name       | varchar            | not null |                             |
| phone_number    | varchar            | not null | unique                      |
| account_type_id | integer            | not null | references account_type(id) |

## User Profile
| name            | type               |          |                             |
|-----------------|--------------------|----------|-----------------------------|
| id              | serial primary key | not null |                             |
| about_me        | varchar            | not null |                             |
| profile_photo   | varchar            | not null |                             |
| location        | varchar            | not null |                             |
| user_account_id | integer            | not null | references user_account(id) |

## User Profile Interests
| name            | type               |          |                             |
|-----------------|--------------------|----------|-----------------------------|
| id              | serial primary key | not null |                             |
| user_profile_id | integer            | not null | references user_profile(id) |
| interest_id     | integer            | not null | references interests(id)    |

## Groups
| name        | type               |          |                            |
|-------------|--------------------|----------|----------------------------|
| id          | serial primary key | not null |                            |
| focus_id    | integer            | not null | references group_focus(id) |
| name        | varchar            | null     |                            |
| icon_photo  | text               | null     |                            |
| chatroom_id | text               | null     |                            |

## Profiles in Group
| name            | type               |          |                             |
|-----------------|--------------------|----------|-----------------------------|
| id              | serial primary key | not null |                             |
| user_profile_id | integer            | not null | references user_profile(id) |
| group_id        | integer            | not null | references groups(id)       |

## Messages
| name       | type               |          |                             |
|------------|--------------------|----------|-----------------------------|
| id         | serial primary key | not null |                             |
| profile_id | integer            | not null | references user_profile(id) |
| group_id   | integer            | not null | references groups(id)       |
| content    | varchar            | not null |                             |
