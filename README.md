

# Performance and Testing

## Topics covered in this section of course
1. Performance
    - Dev tools profiler
    - React.memo
    - PureComponent
    - Handling large lists
2.  Testing
    - Setup vitest and react testing library
    - Vitest
    - React testing library
    - Mocking API calls
## Learnings
### 1.1 Dev tools profiler
The React DevTools Profiler is a powerful tool that allows developers to measure the performance of their React applications. It provides insights into how components render, how often they render, and how long each render takes. This information is crucial for optimizing the performance of React applications.

#### Key Features of the Profiler:
1.  **Flame Graph**: Visualizes the render time of your components in a hierarchical manner.
2.  **Ranked Chart**: Shows components sorted by render time, allowing you to quickly identify performance bottlenecks.
3.  **Commit and Render Duration**: Displays the time taken by each commit and render, helping you understand the impact of state changes.
4.  **Interaction Tracking**: Tracks which interactions (e.g., clicks, key presses) caused a re-render, useful for debugging performance issues related to user interactions.

#### How to Use the React Profiler

##### Step 1: Install React DevTools
First, you need to install the React DevTools extension for your browser. It's available for both Chrome and Firefox.

##### Step 2: Access the Profiler
After installing the React DevTools extension, you can access the Profiler by following these steps:

1.  Open your application in the browser.
2.  Open the browser's developer tools.
3.  Navigate to the "React" tab in the developer tools.
4.  Switch to the "Profiler" sub-tab.

##### Step 3: Profile Your Application

1.  **Start Profiling**: Click the "Start profiling" button to begin recording the performance of your application.
2.  **Interact with Your App**: Perform actions in your application that you want to measure.
3.  **Stop Profiling**: Click the "Stop profiling" button to end the recording.

##### Step 4: Analyze the Results

Once you stop profiling, the Profiler will display the recorded performance data. Here’s how to analyze the results:

-   **Flame Graph**: Each bar represents a component. The width of the bar represents the time taken to render that component. Components are nested to show their hierarchy.
-   **Ranked Chart**: This view sorts components by render time, making it easier to identify the components that took the longest to render.
-   **Commit and Render Duration**: This section shows the total time taken by each commit and the time taken by individual renders within each commit.

#### Best Practices
-   **Identify Slow Components**: Use the Ranked Chart to quickly find components that are slow to render.
-   **Avoid Unnecessary Re-renders**: Use React.memo, useCallback, and useMemo to avoid unnecessary re-renders.

#### Conclusion

The React DevTools Profiler is an essential tool for optimizing React applications. By providing detailed insights into the rendering behavior of your components, it helps you identify and fix performance bottlenecks, ensuring a smoother and more efficient user experience.

### 1.2 React.Memo
`React.memo` is a higher-order component in React that optimizes the performance of functional components by preventing unnecessary re-renders. It achieves this by memoizing the component, which means that React will only re-render the component if its props have changed.

1. **How `React.memo` Works**
	- When you wrap a component with `React.memo`, React compares the current props with the previous props. If the props have not changed, React skips the re-rendering of that component, thus improving performance.

2. **Basic Usage**
	- Here's a simple example to demonstrate how to use `React.memo`:
		```jsx
		import React, { useState } from 'react';

		const ExpensiveComponent = React.memo(({ count }) => {
		  console.log('ExpensiveComponent rendered');
		  return <div>Count: {count}</div>;
		});

		const App = () => {
		  const [count, setCount] = useState(0);
		  const [text, setText] = useState('');

		  return (
		    <div>
		      <ExpensiveComponent count={count} />
		      <button onClick={() => setCount(count + 1)}>Increment Count</button>
		      <input
		        type="text"
		        value={text}
		        onChange={(e) => setText(e.target.value)}
		        placeholder="Type something"
		      />
		    </div>
		  );
		};

		export default App;
		``` 

- In this example:
	-   `ExpensiveComponent` is wrapped with `React.memo`.
	-   `ExpensiveComponent` will only re-render when its `count` prop changes.
	-   When you type in the input field, the `text` state changes, but `ExpensiveComponent` does not re-render because its `count` prop has not changed.

3. **Custom Comparison Function**
	- By default, `React.memo` performs a shallow comparison of props. If you need more control over the comparison, you can provide a custom comparison function as the second argument to `React.memo`.

	- Here's an example of how to use a custom comparison function:
		```jsx
		const ExpensiveComponent = React.memo(({ count, user }) => {
		  console.log('ExpensiveComponent rendered');
		  return (
		    <div>
		      <div>Count: {count}</div>
		      <div>User: {user.name}</div>
		    </div>
		  );
		}, (prevProps, nextProps) => {
		  // Perform a deep comparison for the user prop
		  return prevProps.count === nextProps.count && prevProps.user.name === nextProps.user.name;
		});
		``` 
	- In this example, the custom comparison function checks both the `count` and `user.name` properties to decide whether the component should re-render.

4. **When to Use `React.memo`**

	-   **Pure Functional Components**: `React.memo` is most effective for pure functional components that render the same output for the same props.
	-   **Performance Optimization**: Use `React.memo` when you notice performance issues due to unnecessary re-renders of components with unchanged props.
	-   **Complex Components**: For components with complex and time-consuming rendering logic, `React.memo` can help improve performance by reducing the number of renders.

5. **Caveats**
	-   **State Changes**: `React.memo` only prevents re-renders caused by prop changes. State changes within the component will still cause re-renders.
	-   **Object and Array Props**: Be cautious when passing objects or arrays as props. Shallow comparison might not detect changes in nested properties, leading to potential bugs. Consider using a custom comparison function if necessary.
	-   **Side Effects**: Ensure that memoized components do not have unintended side effects. Memoization should not affect the correctness of your application.

6. **Conclusion**
`React.memo` is a powerful tool for optimizing the performance of React applications by preventing unnecessary re-renders of functional components. By leveraging memoization, you can improve the efficiency of your application, especially when dealing with pure functional components and complex rendering logic. However, use it judiciously and be mindful of the potential caveats to ensure the correctness of your application.

### 1.3 PureComponent
`react.memo` is a higher-order component (HOC) that is primarily used with functional components to optimize rendering performance by preventing unnecessary re-renders. However, you can achieve similar performance optimization in class components using `React.PureComponent` or the `shouldComponentUpdate` lifecycle method. Although `react.memo` itself isn't used directly with class components, the concept behind it—preventing unnecessary re-renders—can still be applied.

1. **Using `React.PureComponent` in Class Components**
	- `React.PureComponent` is a base class for React components that performs a shallow comparison of props and state to determine if a re-render is necessary. If the props and state haven't changed, the component won't re-render.
		```jsx
		import React, { PureComponent } from 'react';

		class PureChild extends PureComponent {
		  render() {
		    console.log('PureChild rendered');
		    return <div>Count: {this.props.count}</div>;
		  }
		}

		class App extends React.Component {
		  state = {
		    count: 0,
		    text: ''
		  };

		  incrementCount = () => {
		    this.setState({ count: this.state.count + 1 });
		  };

		  handleTextChange = (e) => {
		    this.setState({ text: e.target.value });
		  };

		  render() {
		    return (
		      <div>
		        <PureChild count={this.state.count} />
		        <button onClick={this.incrementCount}>Increment Count</button>
		        <input
		          type="text"
		          value={this.state.text}
		          onChange={this.handleTextChange}
		          placeholder="Type something"
		        />
		      </div>
		    );
		  }
		}

		export default App;
		``` 
	- In this example, the `PureChild` component will only re-render when its `count` prop changes, because it extends `PureComponent`.

2. **Using `shouldComponentUpdate` in Class Components**
	- If you need more control over when a component should re-render, you can use the `shouldComponentUpdate` lifecycle method. This method allows you to manually decide whether a component should update by comparing the current and next props and state.

		```jsx
		import React, { Component } from 'react';

		class Child extends Component {
		  shouldComponentUpdate(nextProps, nextState) {
		    // Only re-render if the count prop has changed
		    return nextProps.count !== this.props.count;
		  }

		  render() {
		    console.log('Child rendered');
		    return <div>Count: {this.props.count}</div>;
		  }
		}

		class App extends React.Component {
		  state = {
		    count: 0,
		    text: ''
		  };

		  incrementCount = () => {
		    this.setState({ count: this.state.count + 1 });
		  };

		  handleTextChange = (e) => {
		    this.setState({ text: e.target.value });
		  };

		  render() {
		    return (
		      <div>
		        <Child count={this.state.count} />
		        <button onClick={this.incrementCount}>Increment Count</button>
		        <input
		          type="text"
		          value={this.state.text}
		          onChange={this.handleTextChange}
		          placeholder="Type something"
		        />
		      </div>
		    );
		  }
		}

		export default App;
		```
	- In this example, the `Child` component will only re-render when its `count` prop changes, because of the `shouldComponentUpdate` method.

3. **Summary**
While `react.memo` is designed for functional components, the same goal of optimizing rendering performance can be achieved in class components using `React.PureComponent` or the `shouldComponentUpdate` lifecycle method. By leveraging these tools, you can prevent unnecessary re-renders and improve the performance of your React applications.

### 1.4 Handling Large Lists
Handling large lists in React efficiently is essential to maintain performance and a smooth user experience. Several strategies and libraries can help you achieve this, including virtualization, pagination, and specific libraries designed for managing large datasets.

#### Key Strategies for Handling Large Lists

1.  **Virtualization**:
    
    -   **Concept**: Virtualization involves only rendering the items that are currently visible in the viewport. This reduces the number of DOM nodes and improves performance.
    -   **Benefits**: Minimizes memory usage and improves rendering speed by not rendering off-screen items.
2.  **Pagination**:
    
    -   **Concept**: Pagination splits the data into discrete chunks or pages. Users can navigate through these pages to view different portions of the data.
    -   **Benefits**: Reduces the amount of data loaded at any one time, which can improve both performance and user experience, especially with server-side data fetching.

#### Libraries for Handling Large Lists

1.  **react-window**:
    
    -   **Description**: A lightweight library for efficiently rendering large lists and tabular data.
    -   **Features**:
        -   Supports both fixed and variable-sized items.
        -   Provides components for lists, grids, and tables.
        -   Highly performant and easy to use.
    -   **Use Cases**: Ideal for scenarios where you have a large list or grid of items and need efficient rendering without complex configurations.
2.  **TanStack Virtual (formerly react-virtual)**:
    -   **Description**: A flexible and powerful library for virtualizing lists, tables, grids, and more.
    -   **Features**:
        -   Highly customizable with support for various types of layouts.
        -   Works well with TanStack Table (formerly react-table) for virtualized table rendering.
        -   Supports fixed and variable-sized items.
    -   **Use Cases**: Suitable for complex use cases where you need more control and customization over the virtualization behavior, such as dynamic item sizes and advanced layout configurations.

#### Best Practices
-  **Measure Performance**: Use tools like React DevTools to profile and measure performance. Identify bottlenecks and optimize accordingly.
-   **Lazy Loading**: Load additional data as the user scrolls or interacts with the application. This can be combined with virtualization for even better performance.
-   **Memoization**: Use `React.memo` or `useMemo` to prevent unnecessary re-renders of list items.

#### Conclusion
Handling large lists in React requires thoughtful strategies to ensure efficient rendering and a good user experience. Virtualization and pagination are key techniques, and libraries like `react-window` and `TanStack Virtual` offer powerful tools to implement these strategies. By combining these methods and following best practices, you can effectively manage large datasets in your React applications.

### 2.1 Setup vitest and react testing library
Setting up `vitest` and `react-testing-library` in a Vite React project involves several steps. Here’s a detailed guide to get you started, using the provided `setupTests.js` code as part of the setup process.

#### Step-by-Step Setup Guide

1. **Install Dependencies**
	- First, you need to install the necessary dependencies. Open your terminal and run the following command:
`npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom` 

2. **Configure `vitest`**
	- Create a `vitest.config.js` file in the root of your project. This file will contain the configuration for Vitest:

		```js
		import { defineConfig } from 'vitest/config'

		export default defineConfig({
		  test: {
		    environment: 'jsdom',
		    setupFiles: './src/setupTests.js',
		    globals: true,
		  },
		})
		``` 

	- This configuration sets up `vitest` to use the `jsdom` environment, which simulates a browser-like environment for testing. It also specifies the `setupFiles` option to include your `setupTests.js` file.

3. **Create `setupTests.js`**
	- In the `src` directory of your project, create a file named `setupTests.js` and add the following code:

		```
		import * as matchers from "@testing-library/jest-dom/matchers"
		import { expect, afterEach } from "vitest"
		import { cleanup } from "@testing-library/react"

		// Extend Vitest's expect with jest-dom matchers for better assertions
		expect.extend(matchers)

		// Clean up the DOM after each test to prevent memory leaks and test interference
		afterEach(() => {
		  cleanup()
		})
		``` 

	- This setup file configures Vitest to use `jest-dom` matchers and ensures the DOM is cleaned up after each test.

4. **Write Your Tests**
	- You can now write your tests using `@testing-library/react` and `vitest`. Create a `__tests__` directory in your `src` folder and add a test file, for example, `App.test.jsx`:
		
		```jsx
		import { render, screen } from '@testing-library/react'
		import App from '../App'

		test('renders the App component', () => {
		  render(<App />)
		  const linkElement = screen.getByText(/learn react/i)
		  expect(linkElement).toBeInTheDocument()
		})
		```

5. **Update `package.json`**
	- Add a script to your `package.json` to run the tests using `vitest`:
		```json
		{
		  "scripts": {
		    "test": "vitest"
		  }
		}
		``` 

6. **Run the Tests**
	- You can now run your tests by executing the following command in your terminal:
`npm test` 

7. **Summary**
This setup guide walks you through installing the necessary dependencies, configuring `vitest`, creating a setup file for `@testing-library/react`, and writing a simple test. With this setup, you can effectively test your React components using `vitest` and `react-testing-library`.

### 2.2 Vitest
Vitest is a fast and lightweight testing framework for JavaScript, designed to be an alternative to Jest. It is optimized for speed and is compatible with Vite, making it a popular choice for projects using Vite as their build tool. Here's a detailed explanation of some features in Vitest:

1. **Comparing Objects and Arrays**
	- Vitest uses `expect` for assertions, similar to Jest. You can compare objects and arrays using `toEqual` and `toStrictEqual`:
		-   `toEqual`: This checks that two objects or arrays have the same values, but doesn't require the same structure or prototype.
		-   `toStrictEqual`: This checks that two objects or arrays have the same structure and prototype, as well as the same values.
		- For more comparision methods please refer to vitest [doc](https://vitest.dev/api/expect.html).
	- Example
		```js
		it('object equality', () => {
		  const obj1 = { a: 1, b: 2 }
		  const obj2 = { a: 1, b: 2 }
		  expect(obj1).toEqual(obj2) // Passes

		  const obj3 = { a: 1, b: 2, c: undefined }
		  expect(obj1).toStrictEqual(obj3) // Fails
		})

		it('array equality', () => {
		  const arr1 = [1, 2, 3]
		  const arr2 = [1, 2, 3]
		  expect(arr1).toEqual(arr2) // Passes

		  const arr3 = [1, 2, 3]
		  const arr4 = new Array(1, 2, 3)
		  expect(arr3).toStrictEqual(arr4) // Passes
		})
		```

2. **`.not`**
	- Vitest allows you to negate assertions using `.not`:
	- Example
		```js
		it('not example', () => {
		  expect(2 + 2).not.toBe(5) // Passes
		  expect({ a: 1 }).not.toEqual({ a: 2 }) // Passes
		})
		``` 

3. **Working with Functions**
	- Vitest supports mocking functions to test their behavior without executing their real implementations. You can create mock functions using `vi.fn`:
	- Example:
		```js
		const mockFn = vi.fn()

		it('mock function example', () => {
		  mockFn('arg1', 'arg2')
		  expect(mockFn).toHaveBeenCalled()
		  expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
		  expect(mockFn).toHaveBeenCalledTimes(1)
		})
		``` 

4. **Using Fake Timers**
	- Vitest allows you to mock timers using `vi.useFakeTimers`. This is useful for testing code that relies on `setTimeout`, `setInterval`, or other timer-based functions.
	- Example:
		```js
		it('fake timers example', () => {
		  vi.useFakeTimers()

		  const callback = vi.fn()
		  setTimeout(callback, 1000)

		  vi.advanceTimersByTime(1000)

		  expect(callback).toHaveBeenCalledTimes(1)

		  vi.useRealTimers()
		})
		``` 

5. **Full Example**
	- Here's a full example that includes all the features discussed:
		```jsx
		import { describe, expect, it, vi } from 'vitest'

		describe('Vitest features', () => {
		  it('comparing objects and arrays', () => {
		    const obj1 = { a: 1, b: 2 }
		    const obj2 = { a: 1, b: 2 }
		    expect(obj1).toEqual(obj2)

		    const arr1 = [1, 2, 3]
		    const arr2 = [1, 2, 3]
		    expect(arr1).toEqual(arr2)
		  })

		  it('not example', () => {
		    expect(2 + 2).not.toBe(5)
		    expect({ a: 1 }).not.toEqual({ a: 2 })
		  })

		  it('mock function example', () => {
		    const mockFn = vi.fn()
		    mockFn('arg1', 'arg2')
		    expect(mockFn).toHaveBeenCalled()
		    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
		    expect(mockFn).toHaveBeenCalledTimes(1)
		  })

		  it('fake timers example', () => {
		    vi.useFakeTimers()

		    const callback = vi.fn()
		    setTimeout(callback, 1000)

		    vi.advanceTimersByTime(1000)
		    expect(callback).toHaveBeenCalledTimes(1)

		    vi.useRealTimers()
		  })
		})
		``` 

6. **Summary**
	-   **Comparing Objects and Arrays**: Use `toEqual` for deep equality and `toStrictEqual` for strict equality.
	-   **`.not`**: Negate assertions to check that certain conditions are not met.
	-   **Working with Functions**: Use `vi.fn` to create mock functions and test their behavior.
	-   **Using Fake Timers**: Use `vi.useFakeTimers` and `vi.advanceTimersByTime` to test code that relies on timers without waiting for real-time delays.
	-  By leveraging these features, you can write comprehensive and effective tests for your React applications using Vitest.

### 2.3 React Testing Library
React Testing Library is a popular testing utility for testing React components. It encourages writing tests that simulate how users interact with the application, rather than focusing on implementation details. Here's an basic explanation of how the react testing library works:
1. **`render`**
	- The `render` function is used to render your React components into the DOM (or a virtual DOM provided by the library). It returns a set of utility functions to query and interact with the rendered component.-
		```jsx
		import { render, screen } from '@testing-library/react';
		import App from './App';

		it('renders App component', () => {
		  render(<App />);
		  // Test logic goes here
		});
		``` 
2. **`screen` Methods**
	- The `screen` object provides utility methods to query elements rendered by your component:
	- For example **`screen.getByTestId`**: Queries an element by its `data-testid` attribute.
		```jsx
		it('renders button with testId', () => {
		  render(<Button data-testid="submit-button" />);
		  const buttonElement = screen.getByTestId('submit-button');
		  expect(buttonElement).toBeInTheDocument();
		});
		```
	- For more screen object methods visit to react-testing library documentation.
3. **User Interaction Testing**
	- RTL includes the `user-event` library for simulating user interactions:
		```jsx
		import userEvent from '@testing-library/user-event';

		it('clicking button', () => {
		  render(<Button />);
		  const button = screen.getByRole('button');
		  userEvent.click(button);
		  expect(/* Assertion */);
		});
		```
4. **Hooks Testing**
	- To test hooks, RTL provides `renderHook` and `act`:- 
	- **`renderHook`**: Renders a hook inside a function component.
		```jsx
		import { renderHook, act } from '@testing-library/react-hooks';
		import useCounter from './useCounter';

		it('useCounter hook', () => {
		  const { result } = renderHook(() => useCounter());
		  expect(result.current.count).toBe(0);
		  
		  act(() => {
		    result.current.increment();
		  });
		  
		  expect(result.current.count).toBe(1);
		});
		```
	- **`act`**: Wraps code that interacts with the hook to ensure state updates correctly.
		```jsx
		act(() => {
		  // Interaction that updates state
		});
		```
5. **`vi.fn()` for Callbacks Passed as Props**
	- React Testing Library itself doesn't have `vi.fn()`. Instead, for testing callback functions passed as props, you can mock them using Jest's `jest.fn()`
		```jsx
		import { render, screen } from '@testing-library/react';
		import Button from './Button';

		it('onClick callback', () => {
		  const onClickMock = jest.fn();
		  render(<Button onClick={onClickMock} />);
		  
		  const buttonElement = screen.getByRole('button');
		  userEvent.click(buttonElement);
		  
		  expect(onClickMock).toHaveBeenCalled();
		});
		```
6. **Summary**
React Testing Library (RTL) provides a robust set of utilities for testing React components in a user-centric way. It emphasizes testing components as users would interact with them, ensuring your tests are resilient to implementation changes. With utilities like `render`, `screen` methods (`getByTestId`, etc.), `user-event` library, and hooks testing (`renderHook`, `act`), RTL enables comprehensive and effective testing of React applications.
### 2.4 Mocking API calls
Mock Service Worker (MSW) is a powerful library for mocking API calls in testing environments. It intercepts network requests and provides mocked responses, making it ideal for testing components that depend on external data. Here's a detailed explanation of how to set up and use MSW for testing API calls with React Testing Library.

1. **Step 1: Install MSW**
	- First, install MSW: `npm install msw --save-dev` 

2. **Step 2: Setup Mock Server**
	- In your `src/test-setup/mockServer.js` file, you set up the mock server:
		```js
		import { setupServer } from "msw/node"

		export const mockServer = setupServer()` 
		```
3. **Step 3: Configure Jest/Vitest**
	- In your `src/test-setup/setupTests.js` file, configure the mock server to start before all tests and clean up after each test:
		```js
		import * as matchers from "@testing-library/jest-dom/matchers"
		import { expect, afterEach, beforeAll, afterAll } from "vitest"
		import { cleanup } from "@testing-library/react"
		import { mockServer } from "./mockServer"

		expect.extend(matchers)

		beforeAll(() => {
		  mockServer.listen({ onUnhandledRequest: "error" })
		})

		afterEach(() => {
		  cleanup()
		  mockServer.resetHandlers()
		})

		afterAll(() => {
		  mockServer.close()
		})
		``` 

4. **Define the Mock Response**
In your test file, you define the mock response for the API endpoint and verify the component's behavior:
In your `PostList` test file:
```jsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PostList from "./PostList"
import { mockServer } from "./test-setup/mockServer"
import { HttpResponse, http } from "msw"

describe("PostList component", () => {
  it("should get list of posts", async () => {
    // Define the mock response
    mockServer.use(
      http.get("http://example.com/api/posts", () => {
        return HttpResponse.json([
          { id: 1, title: "post 1" },
          { id: 2, title: "post 2" },
        ])
      })
    )

    // Render the component
    render(<PostList />)

    // Verify the mock data is displayed
    expect(await screen.findByText("post 1")).toBeInTheDocument()
    expect(await screen.findByText("post 2")).toBeInTheDocument()
    screen.debug()
  })
})
``` 

#### Explanation

1.  **Mock Server Initialization**:
    -   `setupServer` from `msw/node` initializes the mock server.
    -   `mockServer.listen({ onUnhandledRequest: "error" })` starts the server before all tests.
    -   `mockServer.resetHandlers()` resets the handlers after each test to avoid interference between tests.
    -   `mockServer.close()` stops the server after all tests.

2.  **Mock Response Setup**:
    -   `mockServer.use` defines the mock response for a specific API call.
    -   `http.get` specifies the HTTP method and endpoint to intercept.
    -   `HttpResponse.json` returns the mock JSON response.

3.  **Render and Verify**:
    -   `render(<PostList />)` renders the component.
    -   `screen.findByText("post 1")` waits for the element containing "post 1" to appear in the document.
    -   `expect(...).toBeInTheDocument()` asserts that the expected elements are present in the DOM.

### Summary
MSW provides a seamless way to mock API calls, allowing you to test components that depend on external data without making real network requests. This setup ensures your tests are isolated, reliable, and faster. By following these steps, you can effectively use MSW in your React applications to test components that interact with APIs.
