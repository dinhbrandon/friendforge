<!--
*Before merging your merge request, be sure that the follow steps have been followed:*

1. Your merge request is up-to-date with main
2. You've selected "Squash and merge" option as the merge method
3. Review merge commit message and remove unnecessary lines
4. If you are fixing a gitlab issue, make sure you have linked the issue that this MR addresses
-->

## Dev Summary

<!--
  A detailed outline of what this commit includes, such as:
  - benefits to user/product side
  - why you architected your code this way, what other options there were and why this is best
  - the big picture of what changes you made
-->

## Test Plan

<!--
A test plan that you followed to confirm this commit works as intended, and
that it does not break any existing changes.

You should include screenshots to help the reviewer understand what to look for when visual
changes are includes. GIFs help immensely when explaining interactions and animations.

FE repro steps example:

1. localhost:3000 (or the initial page your test starts on)
2. click X button
   before: A happened
   now: B happens

Screenshot or Gif:
(put screenshot here)

BE repro steps example:

1. hit endpoint with postman, localhost:8000/docs page, or curl request like
```
curl -X POST localhost:8000/api/users \
-H "Content-Type: application/json" \
-d '{ "firstName": "test", "lastName": "1", "password": "test", "email": "test1@test.com" }'
```

2. expect response like (without password):
```
{ "firstName": "test", "lastName": "1", "email": "test1@test.com" }
```

-->

## Resources

<!--
  you will not be the last one to touch this code!
  please leave any relevant articles, youtube videos, etc. here for anyone who comes back to this MR looking for tips
-->

- [stackoverflow is cool](stackoverflow.com)
