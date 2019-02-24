# st-lazy

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)


## What is it?
st-lazy is [Stencil](https://stenciljs.com/) collection of tools for lazy loading. Beating heart of this library is @Lazy decorator that allows you to call component method as the user scrolls component into the viewport. On supported browsers (Chrome and chrome based browsers, Firefox and Edge) it uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to accomplish this functionality. For Safari and IE it simply falls back to setTimeout. Inspired by [st-img](https://github.com/jgw96/st-img)

## Installing
Just add module to your Stencil project package.json:
```
npm i st-lazy
```
You can also benefit from this package outside of Stencil world. To do so you can either 
- put `st-lazy` as dependency in your package.json and import web component that is relevant for you
- or if outside of npm you can pop this script tag `<script async defer src='https://unpkg.com/st-lazy@0.7.0/dist/stlazy.js'></script>` into your index.html
Then you can just use web components in your html/jsx 

# Repo contains
- [@Lazy decorator (only for Stencil)](#1-@Lazy)
- [st-lazy component](#2-st-lazy)
- [st-lazy-img component](#3-st-lazy-img)
- [st-lazy-fetch component](#4-st-lazy-fetch)



# 1. @Lazy

@Lazy is a decorator that allows you to call component method as the user scrolls component into the viewport.

## How to use it?
It's very simple: you just need to anotate your method with @Lazy and it will be called when host component is scrolled to viewport. Method will be called once - the first time you scroll to component. Additionally you need to pass host's @Element. You can do it in two ways:

Option 1: passing host element with @LazyHost
```javascript

import { Component, Element } from '@stencil/core';
import { Lazy, LazyHost } from 'st-lazy';

@Component({ tag: 'lazy-component', shadow: true })
export class LazyComponent {

  @LazyHost() @Element() host;

  @Lazy()
  someMethod() { console.log("someMethod was called because user scrolled to LazyComponent"); }

  render() { return <div>Hello, World!</div>; }
}
```

Option 2: passing host element manually
```javascript

import { Component, Element } from '@stencil/core';
import { Lazy } from 'st-lazy';

@Component({ tag: 'lazy-component', shadow: true })
export class LazyComponent {

  @Element() host;

  @Lazy("host")
  someMethod() { console.log("someMethod was called because user scrolled to LazyComponent"); }

  render() { return <div>Hello, World!</div>; }
}
```

## When use it?
Basically you can think of every action that you would normally do with the load of the page/component. Maybe some of those actions are time consuming, generating not needed network traffic and not giving any benefit to most of users? Good example is calling an API to get data to be presented by component. Maybe most of users are not even checking some forgotten carousel on the bottom of every page in your app?

## Example
Following component
```javascript
import { Component, State, Element } from '@stencil/core';
import { Lazy, LazyHost } from 'st-lazy';


@Component({
    tag: 'test-st-lazy'
})
export class TestStLazy {
    @State() name: string;
    @LazyHost() @Element() host;

    @Lazy()
    getName() {
        console.log("fetching user data...");
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/users/1")
                .then(res => res.json())
                .then(data => {
                    this.name = data.name
                    console.log(this.name);
                })
          }, 300);
    }
    

    render() {
        return (
            <div><p>Hello {this.name}</p></div>
        );
    }
}
```
...on the page
```html
<body>
    <div style="height: 1000px"></div>
    <test-st-lazy></test-st-lazy>
</body>
```
gives

![lazy api call](https://j.gifs.com/oVYVwB.gif)

# 2. st-lazy

st-lazy is a Stencil component to lazy load other components while its scrolled to viewport.
Take a look at [API](https://github.com/jarrvis/st-lazy/tree/master/src/components/st-lazy)

## Why?
Stencil is lazy loading components by default. It loads only the ones that are actually used on the page. Here we lift it. st-lazy component is using IntersectionObserver to load the component by name only if it is in the viewport. On non supported browsers (IE, Safari) it falls back to setTimeout unless you use polyfill. 

## Example
having a simple component
```javascript
import { Component } from '@stencil/core';

@Component({
    tag: 'test-st-lazy'
})
export class TestStLazy {
    @Prop() name: string;

    componentWillLoad() {
        console.log('The TestStLazy is about to be rendered');
    }

    componentDidLoad() {
        console.log('The TestStLazy has been rendered');
    }
    
    render() {
        return (
            <div><p>Was I lazy loaded with st-lazy?</p></div>
        );
    }
}

```
and page

```html
<body>
    <div style="height: 1000px"></div>
    <st-lazy
        component="test-st-lazy">
    </st-lazy>
</body>
```
gives

![lazy component load](https://j.gifs.com/k85Kk5.gif)

As you see component is not loaded untill it's scrolled onto viewport. Then full component lifecycle runs.

## How to pass props to component?

Option 1: In JSX you can pass `componentProps` key/value object to st-lazy   
```html
  <st-lazy
    component="test-st-lazy"
    componentProps={{ name: 'Lazy', surname: 'Stencil' }}>
  </st-lazy>
```
Option 2: In html you can pass `component-prop-?` attributes to st-lazy
```html
  <st-lazy
    component="my-component"
    component-prop-name='Lazy'
    component-prop-surname='Stencil'>
  </st-lazy>
```
or optionally you can pass the componentProps over javascript:
```javascript
document.querySelector('st-lazy').componentProps = { name: 'Lazy', surname: 'Stencil' }
```
## I just want to use st-lazy to be notifed about scrolling to some html
Sure just react on the event that st-lazy will throw
```html
  <st-lazy
    event-value="contentId">
    some html...
  </st-lazy>
```
# 3. st-lazy-img

st-lazy-img is a Stencil component to lazy load image while its scrolled to viewport.
Take a look at [API](https://github.com/jarrvis/st-lazy/tree/master/src/components/st-lazy-img)

## Example
```html
<body>
    <div style="height: 1000px"></div>
    <st-lazy-img
        src="https://stenciljs.com/assets/img/logo.png"
        fallback-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5VWGwI_ToYUkeZjAxP16jZB94Yzus4Q5YErjzzB2C44rWKwL7"
        alt="Lazy image">
    </st-lazy-img>
</body>
```

gives

![lazy image load](https://j.gifs.com/k85lwN.gif)


# 4. st-lazy-fetch

st-lazy-fetch is a Stencil component to make lazy API calls. Request is done after component is scrolled into viewport.
Take a look at [API](https://github.com/jarrvis/st-lazy/tree/master/src/components/st-lazy-fetch)
Plese take a look also at [stencil-fetch](https://github.com/Fdom92/stencil-fetch) as st-lazy-fetch is based on it. 

## Example
```html
<body>
    <div style="height: 1000px"></div>
    <st-lazy-fetch
        url="https://jsonplaceholder.typicode.com/users/1">
    </st-lazy-fetch>
</body>
```

gives

![lazy fetch](https://j.gifs.com/xnGB4l.gif)