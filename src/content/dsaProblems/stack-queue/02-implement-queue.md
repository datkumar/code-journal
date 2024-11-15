---
title: Queue Implementation
ds: [stack]
techniques: [design]
level: 0
links:
  [
    https://www.geeksforgeeks.org/problems/implement-queue-using-array/1,
    https://www.geeksforgeeks.org/problems/implement-queue-using-linked-list/1,
  ]
---

## Queue ADT

The `Queue` class must provide the following functionality (assuming elements of `int` data-type) :

- Follows **FIFO** approach (first-in element is first-out)
- `bool isEmpty()` : Check whether queue is empty in \\( O(1) \\) time
- `void enque(int val)` : Insert element at end of queue in \\( O(1) \\) time
- `void deque()` : Remove element from start of queue in \\( O(1) \\) time
- `int first()` : Return first (front) element of queue in \\( O(1) \\) time
- `int last()` : Return last (rear) element of queue in \\( O(1) \\) time
- `int getSize()` : Return number of elements present in queue in \\( O(1) \\) time

Throw exception when queue underflow or overflow occurs

## Implementing Queue using Linked-List

> **Insertion** occurs at the **beginning** and **deletion** at the end (via **rear pointer**) in the internal linked-list

### Diagrams of some operations

<details>
<summary><strong>Expand to see diagrams</strong></summary>

**`enque(val)`** operation:

![`enque(val)` operation](/code-journal/diagrams/queue-ll-enque.svg)

**`enque(val)`** operation on an **empty** queue;

![enque operation on empty queue](/code-journal/diagrams/queue-ll-enque-empty.svg)

**`deque()`** operation:

![deque operation](/code-journal/diagrams/queue-ll-deque.svg)

**`deque()`** operation on a **single-element** queue:

![deque operation on single-element queue](/code-journal/diagrams/queue-ll-deque-single-element.svg)

</details>

### Code

```cpp
// Definition of a Node for the linked-list used by the Queue internally
class Node {
  private:
    int data;
    Node *next;
    // To allow 'Queue' class to access private members of 'Node' class
    friend class Queue;

  public:
    // Parameterized constructor member initialization
    Node (const int val) : data(val), next(nullptr) {}
};

class Queue {
  private:
    Node *front;  // Points to first (front-most) element in queue
    Node *rear;   // Points to last (rear-most) element in queue
    size_t size;  // Denotes number of elements in queue

  public:
    // Default constructor member initialization
    Queue () : front(nullptr), rear(nullptr), size(0) {}

    // Check if queue is empty (doesn't modify state)
    const bool isEmpty () {
        // Queue is empty when front is not pointing to anything
        return (front == nullptr);
    }

    // Returns number of elements present in queue (doesn't modify state)
    const size_t getSize () { return size; }

    // Returns first element, present at front of queue (doesn't modify state)
    const int first () {
        if (isEmpty()) {
            throw underflow_error("Cannot access front element in empty queue");
        }
        return front->data;
    }

    // Returns last element, present at rear of queue (doesn't modify state)
    const int last () {
        if (isEmpty()) {
            throw underflow_error("Cannot access rear element in empty queue");
        }
        return rear->data;
    }

    // Insert an element at end of queue
    void enque (const int val) {
        // Allocate memory for the new element
        Node *newNode = new Node(val);

        if (isEmpty()) {  // The queue was empty before
            // Both front and rear will point to the only existing inserted
            // element
            front = rear = newNode;
        } else {  // The queue had one or more existing elements before
            // Attach new node after the old rear
            rear->next = newNode;
            // Updated rear of queue is the new node
            rear = newNode;
        }
        size++;  // Increment size after insertion
    }

    // Remove an element from front of queue
    void deque () {
        if (isEmpty()) {
            throw underflow_error("Cannot remove element from empty queue");
        }
        // Store the first node's address
        Node *nodeToDelete = front;
        // Make front point to the node after first (can be null)
        front = front->next;
        if (!front) {  // When there was only one existing element (it's next is
                       // null)
            // Both front and rear would become null after deletion in this case
            rear = front;
        }
        delete nodeToDelete;  // Deallocate the first node's memory
        size--;               // Decrement size after deletion
    }

    // Destructor to deallocate memory of all items of queue
    ~Queue () {
        // Keep deque-ing items till queue isn't empty
        while (!isEmpty()) {
            deque();
        }
    }
};

int main () {
    try {
        // Create an instance of our 'Queue' class to store jobs scheduled
        Queue jobs;
        cout << "size=" << jobs.getSize() << endl;
        // size=0
        /*
            Access/Delete operations on empty queue will throw underflow
           exception and exit:

            cout << jobs.first() << endl;
            // UNDERFLOW: Cannot access top element in empty stack

            cout << jobs.last() << endl;
            // UNDERFLOW: Cannot access rear element in empty queue

            jobs.deque();
            // UNDERFLOW: Cannot remove element from empty queue

        */
        jobs.enque(12);
        cout << "size=" << jobs.getSize() << ", first=" << jobs.first()
             << ", last=" << jobs.last() << endl;
        // size=1, first=12, last=12

        jobs.enque(45);
        jobs.enque(28);
        jobs.enque(39);
        jobs.enque(88);
        cout << "size=" << jobs.getSize() << ", first=" << jobs.first()
             << ", last=" << jobs.last() << endl;
        // size=5, first=12, last=88

        jobs.deque();
        jobs.deque();
        cout << "size=" << jobs.getSize() << ", first=" << jobs.first()
             << ", last=" << jobs.last() << endl;
        // size=3, first=28, last=88
    } catch (underflow_error const &ue) {
        cout << "UNDERFLOW: " << ue.what() << endl;
    } catch (overflow_error const &oe) {
        cout << "OVERFLOW: " << oe.what() << endl;
    } catch (exception const &e) {
        cout << "Other exception: " << e.what() << endl;
    }
    return 0;
}
```
