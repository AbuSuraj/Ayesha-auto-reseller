import React from 'react';

const FAQ = () => {
    return (
<div className="mt-4">
      <section className="dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
          <h2 className="text-2xl font-semibold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 mb-8 dark:text-gray-400">
            These are the most commonly asked questions about Buying a Used Car

          </p>
          <div className="space-y-4">
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
              When Did Buying a Used Car Get So Complicated?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Years ago, buying a used car was a real gamble. Without the information they needed, except for the word of the seller, buyers were left in the dark about their to-be rides and ultimately left spinning their wheels on whether to move forward and pursue a certain model
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
              What Should I Consider When Buying a Used Car?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              <span className='font-bold'>Your budget:</span> Yes, used cars cost less, but you still want to pay attention to the price tag and make sure that paying off the car you choose is going to work financially in your favor. <br />

              <span className='font-bold'>The car's Vehicle Identification Number (VIN):</span>   A vehicle's VIN is a unique 17-digit code of numbers and letters assigned to a car by the manufacturer that can tell you a lot about it. Never purchase a used car that doesn't have a VIN! <br />

              <span className='font-bold'>Mileage number, age, and condition: </span>These factors are pretty key in helping you decide whether the car in question is right for you. Remember that observing the true condition of the car should always happen from behind the wheel during a test drive. <br />

              <span className='font-bold'>A vehicle history report: </span> Today, finding out about a car's history is easy. By obtaining a verified vehicle history report from CARFAX® or AutoCheck®, you can access multiple factors that'll be important to your decision, including the VIN, latest cited mileage, and age.
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
              Is the car returnable within a certain period of time or miles?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Some dealerships—or even the lenders they work with—have a buyer's remorse clause in the contract, allowing you to return the vehicle if you've changed your mind. If that's the case, make sure you know the terms. Private sellers typically don't offer this, but it could still be worth it to ask.
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">
              How recent is your data?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
              Our pricing information is updated weekly, and incentives are checked daily and updated as new information is validated. The transactions we use are the most recent available. TrueCar typically pushes data out to the site within 72 hours of receipt of the data. To ensure relevance, we typically only use transactions from the last four weeks, but we'll go back as far as 8 weeks if the market pricing for a given vehicle is stable enough to be relevant to a car purchased today.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
    );
};

export default FAQ;