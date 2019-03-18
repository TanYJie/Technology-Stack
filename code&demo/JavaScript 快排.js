function Partition(arr,low,high){
	var temp = arr[low];
	while(low<high){
		while(low<high&&arr[high]>=temp){
			--high;
		}
		arr[low]=arr[high];
		while(low<high&&arr[low]<=temp){
			++low;
		}
		arr[high]=arr[low];
	}
	arr[low]=temp;
	return low;
}

function quickSort(arr,low,high){
	if(low<high){
		var key=Partition(arr,low,high);
		quickSort(arr,low,key-1);	
		quickSort(arr,key+1,high);
	}
}
