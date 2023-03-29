## Dev Summary

In this MR I'm adding the following functionality:

- i.e. a backend endpoint
  - and how this benefits our product
  - yes this may be restating the issue a little bit

I made the following changes:

- list your high level changes here
  - and the why

## Test Plan

For these frontend changes, please follow the below steps to ensure my code works:

1. localhost:3000 (or the initial page your test starts on)
2. click X button

   before: X was broken

   now: X works

Screenshots or working page:

(put screenshot here)

For these backend changes, please follow the below steps to ensure my code works:

1. hit endpoint with postman, localhost:8000/docs page, or curl request like

```
curl -X POST localhost:8000/api/users \
-H "Content-Type: application/json" \
-d '{ "firstName": "test", "lastName": "1", "password": "test", "email": "test1@test.com" }'
```

2. expect successful response (without password) like below:

```
{ "firstName": "test", "lastName": "1", "email": "test1@test.com" }
```

## Resources

- [add links to articles/youtubes/etc. you used to complete your task](stackoverflow.com)

## This MR is ready to submit because:

- [ ] It is up-to-date with main
- [ ] The "Squash and merge" option is selected
- [ ] I have removed any commented or unused code
- [ ] The gitlab issue is linked to this MR
