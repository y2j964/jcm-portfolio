---
title: Footnote Tooltips
date: "2020-11-14T01:54:20.474Z"
description: How to implement wiki-styled footnote tooltips
---

Footnotes—I love 'em. Some of my favorite authors employ footnotes: Chuck Klosterman, David Foster Wallace, me. But footnotes on the web present some UX issues. You don’t want the user to be left on their own to jump between the text and the footnotes.

At bare minimum, there should be a scrolling mechanism between the superscript and the footnote content: When you click the superscript, it should transport you to footnote at the bottom of the page; and when you click the footnote reference, it should transport you back to the superscript. That is pretty easy to implement, and we will go over how to do that in tick.

But I want to urge you, Traveler, that we should be doing more. I specifically want to talk about tooltips and their place in this quandary. Our endpoint will look like this.

<video autoplay loop muted playsinline>
  <source src="../../assets/footnotes-tooltip-smart.mp4" type="video/mp4">
</video>

[(Here’s the code if you just want to jump to the end.)](https://codepen.io/y2j964/pen/bGezojQ)

But let’s start simple and build up to it.

### Starting Simple

```diff-html
<div class="post__body">
  <p>This is the opening paragraph to this much ballyhooed post. Let's throw in a footnote to up the excitement.
  <sup class="footnote-ref">1</sup>
  Now we're getting somewhere.</p>
  <hr class="footnotes-sep">
  <section class="footnotes">
  	<ol class="footnotes-list">
  		<li id="fn1" class="footnote-item">
  			<p>The eagle has landed. </p>
  		</li>
  	</ol>
  </section>
</div>
```

This is the general structure of footnoted text. You have a series of paragraphs with superscripts (sup elements in HTML) pointing to the corresponding footnotes. The footnotes will be positioned below the text, hence the foot in footnotes.

Now all we need to do to make this more UX friendly, is to use id’s and link them to their counterparts with hash hrefs. When you use the hash symbol in an href, you are telling the browser that the intended click destination is an element that contains this id.

Cool. So let’s do that.

```diff-html
<div class="post__body">
  <p>This is the opening paragraph to this much ballyhooed post. Let's throw in a footnote to up the excitement.
  <sup class="footnote-ref"><a href="#fn1" id="fnref1">1</a></sup>
  Now we're getting somewhere.</p>
  <hr class="footnotes-sep">
  <section class="footnotes">
  	<ol class="footnotes-list">
  		<li id="fn1" class="footnote-item">
  			<p>The eagle has landed. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
  		</li>
  	</ol>
  </section>
</div>
```

Now we can jump between the superscript and the footnote. [Here is a more fleshed-out illustration of that](https://codepen.io/y2j964/pen/ZEpBKOp).

<video autoplay loop muted playsinline>
  <source src="../../assets/footnotes-markdown-it.mp4" type="video/mp4">
</video>

This is the least we could do. And we did it. Yay?

The good news is, generating footnote friendly markup is even easier than I let on. You will get this same markup structure if you simply leverage Markdown-It as a Markdown parser and passing in [Markdown-it-Footnote](https://github.com/markdown-it/markdown-it-footnote) as a plugin. This, of course, assumes that you are generating your HTML from Markdown files, which is fairly commonplace in the realm of blogs. This sort of thing is easy to pair with a CMS. But this is beyond the tentacles of this article.

### Inspiration

We’re striving for a more robust solution. We’re striving for basically what Wikipedia does. Yeah, I admit it, the concept of pairing tooltips with footnotes isn’t groundbreaking. Yet again, this isn’t normalized to the degree I feel it ought to. So I’m going to show you how to rig this up.

### Footnote Tooltips

Let’s talk about the desired behavior we are seeking. The tooltip should appear when the user hovers over the superscript (footnote reference), and the tooltip should disappear when the user hovers away from the superscript and the tooltip itself.

I think the most semantic thing to do is to create a tooltip container parallel to the main text, and to populate it with the appropriate footnote text on the aforementioned hover effect.

We will anchor the tooltip to the superscript by measuring where the superscript lies absolutely on the browser window and by positioning the tooltip container to this position using css absolute position.

The math to perform this measurement is handled by the following function:

```js
const getTooltipRightAlignedPosition = (tooltipTriggerRect) =>
  `${tooltipTriggerRect.right - 23.47}px`;
  // 23.47 is for additional spacing

const getTooltipTopPosition = (tooltipTriggerRect, tooltip) => `${
    tooltipTriggerRect.top + window.scrollY - tooltip.offsetHeight + 5
  }px`
// 5 is for additional spacing

```

I might as well show my cards and the pen that we will be selectively digging into. [Here's the code](https://codepen.io/y2j964/pen/MWjbJbQ). Let's continue.

Now we need to determine the logic around when this behavior will fire. To reiterate, the tooltip should appear when the user hovers over the superscript, and the tooltip should disappear when the user hovers away from the superscript and the tooltip itself. I’m going to handle both of these cases within a mouseOver event.

And that’s going to look like this:

```js
const footnoteHoverHandler = (e) => {
  // if tooltip isn't visible, we should be listening for create event
  if (!isTooltipVisible) {
    if (!e.target.parentElement.classList.contains("footnote-ref")) {
      return;
    }
    const tooltip = createToolTip(e);
    insertTooltipIntoDOM(tooltip, e.target);
    return;
  }

  // if tooltip is visible, we should be listening for destroy event
  // if hovering within tooltip or tooltip trigger, keep tooltip alive and return
  if (
    e.target.parentElement.classList.contains("footnote-ref") ||
    e.target.classList.contains("tooltip-container") ||
    e.target.classList.contains("tooltip") ||
    e.target.classList.contains("tooltip__text")
  ) {
    return;
  }
  removeTooltipFromDOM();
};

const debouncedFootnoteHoverHandler = debounce(footnoteHoverHandler, 250);

post.addEventListener("mouseover", debouncedFootnoteHoverHandler);
```

I know, we are handling two opposing actions in one eventListener. Isn’t this a code smell? Won’t the gods be angry with us? Can’t we just use mouseOut for the destroy event?

I hear you, but think about when mouseOut fires. MouseOut will fire when you leave an element or any of it’s descendants. That would be fine if we only wanted the destroy action to fire when the mouse leaves the tooltip. We could just add the event listener to the tooltip. But remember, we want the destroy action to fire when the mouse has left the tooltip AND the superscript. And since the superscript is not a child of the tooltip or vice versa, there isn’t an intuitive way to achieve that with MouseOut. MouseLeave won’t do us any favors either.

So we’re going to break the rules a little. We’re rock and roll, man. We understand that sometimes circumstances arise in which stubbornly clinging to rules leads to clumsy solutions. So we’re going to take a breath and move on.

### State

I want to take a brief detour and talk about the global state that we are maintaining in this module. The state I want to draw your attention to is isTooltipVisible and tooltipContainerStyles. These exist in global space because they need to be referenced at several different access points.

But I want you to notice the naming convention I’ve set up here. When these variables are mutated they will be mutated with set functions, “setIsTooltipVisible” and “setTooltipContainerStyles”. Why don’t I just mutate the values without these paltry functions? Well, I want it to be patently clear to anyone working on this codebase that global mutations are occurring. I’ve chosen to telegraph this with the set prefix, which is a nod to React hooks.

You will notice that all of my [“impure” functions](https://tommikaikkonen.github.io/impure-to-pure/), are named in a manner which explicitly connotes the impurity of their actions. In addition to the set functions, I have a few DOM altering functions like resetTooltipContainerStylesInDOM, updateTooltipContainerStylesInDOM, insertTooltipIntoDOM, and  removeTooltipFromDOM.

Having global state is sometimes helpful. But it can still cause problems of confidence and lead to debugging nightmares. So this is my chosen method for keeping things neat.

### SmartTooltip

OK, we're back, and there is a UX problem with our previous attempt. If the superscript is, for example, at the right edge of the screen and the screenWidth is already compressed, the tooltip has no room to expand but beyond the screen, creating an overflow and an ungainly horizontal scrollbar.

<video autoplay loop muted playsinline>
  <source src="../../assets/footnotes-tooltip-basic.mp4" type="video/mp4">
</video>

If you noodle around with the Wikipedia tooltip, you will observe that Wikipedia does not always display them to the top-right of the superscript. They will display the tooltip in the most logical placement to prevent snafus like the one mentioned above.

Now I think top-right placement is good for the default case. But we’ve already anticipated one situation in which that is not ideal for the user. What would be some other cases?

Here is the algorithm I devised: If the tooltip will not overflow the top or the right of the screen, place it to the top-right of the superscript; if the tooltip overflows the right side of the screen and does not overflow the top of the screen, place it to the top-left of the superscript; if the tooltip overflows the right and the top of the screen, place it to the bottom-left of the superscript; if the tooltip overflows the top of the screen and does not overflow the right of the screen, place it to the bottom-right of the superscript.

How will we determine if this logic plays out? We just need to answer a few questions. Firstly, is this space between the right of the superscript and the right edge of the screen less than the max-width of the tooltip, or is there more space between the right of the superscript and the right edge of the screen then there is from the left of the superscript and the left edge of the screen? If either of those statements evaluates to true, than we will position the tooltip to the left of the superscript. Secondly, we need to determine if the space between the top of superscript and the top edge of the screen less than the height of the tooltip. If it is, we will place the tooltip below the superscript.

Here are the functions that calculate these things:

```js
const getIsRightAligned = (tooltipTriggerRect, maxWidth = 360) =>
  window.innerWidth - tooltipTriggerRect.right >= maxWidth ||
  window.innerWidth - tooltipTriggerRect.right > tooltipTriggerRect.left;

const getIsTopAligned = (tooltipTriggerRect, tooltip) =>
  tooltipTriggerRect.top - tooltip.offsetHeight >= 0;
```

[And once again, here is the rest of the code for our smart-tooltips](https://codepen.io/y2j964/pen/bGezojQ).

You'll see that our footnoteHoverHandler will now set the styles based on the outcomes of those two aforementioned functions, and in so doing, gives us that sweet smart-tooltip functionality that our lovely users deserve.

### Wrapup

So there we have it: smart tooltip footnotes. We definitely did not cover every line of code here, but that definitely wasn't our intention. I just wanted to present the arc of discovery in making this footnote tooltip.

Now go have fun with footnotes you crazy kids.
