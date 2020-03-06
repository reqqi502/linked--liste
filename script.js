class LinkedList {
    constructor() {
        this.length = -1;
        this.first = this.last = null;
    }

    addToFirst(data) {
        if (!this.first) {
            this.first = this.last = new Node(data);
            this.length = this.first.index = this.last.index = 0;
            return;
        }
        let oldFirst = this.first;
        oldFirst.prev = this.first = new Node(data,oldFirst,null,0);
        ++this.length;

        let currentNode = this.first.next;
        while (currentNode) {
            ++currentNode.index;
            currentNode = currentNode.next;
        }

    }
    addToLast(data) {
        if (!this.last) {
            this.first = this.last = new Node(data);
            this.length = this.first.index = this.last.index = 0;
            return;
        }
        let oldLast = this.last;
        oldLast.next = this.last = new Node(data,null,oldLast,++this.length);
    }

    listAsc() {
        let rows = "";
        let currentNode = this.first;
        while (currentNode) {
            rows += "<tr>"
            rows += "<td>" + currentNode.index + "</td><td>" + currentNode.data + "</td>";
            rows += "</tr>";
            currentNode = currentNode.next;
        }
        return rows;
    }
    listDesc() {
        let rows = "";
        let currentNode = this.last;
        while (currentNode) {
            rows += "<tr>"
            rows += "<td>" + currentNode.index + "</td><td>" + currentNode.data + "</td>";
            rows += "</tr>";
            currentNode = currentNode.prev;
        }
        return rows;
    }

    searchByIndex(index) {
        if (this.length === -1 || index > this.length) return;
        let currentNode = this.first;
        let rows = "";
        while (currentNode) {
            if (index === currentNode.index) {
                rows += "<tr>"
                rows += "<td>" + currentNode.index + "</td><td>" + currentNode.data + "</td>";
                rows += "</tr>";
            }
            currentNode = currentNode.next;
        }
        return rows;
    }

    clear() {
        this.first = this.last = null;
        this.length = -1;
    }

    deleteFirst() {
        this.first = this.first.next;
        this.first.prev = null;
        this.length--;
        this.first.index = 0;
        let currentNode = this.first;
        while (currentNode) {
            currentNode = currentNode.next;
            if (currentNode) currentNode.index -= 1;
        }
    }

    deleteLast() {
        this.last = this.last.prev;
        this.last.next = null;
        this.length--;
    }

    addByIndex(data, index) {
        if (index > this.getSize() || index < 0) {
            return;
        }
        if (index === this.getSize()) {
            this.addToLast(data);
        } else if (index === 0) {
            addToFirst(data);
        } else {
            let currentNode = this.first;
            while (currentNode) {
                if (index === currentNode.index) {
                    this.length++;
                    let temp = currentNode;
                    temp.prev.next = temp.prev = currentNode = new Node(data, temp, temp.prev, index);
                    while (temp) {
                        temp.index += 1;
                        temp = temp.next;
                    }
                }
                currentNode = currentNode.next;
            }
        }
    }


    removeByIndex(index) {
        if (index > this.getSize() - 1 || index < 0) {
            return;
        }
        if (index === this.getSize() - 1) {
            this.removedLast()
        } else if (index === 0) {
            this.removedFirst();
        } else {
            let currentNode = this.first;
            while (currentNode) {
                if (index === currentNode.index) {
                    this.length--;
                    let temp = currentNode.next;
                    currentNode.prev.next = currentNode.next;
                    currentNode.next.prev = currentNode.prev;
                    currentNode.prev = currentNode.next = null;
                    while (temp) {
                        temp.index -= 1;
                        temp = temp.next;
                    }
                }
                currentNode = currentNode.next;
            }
        }
    }


    getSize() {
        return this.length + 1;
    }
}

class Node {
    constructor(data, next, prev, index) {
        this.data = data;
        this.next = next || null;
        this.prev = prev || null;
        this.index = null || index;
    }
}

let list = new LinkedList();

function addAsFirst() {
    list.addToFirst(document.getElementById("data").value);
    showAllAsc();
}

function addAsLast() {
    list.addToLast(document.getElementById("data").value);
    showAllAsc();
}

function showAllAsc() {
    document.getElementById("table").innerHTML = "<tr><th>Index</th><th>Data</th></tr>";
    document.getElementById("table").innerHTML += list.listAsc();
}

function showAllDesc() {
    document.getElementById("table").innerHTML = "<tr><th>Index</th><th>Data</th></tr>";
    document.getElementById("table").innerHTML += list.listDesc();
}

function addByIndex() {
    list.addByIndex(document.getElementById("data").value, +document.getElementById("index").value);
    showAllAsc();
}

function removeByIndex() {
    list.removeByIndex(+document.getElementById("index").value);
    showAllAsc();
}

function searchByIndex() {
    document.getElementById("table").innerHTML = " <tr><th>Index</th><th>Data</th></tr>";
    document.getElementById("table").innerHTML += list.searchByIndex(+document.getElementById("index").value);
}