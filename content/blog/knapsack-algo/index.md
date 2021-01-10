---
title: Knapsack Algorithm
date: "2021-01-10T04:27:55.990Z"
description: My approach to the classic knapsack algorithm problem
---

As a self-taught programmer, I feel that there is an assumption that us coding autodidacts have no knowledge of data structures and algorithms, as if this knowledge can only be acquired through secret societies in select universities. This, of course, is utter bosh. It's not hard to access this information. I've read that [Gayle Laakmann McDowell book](https://www.crackingthecodinginterview.com/). I've watched the [youtube videos](https://www.youtube.com/c/BackToBackSWE/videos). And I've passed every coding test I've ever taken.

Today, we'll hopefully dispel some of that bias against us non-CS majors, as this accounting graduate tackles a dynamic programming classic. And we're going to do it in Python. This is the dreaded Knapsack Question.

### The Question

Imagine that you have a knapsack which has a weight capacity. On the ground before you lies 3 objects. Each object has a corresponding value and weight. Your goal is to maximize the value that you carry in your knapsack, recognizing the weight capacity of your knapsack.

Let's fill in some detail so we have something concrete to work with. The three objects have the respective values: 6, 10, 12. And the three objects have the respective weights: 1, 2, 3. The capacity of our knapsack is 5 pounds.

[Here is the answer if you just want to jump to the end](https://repl.it/@JustinMooneyC/knapsack#main.py).

Generally, this question asks you to accept this data as 3 separate arguments to your function. I always thought it would make more sense to pass in an item dictionary with the item name as the key and the value being a nested dictionary of weight and value keys. But, for what it’s worth, I’ve never seen this problem presented that way. And I want to answer the question as it exists in the real world (of theoretical coding trivia), so I guess we’ll just proceed with the way things are. Whatever.

Here is our dummy data:

```python
val_arr = [6, 10, 12]
wt_arr = [1, 2, 3]
capacity = 5
```

And we will pass it to our function:

```python
knapSack(capacity, wt_arr, val_arr)
```

### The Logic

Let's work out the logic of our function, and let's just think verbally about this. What makes this problem difficult is the added dimension of weight capacity that we need to factor in. So we need to anchor this problem around this constraint.

One way to approach this is to brute force this beast. We could take an item and then map out all possible combinations and keep track of what returns the best value. But the problem there is the time complexity of that solution would be O(2n), which is pretty dismal. We end up solving the same subproblems over and over again.

A more robust approach would be dynamic programming. Dynamic programming is simply a system of recording the solutions to these subproblems, allowing us to just look up the values instead of performing the same calculations umpteen times. In dynamic programming you can either take the top-down recursive route or the bottom-up route. I favor the latter. So that's what we'll do: We will start at the bottom and build a table of answers to these subproblems.

The table will initially look like this in Python:

```python
[[0,0,0,0,0,0],
[0,0,0,0,0,0],
[0,0,0,0,0,0],
[0,0,0,0,0,0]]
```

The x-axis represents incrementing weight (0, 1, 2, 3, 4, 5); the y-axis gradually introduces our options for items, with the first row representing no items, the second row representing item 1, the third row representing item2 (and item1), and the fourth row representing item 3 (and item 1 and item 2).

Here is a puny html table that better illustrates this:

<table class='puny-table'>
  <thead>
    <tr>
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="rowgroup">No Items</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="rowgroup">Item 1</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="rowgroup">Item 2</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Item 3</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>

Again, the first row represents no items. So we won't even bother looking at that. We will just keep all the values zeroed out. These are our base cases. I know it might seem pointless right now, but our decision making is predicated on the ability to reach up into the previous row. So having this baseline row is going to be useful. I promise.

Now I want us to continue to think verbally about what we need to do. But I think it benefits us to dump some code here. Don't fret too much about wrapping your head around this. All will be revealed in due course. I just want to show you the result of our verbal thought experiment and how we will fill in the rest of this table.

```python
val_arr_size = len(val_arr)
T = [[0 for x in range(capacity + 1)] for x in range(val_arr_size + 1)]

for i in range(1, val_arr_size + 1):
  for incremented_capacity in range(1, capacity + 1):
    if wt_arr[i - 1] <= incremented_capacity:
    # if you can take item without exceeding capacity, take it (and add value of row above incremented_capacity - weight
    # of item taken). But if value of above row is greater, take that value
      T[i][incremented_capacity] = max(T[i - 1][incremented_capacity],
      val_arr[i - 1] + T[i - 1][incremented_capacity - wt_arr[i - 1]])
    else:
      # take row above
      T[i][incremented_capacity] = T[i – 1][incremented_capacity]
```

Let's walk through what we are calculating here. For the second row, we are asking, "Is the weight of item1 less than OR equal to the incremented capacity?" Since item1's weight is 1, and the incremented capacity starts at 0, the answer is no. We can't take the item, which means we go up to the previous row (which doesn't included the item we didn't take), and take that value. Why are we taking that value? Because we want the max value, and we've already calculated the max value in the circumstance in which we don't take this item. So we keep 0 here.

When our incremented weight goes to 1, we pass the condition (1 is less than or equal to 1). But just because we can take the item, doesn't necessarily mean we should. Remember we want the max value, and the max value might not include this item. In order to determine the max value, we need to compare the value we get by not taking the item (T[i - 1][incremented_capacity]) to the sum of the value of the item we are taking (val\_arr[i – 1]) and the max value of our remaining knapsack capacity and item options (T[i - 1][incremented_capacity - wt_arr[i - 1]]).

That latter case is fairly dense so let's break it down. We are taking a sum of those two values, because there might be leftover capacity in our bag after we take this item, and we should maximize value for that leftover capacity given the item options that don’t include the item we just took. Since we already calculated that value, all we have to do is reference our table.

So let’s reference the table. The row above has the value 0. This is the max value we get by not taking the item. Now, the value we get by taking the item is 6. That leaves us with 0 capacity left in our bag. And since we already took the item, we should reference the table in the row above where this item was not included. What is our max value at capacity 0 without taking the item? Zero. This together yields the value 6 (6 + 0 = 6). Since 6 is greater than 0, we take the item and record the value of 6 in this cell.

The rest of this row will end up repeating the value 6. So now we have this:

<table class='puny-table'>
  <thead>
    <tr>
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="rowgroup">No Items</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="rowgroup">Item 1</th>
      <td>0</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
    </tr>
    <tr>
      <th scope="rowgroup">Item 2</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>Item 3</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>

The third row (item 2) is where our hard work pays off. We know that when the capacity is 0, our value will be 0. Now dig this: When the capacity is 1, we can’t pick item 2 because 2 is not less than or equal to 1. So we move up to the previous row where item 2 is not included and we take that value we already calculated. We now fill in our cell with that value (6).

Let’s keep going. When the capacity is 2, our we can pick item 2 because 2 is less than or equal to 2. If we take item 2, it gives us a value of 10. It also leaves us with 0 capacity left in our knapsack. In the row above, we can see that our max value is 0 at capacity 0. That gives us a sum of 10 (10 + 0). Is 10 greater than 6? Yup. So we fill in the value of 10.

Now check out what happens at capacity 3: We take item 10 based on the same logic as above, but notice we now have a capacity of 1 left in our knapsack. What is the value at capacity 1 in the row above? Six. And if you think about it, it makes sense because if you have the capacity of 1 in your knapsack, you can carry item 1. Back to the cell in question: The sum of 6 and 10 is 16. So that is the value we fill in. And as it turns out, 16 will be the value for the remaining cells in this row.

<table class='puny-table'>
  <thead>
    <tr>
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="rowgroup">No Items</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="rowgroup">Item 1</th>
      <td>0</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
    </tr>
    <tr>
      <th scope="rowgroup">Item 2</th>
      <td>0</td>
      <td>6</td>
      <td>10</td>
      <td>16</td>
      <td>16</td>
      <td>16</td>
    </tr>
    <tr>
      <th>Item 3</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>

Do you see how powerful this technique is?

At this juncture, I’m going to fast forward and show you what the table looks like and the end of all these calculations:

<table class='puny-table'>
  <thead>
    <tr>
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="rowgroup">No Items</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="rowgroup">Item 1</th>
      <td>0</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
    </tr>
    <tr>
      <th scope="rowgroup">Item 2</th>
      <td>0</td>
      <td>6</td>
      <td>10</td>
      <td>16</td>
      <td>16</td>
      <td>16</td>
    </tr>
    <tr>
      <th>Item 3</th>
      <td>0</td>
      <td>6</td>
      <td>10</td>
      <td>16</td>
      <td>18</td>
      <td>22</td>
    </tr>
  </tbody>
</table>

Our answer will be in the last cell of the last row, which in this case will be 22. So we just return that last cell, and we can split this joint.

Yeah, it’s a lot. I know. But compared to the brute force approach, it is much cleaner. Our time complexity is O(number of items * knapsack capacity), as is our space complexity. And it actually doesn’t require much code to write this. Take a look at what we have:

```python
def knapSack(capacity, wt_arr, val_arr):
  val_arr_size = len(val_arr)
  T = [[0 for x in range(capacity + 1)] for x in range(val_arr_size + 1)]

  for i in range(1, val_arr_size + 1):
    for incremented_capacity in range(1, capacity + 1):
      if wt_arr[i - 1] <= incremented_capacity:
      # if you can take item without exceeding capacity, take it (and add value of row above incremented_capacity - weight
      # of item taken). But if value of above row is greater, take that value
        T[i][incremented_capacity] = max(T[i - 1][incremented_capacity],
	      val_arr[i - 1] + T[i - 1][incremented_capacity - wt_arr[i - 1]])
      else:
        # take row above
        T[i][incremented_capacity] = T[i – 1][incremented_capacity]

  return T[val_arr_size][capacity]
```

### The (Best) Answer

[Here is my official answer in the form of repl.it, for all those who want to play around with the code](https://repl.it/@JustinMooneyC/knapsack#main.py). Included here is a helper function to determine which items we picked to give us our max value. This question generally isn’t concerned with that information, but it seems vitally important to me, so I just included it anyway. Tradition be damned.
