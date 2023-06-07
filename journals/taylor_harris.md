## 5/16/2023

-   getting the base layout of the header and footers done
-   getting the browser router set up and working
-   building out custom CSS
-   creating directories of screens and components to make things more orginized

## 5/22/2023

-   got some more react pages done
-   looking into starting to use redux

tomarrow i will:

-   finish issue #11 and push
-   implent redux

## 5/23/2023

-   worked on front end auth, users are able to log in and log out, started the sign up portion
-   we are not doing redux for now, will look into it later. just wanted to work with the JWTdown and not try to mess with it and react.

## 5/24/2023

-   finished front end auth, merged with main
-   started new issue for user profile form.
-   ran into some state bugs in some edge cases, i think i need to restucter the state management a little and the home page and think this will solve the problem automaticlly

## 5/25/2023

-   reworked our front end to use tailwind and daisyUI for a more seemless look
-   finished the create profile AND the add interests to a profile.

## 5/26/2023

-   big AH-HA! around making a post for each single interest. this way we dont have to rework out backend and i was able to just take care of it on the front end.
-   created useUser funcation to use the account data

## 5/29/2023

-   created a useProfile funcation that will connect a users account to their profile so we can use that data on the front end! this was a big ah-ha!

## 6/1/2023

-   backend websockets stuff for the messages
-   account type model
-   lots of AH-HA! moments getting websocket stuff to work but also create data in our database. this was a whole team putting their brains together level of colab.

## 6/5/2023

-   got websockets to connect on the front end!!!
-   some weird things with it and the data that comes in, but will keep poking at that.
-   want to make more endpoints for the messages so i can work with them better
