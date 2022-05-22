let quickSort = function (s) {
  s.value = [];
  s.R = Math.floor(Math.random() * 255);
  s.G = Math.floor(Math.random() * 255);
  s.B = Math.floor(Math.random() * 255);

  s.setup = function () {
    s.createCanvas(displayWidth, displayHeight);
    for (let i = 0; i < displayWidth / RECT_WIDTH; i++) {
      s.randHeight = s.floor(Math.random() * displayHeight);
      s.value.push(s.randHeight);
    }
    s.quicksort(s.value, 0, s.value.length - 1);
    console.log(s.value);
  };

  s.draw = function () {
    s.background(COLOR);
    s.displayAll();
  };

  s.quicksort = async function (items, left, right) {
    s.loop();
    var index;
    if (items.length > 1) {
      index = await s.partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        await s.quicksort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        await s.quicksort(items, index, right);
      }
    }
    return items;
  };

  s.partition = async function (items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        await s.swap(items, i, j); //swap two elements
        i++;
        j--;
      }
    }
    return i;
  };

  s.swap = async function (value, a, b) {
    await s.sleep(0);
    let tmp = value[a];
    value[a] = value[b];
    value[b] = tmp;
  };

  s.displayAll = function () {
    for (let i = 0; i < displayWidth / RECT_WIDTH; i++) {
      s.rect(RECT_WIDTH * i, displayHeight, RECT_WIDTH, -s.value[i]);
      s.fill(s.R, s.G, s.B);
    }
    s.noLoop();
  };

  s.sleep = function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
};
