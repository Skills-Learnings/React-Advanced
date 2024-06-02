

# CSS Alternatives and Type Safety

## Topics covered in this section of course
1. CSS Alternatives
    - CSS Modules
    - CSS in JS
    - Utility CSS
    - CSS Frameworks
2.  Type Safety
    - PropTypes
    - Typescript setup and Props
    - Typescript useState
    - Typescript useRef
    - Typescript useReducer
    - Typescript useContext
    - Typescript Generic Component
## Learnings
### 1.1 CSS Modules
CSS Modules in React provide a way to scope CSS by automatically generating unique class names. This helps to avoid class name conflicts in large applications by localizing styles to the component they are used in.

#### Key Features of CSS Modules
-   **Scoped Styles**: CSS styles are scoped to the component, preventing clashes with styles from other components.
-   **Unique Class Names**: CSS Modules automatically generate unique class names, ensuring styles are applied correctly.
-   **Ease of Maintenance**: Scoped styles improve the maintainability of the codebase, making it easier to understand and modify component-specific styles.

#### How to Use CSS Modules in React
1. **Setting Up CSS Modules**
	- For a React project created with Create React App (CRA), CSS Modules are supported out of the box. Files with the `.module.css` extension will automatically be treated as CSS Modules.

2. **Creating a CSS Module**
	- Create a CSS file with the `.module.css` extension.
		```css
		/* Button.module.css */
		.button {
		  background-color: blue;
		  color: white;
		  padding: 10px 20px;
		  border: none;
		  border-radius: 5px;
		}

		.buttonPrimary {
		  background-color: darkblue;
		}
		```
3. **Importing and Using CSS Module in a Component**
	- Import the CSS module in your React component and apply the styles using the imported object.
		```jsx
		// Button.js
		import React from 'react';
		import styles from './Button.module.css';

		function Button({ primary, children }) {
		  return (
		    <button className={`${styles.button} ${primary ? styles.buttonPrimary : ''}`}>
		      {children}
		    </button>
		  );
		}

		export default Button;
		``` 

4. **Example Usage**
```jsx
// App.js
import React from 'react';
import Button from './Button';

function App() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button primary>Primary Button</Button>
    </div>
  );
}

export default App;
```

#### Explanation

1.  **Creating a CSS Module**: In the `Button.module.css` file, styles are defined for a button. Notice the class names `.button` and `.buttonPrimary`.
    
2.  **Importing CSS Module**: In `Button.js`, the styles are imported using the `import styles from './Button.module.css';` syntax. The `styles` object contains the class names with their respective unique identifiers.
    
3.  **Applying Styles**: The `button` element's className is set using the classes from the `styles` object. Conditional styling is applied based on the `primary` prop.
    
4.  **Example Usage**: The `Button` component is used in `App.js` with and without the `primary` prop to demonstrate how different styles can be applied.
    

### Advantages of CSS Modules

-   **Isolation**: Styles are scoped to the component, preventing conflicts and unintended style overrides.
-   **Maintainability**: With localized styles, components are easier to manage, and styles are more predictable.
-   **Readability**: Class names are automatically generated to be unique, making it clear where each style is applied.

#### Limitations
-   **Complexity**: For very simple projects, CSS Modules might add unnecessary complexity.
#### Conclusion
CSS Modules offer a robust way to handle styles in React applications by scoping styles to components, avoiding conflicts, and improving maintainability. They are a valuable tool for any React developer looking to manage styles in a scalable and modular way.
### 2.2 CSS in JS
 CSS-in-JS is a styling approach in React where JavaScript is used to define CSS styles. This method provides dynamic styling capabilities and scopes styles to components, avoiding global CSS pitfalls. One popular library for CSS-in-JS in React is `styled-components`.

1.  #### Key Features of `styled-components`
	- **Tagged Template Literals**: Use tagged template literals to write actual CSS in your JavaScript code.
	- **Dynamic Styling**: Easily create dynamic styles based on component props.
	- **Automatic Critical CSS**: Only the styles of components being rendered are loaded.
	- **Component-Level Styles**: Scoped styles to the component level, preventing style clashes.
	- **Extending Styles**: Extend existing styled components for more advanced use cases.

2. #### How to Use `styled-components`
	-  **Installation**: First, you need to install `styled-components`:
		 `npm install styled-components` 
		 
	- **Creating a Styled Component**: You can create a styled component using the `styled` function.
		```jsx
		// Button.jsx
		import styled from 'styled-components';

		const Button = styled.button`
		  background-color: blue;
		  color: white;
		  padding: 10px 20px;
		  border: none;
		  border-radius: 5px;
		  cursor: pointer;

		  &:hover {
		    background-color: darkblue;
		  }
		`;

		export default Button;
		``` 

	- **Using the Styled Component**: Import and use the styled component in your React component.
		```jsx
		// App.jsx
		import React from 'react';
		import Button from './Button';

		function App() {
		  return (
		    <div>
		      <Button>Click Me</Button>
		    </div>
		  );
		}

		export default App;
		``` 

3. #### Dynamic Styling: 
	You can use props to create dynamic styles in `styled-components`.
	```jsx
	// Button.jsx
	import styled from 'styled-components';

	const Button = styled.button`
	  background-color: ${props => props.primary ? 'darkblue' : 'blue'};
	  color: white;
	  padding: 10px 20px;
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;

	  &:hover {
	    background-color: ${props => props.primary ? 'navy' : 'darkblue'};
	  }
	`;

	export default Button;
	``` 
	```jsx
	// App.jsx
	import React from 'react';
	import Button from './Button';

	function App() {
	  return (
	    <div>
	      <Button primary>Primary Button</Button>
	      <Button>Default Button</Button>
	    </div>
	  );
	}

	export default App;
	``` 

4. #### Extending Styles
	You can extend existing styled components to create new ones with additional styles.
	```jsx
	// Button.jsx
	import styled from 'styled-components';

	const Button = styled.button`
	  background-color: blue;
	  color: white;
	  padding: 10px 20px;
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;

	  &:hover {
	    background-color: darkblue;
	  }
	`;

	const PrimaryButton = styled(Button)`
	  background-color: darkblue;

	  &:hover {
	    background-color: navy;
	  }
	`;

	export { Button, PrimaryButton };
	``` 

5. #### Key Benefits of `styled-components`:
	- **Scoped Styles**: Ensures styles are scoped to components, preventing clashes.
	-  **Dynamic Styling**: Easily create styles based on component props.
	-  **Maintainability**: Styles are colocated with components, making it easier to maintain.
	-  **CSS Features**: Leverage the full power of CSS, including nesting, media queries, and more.
	-  **Server-Side Rendering (SSR)**: Supports SSR, making it suitable for universal React applications.

6. #### Considerations
	-   **Performance**: While `styled-components` are performant, they can introduce runtime overhead.
	-   **Learning Curve**: Requires understanding of tagged template literals and JavaScript-driven styling.
	-   **Tooling**: Requires installation and setup, which might be an additional step compared to plain CSS.

7. #### Conclusion:
	`styled-components` offer a powerful, scalable, and maintainable way to style React applications. By keeping styles scoped to components and allowing dynamic styling through props, `styled-components` simplify the styling process and enhance the developer experience. Whether you're building small components or large applications, `styled-components` provide a robust solution for CSS-in-JS in React.
