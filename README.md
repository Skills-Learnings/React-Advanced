
# Advanced React Components and Hooks

## Topics covered in this section of course
1. Advanced React Concepts
    - Portal
    - forwardRef
    - Error Boundaries
    - Advanced Key uses
    - Capture Event Listeners
2.  Advanced Hooks
    - useLayoutEffect
    - useDebugValues
    - useId
    - useImperativeHandle
    - useCallback as REf
    - useEffectEvent
## Learnings
### 1.1 Portal
Portals in React provide a way to render children components outside of their parent component's DOM hierarchy. This allows you to render content at a different position in the DOM tree, often useful for modal dialogs, tooltips, or any content that needs to "break out" of the parent component's layout constraints.

### How Portals Work:
1.  **Rendering Outside of Parent Component:**
    -   Portals are created using the `ReactDOM.createPortal()` method, specifying the child component and the target container where it should be rendered.
    -   The child component is rendered within the target container, but its DOM elements remain logically within the React component tree.
2.  **Avoiding Direct Rendering Inside the Body Tag:**    
    -   While portals can be rendered directly inside the `document.body` element, it's generally recommended to render portals within a container div within the main application root.
    -   This ensures that portals are still managed by React's reconciliation process and are included in component lifecycle methods, which can be beneficial for managing state and avoiding memory leaks.
3.  **Event Propagation and Bubbling:**
    -   When events occur within a portal child component, such as a click event, React handles event propagation and bubbling differently compared to standard JavaScript event handling.
    -   Events originating from portal children bubble up the React component tree as usual until they reach the nearest common ancestor of the portal and the component where the event was attached.
    -   React ensures that event handlers within the React component tree are correctly invoked, even for events originating from portal children.
4.  **Use Cases:**    
    -   Portals are commonly used for rendering overlay components, such as modals or tooltips, where the overlay content needs to visually "float" above other content.
    -   They can also be useful for rendering content in a different part of the DOM tree without affecting the layout or styling of other components.
5.  **Example**
     - Refer this [file](https://github.com/Skills-Learnings/React-Advanced/blob/01-advanced-react-components-and-hooks/src/Components/Examples/PortalExample/PortalExample.jsx) for the example of portal implementation.

In summary, portals provide a flexible way to render components outside of their parent's DOM hierarchy while still maintaining the benefits of React's component-based architecture and event handling mechanisms. By understanding how portals work and their best practices, you can effectively use them to build more complex and dynamic user interfaces in React applications.

### 1.2 forwardRef:
In React, `forwardRef` is a higher-order component that allows us to pass a ref through a component to one of its children. It's particularly useful when you need to access the underlying DOM node or React element of a child component from its parent component.
Here's how `forwardRef` works:
1.  **Creating a Forwarded Ref:**    
    -   To use `forwardRef`, you define a functional component and wrap it with the `React.forwardRef` function.
    -   Inside the functional component, you can access the forwarded ref using the second parameter.
2.  **Passing Refs to Child Components:**
    -   When rendering child components within the `forwardRef` component, you can attach the forwarded ref to any DOM element or React component by passing it as a `ref` prop.
3.  **Accessing the Ref Outside the Component:**
    -   After rendering, the parent component can access the forwarded ref, allowing it to interact with the child component's underlying DOM node or React element.
4. **Example:**
    - Refer this [file](https://github.com/Skills-Learnings/React-Advanced/blob/01-advanced-react-components-and-hooks/src/Components/Examples/ForwardRefExample/ForwardRefExample.jsx) for the example of forwardRef implementation.

### 1.3 Error Boundaries
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application. They are useful for handling errors that occur during rendering, in lifecycle methods, or in constructors of any component within their subtree.

Here's how to create and use error boundaries in React:
1.  **Creating an Error Boundary Component:**
    -   Define a class component that extends `React.Component` or `React.PureComponent`.
    -   Implement the `static getDerivedStateFromError(error)` and `componentDidCatch(error, info)` lifecycle methods.
		```jsx
		class ErrorBoundary extends React.Component {
		  constructor(props) {
		    super(props);
		    this.state = { hasError: false };
		  }

		  static getDerivedStateFromError(error) {
		    // Update state to indicate an error has occurred
		    return { hasError: true };
		  }

		  componentDidCatch(error, info) {
		    // Log error information
		    console.error('Error caught by boundary:', error, info);
		  }

		  render() {
		    if (this.state.hasError) {
		      // Render fallback UI when an error occurs
		      return <h1>Something went wrong.</h1>;
		    }
		    // Render children if no error occurred
		    return this.props.children;
		  }
		}
		```
2.  **Using Error Boundary Component:**
    -   Wrap the portion of your application where you want error handling with the `ErrorBoundary` component.
```jsx
<ErrorBoundary>
  {/* Components that may throw errors */}
</ErrorBoundary>
```
3.  **Handling Errors in Child Components:**
    -   Errors occurring in the components within the `ErrorBoundary` will be caught by the boundary.
    -   The `getDerivedStateFromError` method sets the `hasError` state to `true`, indicating an error.
    -   The `componentDidCatch` method logs the error details for debugging purposes.
		```jsx
		function MyComponent() {
		  throw new Error('Error in rendering MyComponent');
		  // This error will be caught by the ErrorBoundary
		  return <div>Hello</div>;
		}
		```
4.  **Displaying a Fallback UI:**
    -   When an error is caught, the `ErrorBoundary` renders a fallback UI instead of the crashed component tree.
    -   This UI should inform users that something went wrong and provide options to recover or report the error.
		```jsx
		class ErrorBoundary extends React.Component {
		  render() {
		    if (this.state.hasError) {
		      return (
		        <div>
		          <h1>Something went wrong.</h1>
		          {/* Additional error handling UI */}
		        </div>
		      );
		    }
		    return this.props.children;
		  }
		}
		```

By using error boundaries, we can ensure that errors in one part of your application do not affect the entire application's functionality. They help isolate errors and provide a way to gracefully handle them without crashing the entire UI, thus improving the user experience.
### 1.4 Advanced Key Uses
In React, keys are primarily used to optimize component rendering and reconciliation. They help React identify which items have changed, are added, or are removed within a list of elements. While keys are commonly used in lists, they can also have advanced uses in scenarios where you need to ensure that specific components maintain their state or are not remounted unnecessarily.

In the provided example, the `key` prop is used to differentiate between two instances of the `Counter` component based on whether the user wants to display the number of dogs or the number of cats. Let's break down the example:
```jsx
function App() {
  const [changeDogs, setChangeDogs] = useState(false);
  return (
    <div>
      {changeDogs ? (
        <>
          <span># of Dogs: </span> <Counter key="dog" />
        </>
      ) : (
        <>
          <span># of Cats: </span> <Counter key="cat" />
        </>
      )}
      <br />
      <button onClick={() => setChangeDogs((d) => !d)}>Switch</button>
    </div>
  );
}
```

-   The `App` component contains a state variable `changeDogs` which toggles between `true` and `false` when the "Switch" button is clicked.
-   Inside the component's JSX, a conditional rendering is performed based on the value of `changeDogs`.
-   When `changeDogs` is `true`, it renders a `Counter` component with the key set to `"dog"`, indicating that this component represents counting dogs.
-   When `changeDogs` is `false`, it renders a `Counter` component with the key set to `"cat"`, indicating that this component represents counting cats.

Here, the use of keys ensures that React treats each instance of the `Counter` component as a separate entity with its own state. When the state changes and the components are toggled, React can identify that the instances with the keys `"dog"` and `"cat"` are different, allowing it to maintain their individual states without unnecessarily unmounting and remounting the components.

This advanced use of keys ensures that React optimizes the rendering process by preserving component state and minimizing unnecessary re-renders, providing a smoother user experience.

### 1.5 Capture Event Listeners
In React, event capturing refers to the phase in the event propagation process where the event is dispatched from the root of the DOM tree and moves down to the target element. By default, React uses event bubbling, where events propagate from the target element up to the root of the DOM tree. However, React also provides a way to attach event listeners during the capturing phase using the `onEventCapture` props, such as `onClickCapture` and `onChangeCapture`.

Here's an explanation of capture event listeners in React:

1.  **Event Propagation Phases:**    
    -   When an event occurs on an element, it goes through two phases: the capturing phase and the bubbling phase.
    -   During the capturing phase, the event travels from the root of the DOM tree down to the target element.
    -   During the bubbling phase, the event travels from the target element back up to the root of the DOM tree.
2.  **Using Capture Event Listeners in React:**   
    -   React provides special props like `onClickCapture`, `onChangeCapture`, etc., to attach event listeners during the capturing phase.
    -   These props are similar to regular event props (`onClick`, `onChange`, etc.), but they capture the event during the capturing phase instead of the bubbling phase.
3.  **Example Usage:**    
    -   Let's consider an example where you want to capture the `click` event during the capturing phase:
		```jsx
		function handleClickCapture(event) {
		  console.log('Click captured during the capturing phase');
		}

		function MyComponent() {
		  return (
		    <div onClickCapture={handleClickCapture}>
		      <button>Click Me</button>
		    </div>
		  );
		}
		```
4.  **Key Points:**
    -   Capture event listeners are executed before any bubbling event listeners attached to the same element.
    -   These listeners are useful when you want to intercept events before they reach their target or when you need to handle events at a higher level in the DOM tree.
    -   Capture event listeners can be particularly useful for handling events on elements that have event listeners attached at different levels of the DOM hierarchy.

In summary, capture event listeners in React, such as `onClickCapture` and `onChangeCapture`, allow you to intercept events during the capturing phase of event propagation, providing more control over event handling and enabling you to handle events at different levels of the DOM hierarchy. 
### 2.1 useLayoutEffect hook
The `useLayoutEffect` hook in React is quite similar to the `useEffect` hook, but with one crucial difference: it runs synchronously immediately after all DOM mutations. This makes it suitable for operations that require DOM measurements or updates before the browser repaints. Let's delve into why and when you might choose `useLayoutEffect` over `useEffect`:
1.  **Synchronous Execution:**    
    -   `useLayoutEffect` runs synchronously after all DOM mutations. This means it fires before the browser has a chance to paint, ensuring that the user won't see any intermediate states of the DOM.
2.  **Use Cases:**    
    -   **DOM Measurement and Manipulation:** When your component needs to measure or manipulate the DOM, and you want to ensure these operations are reflected before the browser paints, `useLayoutEffect` is the appropriate choice.
    -   **Synchronizing with the Browser Layout:** If your updates depend on the browser's layout, such as querying the size or position of an element after a CSS layout change, `useLayoutEffect` ensures that your code runs synchronously after those changes.
3.  **Avoiding Flickers and Layout Shifts:**    
    -   If you're making visual updates that could cause flickers or layout shifts, using `useLayoutEffect` can help prevent these issues by ensuring that updates are applied synchronously before the browser repaints.
4.  **Performance Considerations:**    
    -   While `useLayoutEffect` can be powerful, it's crucial to use it judiciously because synchronous execution can potentially block the browser's main thread and cause performance issues, especially if the operations are expensive.
    -   If your effects don't require synchronous execution or don't directly interact with the DOM, it's usually better to use `useEffect` to defer these effects until after the browser has painted.
5.  **Fallback to useEffect:**    
    -   If your code doesn't depend on synchronous execution or doesn't need to interact with the DOM immediately, it's generally safer to use `useEffect`. It runs asynchronously after the browser has painted, which is often sufficient for many use cases and avoids potential performance pitfalls.

In summary, `useLayoutEffect` is a specialized hook designed for scenarios where you need to perform synchronous DOM operations before the browser repaints. However, it's crucial to use it thoughtfully, considering both its benefits and potential performance implications, and to fallback to `useEffect` when synchronous execution isn't necessary.

### 2.2 useDebugValue hook
The `useDebugValue` hook is a utility provided by React that allows you to display custom debugging information in React DevTools when inspecting a component. It doesn't affect the behavior of your component but is helpful for debugging and understanding component behavior during development. Here's a breakdown of how `useDebugValue` works and when to use it:

1.  **Usage:**    
    -   `useDebugValue` is typically used inside custom hooks to provide additional information about the hook's state or behavior.
    -   It takes two arguments: a value to be displayed in DevTools and an optional formatting function.
2.  **Custom Debugging Information:**    
    -   You can use `useDebugValue` to display any relevant information that can help you understand the state or behavior of your component or custom hook.
    -   This information is displayed in the "Hooks" tab of React DevTools when inspecting a component that uses the custom hook.
3.  **Example:**    
    -   Let's say you have a custom hook called `useCustomHook` that manages some state internally. You can use `useDebugValue` to display the current state value in DevTools:
		```jsx
		import { useDebugValue, useState } from 'react';

		function useCustomHook(initialState) {
		  const [state, setState] = useState(initialState);

		  // Display state value in React DevTools
		  useDebugValue(state);

		  // Your custom hook logic
		  // ...

		  return state;
		}
		```

4.  **Formatting Function (Optional):**
    -   You can also provide an optional formatting function as the second argument to `useDebugValue`.
    -   This function allows you to format the displayed value in DevTools. It receives the actual value as its argument and should return the formatted string.
		```
		useDebugValue(state, (state) => `Custom State: ${state}`);
		```

5.  **When to Use:**    
    -   Use `useDebugValue` when you want to provide additional debugging information for custom hooks or components.
    -   It's particularly useful for displaying internal state values, computed values, or any other relevant information that can aid in debugging and understanding component behavior.
6.  **Limitations:**    
    -   `useDebugValue` is only intended for development/debugging purposes and has no effect on the production build of your application.
    -   It should be used sparingly and only for providing genuinely useful debugging information to developers.

In summary, `useDebugValue` is a helpful tool for adding custom debugging information to React components and hooks. It allows you to display relevant state values or other information in React DevTools, aiding in the debugging process and improving the overall development experience.

### 2.3 useId Hook
The `useId` hook is used in React to generate unique identifiers. It's particularly useful in scenarios where you need to assign unique IDs to elements in your application, such as form inputs, list items, or dynamically generated components. Here's an explanation of how the `useId` hook works and when you might use it:

1.  **Generating Unique IDs:**    
    -   The primary purpose of the `useId` hook is to generate unique IDs that can be used in your components.
    -   These IDs are typically used to associate labels with form inputs, uniquely identify list items, or maintain accessibility by ensuring each element has a unique identifier.
2.  **Implementation:**    
    -   The `useId` hook usually relies on a mechanism to generate unique IDs, such as incrementing a counter or using a random string generator.
    -   It returns a unique ID value that can be used within the component where the hook is invoked.
3.  **Usage:**
    -   You can use the `useId` hook in your components to generate unique IDs for elements:
		```jsx
		function MyComponent() {
		  const uniqueId = useId('input');
		  return <input id={uniqueId} />;
		}
		```
4.  **Customization:**
    
    -   The `useId` hook can be customized to generate IDs with specific prefixes or formats.
    -   For example, you can pass a prefix as an argument to the hook to generate IDs with a consistent prefix.
5.  **Avoiding Collisions:**
    
    -   The `useId` hook ensures that the generated IDs are unique within the scope of the component where it's used.
    -   This helps prevent ID collisions, especially in components that are dynamically rendered or reused multiple times.
6.  **Accessibility:**
    
    -   Generating unique IDs is essential for maintaining accessibility in your application, particularly when associating labels with form inputs.
    -   Using unique IDs ensures that screen readers can correctly identify and associate labels with their corresponding inputs.

In summary, the `useId` hook is a handy utility for generating unique identifiers in React components. It helps ensure that elements in your application have unique IDs, which is crucial for accessibility and avoiding conflicts in dynamically rendered components.
### 2.4 useImperativeHandleHook
The `useImperativeHandle` hook in React is used to customize the instance value that is exposed when using `ref` in parent components. This is particularly useful when you want to control which properties or methods are exposed to parent components, thereby encapsulating and abstracting some of the internal logic of a component.

#### Why Use `useImperativeHandle`

1.  **Encapsulation**: You can hide certain internal details of a component and only expose the necessary interface to the parent component.
2.  **Custom Methods**: Allows you to define and expose custom methods that can be called by the parent component.
3.  **Interacting with Child Components**: Useful for accessing and manipulating the DOM or child components directly when necessary.

#### How to Use `useImperativeHandle`
-   **Arguments**:    
    1.  `ref`: The `ref` object passed from the parent component.
    2.  `createHandle`: A function that returns an object containing the methods and properties you want to expose.
    3.  `[dependencies]`: An optional array of dependencies that, when changed, will cause the `createHandle` function to be called again.
-   **Returns**: Nothing. It directly modifies the `ref` object.

#### Example Usage
Below is an example that demonstrates how to use `useImperativeHandle` to expose custom methods to a parent component.
##### Child Component (with `useImperativeHandle`)
```jsx
import React, { useImperativeHandle, forwardRef, useRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    },
  }));

  return <input ref={inputRef} {...props} />;
});

export default CustomInput;
```
##### Parent Component
```jsx
import React, { useRef } from 'react';
import CustomInput from './CustomInput';

function ParentComponent() {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleClear = () => {
    inputRef.current.clear();
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleClear}>Clear Input</button>
    </div>
  );
}

export default ParentComponent;
```
#### Explanation

1.  **Child Component (`CustomInput`)**:
    
    -   **`forwardRef`**: Used to forward the ref from the parent component to the `input` element inside the `CustomInput` component.
    -   **`useImperativeHandle`**: Takes the forwarded `ref` and an object that contains the methods `focus` and `clear`, which are then attached to the `ref`.
    -   **`inputRef`**: A local ref to the actual `input` element, allowing the methods to manipulate the `input` element.
2.  **Parent Component (`ParentComponent`)**:
    -   **`useRef`**: Creates a ref that is passed to the `CustomInput` component.
    -   **`handleFocus` and `handleClear`**: Call the custom methods `focus` and `clear` exposed by the `CustomInput` component.

#### Key Points
-   **Encapsulation**: `useImperativeHandle` allows you to expose only certain functionalities of a component to the parent, hiding the rest of the implementation details.
-   **Forwarding Refs**: It works in conjunction with `forwardRef` to pass the ref from the parent component to the child component.
-   **Dependencies**: Similar to other hooks, `useImperativeHandle` accepts a dependency array that controls when the `createHandle` function should be re-executed.

`useImperativeHandle` is a powerful tool in React for creating components that expose specific methods and properties to parent components. It promotes better encapsulation and control over component interactions, making it easier to build reusable and maintainable components.

### 2.5 useCallback as ref
Using `useCallback` instead of `useRef` for referring elements in React is a pattern that can be useful in certain scenarios, especially when you need more control over the ref assignment or need to perform side effects when the ref is assigned or updated.

1. **Why Use `useCallback` for Referring Elements**
	- **Immediate Effect Execution**: `useCallback` allows you to execute code immediately when the ref is set or updated, which can be useful for side effects like logging, focusing an element, or any other DOM manipulation.
	- **Conditional Ref Assignment**: It gives you the flexibility to conditionally assign refs based on certain conditions.
	- **Access to Props/State**: `useCallback` can capture props or state values at the time the ref is set, which can be beneficial for certain use cases.

2. **Comparison Between `useRef` and `useCallback`**

-   **`useRef`**: Provides a persistent ref object that can be assigned to a DOM element. It is straightforward but does not allow for immediate side effects when the ref is assigned.
-   **`useCallback`**: Returns a memoized callback function that can be assigned as a ref. This function can perform side effects and can also access the latest props and state.

3. **Example Usage**
    - Here’s an example to demonstrate the difference and usage of `useCallback` for referring elements:
    - **Using `useRef`**
		```jsx
		import React, { useRef, useEffect } from 'react';

		function MyComponent() {
		  const inputRef = useRef(null);

		  useEffect(() => {
		    if (inputRef.current) {
		      console.log('Input element:', inputRef.current);
		      inputRef.current.focus();
		    }
		  }, []);

		  return <input ref={inputRef} />;
		}

		export default MyComponent;
		```
		In this example, `useRef` is used to create a ref for an input element. The `useEffect` hook is used to perform side effects like logging and focusing the input element.

   - **Using `useCallback`**
		```jsx
		import React, { useCallback } from 'react';

		function MyComponent() {
		  const setInputRef = useCallback((node) => {
		    if (node !== null) {
		      console.log('Input element:', node);
		      node.focus();
		    }
		  }, []);

		  return <input ref={setInputRef} />;
		}

		export default MyComponent;` 
		```
     In this example, `useCallback` is used to create a callback ref that performs side effects immediately when the ref is assigned. The callback ref logs the input element and focuses it as soon as it is set.

4.  **Explanation**

	-   **`useRef`**:  
	    -   Provides a persistent object with a `current` property.
	    -   The ref is assigned to the DOM element and can be used in effects or event handlers.
	    -   Does not allow for immediate side effects when the ref is assigned.
	-   **`useCallback`**:    
	    -   Returns a memoized callback function that can be assigned as a ref.
	    -   The callback can perform side effects immediately when the ref is assigned or updated.
	    -   Provides more flexibility, allowing you to access the latest props or state values when the ref is assigned.

5. **Key Points**
	-   **Immediate Execution**: `useCallback` can execute code immediately when the ref is assigned, which is not possible with `useRef`.
	-   **Flexibility**: The callback can be used to conditionally assign refs and perform side effects.
	-   **Memoization**: `useCallback` ensures that the callback ref is not recreated unless its dependencies change, providing performance benefits.

6. **Conclusion**
	- Using `useCallback` as a ref is a useful pattern when you need more control over ref assignment and want to perform immediate side effects. It provides flexibility and immediate execution capabilities that `useRef` does not offer. This pattern can be particularly beneficial in cases where you need to conditionally assign refs or perform actions as soon as a ref is set.
