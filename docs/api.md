# API Endpoints

## Interests

- `/interests`
    - `GET`, `POST`
- `/interests/{interest_id}`
    - `GET`, `POST`

The input includes name and the output includes the name and the id of the new interest. Admin accounts are able to create new interests and view a list of all interests.

Input:
`
{
  "name": string
}
`

Output:
`
{
  "id": int,
  "name": string
}
`

## Group Focus

- `/group_focus`
    - `GET`, `POST`
- `/group_focus/{group_focus_id}`
    - `GET`, `PUT`, `DELETE`

The input includes the focus name and the output includes the name and the id of the new focus. Admin accounts are able to create new group focuses and view a list of all focuses.

Input:
`
{
  "name": string
}
`

Output:
`
{
  "id": int,
  "name": string
}
`

## Account Type

- `/account_type`
    - `GET`, `POST`
- `/account_type/{account_type_id}`
    - `GET`, `DELETE`

The input includes the account type and the output includes the type and the id of the new type.

Input:
`
{
  "type": string
}
`

Output:
`
{
  "id": int,
  "type": string
}
`

## User Accounts
- `/users`
    - `GET`, `POST`
- `/users/{user_id}`
    - `GET`, `DELETE`

After inputting user account information, the output will include all fields plus authorization information and id.

Input:
`
{
  "email": string,
  "username": string,
  "password": string,
  "date_of_birth": string,
  "first_name": string,
  "last_name": string,
  "phone_number": string,
  "account_type_id": int
}
`

Output:
`
{
  "access_token": string,
  "token_type": Bearer,
  "account": {
    "id": int,
    "email": string,
    "username": string,
    "date_of_birth": string,
    "first_name": string,
    "last_name": string,
    "phone_number": string,
    "account_type_id": int
  }
}
`

## User Profile

- `/profile`
    - `GET`, `POST`
- `/profile/{profile_id}`
    - `GET`, `DELETE`

All input fields are returned in the profile output in addition to the user's account id as a foreign key and an id.

Input:
`
{
  "about_me": string,
  "profile_photo": string,
  "location": string
}
`

Output:
`
{
  "id": int,
  "about_me": string,
  "profile_photo": string,
  "location": string,
  "user_account_id": int
}
`

## User Profile Interests

- `/profile/interests`
    - `POST`
- `/profile/{profile_id}/interests`
    - `GET`, `DELETE`

The input is an interest_id and the output inludes interest_id, the signed in user's user_profile_id, and the id of this association between the two.

Input:
`
{
  "interest_id": int
}
`

Output:
`
{
  "id": int,
  "user_profile_id": int,
  "interest_id": int
}
`

## Groups
- `/groups`
    - `GET`, `POST`
- `/groups/{group_id}`
    - `GET`, `PUT`, `DELETE`

The input is a focus_id and the id of the group created.

Input:
`
{
  "focus_id": int
}
`

Output:
`
{
  "group_id": int,
  "focus_id": int
}
`

## Profiles in Group
- `/group/member`
    - `POST`
- `/group/{group_id}/members`
    - `GET`
- `/profile/{profile_id}/groups`
    - `GET`

The input is a group_id and the output inludes group_id, the signed in user's user_profile_id, and the id of this association between the two.

Input:
`
{
  "group_id": int
}
`

Output:
`
{
  "id": int,
  "group_id": int,
  "user_profile_id": int
}
`

## Forge
- `/forge`
    - `POST`

The input is a focus_id and since a member is being added to a group, the output is the same as a 'post' to profiles in group.

Input:
`
{
  "focus_id": int
}
`
Output:
`
{
  "id": int,
  "group_id": int,
  "user_profile_id": int
}
`

## Messages
- `/messages`
    - `POST`
- `/messages/{group_id}`
    - `GET`
Input:
`
{
  "content": string,
  "user_profile_id": int,
  "group_id": int
}
`

Output:
`
{
  "id": int,
  "content": string,
  "user_profile_id": int,
  "group_id": int
}
`
