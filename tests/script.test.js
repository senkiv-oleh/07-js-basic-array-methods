const {
  customPush,
  customPop,
  customShift,
  customUnshift,
  collectPositiveNumbers,
  undoLastActions,
  processQueue,
  prependPriorityItems
} = require('../src/script');

describe('Task 7.1: customPush (simulation without .push)', () => {
  test('appends item to the end of array and returns the modified array', () => {
    const arr = ['x', 'y'];
    const result = customPush(arr, 'z');
    expect(result).toEqual(['x', 'y', 'z']);
    expect(result).toBe(arr);
  });

  test('works properly on an empty array', () => {
    const arr = [];
    const result = customPush(arr, 42);
    expect(result).toEqual([42]);
    expect(result).toBe(arr);
  });

  test('does NOT call native Array.prototype.push()', () => {
    const arr = [1, 2];
    const spy = jest.spyOn(arr, 'push');
    try {
      customPush(arr, 3);
      expect(spy).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });
});

describe('Task 7.2: customPop (simulation without .pop)', () => {
  test('removes the last element and returns the modified array', () => {
    const arr = [10, 20, 30];
    const result = customPop(arr);
    expect(result).toEqual([10, 20]);
    expect(result).toBe(arr);
    expect(arr.length).toBe(2);
  });

  test('handles a single-element array leaving it empty', () => {
    const arr = ['only'];
    const result = customPop(arr);
    expect(result).toEqual([]);
    expect(result).toBe(arr);
    expect(arr.length).toBe(0);
  });

  test('returns empty array unchanged when called on an empty array', () => {
    const arr = [];
    const result = customPop(arr);
    expect(result).toEqual([]);
    expect(result).toBe(arr);
    expect(arr.length).toBe(0);
  });

  test('does NOT call native Array.prototype.pop()', () => {
    const arr = [1, 2, 3];
    const spy = jest.spyOn(arr, 'pop');
    try {
      customPop(arr);
      expect(spy).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });
});

describe('Task 7.3: customShift (simulation without .shift)', () => {
  test('removes the first element, shifts remaining elements left, and returns modified array', () => {
    const arr = ['A', 'B', 'C'];
    const result = customShift(arr);
    expect(result).toEqual(['B', 'C']);
    expect(result).toBe(arr);
    expect(arr.length).toBe(2);
  });

  test('handles a single-element array leaving it empty', () => {
    const arr = [100];
    const result = customShift(arr);
    expect(result).toEqual([]);
    expect(result).toBe(arr);
    expect(arr.length).toBe(0);
  });

  test('returns empty array unchanged when called on an empty array', () => {
    const arr = [];
    const result = customShift(arr);
    expect(result).toEqual([]);
    expect(result).toBe(arr);
    expect(arr.length).toBe(0);
  });

  test('does NOT call native Array.prototype.shift()', () => {
    const arr = ['x', 'y', 'z'];
    const spy = jest.spyOn(arr, 'shift');
    try {
      customShift(arr);
      expect(spy).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });
});

describe('Task 7.4: customUnshift (simulation without .unshift)', () => {
  test('inserts item at index 0, shifts existing elements right, and returns modified array', () => {
    const arr = ['B', 'C'];
    const result = customUnshift(arr, 'A');
    expect(result).toEqual(['A', 'B', 'C']);
    expect(result).toBe(arr);
    expect(arr.length).toBe(3);
  });

  test('works properly on an empty array', () => {
    const arr = [];
    const result = customUnshift(arr, 'first');
    expect(result).toEqual(['first']);
    expect(result).toBe(arr);
  });

  test('does NOT call native Array.prototype.unshift()', () => {
    const arr = [2, 3];
    const spy = jest.spyOn(arr, 'unshift');
    try {
      customUnshift(arr, 1);
      expect(spy).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });
});

describe('Task 7.5: collectPositiveNumbers (applying .push)', () => {
  test('collects only strictly positive numbers in a new array', () => {
    expect(collectPositiveNumbers([-3, 0, 5, -1, 12, 8])).toEqual([5, 12, 8]);
  });

  test('returns an empty array when there are no positive numbers', () => {
    expect(collectPositiveNumbers([-10, -5, 0])).toEqual([]);
  });

  test('returns an empty array when input is empty', () => {
    expect(collectPositiveNumbers([])).toEqual([]);
  });
});

describe('Task 7.6: undoLastActions (applying .pop)', () => {
  test('removes the specified number of last actions from history', () => {
    const history = ['open', 'edit', 'save', 'close'];
    expect(undoLastActions(history, 2)).toEqual(['open', 'edit']);
  });

  test('clears the entire array when steps >= history.length', () => {
    const history = ['step1', 'step2'];
    expect(undoLastActions(history, 5)).toEqual([]);
  });

  test('leaves history unchanged when steps is 0', () => {
    const history = ['a', 'b'];
    expect(undoLastActions(history, 0)).toEqual(['a', 'b']);
  });
});

describe('Task 7.7: processQueue (applying .shift)', () => {
  test('removes count items from the front of queue and returns them in order', () => {
    const queue = ['Task1', 'Task2', 'Task3', 'Task4'];
    const processed = processQueue(queue, 2);
    expect(processed).toEqual(['Task1', 'Task2']);
    expect(queue).toEqual(['Task3', 'Task4']);
  });

  test('processes all available items without adding undefined when count > queue.length', () => {
    const queue = ['Only1', 'Only2'];
    const processed = processQueue(queue, 5);
    expect(processed).toEqual(['Only1', 'Only2']);
    expect(queue).toEqual([]);
  });

  test('returns an empty array when count is 0', () => {
    const queue = ['A', 'B'];
    expect(processQueue(queue, 0)).toEqual([]);
    expect(queue).toEqual(['A', 'B']);
  });
});

describe('Task 7.8: prependPriorityItems (applying .unshift)', () => {
  test('prepends priorityItems to the beginning of items preserving their order', () => {
    const items = ['C', 'D'];
    const result = prependPriorityItems(items, ['A', 'B']);
    expect(result).toEqual(['A', 'B', 'C', 'D']);
    expect(result).toBe(items);
  });

  test('works when priorityItems is empty', () => {
    const items = [1, 2, 3];
    expect(prependPriorityItems(items, [])).toEqual([1, 2, 3]);
  });

  test('works when initial items array is empty', () => {
    const items = [];
    expect(prependPriorityItems(items, ['first', 'second'])).toEqual(['first', 'second']);
  });
});
