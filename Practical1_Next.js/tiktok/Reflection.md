## Concepts Applied

### 1. Next.js App Router
- **File-based routing**: Pages were set up by arranging files inside the `app` directory (profile/page.jsx, upload/page.jsx, etc.)
- **Layout system**: A root layout and several nested layouts were established following the App Router structure
- **Client vs Server Components**: The 'use client' directive was applied to components that required user interaction

### 2. React Components Architecture
- **Component Composition**: Reusable components such as `VideoCard` were developed to receive and display props
- **Component Organization**: Components were divided into dedicated folders based on their purpose (layout/, ui/)
- **State Management**: The useState hook was applied to manage dynamic UI behavior (such as toggling buttons)

### 3. Tailwind CSS Styling
- A utility-first workflow was used to speed up the interface building process
- Flexbox and grid were used to achieve a fully responsive design
- The overall styling was customized to reflect a TikTok-style appearance

### 4. Form Handling with React Hook Form
- **Form registration**: The `register` function was used to link each input field to the form state
- **Validation rules**: Required fields, pattern matching, and minLength restrictions were all configured
- **Error handling**: Validation messages were rendered directly beneath their corresponding input fields
- **Form submission**: Default browser behavior was suppressed and loading states were managed throughout

### 5. React Icons Integration
- Font Awesome icons were brought in using the react-icons package
- Icon buttons were made interactive to support various user actions

### What I Learned

### Key Learning Outcomes

1. **Next.js App Router Benefits**
   - The App Router introduces a much cleaner and more logical method for structuring routes
   - Layouts that persist through navigation help reduce unnecessary re-renders and boost performance
   - Distinguishing between client and server components is a fundamental concept to grasp

2. **Form Validation Importance**
   - Thorough input validation ensures that only properly formatted data gets submitted
   - Providing feedback in real time makes forms easier and less frustrating to complete
   - Matching password fields requires building a dedicated custom validation function

3. **Component Reusability**
   - Designing flexible components like VideoCard cuts down on repetitive code significantly
   - Components that rely on props can be reused across multiple parts of the application
   - Temporary placeholder data lets you verify the UI looks correct before hooking up a real API

## Challenges

### 1. Buttons Appearing Double
- **Issue**: While rendering the video feed, action buttons such as like and share were showing up twice on each card. The UI appeared duplicated and clicking one button would trigger both instances.
- **Solution**: After tracing through the code, I found that the `VideoCard` component was being rendered twice inside the parent — once through a map function and once hardcoded as a test. Removing the duplicate resolved the problem immediately.

### 2. Page Not Refreshing After Navigation
- **Issue**: Clicking the sidebar links to navigate between pages would update the URL correctly in the browser, but the page content itself remained stuck on the previous view.
- **Solution**: I realized I had been using a standard HTML `<a>` tag rather than Next.js's built-in `<Link>` component. Swapping all anchor tags for `<Link>` from `next/link` restored proper navigation behavior.

### 3. Tailwind Classes Not Applying
- **Issue**: Several utility classes such as `rounded-full` and `text-pink-500` were not taking effect on components despite being written correctly in the code.
- **Solution**: On inspecting `tailwind.config.js`, I noticed the content paths were not configured to scan through my component files. Updating them to include `./src/**/*.{js,jsx}` allowed Tailwind to detect and apply all classes correctly.

### 4. useState Not Updating the UI
- **Issue**: Clicking the follow button was supposed to toggle the label between "Follow" and "Following", but the text remained unchanged even though the console showed no errors.
- **Solution**: I had placed the state variable declaration outside the component function, which disconnected it from React's rendering cycle. Moving the `useState` call inside the component allowed the UI to re-render properly on state change.

### 5. Layout Shifting on Mobile
- **Issue**: On smaller screen sizes, the sidebar was overlapping the main content area and pushing video cards off screen, causing the overall layout to break.
- **Solution**: I had overlooked adding responsive prefixes to the layout classes. Applying `hidden md:flex` to the sidebar and setting the main content to `w-full md:ml-64` brought the layout back into alignment across all screen sizes.