

# Clean React

## Topics covered in this section of course
1. Clean Code
    - As Prop
    - Context Organization
    - Use less useEffect
    - Controlled vs Uncontrolled Inputs
    - Compound Components
    - React Folder Structure
## Learnings
### 1.1 As Prop
In React, the `as` prop is a versatile tool that allows you to change the rendered component or HTML element dynamically. It's especially useful when working with component libraries or designing highly reusable components. The `as` prop provides a way to customize the output of a component without losing the internal logic and styling.

#### Key Points of the `as` Prop

1.  **Dynamic Element Rendering**: It allows you to change the type of the rendered element based on the component's usage context.
2.  **Improved Reusability**: By using the `as` prop, you can create highly flexible and reusable components.
3.  **Consistent API**: It keeps the component's API consistent while allowing for different rendering options.

#### Example Usage

##### Basic Example
1. Suppose you have a `Button` component that should render as different HTML elements (e.g., `button`, `a`, `div`) based on the context.

	```jsx
	import React from 'react';

	const Button = ({ as: Component = 'button', children, ...props }) => {
	  return <Component {...props}>{children}</Component>;
	};

	export default Button;
	``` 

2. Now, you can use this `Button` component with different elements:
	```jsx
	import React from 'react';
	import Button from './Button';

	function App() {
	  return (
	    <div>
	      <Button onClick={() => alert('Button clicked!')}>Regular Button</Button>
	      <Button as="a" href="https://www.example.com">Link Button</Button>
	      <Button as="div">Div Button</Button>
	    </div>
	  );
	}

	export default App;
	``` 

#### Real-World Example with a Component Library

1. Many UI component libraries leverage the `as` prop to provide flexible components. For example, let's consider a `Box` component in a hypothetical UI library:
	```jsx
	import React from 'react';
	import PropTypes from 'prop-types';
	import classNames from 'classnames';

	function Box({ as: Component = 'div', className, children, ...props }){
	  return (
	    <Component className={classNames('box', className)} {...props}>
	      {children}
	    </Component>
	  );
	};
	export default Box;
	``` 

2. You can now use the `Box` component as different elements, while maintaining a consistent API:
	```jsx
	import React from 'react';
	import Box from './Box';

	function App() {
	  return (
	    <div>
	      <Box as="section" className="custom-section">
	        This is a section
	      </Box>
	      <Box as="article" className="custom-article">
	        This is an article
	      </Box>
	      <Box as="header" className="custom-header">
	        This is a header
	      </Box>
	    </div>
	  );
	}

	export default App;
	```
#### Benefits of Using the `as` Prop
1.  **Flexibility**: Components can be rendered as different HTML elements or other React components without changing their internal logic or styles.
2.  **Reusability**: By using the `as` prop, you can reuse the same component in various contexts, enhancing code reusability.
3.  **Consistency**: It provides a consistent API for component customization, making it easier to manage and understand.

#### Considerations

-   **Prop Spreading**: Ensure that all necessary props are correctly passed to the dynamically rendered component.
-   **PropTypes**: Use PropTypes or TypeScript to validate the `as` prop and other props, ensuring type safety and reducing potential runtime errors.
-   **Styling**: Be mindful of how styles are applied, as different elements may require different styling approaches.

#### Conclusion

The `as` prop in React is a powerful tool for creating flexible and reusable components. It allows you to dynamically change the rendered element, making your components more adaptable to different contexts. This approach is widely used in component libraries to provide a consistent and flexible API for developers.

### 1.2 Context Organization
In React, organizing context effectively is crucial for maintaining clean and maintainable code, especially in larger applications. The most common strategies for how to organize context are, including null checking using a custom hook, moving the context to a separate file, and moving the custom hook to a separate file to avoid ESLint fast-refresh warnings.

#### 1. Null Checking for Context Using a Custom Hook

Null checking ensures that the context value is not accessed if the provider is missing. This prevents potential runtime errors. We can create a custom hook to encapsulate this logic.

##### Custom Hook with Null Checking
```jsx
import { useContext } from 'react';

// This custom hook checks if the context is null and throws an error if it is.
export function createSafeContextHook(context) {
  return function useSafeContext() {
    const value = useContext(context);
    if (value === null) {
      throw new Error('Context value is null. Ensure the provider is wrapped around your component.');
    }
    return value;
  };
}
``` 

#### 2. Moving Context to a Separate File
For better organization, move your context creation and provider logic to a separate file. This keeps your context logic decoupled from the component logic.

##### Creating the Context in a Separate File (context.js)
```jsx
import React, { createContext, useState } from 'react';

export const MyContext = createContext(null);

export function MyProvider({ children }){
  const [state, setState] = useState('default value');

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};
``` 

#### 3. Moving Custom Hook to a Separate File to Avoid ESLint Fast-Refresh Warning

Moving the custom hook to a separate file helps to keep the context logic clean and avoid issues with ESLint and fast-refresh in development.

##### Custom Hook in a Separate File (useMyContext.js)

```jsx
import { MyContext } from './context';
import { createSafeContextHook } from './createSafeContextHook';

export const useMyContext = createSafeContextHook(MyContext);
``` 

#### Putting It All Together

1. **createSafeContextHook.js**
```jsx
import { useContext } from 'react';

export function createSafeContextHook(context) {
  return function useSafeContext() {
    const value = useContext(context);
    if (value === null) {
      throw new Error('Context value is null. Ensure the provider is wrapped around your component.');
    }
    return value;
  };
}
``` 

2. **context.js**

```jsx
import React, { createContext, useState } from 'react';

export const MyContext = createContext(null);

export function MyProvider ({ children }) {
  const [state, setState] = useState('default value');

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};
``` 

3. **useMyContext.js**

```jsx
import { MyContext } from './context';
import { createSafeContextHook } from './createSafeContextHook';

export const useMyContext = createSafeContextHook(MyContext);` 
```
4. **Component Using the Context**

```jsx
import React from 'react';
import { useMyContext } from './useMyContext';

function MyComponent() {
  const { state, setState } = useMyContext();

  return (
    <div>
      <p>{state}</p>
      <button onClick={() => setState('new value')}>Change State</button>
    </div>
  );
};

export default MyComponent;
```

#### Summary

1.  **Null Checking for Context**: Create a custom hook to ensure the context is not null, preventing runtime errors.
2.  **Moving Context to a Separate File**: Organize your context creation and provider logic in a dedicated file for better maintainability.
3.  **Moving Custom Hook to a Separate File**: Keep the custom hook in its file to avoid ESLint fast-refresh warnings and maintain a clean codebase.

This organization strategy helps in managing context effectively in React applications, ensuring better scalability and maintainability.
### 1.3 Use less useEffect
Using `useEffect` less often can lead to cleaner, more efficient React components. `useEffect` is essential for handling side effects, but overusing it or using it for tasks better handled elsewhere can lead to performance issues, increased complexity, and harder-to-maintain code. 
Refer to this [doc](https://react.dev/learn/you-might-not-need-an-effect) for the example and scenarios to avoid using useEffect wherever possible.
### 1.4 Controlled vs Uncontrolled Components
In React, the concepts of controlled and uncontrolled components primarily refer to how state and input values are managed within a component. While this is often discussed in the context of form inputs, the principles apply broadly to other types of components as well. Let's explore these concepts in detail:
#### Controlled Components

**Definition**: Controlled components are those whose state or input values are managed by the parent component. The parent component passes down values and handlers as props to the controlled component, allowing for centralized state management.

**Characteristics**:

1.  **State Management**: The state of the component is controlled via React's state, typically managed in the parent component.
2.  **Two-Way Data Binding**: The component's value is set via a prop, and any changes are communicated back to the parent component through callbacks (such as `onChange`).
3.  **Predictability**: Since the parent component manages the state, the component's behavior is predictable and consistent.

**Example**:

```jsx
function ParentComponent() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <ControlledInput value={value} onChange={handleChange} />
  );
}

function ControlledInput({ value, onChange }) {
  return (
    <input type="text" value={value} onChange={onChange} />
  );
}
``` 

In this example, `ControlledInput` is a controlled component because its value and change handler are passed down from the `ParentComponent`.

#### Uncontrolled Components

**Definition**: Uncontrolled components manage their own state internally. They do not rely on the parent component for their state management and often use the DOM directly to manage their values.

**Characteristics**:

1.  **Internal State Management**: The component uses its own state or refs to keep track of its values.
2.  **One-Way Data Flow**: The initial value can be set via a prop, but further updates are managed internally by the component.
3.  **Simplicity**: For simple use cases, uncontrolled components can be easier to implement as they require less boilerplate for managing state.

**Example**:

```jsx
function UncontrolledInput() {
  const inputRef = useRef();

  const handleClick = () => {
    alert(`Input value: ${inputRef.current.value}`);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Show Value</button>
    </div>
  );
}
``` 

In this example, `UncontrolledInput` manages its own state through a ref, making it an uncontrolled component.

#### Comparing Controlled and Uncontrolled Components

1.  **State Management**:
    
    -   **Controlled**: State is managed by the parent component. This is useful for complex forms or when multiple components need to share and coordinate state.
    -   **Uncontrolled**: State is managed internally by the component. This is suitable for simple forms or when the component's state does not need to be shared.
2.  **Ease of Use**:
    
    -   **Controlled**: Requires more boilerplate code to manage state updates and event handlers in the parent component.
    -   **Uncontrolled**: Requires less boilerplate, making it easier to implement for simple use cases.
3.  **Performance**:
    
    -   **Controlled**: May incur performance overhead due to frequent re-renders as state updates in the parent component.
    -   **Uncontrolled**: Can be more performant in scenarios where frequent state updates are not necessary, as it manages state internally.
4.  **Data Flow**:
    
    -   **Controlled**: Supports two-way data binding, making it easier to sync component state with application state.
    -   **Uncontrolled**: Typically involves one-way data flow, with the initial value being passed as a prop and further changes handled internally.

### Practical Considerations

-   **When to Use Controlled Components**:
    
    -   When you need to validate input data before submission.
    -   When you need to reset the form fields based on external actions.
    -   When you need to conditionally render input fields based on the component's state.
    -   When the parent component needs to coordinate state between multiple child components.
-   **When to Use Uncontrolled Components**:
    
    -   When you need a quick, simple form without much interaction.
    -   When you don't need to control or validate the input data until form submission.
    -   When performance is a concern, and you want to minimize re-renders.
    -   When the state of the component does not need to be shared with or controlled by the parent component.

In summary, controlled components provide greater control and consistency by allowing the parent component to manage the state, while uncontrolled components offer simplicity and potentially better performance for less complex scenarios. Understanding the trade-offs between these approaches is crucial for making informed decisions in your React applications.

### 1.5 Compound Components
Compound components in React are a pattern used to create a component that is made up of several smaller sub-components. This pattern allows for more flexible and reusable code by enabling consumers to compose complex components with a more declarative and intuitive API.

In the provided example, the `Card` component is made up of three sub-components: `Card.Header`, `Card.Body`, and `Card.Footer`. These sub-components can be used together to create a fully functional `Card` with a header, body, and footer.

#### Why Use Compound Components?

1.  **Flexibility**: Compound components allow for a flexible API, enabling consumers to mix and match sub-components as needed.
2.  **Separation of Concerns**: Each sub-component handles a specific part of the UI, making the code more modular and easier to maintain.
3.  **Declarative Usage**: Consumers of the component can use it in a more declarative way, making the intent of the code clearer.

#### Example Code Breakdown

**app.jsx**

In this file, the `App` component uses the `Card` component along with its sub-components to create a card with a header, body, and footer.

```jsx
export default function App() {
  return (
    <Card>
      <Card.Header>
        <h1 style={{ margin: "0" }}>Header</h1>
      </Card.Header>
      <Card.Body>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asseumenda quia
        eaque explicabo banditiis quibusdam, similique debitis earum sint non
        laboriosam dolorum ex itaque illum dolores?
      </Card.Body>
      <Card.Footer>
        <>
          <button>Ok</button>
          <button>Cancel</button>
        </>
      </Card.Footer>
    </Card>
  );
}
``` 

**Card.jsx**

In this file, the `Card` component and its sub-components (`Header`, `Body`, and `Footer`) are defined. The sub-components are attached to the `Card` component as static properties.

```jsx
export default function Card({ children }) {
  return <div style={{ border: "1px solid black" }}>{children}</div>;
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

function Header({ children }) {
  return (
    <div
      style={{
        borderBottom: "1px solid black",
        padding: ".5rem",
        marginBottom: ".5rem",
      }}
    >
      {children}
    </div>
  );
}

function Body({ children }) {
  return <div style={{ padding: ".5rem" }}>{children}</div>;
}

function Footer({ children }) {
  return (
    <div
      style={{
        borderTop: "1px solid black",
        padding: ".5rem",
        marginTop: ".5rem",
      }}
    >
      {children}
    </div>
  );
}
``` 

#### How It Works

1.  **Creating the Main Component**: The `Card` component is a simple wrapper that applies a border around its children.
2.  **Defining Sub-Components**: The `Header`, `Body`, and `Footer` components are defined separately. Each of these components applies specific styles to its children.
3.  **Attaching Sub-Components**: The sub-components are attached to the `Card` component as static properties (`Card.Header`, `Card.Body`, `Card.Footer`). This allows them to be accessed directly as properties of the `Card` component.
4.  **Using the Compound Component**: In the `App` component, the `Card` component is used along with its sub-components to create a card structure. The sub-components are nested within the `Card` component, and their content is passed as children.

#### Benefits of This Pattern

-   **Clear Structure**: The structure of the compound component is clear and easy to understand. The consumer can see the hierarchy of the `Card` and its sub-components.
-   **Reusability**: The sub-components can be reused in different parts of the application or in different combinations to create various card layouts.
-   **Encapsulation**: Each sub-component encapsulates its own styles and behavior, making the code easier to maintain and extend.

#### Conclusion
The compound component pattern in React is a powerful way to create flexible and reusable components. By breaking down a complex component into smaller sub-components and composing them together, you can achieve a clear and maintainable code structure. The provided example demonstrates how to implement and use compound components effectively.

### 1.6 React Folder Structure

