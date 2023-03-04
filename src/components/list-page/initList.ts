export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    // добавить в конец
    append: (element: T) => void;
    // добавить в начало

    // добавить по индексу
    insertAt: (element: T, position: number) => void;
    // удалить с начала

    // удалить с конца
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

    append(element: T) {
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
