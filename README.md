# Demo

[denisso.github.io](https://denisso.github.io/)

## Install & Develop & Build
Install

`npm i `

To work with Google Sign In, you need an API Client ID. Instructions for getting the API Client ID are [here](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid). After receiving the key, you need to add it to the GSI_key variable in the file src/settings-demo-project.template.txt and execute the command 

`npm run postinstall`

Development

`npm start`

Build

`npm run build`

## Features
 - **Create React App** Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.
 - **Redux Toolkit & rtkQuery** State and Cache management
 - **React Router** React Router is a fully-featured client and server-side routing library for React, a JavaScript library for building user interfaces. React Router runs anywhere React runs; on the web, on the server with node.js, and on React Native.
 - **Typescript** TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
 - **Styled-components** Use the best bits of ES6 and CSS to style your apps without stress
   - **No class name bugs**: styled-components generates unique class names for your styles. You never have to worry about duplication, overlap or misspellings.
   - **Automatic vendor prefixing**: write your CSS to the current standard and let styled-components handle the rest.
   - **Painless maintenance**: you never have to hunt across different files to find the styling affecting your component, so maintenance is a piece of cake no matter how big your codebase is.
  - **Framer motion** Animation: component mount / unmount, ui elements animation and transition
 - **MSW:**  API mocking of the next generation. Mock by intercepting requests on the network level. Seamlessly raise the same mock definition for testing, development, and debugging.
 - **Mobile Friendly** To improve the user experience, media breakpoints and switching between the hamburger button and navigation menu are used.
 - **Google Api GSI** Sign In With Google helps you to quickly and easily manage user authentication and sign-in to your website. Users sign into a Google Account, provide their consent, and securely share their profile information with your platform.
 - **Markdown** made using the React Markdown package
     - there is a possibility of embedding an iframe, made through writing your own plugin
     - syntax highlighting, using the recipe-highlight plugin and highlight.js
 - **Lazy Loading** Media resources are loaded and lazy components are loaded only when they fall into the viewport area.
 - **Dark / Light Theme** With the Dark Theme, your pupils must dilate to take in as much light as possible – which is beneficial at night, but it can make reading difficult during the day. However, the Light Theme makes your pupils constrict and focus more, which improves sharpness. This is similar to how camera apertures work.
 - **Transition Grid Layout** Smooth change of position (animation) of elements in the dom in the grid, which allows you to animate properties such as flex-wrap  when the width of the viewport changes.
 - **Form constructor generator** to create a form, a schema is used that describes each field with a set of properties: name, label, type, required. 
   - optional: placeholder, additional validation options, onChange, onBlur event handlers
   - Yup is a schema builder for runtime value parsing and validation package is used to verify input
- **Modal window** is made without using additional libraries
   - opening the modal does not cause the content to shift, due to the disappearance of the scroll bar,
   - while the window is open, it is forbidden to scroll the content
   - form can be embedded in a modal window, and optionally use middleware.
 - **Smooth scroll**
 - **Error Boundary**

## Pages
- **Home page**: description of the components that were used in the development of this demo project
- **About me**: description of my skills
- **Notes with comments**: demonstration of the markdown component and the Comments module

## Dependencies
-  React: 17
-  React scripts 5
-  React Router 6
-  Framer motion 6
-  Ract Markdown 8
-  Styled components 5
-  MSW
-  EMAILJS
-  Fortawesome
-  Redux
-  Formik
