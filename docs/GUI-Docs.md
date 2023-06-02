## outline of the GUI directories

please check UB dictionary for terminology if needed
[UB Dictionary](https://hexxiin.notion.site/624f554d57a84517ad8e4637619fc0bd?v=1bba5ed4b00440df884372c51e11eacd)

### SRC

- components directory is where small reuable bits of code live. these are designed to be reuable in some capasity.
- screens directory is where all those reusaable components will be used to build out a screen
- index.css is the basicly styling of the layout components such as header, nav and footer. these are things that will be used on nearly every single page.

### Orginization

_Screens vs components?_

In short, "Screens" are react components, they are just the whole page a user will see, ie. the home page.

Screens have minimal code in most cases and are the final resting place for a whole part of the applicaitons components to live. For example the Home.js in screens has logic that checks if a user is logged in or not and renders a compleatly different home pager for a logged in user or a logged out user. It calls on components such as <HomeToken> depending on what the logic says to return.

The components folder is where all those components inside each screen is. these are orginized like with like for the most part. For exmaple, all components that directly tie to authorization like log in and sign up live inside the authorization folder.
