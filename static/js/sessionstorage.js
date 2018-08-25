function sessionStorageSet(key, value) {
	sessionStorage.setItem(key, JSON.stringify(value));
}

function sessionStorageGet(key) {
	var result = JSON.parse(sessionStorage.getItem(key));
	return result
}

function sessionStrageRemove(key) {
	sessionStorage.removeItem(key);
}
function localStorageSet(key, value){
	localStorage.setItem(key, JSON.stringify(value));
}
function localStorageGet(key){
	var result = JSON.parse(localStorage.getItem(key));
	return result
}
function localStorageRemove(key){
	localStorage.removeItem(key)
}
