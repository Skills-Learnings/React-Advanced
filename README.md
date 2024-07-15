
# Asynchronous React

## Topics covered in this section of course

2. Asynchronous React
	- Suspense
	- React Lazy
	- useDeffered Value
	- useTransition
	- Async React Router

## Learnings

### 2.1 Suspense
**Suspense** is a feature in React that lets you handle asynchronous operations more gracefully, particularly for data fetching, code splitting, and handling concurrent rendering. It enables you to display a fallback component while waiting for the asynchronous operation to complete.

#### Key Concepts

1.  **Fallback UI**: Suspense allows you to specify a fallback UI (e.g., a spinner, a loading message) that is displayed while the component is waiting for some asynchronous operation to complete.
2.  **Data Fetching**: When used with libraries like React Query, Relay, or SWR, Suspense can manage data fetching more declaratively.
3.  **Code Splitting**: Suspense works seamlessly with `React.lazy` to dynamically load components when they are needed, improving the initial load time of your application.

#### Basic Usage

1. **Data Fetching with Suspense**
	- To use Suspense for data fetching, you need to use a data fetching library that supports it, such as React Query, Relay, or SWR.
	- Here's an example using React Query:
	- **Setup**
		- First, install React Query:
`npm install @tanstack/react-query` 
	- **Example**
		```jsx
		import React, { Suspense } from 'react';
		import { useQuery } from '@tanstack/react-query';
		import { QueryClient, QueryClientProvider } from 'react-query';

		const queryClient = new QueryClient();

		function fetchUser() {
		  return fetch('https://jsonplaceholder.typicode.com/users/1')
		    .then(response => response.json());
		}

		function User() {
		  const { data } = useQuery({
		    queryFn: () => fetchUser(),
		    retry: false,
		    suspense: true,
		  })
		  
		  return (
		    <div>
		      <h1>{data.name}</h1>
		      <p>{data.email}</p>
		    </div>
		  );
		}

		function App() {
		  return (
		    <QueryClientProvider client={queryClient}>
		      <Suspense fallback={<div>Loading user data...</div>}>
		        <User />
		      </Suspense>
		    </QueryClientProvider>
		  );
		}

		export default App;
		``` 
		In this example, the `User` component fetches user data. While the data is being fetched, the fallback UI (`<div>Loading user data...</div>`) is displayed.

2. **Error Handling with Suspense**
	- Suspense on its own doesn't handle errors, but you can use Error Boundaries to catch errors and display a fallback UI for them.
	- **Example**
		```jsx
		import React, { Suspense, Component } from 'react';
		import { useQuery } from '@tanstack/react-query';
		import { QueryClient, QueryClientProvider } from 'react-query';

		const queryClient = new QueryClient();

		function fetchUser() {
		  return fetch('https://jsonplaceholder.typicode.com/users/1')
		    .then(response => response.json());
		}

		function User() {
		  const { data }  = useQuery({
			queryFn: () => fetchUser(),
			retry: false,
			suspense: true,
		  })
		  
		  return (
		    <div>
		      <h1>{data.name}</h1>
		      <p>{data.email}</p>
		    </div>
		  );
		}

		class ErrorBoundary extends Component {
		  constructor(props) {
		    super(props);
		    this.state = { hasError: false };
		  }

		  static getDerivedStateFromError(error) {
		    return { hasError: true };
		  }

		  render() {
		    if (this.state.hasError) {
		      return <h1>Something went wrong.</h1>;
		    }

		    return this.props.children;
		  }
		}

		function App() {
		  return (
		    <QueryClientProvider client={queryClient}>
		      <ErrorBoundary>
		        <Suspense fallback={<div>Loading user data...</div>}>
		          <User />
		        </Suspense>
		      </ErrorBoundary>
		    </QueryClientProvider>
		  );
		}

		export default App;
		``` 
		In this example, the `ErrorBoundary` component catches any errors that occur during rendering, including those that might be thrown by the Suspense fallback or the `User` component.

3. **Conclusion**
**Suspense** is a powerful feature in React for handling asynchronous operations like data fetching and code splitting. It allows you to display a fallback UI while waiting for the operation to complete, providing a better user experience. When combined with data fetching libraries and Error Boundaries, Suspense can make your applications more robust and performant.

### 2.2 React Lazy
`React.lazy` is a function in React that allows you to dynamically import a component. This technique, also known as code splitting, enables you to load components lazily (only when they are needed) rather than at the initial load. This can significantly improve the performance of your application by reducing the initial bundle size.

#### Benefits of Using `React.lazy`

1.  **Improved Performance**: By splitting your code and loading components only when needed, you can decrease the initial load time of your application.
2.  **Better User Experience**: Since the main bundle is smaller, users can interact with the application faster. The loading of additional components happens in the background or upon user interaction.
3.  **Efficient Resource Usage**: Only the necessary code is downloaded and executed, leading to more efficient use of bandwidth and system resources.

#### How to Use `React.lazy`

To use `React.lazy`, you need to wrap the component import with `React.lazy` and use it with `React.Suspense` to handle the loading state.

**Example Code**

1. **Step 1: Create Components**
	- First, create a couple of components that you want to load lazily.
	- **MyComponent.jsx**
		```jsx
		export default function MyComponent() {
		  return <div>This is MyComponent</div>;
		}
		``` 

	- **AnotherComponent.jsx**
		```jsx
		export default function AnotherComponent() {
		  return <div>This is AnotherComponent</div>;
		}
		``` 

2. **Step 2: Use `React.lazy` and `React.Suspense`**
	- Now, use `React.lazy` to dynamically import these components and `React.Suspense` to wrap them and provide a fallback UI.
	- **App.jsx**
		```jsx
		import React, { Suspense } from 'react';

		const MyComponent = React.lazy(() => import('./MyComponent'));
		const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

		export default function App() {
		  return (
		    <div>
		      <h1>React.lazy Example</h1>
		      <Suspense fallback={<div>Loading...</div>}>
		        <MyComponent />
		        <AnotherComponent />
		      </Suspense>
		    </div>
		  );
		}
		``` 

3. **Explanation**
	- **Importing with `React.lazy`**:
	    ```jsx
	    const MyComponent = React.lazy(() => import('./MyComponent'));
	    const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
	    ``` 
    
	    Here, `React.lazy` is used to dynamically import `MyComponent` and `AnotherComponent`. The import statement inside the arrow function is a dynamic import, which returns a promise.
    
	- **Wrapping with `React.Suspense`**:
		```jsx
		<Suspense fallback={<div>Loading...</div>}>
		  <MyComponent />
		  <AnotherComponent />
		</Suspense>
		``` 
	    `React.Suspense` is used to wrap the lazy-loaded components. The `fallback` prop specifies what to render while the lazy-loaded component is being fetched. In this case, a simple "Loading..." message is displayed.
    
#### Key Points to Keep in Mind
1.  **Error Boundaries**: When using `React.lazy`, it's a good practice to wrap `Suspense` with an error boundary to handle loading errors gracefully.
2.  **Server-Side Rendering**: `React.lazy` does not work with server-side rendering. If you're using server-side rendering, consider other techniques like `Loadable Components`.
3.  **Bundling**: Make sure your bundler (e.g., Webpack) supports dynamic imports. Most modern bundlers do, but it's good to verify.

#### Conclusion
`React.lazy` and `React.Suspense` provide an easy and powerful way to implement code splitting in your React applications. By loading components only when needed, you can improve the performance and user experience of your application. Just ensure you handle errors properly and are aware of the limitations with server-side rendering.
### 2.3 useDeffered Value
The `useDeferredValue` hook is a part of React's concurrent rendering feature, introduced in React 18. It helps in deferring the value of a state update to a lower priority, thereby avoiding blocking the main thread for high-priority tasks like user interactions.

#### Why Use `useDeferredValue`

When you have a component that renders a large list or performs a computation-intensive task based on a state change, updating that state directly can cause the UI to become unresponsive. `useDeferredValue` allows you to defer these updates to avoid jank and keep the UI responsive.

#### How `useDeferredValue` Works

`useDeferredValue` lets you mark a piece of state as deferred, meaning that React will prioritize more urgent updates (like user inputs) over updates to the deferred state. When React has time, it will then apply the deferred state update.

#### Example Code

**Scenario**
Imagine you have a search input that filters a large list of items. Without deferring the state, each keystroke can cause a delay in rendering the filtered list.

1. **Step 1: Create Components**
	- **App.jsx**
		```jsx
		import React, { useState, useDeferredValue, useMemo } from 'react';
		import List from './List';

		const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

		export default function App() {
		  const [query, setQuery] = useState('');
		  const deferredQuery = useDeferredValue(query);
		  const filteredItems = useMemo(() => {
		    return items.filter(item => item.includes(deferredQuery));
		  }, [deferredQuery]);

		  return (
		    <div>
		      <input
		        type="text"
		        value={query}
		        onChange={(e) => setQuery(e.target.value)}
		        placeholder="Search..."
		      />
		      <List items={filteredItems} />
		    </div>
		  );
		}`` 
		```
	- **List.jsx**
		```jsx
		import React from 'react';

		export default function List({ items }) {
		  return (
		    <ul>
		      {items.map((item, index) => (
		        <li key={index}>{item}</li>
		      ))}
		    </ul>
		  );
		}
		``` 

#### Explanation

1.  **State Management**:
	```jsx
	const [query, setQuery] = useState('');
	const deferredQuery = useDeferredValue(query);
	```     
    -   `query` is the state that directly reflects the user's input.
    -   `deferredQuery` is a deferred version of `query`, meaning React will delay its update.
2.  **Memoizing Filtered Items**:
	```jsx
	const filteredItems = useMemo(() => {
	  return items.filter(item => item.includes(deferredQuery));
	}, [deferredQuery]);
	```    
    -   `useMemo` is used to memoize the filtered items based on `deferredQuery`.
    -   The filtering operation only runs when `deferredQuery` changes, not on every render.
3.  **Rendering the List**:
    `<List items={filteredItems} />` 
    
    -   The `List` component renders the filtered items.

#### Key Points to Keep in Mind

-   **Deferred Value**: `useDeferredValue` does not guarantee immediate updates. It will apply updates when React has time, prioritizing urgent updates first.
-   **Performance**: This hook is beneficial in performance-intensive applications where immediate state updates can cause noticeable delays.
-   **Concurrent Mode**: Ensure that your application is running in concurrent mode to take full advantage of `useDeferredValue`.

#### Conclusion

The `useDeferredValue` hook is a powerful tool in React 18 for managing state updates efficiently, especially in performance-critical applications. By deferring less critical state updates, you can ensure that your UI remains responsive and provides a better user experience.

### 2.4 useTransition
The `useTransition` hook is a feature in React 18 that enables you to mark state updates as transitions. This allows you to defer non-urgent updates, providing a smoother user experience by keeping the UI responsive during high-priority tasks.

#### Why Use `useTransition`

In complex applications, certain state updates may cause performance bottlenecks, making the UI feel sluggish. By using `useTransition`, you can prioritize urgent updates (like user inputs) over non-urgent ones, ensuring that the application remains responsive.

#### How `useTransition` Works

`useTransition` allows you to define a state update as a transition, meaning that React will handle these updates with a lower priority. This is useful for operations like filtering large lists, fetching data, or updating complex components.

#### Example Code

**Scenario**
Imagine you have a search input that filters a large list of items. Using `useTransition`, you can mark the filtering operation as a transition to avoid blocking the main thread.

1. **Step 1: Create Components**
	- **App.jsx**

		```jsx
		import React, { useState, useTransition, useMemo } from 'react';
		import List from './List';

		const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

		export default function App() {
		  const [query, setQuery] = useState('');
		  const [isPending, startTransition] = useTransition();

		  const handleChange = (e) => {
		    const value = e.target.value;
		    startTransition(() => {
		      setQuery(value);
		    });
		  };

		  const filteredItems = useMemo(() => {
		    return items.filter(item => item.includes(query));
		  }, [query]);

		  return (
		    <div>
		      <input
		        type="text"
		        onChange={handleChange}
		        placeholder="Search..."
		      />
		      {isPending ? <p>Loading...</p> : <List items={filteredItems} />}
		    </div>
		  );
		}
		``` 	

	- **List.jsx**
		```jsx		
		import React from 'react';

		export default function List({ items }) {
		  return (
		    <ul>
		      {items.map((item, index) => (
		        <li key={index}>{item}</li>
		      ))}
		    </ul>
		  );
		}
		``` 

#### Explanation

1.  **State Management**:
    `const [query, setQuery] = useState('');
    const [isPending, startTransition] = useTransition();` 
    
    -   `query` holds the current search query.
    -   `isPending` is a boolean that indicates if the transition is ongoing.
    -   `startTransition` is a function that marks a state update as a transition.
2.  **Handling Input Changes**:
    ```jsx
    const handleChange = (e) => {
      const value = e.target.value;
      startTransition(() => {
        setQuery(value);
      });
    };
    ``` 
    
    -   When the input value changes, `startTransition` defers the `setQuery` update, marking it as non-urgent.
3.  **Memoizing Filtered Items**:
    ```jsx
    const filteredItems = useMemo(() => {
      return items.filter(item => item.includes(query));
    }, [query]);
    ``` 
    -   `useMemo` is used to memoize the filtered items based on `query`.
4.  **Rendering the List**:
    `{isPending ? <p>Loading...</p> : <List items={filteredItems} />}` 
    
    -   While the transition is pending, a loading indicator is displayed.
    -   Once the transition is complete, the filtered list is rendered.

#### Key Points to Keep in Mind

-   **Deferring Updates**: `useTransition` is useful for deferring updates that don't need to happen immediately, like filtering or sorting large datasets.
-   **isPending**: This flag can be used to show loading states or indicators to inform users that an update is in progress.
-   **Prioritization**: `useTransition` helps React prioritize urgent updates, like user inputs, over non-urgent ones.

#### Conclusion

The `useTransition` hook is a valuable tool in React 18 for managing the performance of state updates. By marking certain updates as transitions, you can ensure that your application remains responsive, even during complex operations. This leads to a better user experience, especially in performance-critical applications.
### 2.5 Async React Router
In React, `Suspense` and lazy loading can be used to optimize your application by loading components asynchronously, which can improve performance and reduce initial load times. React Router provides robust support for these features, enabling seamless integration with routing.

Here’s an explanation of how to set up async React Router with `Suspense` and lazy loading.

#### Step-by-Step Breakdown

 1. **`main.jsx`**
	- This file sets up the router and renders the application. We use `React.lazy` to lazy load the `Team` component, and `Suspense` to display a fallback while the component is loading.

		```jsx
		import React, { lazy } from "react";
		import ReactDOM from "react-dom/client";
		import {
		  createBrowserRouter,
		  createRoutesFromElements,
		  Route,
		  RouterProvider,
		} from "react-router-dom";
		import { Nav } from "./Nav";
		import { homeRoute } from "./Home";
		import { storeRoute } from "./Store";
		import { wait } from "./wait";

		const Team = lazy(() => wait(import("./Team"), 1000));

		const router = createBrowserRouter(
		  createRoutesFromElements(
		    <Route path="/" element={<Nav />}>
		      <Route index={true} {...homeRoute} />
		      <Route path="/store" {...storeRoute} />
		      <Route path="/team" element={<Team />} />
		    </Route>
		  )
		);

		ReactDOM.createRoot(document.getElementById("root")).render(
		  <React.StrictMode>
		    <RouterProvider router={router} />
		  </React.StrictMode>
		);
		``` 

	-   `React.lazy` is used to import the `Team` component lazily.
	-   `Suspense` is used to display a fallback UI while the lazy-loaded component is being fetched.

2. **`Nav.jsx`**
	- The `Nav` component includes navigation links and an `Outlet` for rendering matched routes. It uses `Suspense` to wrap the `Outlet` component, displaying a fallback during loading.
		```jsx
		import { Suspense } from "react";
		import { Link, Outlet, useNavigation } from "react-router-dom";

		export function Nav() {
		  const { state } = useNavigation();
		  return (
		    <>
		      <Link to="/">Home</Link>
		      <br />
		      <Link to="/store">Store</Link>
		      <br />
		      <Link to="/team">Team</Link>
		      <br />
		      {state === "loading" && "Loading..."}
		      <Suspense fallback="Loading...">
		        <Outlet />
		      </Suspense>
		    </>
		  );
		}
		``` 

	-   `useNavigation` is used to determine the navigation state.
	-   `Suspense` wraps the `Outlet` to show a fallback while the content is loading.

 3. **`Home.jsx`**
	- The `Home` component fetches data asynchronously and uses `Suspense` and `Await` for rendering the data when it's available.

		```jsx
		import { Await, defer, useLoaderData } from "react-router-dom";
		import { wait } from "./wait";
		import { Suspense } from "react";

		function Home() {
		  const { dataPromise } = useLoaderData();

		  return (
		    <h1>
		      Home -{" "}
		      <Suspense fallback="Loading">
		        <Await resolve={dataPromise}>{(data) => <span>{data}</span>}</Await>
		      </Suspense>
		    </h1>
		  );
		}

		function loader() {
		  return defer({ dataPromise: wait("Loaded", 1000) });
		}

		export const homeRoute = { element: <Home />, loader };
		``` 

	-   `defer` is used to defer the data fetching until needed.
	-   `useLoaderData` is used to access the data fetched by the loader.
	-   `Await` is used within `Suspense` to handle the resolved data promise.

3. **`Store.jsx`**
	- Similar to the `Home` component, `Store` uses deferred data fetching and `Suspense` for rendering.

		```jsx
		import { Await, useLoaderData } from "react-router-dom";
		import { wait } from "./wait";
		import { Suspense } from "react";

		function Store() {
		  const { productCountPromise, categoryPromise } = useLoaderData();

		  return (
		    <>
		      <h1>Store</h1>
		      <strong>Product Count: </strong>{" "}
		      <Suspense fallback="Loading">
		        <Await resolve={productCountPromise}>
		          {(count) => <span>{count}</span>}
		        </Await>
		      </Suspense>
		      <br />
		      <strong>Category: </strong>{" "}
		      <Suspense fallback="Loading">
		        <Await resolve={categoryPromise}>
		          {(category) => <span>{category}</span>}
		        </Await>
		      </Suspense>
		    </>
		  );
		}

		function loader() {
		  const productCountPromise = wait(4, 1000);
		  const categoryPromise = wait("Sports", 2000);

		  return {
		    productCountPromise,
		    categoryPromise,
		  };
		}

		export const storeRoute = { element: <Store />, loader };
		``` 

	-   Multiple deferred data fetching operations are handled using promises.
	-   `Suspense` and `Await` are used to render data when it becomes available.

4. **`Team.jsx`** 
	- The `Team` component is a simple component that will be lazily loaded.

		```jsx
		import React from 'react';

		export default function Team() {
		  return (
		    <div>Team</div>
		  );
		}
		``` 

#### Summary

-   **Lazy Loading**: `React.lazy` is used for dynamic imports, allowing components to be loaded on demand.
-   **Suspense**: React’s `Suspense` component is used to display fallback UI during loading.
-   **Data Fetching**: React Router's `defer` and `Await` functions manage asynchronous data fetching and rendering.
-   **Fallback UI**: A fallback UI is provided while the components or data are being loaded.

By combining `Suspense`, `lazy`, and React Router, you can create a highly performant and user-friendly application, efficiently handling async operations and providing smooth transitions between routes.
