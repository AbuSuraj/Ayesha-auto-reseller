import React, { useContext, useEffect } from 'react';
import useTitle from '../../Hooks/useTitle';
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from '../../Context/AuthProvider';
const Blog = () => {
const {loading} = useContext(AuthContext)
  useTitle("Blog");
  useEffect(() => {
    AOS.init();
  }, []);
  if(loading){
    return  <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div> 
}
    return (
        <div>
        <h1 className="text-3xl text-center font-bold font-serif my-5 ">
          Some important interview Qustions
        </h1>
        <div
          data-aos="fade-right"
          className="ml-20 mr-4  border-2 rounded-3xl p-4  shadow-2xl my-8 "
        >
          <h1 className="text-2xl font-bold">
            Q.1  What are the different ways to manage a state in a React application?
          </h1>
          <div className="block md:flex my-2">
            <p className="font-bold mx-2">Answer: </p>
            <p className="font-medium text-lg">
            There are four main types of state you need to properly manage in your React apps:
              <br />
              <ol className="list-decimal mt-2 ml-4 md:ml-8">
                <li><span className='font-bold'>Local state: </span> Local state is data we manage in one or another component. Local state is most often managed in React using the useState hook. <br />
                For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.
                </li>
                <li><span className='font-bold'>Global (UI) state: </span>  Global state is data we manage across multiple components. Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least. <br /> A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application. Sometimes state we think should be local might become global.</li>
                <li><span className='font-bold'>Server state:</span> Data that comes from an external server that must be integrated with our UI state. Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state. There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state. Fortunately there are tools such as SWR and React Query that make managing server state much easier.</li>
                <li><span className='font-bold'>URL state: </span> Data that exists on our URLs, including the pathname and query parameters. URL state is often missing as a category of state, but it is an important one. In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL! There are undoubtedly more pieces of state that we could identify, but these are the major categories worth focusing on for most applications you build.</li>
              </ol>
            </p>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="ml-20 mr-4 my-8   border-2 rounded-3xl p-4   shadow-2xl"
        >
          <h1 className="text-2xl font-bold">
            Q.2  How does prototypical inheritance work?
          </h1>
          <div className="block md:flex my-2">
            <p className="font-bold mx-2">Answer: </p>
            <p className="font-medium text-lg">
            The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.
              <br />
              <span className="font-bold my-6">working procedure:</span>
              <ul className="list-disc mt-2 ml-4 md:ml-8">
                <img className='my-2' src="https://i.ibb.co/TTsZgPt/proto-in.png" alt="Prtotypical Inheritance" />
                <li>
                In JavaScript, all objects have a hidden [[Prototype]] property that’s either another object or null.
                </li>
                <li>
                We can use obj.__proto__ to access it (a historical getter/setter, there are other ways, to be covered soon).
                </li>
                <li>
                The object referenced by [[Prototype]] is called a “prototype”.
                </li>
                <li>
                If we want to read a property of obj or call a method, and it doesn’t exist, then JavaScript tries to find it in the prototype.
                </li>
                <li>Write/delete operations act directly on the object, they don’t use the prototype (assuming it’s a data property, not a setter).</li>
                <li>If we call obj.method(), and the method is taken from the prototype, this still references obj. So methods always work with the current object even if they are inherited.</li>
                <li>The for..in loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object it</li>
                 
              </ul>
            </p>
          </div>
        </div>
        <div
          data-aos="fade-up-right"
          className="ml-20 my-8 mr-4  border-2 rounded-3xl p-4   shadow-2xl"
        >
          <h1 className="text-2xl font-bold">
            Q. 3 What is a unit test? Why should we write unit tests?
          </h1>
          <div className="block md:flex my-2">
            <p className="font-bold text-lg mx-2">Answer: </p>
            <p className="font-medium text-lg">
              <span className="font-bold">unit test</span> is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important.
              <br></br>
              <br></br>
              <span className="font-bold">
              Here, are the key reasons to perform unit testing in software engineering:
              </span>{" "}
              <img className='my-2' src="https://i.ibb.co/bBttMqg/unit-testing.png" alt="Unit testing resons" />
             <ul className="list-disc mt-2 ml-4 md:ml-8">
                <li>Unit tests help to fix bugs early in the development cycle and save costs.</li>
                <li>It helps the developers to understand the testing code base and enables them to make changes quickly</li>
                <li>Good unit tests serve as project documentation</li>
                <li>Unit tests help with code re-use. Migrate both your code and your tests to your new project. Tweak the code until the tests run again.</li>
             </ul>
            </p>
          </div>
        </div>
        <div
          data-aos="fade-up-right"
          className="ml-20 my-8 mr-4 border-2 rounded-3xl p-4   shadow-2xl"
        >
          <h1 className="text-2xl font-bold">
            Q.4. What is the difference  amgong React, Angular, and Vue?
          </h1>
          <div className="block md:flex my-2">
            <p className="font-bold text-lg mx-2">Answer: </p>
            <p className="font-medium text-lg">
               Differences of React, Angular, Vue are:   </p>
               </div>
              <div className='ml-2'>
              <p className="font-medium text-lg"><span className='font-bold text-xl'>  React: </span> It is considered a UI library. They define themselves as: <span  className='font-bold text-lg'>“A JavaScript library for building user interfaces”</span>. React doesn’t propose a specific structure to be followed, Nevertheless, we can identify two kinds of blocks inside a React project: Elements and Components. They are written in JSX. </p>
              <p className="font-medium text-lg"> <span className='font-semibold text-lg'>  React Elements: </span> The elements are the smallest building blocks of React applications.</p>
              <p className="font-medium text-lg"> <span className='font-semibold text-lg'>  React Components: </span> Components are larger building blocks of React applications. They let you split the UI into independent and reusable pieces. Conceptually, components are like JavaScript functions. They accept arbitrary inputs, called props, and return React elements describing what should appear on the screen. To be able to deal with state and lifecycle features inside these functions they include a bunch of functions called hooks.</p>
                </div> 
                <div className='ml-2 my-4'>
              <p className="font-medium text-lg"><span className='font-bold text-xl'>  Angular: </span>It is built entirely in Typescript and every project on Angular is structured in modules, components and services. At least, each module must have a root module and a root component. </p>
              <p className="font-medium text-lg">  <span className='font-semibold text-lg'>  Angular Modules: </span> According to Angular’s site, Angular applications are modular and have their own modularity system called NgModules. NgModules are containers for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities.

They can contain components, services and other code files whose scope is defined by the containing NgModule. They can import functionality that is exported from other NgModules and vice-versa.</p>
              <p className="font-medium text-lg"> <span className='font-semibold text-lg'>  Angular Components: </span>  In Angular, components are the basic UI building block of code. All of them have this structure:
              <ul className='list-disc ml-4 md:ml-10'>
                <li>A Typescript class where the logic of the component is implemented</li>
                <li>An HTML template to render the component (including Angular template syntax)</li>
                <li>A stylesheet in either CSS or SCSS</li>
              </ul>
              </p>
              <p className="font-medium text-lg"> <span className='font-semibold text-lg'>  Angular Services: </span> Services are classes where the business logic is implemented. The services are meant to extract all complex and reusable logic outside of the components. For instance, operations like fetching data from the server must be done on services. To make these services available to any component, Angular uses injection of dependencies.</p>
                </div> 
                <div className='ml-2'>
              <p className="font-medium text-lg"><span className='font-bold text-xl'> Vue: </span> The Vue.js core library focuses on the View layer only. It’s called a progressive framework because you can extend its functionality with official and third-party packages, such as Vue Router or Vuex, to turn it into an actual framework. </p>
              <p className="font-medium text-lg"> <span className='font-semibold text-lg'>  templating syntax: </span> lets you create View components, and it combines familiar HTML with special directives and features. This templating syntax is preferred, even though raw JavaScript and JSX are also supported.</p>
              <p className="font-medium text-lg"> <span className='font-semibold text-lg'> Components: </span> in Vue are small, self-contained, and can be reused throughout the application. Single File Components (SFCs) with the .vue extension contain HTML, CSS, and JavaScript so that all relevant code resides in one file.</p>
                </div> 
        </div>
        
      </div>
    );
};

export default Blog;