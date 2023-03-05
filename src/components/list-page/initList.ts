import { ElementStates } from "../../types/element-states";

export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

export type TPoint = {
    value: string,
    state: ElementStates
}

interface ILinkedList<T> {
    // добавить в конец
    appendTail: (element: T) => void;
    // добавить в начало
    appendHead: (element: T) => void;
    // добавить по индексу
    insertAt: (element: T, position: number) => void;
    // удалить по индексу
    removeAt: (position: number) => void;
    // удалить с начала
    removeHead: () => void;
    // удалить с конца
    removeTail: () => void;
    getSize: () => number;
    print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertAt(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element);

            // добавить элемент в начало списка
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIndex = 0;
                // перебрать элементы в списке до нужной позиции
                while (currIndex < index - 1) {
                    curr = curr!.next;
                    currIndex++;
                }
                // добавить элемент
                node.next = curr!.next;
                curr!.next = node;
            }
            this.size++;
        }
    }

    removeAt(index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            if(this.head !== null) {
                if (index === 0) {
                    // удалить первый элемент
                    this.head = this.head.next;
                } else {
                    let curr: Node<T> | null = this.head;
                    let currIndex = 0;
                    // перебрать элементы в списке до нужной позиции
                    while (currIndex < index - 1) {
                        curr = curr!.next;
                        currIndex++;
                    }
                    // удалить элемент
                    curr!.next = curr!.next?.next ? curr!.next.next : null;
                }
                this.size--;
            }
        }
    }

    appendTail(element: T) {
        const node = new Node(element);
        let current;
        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    appendHead(element: T) {
        const node = new Node(element);
        let tmp = this.head;
        this.head = node;
        node.next = tmp;
        this.size++;
    }

    removeHead() {
        if (this.head) {
            this.head = this.head.next;
            this.size--;
        }
        
    }
    removeTail() {
        let current;
        if (this.head !== null) {
            current = this.head;
            while (current.next?.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }

    getSize() {
        return this.size;
    }

    print(): Array<T> {
        let curr = this.head;
        let res = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return (res);
    }
}
