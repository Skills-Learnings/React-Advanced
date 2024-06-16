
# Type Safety

## Topics covered in this section of course
2.  Type Safety
    - Typescript setup and Props
    - Typescript useState
    - Typescript useRef
    - Typescript useReducer
    - Typescript useContext
    - Typescript Generic Component
## Learnings
### 2.2 Typescript setup and Props
 TypeScript is a statically typed superset of JavaScript that offers additional features like type checking and interfaces, making it a powerful tool for developing large-scale applications. Setting up TypeScript in a React project and using it to type props can significantly enhance the development experience by catching errors early and improving code readability.
#### 2.2.1 Setting up react with typescript vite project
1. **Create a Vite Project**:
	- Create a new vite project by executing the following command.
	`npm create vite@latest`
	- Enter your name and framework as react in the prompts.
	- Select variant as Typescript in the prompt.
2. **Run the project:**
	- Execute the below commands to run the project.
		```
		cd <project-directory>
		npm install
		npm run dev
		```
	-  Your Vite React project with TypeScript is now set up. You can start creating TypeScript files and enjoy the benefits of type checking and improved editor support.
#### 2.2.2 Props in React with TypeScript
Props are a fundamental concept in React, used to pass data from parent components to child components. TypeScript enhances the experience by providing type safety, ensuring that the correct types are passed to components.
1. **Defining Props with TypeScript**
	- To define props in a TypeScript React component, you first need to define an interface or type for the props. Then, you use that interface/type in your component.
	- **Example**
		```jsx
		// Define the type for the props
		type GreetingProps {
		  name: string;
		  age?: number; // Optional prop
		  isMember: boolean;
		}

		// Functional component using the props interface
		export default function Greeting({ name, age, isMember }: GreetingProps) => {
		  return (
		    <div>
		      <h1>Hello, {name}!</h1>
		      {age && <p>Age: {age}</p>}
		      <p>Membership Status: {isMember ? 'Member' : 'Non-member'}</p>
		    </div>
		  );
		};
		```
	- In this example:
		-   **GreetingProps**: Defines the shape of the props object. The `name` and `isMember` properties are required, while `age` is optional.
		-   **Greeting**: A functional component that takes `GreetingProps` as props.
	- You can now use this component and TypeScript will enforce the prop types
2. **Conclusion**
Setting up a Vite project with React and TypeScript is simple and provides a powerful environment for building modern web applications. TypeScript enhances React development by providing type safety, which helps catch errors early and improves code readability and maintainability. Using TypeScript with React props ensures that components receive the correct data, making your application more robust and easier to maintain.
### 2.3 Typescript useState
Using `useState` with TypeScript in React involves defining the type of state values to ensure type safety. Here are some important considerations and examples to help you use `useState` effectively with TypeScript.

1. **Basic Usage**
	- When you use `useState` in a TypeScript project, you can specify the type of the state variable. This helps TypeScript understand what type of data the state should hold, providing you with type-checking and autocomplete features.
	- **Basic Example**
```jsx
import { useState } from 'react';

export default function Counter(){
  // Explicitly define the state type as number
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
``` 

2. **Using Complex Types**
	- For more complex state types, such as objects or arrays, you can define interfaces or types.
	- **Example with an Object**
		```jsx
		import{ useState } from 'react';

		type User {
		  name: string;
		  age: number;
		}

		export default function UserInfo(){
		  const [user, setUser] = useState<User>({ name: '', age: 0 });

		  const updateUser = () => {
		    setUser({ name: 'John', age: 25 });
		  };

		  return (
		    <div>
		      <p>Name: {user.name}</p>
		      <p>Age: {user.age}</p>
		      <button onClick={updateUser}>Update User</button>
		    </div>
		  );
		};
		```
	- **Using Arrays**
		```jsx
		import { useState } from 'react';

		export default function ItemsList(){
		  const [items, setItems] = useState<string[]>([]);

		  const addItem = () => {
		    setItems([...items, 'New Item']);
		  };

		  return (
		    <div>
		      <ul>
		        {items.map((item, index) => (
		          <li key={index}>{item}</li>
		        ))}
		      </ul>
		      <button onClick={addItem}>Add Item</button>
		    </div>
		  );
		};
		``` 

3. **Handling Undefined or Null States**
	-	Sometimes, the state might be `undefined` or `null` initially, and you need to handle that.
	- **Example with Optional State**
		```jsx
		import { useState } from 'react';

		type Profile {
		  username: string;
		  bio: string;
		}

		export default function UserProfile:(){
		  const [profile, setProfile] = useState<Profile | null>(null);

		  const loadProfile = () => {
		    setProfile({ username: 'john_doe', bio: 'Software developer' });
		  };

		  return (
		    <div>
		      {profile ? (
		        <>
		          <p>Username: {profile.username}</p>
		          <p>Bio: {profile.bio}</p>
		        </>
		      ) : (
		        <p>No profile loaded.</p>
		      )}
		      <button onClick={loadProfile}>Load Profile</button>
		    </div>
		  );
		};
		``` 

4. **Using Type Inference**
	- TypeScript can often infer the type of the state based on the initial value you provide to `useState`. However, explicitly typing the state can be beneficial for readability and maintenance.
	- **Example with Type Inference**
		```jsx
		import { useState } from 'react';

		export default function Example(){
		  const [text, setText] = useState(''); // TypeScript infers text is string

		  return (
		    <div>
		      <p>Text: {text}</p>
		      <input
		        type="text"
		        value={text}
		        onChange={(e) => setText(e.target.value)}
		      />
		    </div>
		  );
		};
		``` 
6. **Key Considerations**
	- **Type Safety**: Always define or infer the type of state to avoid runtime errors.
	-  **Complex Types**: Use interfaces or types for complex state structures.
	-  **Nullable State**: Handle `undefined` or `null` states properly, especially when dealing with asynchronous data fetching.
	-  **Type Inference**: Rely on TypeScript’s type inference when possible, but don’t hesitate to explicitly define types for clarity.
	- **Initial State**: Ensure the initial state aligns with the defined type to prevent type errors.

By following these guidelines, you can effectively use `useState` with TypeScript, leveraging type safety and improving your React code's robustness and maintainability.
### 2.4 Typescript useRef
Using `useRef` with TypeScript in React allows you to create mutable references to DOM elements or other mutable values that persist across renders without causing a re-render when they change. Here are key points and examples to help you understand and use `useRef` effectively with TypeScript.
1. **Referencing DOM Elements**:
	- When you use `useRef` to reference DOM elements, you need to specify the type of the element.
		```jsx
		import React, { useRef, useEffect } from 'react';

		export default function TextInput(){
		  const inputRef = useRef<HTMLInputElement>(null);

		  useEffect(() => {
		    if (inputRef.current) {
		      inputRef.current.focus();
		    }
		  }, []);

		  return <input ref={inputRef} type="text" />;
		};
		``` 
	- **Key Considerations**:
		1.  **Initial Value**: When creating a ref, you can initialize it with a value or `null`. TypeScript will infer the type based on the initial value.
		2.  **Type Annotation**: Explicitly annotate the type of the ref when dealing with complex types or when TypeScript cannot infer the type.
		3.  **Handling Null**: Always account for the possibility that the ref might be `null` when it is first created or if the element is conditionally rendered.

2. **Example with a Mutable Object**
	- You can use `useRef` to hold a mutable object, which won't cause a re-render when its properties change.
		```jsx
		import React, { useRef } from 'react';

		export default function Timer(){
		  const timerRef = useRef<number | null>(null);

		  const startTimer = () => {
		    if (timerRef.current) {
		      clearInterval(timerRef.current);
		    }
		    timerRef.current = window.setInterval(() => {
		      console.log('Tick');
		    }, 1000);
		  };

		  const stopTimer = () => {
		    if (timerRef.current) {
		      clearInterval(timerRef.current);
		    }
		  };

		  return (
		    <div>
		      <button onClick={startTimer}>Start Timer</button>
		      <button onClick={stopTimer}>Stop Timer</button>
		    </div>
		  );
		};
		``` 

3. **Using `useRef` for Form Elements**
	- When working with form elements, you can use `useRef` to manage focus or retrieve values.
		```jsx
		import React, { useRef } from 'react';

		export default function Form(){
		  const inputRef = useRef<HTMLInputElement>(null);

		  const handleSubmit = (e: React.FormEvent) => {
		    e.preventDefault();
		    if (inputRef.current) {
		      alert(`Input Value: ${inputRef.current.value}`);
		    }
		  };

		  return (
		    <form onSubmit={handleSubmit}>
		      <input ref={inputRef} type="text" />
		      <button type="submit">Submit</button>
		    </form>
		  );
		};
		``` 

4. **Summary**
	-   **DOM References**: Use `useRef` to keep references to DOM elements, ensuring you specify the correct element type.
	-   **Mutable Objects**: Use `useRef` for mutable objects that need to persist across renders without causing re-renders.
	-   **Forms**: Manage focus and retrieve values from form elements using `useRef`.

By following these guidelines and examples, you can effectively use `useRef` with TypeScript, ensuring type safety and avoiding common pitfalls.
### 2.5 Typescript useReducer
Using `useReducer` with TypeScript in React is a powerful way to manage state, especially for complex state logic. Here are key points, considerations, and examples to help you understand and use `useReducer` effectively with TypeScript.

#### Basic Usage

1.  **Defining State and Actions**
	- First, you need to define the types for your state and actions. This ensures that TypeScript can provide type checking and autocompletion.

		```ts
		// State type
		type State = {
		  count: number;
		};

		// Action types
		type Action = { type: 'increment' } | { type: 'decrement' };

		const initialState: State = { count: 0 };

		// Reducer function
		const reducer = (state: State, action: Action): State => {
		  switch (action.type) {
		    case 'increment':
		      return { count: state.count + 1 };
		    case 'decrement':
		      return { count: state.count - 1 };
		    default:
		      throw new Error('Unknown action type');
		  }
		};
		``` 

2. **Using `useReducer` in a Component**
	- Next, use `useReducer` in a component, passing the reducer and initial state.

		```jsx
		import React, { useReducer } from 'react';

		export default function Counter(){
		  const [state, dispatch] = useReducer(reducer, initialState);

		  return (
		    <div>
		      <p>Count: {state.count}</p>
		      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
		      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
		    </div>
		  );
		};

		export default Counter;
		``` 

3. **Key Considerations**
	-  **State Type**: Define the type for your state to ensure that TypeScript can infer the shape of your state correctly.
	-  **Action Types**: Use a union type for actions to cover all possible actions and payloads.
	- **Initial State**: Ensure that your initial state is correctly typed to match the state type.
	- **Reducer Function**: The reducer function should return a new state based on the current state and action. It should also handle default cases to avoid runtime errors.

#### Handling Complex State
1.  **Defining State and Actions**
	- For more complex state management, you can define more intricate state and action types.
		```ts
		// State type
		type State = {
		  count: number;
		  loading: boolean;
		  error: string | null;
		};

		// Action types
		type Action =
		  | { type: 'increment' }
		  | { type: 'decrement' }
		  | { type: 'loading'; payload: boolean }
		  | { type: 'error'; payload: string };

		const initialState: State = { count: 0, loading: false, error: null };

		// Reducer function
		const reducer = (state: State, action: Action): State => {
		  switch (action.type) {
		    case 'increment':
		      return { ...state, count: state.count + 1 };
		    case 'decrement':
		      return { ...state, count: state.count - 1 };
		    case 'loading':
		      return { ...state, loading: action.payload };
		    case 'error':
		      return { ...state, error: action.payload };
		    default:
		      throw new Error('Unknown action type');
		  }
		};
		``` 

2. **Using `useReducer` in a Complex Component**
	```jsx
	import React, { useReducer } from 'react';

	export default function ComplexCounter(){
	  const [state, dispatch] = useReducer(reducer, initialState);

	  const handleError = () => {
	    dispatch({ type: 'error', payload: 'An error occurred' });
	  };

	  const setLoading = (loading: boolean) => {
	    dispatch({ type: 'loading', payload: loading });
	  };

	  return (
	    <div>
	      <p>Count: {state.count}</p>
	      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
	      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
	      <button onClick={handleError}>Trigger Error</button>
	      {state.loading ? <p>Loading...</p> : <p>Not Loading</p>}
	      {state.error && <p>Error: {state.error}</p>}
	    </div>
	  );
	};
	``` 

3. **Key Points to Keep in Mind**
	-  **Type Inference**: TypeScript can often infer types, but explicitly defining types for state and actions ensures clarity and maintainability.
	-  **Action Payloads**: Define payloads for actions when additional data is required.
	-  **Switch Cases**: Always handle all possible action types in the reducer to prevent runtime errors.
	-  **Default Case**: Include a default case in the reducer to handle unexpected action types, which can also be used to throw an error.

By following these guidelines and examples, you can effectively use `useReducer` with TypeScript, ensuring type safety and robustness in your React applications.
### 2.6 Typescript useContext
Using `useContext` with TypeScript in React helps ensure type safety when managing global state or shared data across components. Here's an in-depth explanation along with key considerations and examples:

#### Basic Usage
1.  **Creating Context**
2.  **Providing Context**
3.  **Consuming Context**

#### Step 1: Creating Context
When creating a context, you need to define the type of the context value.
```jsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
type ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create a context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
``` 

#### Step 2: Providing Context
Create a provider component that will wrap your application or the parts of it that need access to the context.

```jsx
export default function ThemeProvider ({ children }: ReactNode
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```
#### Step 3: Consuming Context

Use the `useContext` hook in any component that needs access to the context value.

```jsx
export default function ThemeToggler() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useContext must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = context;

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
``` 

#### Key Considerations
1.  **Type Safety**: Ensure the context value and functions are correctly typed.
2.  **Default Value**: TypeScript needs a default value when creating context. If the default value is complex, you can use `undefined` and handle it in the consumer.
3.  **Provider Wrapper**: Ensure the context provider wraps the component tree that needs access to the context.

#### Summary
-   **Creating Context**: Define types and create context with `createContext`.
-   **Providing Context**: Use a provider component to wrap your application or specific parts.
-   **Consuming Context**: Use `useContext` within components to access the context value.
-   **Type Safety**: Ensure all context values and functions are correctly typed for TypeScript to provide proper type checking and autocompletion.
-   **Default Value Handling**: Use `undefined` as the default value if the context is optional and handle it in the consumer.

By following these guidelines, you can effectively use `useContext` with TypeScript, ensuring robust and type-safe context management in your React applications.
