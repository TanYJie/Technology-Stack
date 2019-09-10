function binarySearch(arr,low, high, key) {
    if (low > high){
        return -1;
    }
    var mid = parseInt((high + low) / 2);
    if(arr[mid] == key){
        return mid;
    }else if (arr[mid] > key){
        high = mid - 1;
        return binarySearch(arr, low, high, key);
    }else if (arr[mid] < key){
        low = mid + 1;
        return binarySearch(arr, low, high, key);
    }
};
