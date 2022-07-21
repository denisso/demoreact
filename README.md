## Getting Started with Create React App

## Demo

[denisso.github.io](https://denisso.github.io/)

## Install & Develop & Build
Install
`npm i `
`npm run postinstall`
Development
`npm start`
Build
`npm run build`

## Features
 - **Create React App** Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.
 - **Redux Toolkit & rtkQuery** State and Cache management
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

"fast-xml-parser": "^4.0.7",
"formik": "^2.2.9",
"framer-motion": "^6.2.6",
"highlight.js": "^11.5.1",
"lodash.throttle": "^4.1.1",
"markdown-it": "^12.3.2",
"msw": "^0.38.1",
"npm": "^8.5.3",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-markdown": "^8.0.2",
"react-redux": "^7.2.6",
"react-router-dom": "^6.2.1",
"react-scripts": "5.0.0",
"redux-typescript": "^1.2.1",
"rehype-highlight": "^5.0.2",
"remark-directive": "^2.0.1",
"styled-breakpoints": "^11.0.4",
"styled-components": "^5.3.3",
"typescript": "^4.5.5",
"uniqid": "^5.4.0",
"unist-util-visit": "^4.1.0",
"web-vitals": "^2.1.4",
"yup": "^0.32.11"