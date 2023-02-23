let mergeSort = function(s){

    s.R = Math.floor(Math.random() * 255);
    s.G = Math.floor(Math.random() * 255);
    s.B = Math.floor(Math.random() * 255);

    s.value = [];

    s.setup = function() {
        s.createCanvas(displayWidth, displayHeight);
        for (let i = 0; i < displayWidth / RECT_WIDTH; i++) {
            s.randHeight = s.floor(Math.random() * displayHeight);
            s.value.push(s.randHeight);
        }
        s.mergeSort(s.value, 0, s.value.length - 1);
    }

    s.mergeSort = async function (arr, start, end) {
        if (start >= end) {
            return;
        }
        let mid = s.floor((start + end) / 2);
        await s.mergeSort(arr, start, mid);
        await s.mergeSort(arr, mid + 1, end);
        await s.merge(arr, start, mid, end);
    }

    s.merge = async function (arr, start, mid, end) {
        let left = arr.slice(start, mid + 1);
        let right = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;

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
            // await s.sleep(0); // for visualization purpose only
        }
        while (j < right.length) {
            arr[k++] = right[j++];
            // await s.sleep(0); // for visualization purpose only
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