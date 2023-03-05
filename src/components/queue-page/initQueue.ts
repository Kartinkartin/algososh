interface IQueue<T> {
    enqueue: (item: T) => {
        head: number,
        tail: number,
        body: Array<T | null>
    };
    dequeue: () => void;
    resqueue: () => void;
    peak: () => T | null;
  }
  
  export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
  
    constructor(size: number) {
      this.size = size;
      this.container = Array(size);
    }
  
    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded");
      }
      this.container[this.tail % this.size] = item
      this.tail = this.tail+1;
      this.length = this.length+1;
      return {
        head: this.head,
        tail: this.tail,
        body: this.container
     }
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      
      if (this.length === 1) {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
      } else {
        this.head = this.head +1;
        this.length = this.length -1;
      }
    };
    resqueue = () => {
      this.head = 0;
      this.tail = 0;
      this.length = 0
    }
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      //доступ к последнему элементу в очереди
      return this.container[this.head % this.size] || null; 
    };
  
    isEmpty = () => this.length === 0;
  }
  