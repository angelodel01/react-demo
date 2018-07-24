
Angelo De Laurentis under John Morton for Cal Poly ITS


This app was created with "create-react-app" a user friendly tool provided by react that takes care of much of the supporting code so that a developer really just focuses on developing business logic.

Every app created using "create-react-app" comes with a README.md I've renamed this auto-generated README file to "info.md" and it can be found in this directory.

info.md lays out the many, many features that create-react-app allows you to use.

This file contains my summary of the ways that my web-app uses some create-react-app features.




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



My project mostly takes advantage of the router provided by react called "react-router-dom"

I tried to use this feature via cdn links and in my experience it makes local development nearly impossible so I'll need to add a server to actually try to set do some Debugging
