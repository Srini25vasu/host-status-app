
build:
 builder : application, which uses Vite internally
 ng build --configuration production
 ng build --configuration development  here sourceMap: true
Tasks:

1. Lazy loading of routes

2. Sharing data between parent and child components
3. Implementing state management using Rxjs store
4. Improving change detection strategy for Angular signals
5. Explore Rxjs operators for better performance in Angular applications
6. Implementing server-side rendering with Angular Universal


Angular Data service:
https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/

Memory leak_add
https://joanserna.com/posts/preventing-memory-leaks-rxjs/

https://dev.to/petersaktor/avoid-memory-leaks-in-angular-when-using-takeuntil-with-higher-order-rxjs-operators-268m

signal based data fetching: httpResource()
https://javascript-conference.com/blog/exploring-httpresource-angular-19/#:~:text=Angular%2019.2%20introduced%20the%20experimental,approach%20to%20handling%20HTTP%20requests.

https://blog.angular.dev/seamless-data-fetching-with-httpresource-71ba7c4169b9
This could replace Rxjs based data fetching

Observable and observers in Rxjs:
https://medium.com/@nandeepbarochiya/understanding-rxjs-observables-observers-a-comprehensive-guide-d8acd1f90e5d

use sharePlay operator to share observable data streams across Angular components
https://dev.to/softheartengineer/how-does-sharereplay-works-in-rxjsangular-1moo

good operators:
https://dev.to/krivanek06/advanced-rxjs-operators-you-know-but-not-well-enough-1ela

deprecated subscribe, using takeUntil, with pipe and next, error and complete callbacks:
https://dev.to/nhannguyenuri/rxjs-subscribe-is-deprecated-what-developers-need-to-know-1jni
