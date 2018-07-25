
Angelo De Laurentis under John Morton for Cal Poly ITS


This app was created with "create-react-app" a user friendly tool provided by react that takes care of much of the supporting code so that a developer really just focuses on developing business logic.

Every app created using "create-react-app" comes with a README.md I've renamed this auto-generated README file to "info.md" and it can be found in this directory.

info.md lays out the many, many features that create-react-app allows you to use.

This file contains my summary of the ways that my web-app uses some create-react-app features.



***BASICS YOU NEED TO KNOW ABOUT "create-react-app"***
For the project to build, **these files must exist with exact filenames**:

`public/index.html` is the page template.
`src/index.js` is the JavaScript entry point .


The project is sorted into 4 main categories.

First there's the root file of the whole protect. Files here are ignored by the scripts

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.

You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.

You can, however, create more top-level directories.
They will not be included in the production build so you can use them for things like documentation.


***other versions***
My project is a reimplementation of a website that was written completely in vanilla javascript that can be found here: "https://angelodel01.github.io/"

for more information on the actual goals of the content of the website read the README of this project located at: "https://github.com/angelodel01/angelodel01.github.io"

I also implemented this website using the react framework starting from scratch using cdn links instead of locally downloaded modules. It can be found here: "https://angelodel01.github.io/react-scratch/"

***react advantages***
The main advantage of the react framework for my case is that it takes care of much of the routing for the programmer. Opposed the vanilla javascript version of this website, which contained a much more confusing way of removing and replacing parts of the page all the while pushing different states to the history API to give the effect of navigating a website.

React takes care of much of this for the programmer. As you can see in my './src/App.js' using the react router the developer simply decides what the content is for each of the pages on their website and defines a constant or react class for each of those pages.

***create-react-app CLI advantages***
Specifically using the create-react-app cli means that the developer has a very programmatic approach to building their web-app. create-react-app allows the developer to use import statements between their files and do all of their coding within the "./src" folder while barely having to interact with index.html at all, it also means that the initial setting up of the web-app is completely handled by react. Meaning a developer who uses create-react-app is almost editing a pre-existing app.

Though I didn't use this feature because my web-app is relatively small, create-react-app also provides many scripts to make testing of the app extremely easy. All the developer has to do is write their tests in "./src/App.test.js" and react will handle almost all of the testing for you via npm commands(you can read much more about this in "./info.md").  

create-react-app also takes care of instantly uploading changes to the localhost web-app which makes for a very smooth development experience.

...much more information about the features of create-react-app can be found in './info.md'

***create-react-app CLI disadvantages***
create-react-app downloads a very hefty node-modules file that you have to host locally on your computer.

Since create-react-app has so many features it can be too heavy-weight if you're developing a small web-app (like this one).

The programmers lack of interaction with './public/index.html' I listed as an advantage, but this can also be a disadvantage if a programmer wants to interact directly with the actual html file. create-react-app makes this nearly impossible since './public/index.html' can not access any files outside of the './public' folder, and all of the development happens inside of the './src' folder.  
