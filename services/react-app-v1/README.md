# React frontend application

```sh
$ docker run -it --name atai-react-test \
    --network atai_envoy_security \
    --ip "181.10.0.31" \
    -v $(pwd):/app \
    -w /app \
    --log-opt mode=non-blocking \
    --log-opt max-buffer-size=5m \
    --log-opt max-size=100m \
    --log-opt max-file=5 \
    node:16-alpine sh
```

Ref:
[react warning computedMatch regarding some case issues](https://stackoverflow.com/questions/51971449/react-warning-computedmatch-regarding-some-case-issues)

## Styling
Material-UI v5

Ref:
[Migrate from v4 to v5](https://mui.com/guides/migration-v4/)

## Security
Following OWASP recommendation to enhance the security of the frontend application.

Topics:
* Injection attacks
* Cookie security
* `use strict`
* Be careful about shallow clone


Ref:
- [JSX Prevents Injection Attacks](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)
- [Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

## Testing

Ref:
- [Comparing the Selenium and Cypress Testing Frameworks](https://saucelabs.com/blog/comparing-the-selenium-and-cypress-testing-frameworks)


---


# Getting Started with Create React App (Official)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
