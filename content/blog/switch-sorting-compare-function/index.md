---
title: Switched On Sorting Compare Functions
date: "2021-04-29T21:57:00.540Z"
description: Using switch statements in your sort compare function getter
---

Have you ever had to implement client side sorting? Let’s say you have a site that displays a collection of films, and you want to give the user the option of sorting the films to their heart’s content. So you provide a select box presenting different sorting options, and when the user selects one of those options, it triggers a sort function to fire.
	
I'm talking about something like this:

<video autoplay loop muted playsinline>
  <source src="film-sorting.mp4" type="video/mp4">
</video>
	

Well, Traveler, I just so happen to have a nifty way of rigging this up, and I'm going to share that with you today.

### GetSortCompareFunc Switch
	
We’re going to need a getSortCompareFunc that returns the relevant sorting function following the user’s input. Now, if you’re like me, you don’t often reach for the switch statement. You may look at it askance. Maybe there exists a Nixonesque audiotape in which you refer to it as “unwieldy” and “not particularly easy on the eyes”. But you must admit: This really is the ideal use case for our estranged pal when you consider the logic and the multiple options controlled by the user. 

So let’s set our preconceived notions aside and do what’s right.

```js	
const getSortCompareFunc = (sortCriterion, sortIsAscending) => {
  switch (sortCriterion) {
    case 'title':
      return sortIsAscending ? sortByTitleAscending : sortByTitleDescending;
    case 'director':
      return sortIsAscending
        ? sortByDirectorAscending
        : sortByDirectorDescending;
    case 'duration':
      return sortIsAscending
        ? sortByDurationAscending
        : sortByDurationDescending;
    case 'year':
      return sortIsAscending
        ? sortByReleaseDateAscending
        : sortByReleaseDateDescending;
    default:
      // will fire if changed to 'sort'; defaults to alphabetical titles
      return sortByTitleAscending;
  }
};
```

Isn't that so neat! I love how readable that is. Do I even have to explain what is happening here? Are we done? Should I just shoe off?

Surprise, I'm still here. OK, so when this function is called, we will pass in the user selected option from the dropdown (sortingCriterion) and return the respective function in the respective sort direction. The execution would look like this:

```js
const compareFunc = getSortCompareFunc(sortBy, sortIsAscending);
filmData.sort(compareFunc);
```

### CompareFunction Logic

Now from here, you just have to define these sorting functions. I won't delve too much into the details for how the compareFunction works in JavaScript. You can [learn more about that here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

The main thing I want to point out with my compare functions is that (1) I'm using a function to strip leading articles away from films so that we can properly alphabetize them, (2) I'm using another function to rearrange the director's name in an alphabetical-friendly manner (e.g., Anderson, Paul Thomas), and (3) I'm always using the film title as a secondary means of sorting (hence the || in the return statement) in the event that multiple films have the same release date or director. Here's all that business:

```js
// regex func from Thorsten Frommen
// https://tfrommen.de/javascript-30-day-17-sorting-without-leading-articles/
const stripLeadingArticle = string => string.replace(/^(an?|the)\s/i, '');
const compareStrings = (a, b) => (a > b) - (a < b);

const sortByTitleAscending = (filmA, filmB) =>
  compareStrings(
    stripLeadingArticle(filmA.title),
    stripLeadingArticle(filmB.title)
  );

const sortByTitleDescending = (filmA, filmB) =>
  compareStrings(
    stripLeadingArticle(filmB.title),
    stripLeadingArticle(filmA.title)
  );

// accepts a name, and returns it with the last name in front
// if I input Justin Carmen Mooney as an arg, it will return Mooney Justin Carmen
const getNameFlipped = fullName => {
  const nameArray = fullName.split(' ');
  const lastName = nameArray.pop();
  // put the last name in front
  nameArray.unshift(lastName);
  const nameFlipped = nameArray.join(' ');
  return nameFlipped;
};

const sortByDirectorAscending = (filmA, filmB) => {
  const directorAFlipped = getNameFlipped(filmA.director);
  const directorBFlipped = getNameFlipped(filmB.director);
  return (
    compareStrings(directorAFlipped, directorBFlipped) ||
    sortByTitleAscending(filmA, filmB)
  );
};

const sortByDirectorDescending = (filmA, filmB) => {
  const directorAFlipped = getNameFlipped(filmA.director);
  const directorBFlipped = getNameFlipped(filmB.director);
  return (
    compareStrings(directorBFlipped, directorAFlipped) ||
    sortByTitleAscending(filmA, filmB)
  );
};

const sortByReleaseDateAscending = (filmA, filmB) =>
  filmA.year - filmB.year || sortByTitleAscending(filmA, filmB);
const sortByReleaseDateDescending = (filmA, filmB) =>
  filmB.year - filmA.year || sortByTitleAscending(filmA, filmB);

const sortByDurationAscending = (filmA, filmB) =>
  parseInt(filmA.duration, 10) - parseInt(filmB.duration, 10) ||
  sortByTitleAscending(filmA, filmB);

const sortByDurationDescending = (filmA, filmB) =>
  parseInt(filmB.duration, 10) - parseInt(filmA.duration, 10) ||
  sortByTitleAscending(filmA, filmB);

```

### Wrapup
  
You could just dump all this logic in your util directory and import getSortCompareFunc into your component that uses it. That would additionally keep things tidy. Or you can just have the logic in the file that is using it. I've done it both ways. This example does the latter, but I usually prefer the former to keep the component files a little leaner and easier to digest.

One last note: If you are doing this in React, you will perform this sort on a copy of the data you are sorting. Why can't you just directly sort the data you have in state? Well, remember that the JavaScript sorting function mutates the array. React, however, is predicated on immutable data. So you'll end up doing something like this:

```js
const { state } = useNetStruckDataState();
const [...filmData] = state.films;
const compareFunc = getSortCompareFunc(sortBy, sortIsAscending);
filmData.sort(compareFunc);
```

There we are: sorting compare functions and the switch statement. A true work of art, I do declare. Here is the [relevant code from the Netstruck codebase](https://github.com/y2j964/netStruck/blob/master/src/Pages/AllFilms/AllFilms.js), and [here is Netstruck in all it’s glory](https://y2j964.github.io/netStruck/)
