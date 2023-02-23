let timSort = function(s){
    s.R = Math.floor(Math.random() * 255);
    s.G = Math.floor(Math.random() * 255);
    s.B = Math.floor(Math.random() * 255);

    s.value = [];
    s.stack = [];

    s.setup = function() {
        s.createCanvas(displayWidth, displayHeight);
        for (let i = 0; i < displayWidth / RECT_WIDTH; i++) {
            s.randHeight = s.floor(Math.random() * displayHeight);
            s.value.push(s.randHeight);
        }
        s.timSort(s.value);
      }

    s.timSort = async function(arr) {
        const MIN_MERGE = 2;
    
        s.minRunLength = function (n) {
            let r = 0;
            while (n >= MIN_MERGE) {
                r |= n & 1;
                n >>= 1;
            }
            return n + r;
        }
    
        s.insertionSort = async function(start, end) {
            for (let i = start + 1; i <= end; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= start && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
                await s.sleep(0); // for visualization purpose only
            }
            arr[j + 1] = key;
            await s.sleep(0); // for visualization purpose only
            }
        }
    
        s.merge = async function(start, mid, end) {
            let left = arr.slice(start, mid + 1);
            let right = arr.slice(mid + 1, end + 1);
            let i = 0,
            j = 0,
            k = start;
            while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
            await s.sleep(0); // for visualization purpose only
            }
            while (i < left.length) {
            arr[k++] = left[i++];
            await s.sleep(0); // for visualization purpose only
            }
            while (j < right.length) {
            arr[k++] = right[j++];
            await s.sleep(0); // for visualization purpose only
            }
        }
    
        let n = arr.length;
        let minRun = s.minRunLength(n);
    
        for (let i = 0; i < n; i += minRun) {
            s.insertionSort(i, s.min(i + minRun - 1, n - 1));
        }
        
        for (let size = minRun; size < n; size *= 2) {
            for (let left = 0; left < n; left += 2 * size) {
            let mid = left + size - 1;
            let right = s.min(left + 2 * size - 1, n - 1);
            await s.merge(left, mid, right);
            }
        }
    }

    s.draw = function () {
        s.background(COLOR);
        for (let i = 0; i < s.value.length; i++) {
            s.rect(RECT_WIDTH * i, displayHeight, RECT_WIDTH, -s.value[i]);
            s.fill(s.R, s.G, s.B);
        }
    }

    s.sleep = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}


// let array = [];
// let w = 10;
// let stack = [];

// function setup() {
//   createCanvas(600, 400);
//   for (let i = 0; i < width / w; i++) {
//     array.push(floor(random(height)));
//   }
//   timSort(array);
// }

// async function timSort(arr) {
//   const MIN_MERGE = 32;

//   function minRunLength(n) {
//     let r = 0;
//     while (n >= MIN_MERGE) {
//       r |= n & 1;
//       n >>= 1;
//     }
//     return n + r;
//   }

//   async function insertionSort(start, end) {
//     for (let i = start + 1; i <= end; i++) {
//       let key = arr[i];
//       let j = i - 1;
//       while (j >= start && arr[j] > key) {
//         arr[j + 1] = arr[j];
//         j--;
//         await sleep(10); // for visualization purpose only
//       }
//       arr[j + 1] = key;
//       await sleep(10); // for visualization purpose only
//     }
//   }

//   async function merge(start, mid, end) {
//     let left = arr.slice(start, mid + 1);
//     let right = arr.slice(mid + 1, end + 1);
//     let i = 0,
//       j = 0,
//       k = start;
//     while (i < left.length && j < right.length) {
//       if (left[i] < right[j]) {
//         arr[k++] = left[i++];
//       } else {
//         arr[k++] = right[j++];
//       }
//       await sleep(10); // for visualization purpose only
//     }
//     while (i < left.length) {
//       arr[k++] = left[i++];
//       await sleep(10); // for visualization purpose only
//     }
//     while (j < right.length) {
//       arr[k++] = right[j++];
//       await sleep(10); // for visualization purpose only
//     }
//   }

//   let n = arr.length;
//   let minRun = minRunLength(n);

//   for (let i = 0; i < n; i += minRun) {
//     insertionSort(i, min(i + minRun - 1, n - 1));
//   }

//   for (let size = minRun; size < n; size *= 2) {
//     for (let left = 0; left < n; left += 2 * size) {
//       let mid = left + size - 1;
//       let right = min(left + 2 * size - 1, n - 1);
//       await merge(left, mid, right);
//     }
//   }
// }

// function draw() {
//   background(0);
//   for (let i = 0; i < array.length; i++) {
//     stroke(255);
//     fill(255);
//     rect(i * w, height - array[i], w, array[i]);
//   }
// }

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
