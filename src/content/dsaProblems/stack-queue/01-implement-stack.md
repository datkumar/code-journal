---
title: Stack Implementation
ds: [stack]
techniques: [design]
level: 0
links:
  [
    https://www.geeksforgeeks.org/problems/implement-stack-using-array/1,
    https://www.geeksforgeeks.org/problems/implement-stack-using-linked-list/1,
  ]
---

<style>
    img{
        margin-bottom: 10px;
    }
</style>

## Stack ADT

The `Stack` class must provide the following functionality (assuming elements of `int` data-type) :

- Follows **LIFO** approach (last-in element is first-out)
- `bool isEmpty()` : Check whether stack is empty in \\( O(1) \\) time
- `void push(int val)` : Insert an element on top of stack in \\( O(1) \\) time
- `void pop()` : Remove topmost element of stack in \\( O(1) \\) time
- `int peek()` : Return topmost element of stack in \\( O(1) \\) time

Throw exception when stack underflow or overflow occurs

## Implementing Stack using Linked-List

> The **insertion** and **deletion** operations would occur at the **beginning** of the internal **linked-list**

### Diagrams of some operations

<details>
<summary><strong>Expand to see diagrams</strong></summary>

**`push(val)` operation**:

![push operation](/code-journal/diagrams/stack-ll-push.svg)

**`pop()` operation**:

![pop() operation](/code-journal/diagrams/stack-ll-pop.svg)

</details>

### Implementation Code

```cpp
// Definition of a Node for the linked-list used by the Stack internally
class Node {
  private:
    int data;
    Node *next;
    // To allow 'Stack' class to access private members of 'Node' class
    friend class Stack;

  public:
    // Parameterized constructor member initialization
    Node (const int val) : data(val), next(nullptr) {}
};

class Stack {
  private:
    Node *top;    // Points to topmost element in stack
    size_t size;  // Denotes number of elements in queue

  public:
    // Default constructor member initialization
    Stack () : top(nullptr), size(0) {}

    // Check if stack is empty (doesn't modify state)
    const bool isEmpty () {
        // Stack is empty when top is not pointing to anything
        return (top == nullptr);
    }

    // Returns number of elements present in stack (doesn't modify state)
    const size_t getSize () { return size; }

    // Insert an element on top of stack
    void push (const int val) {
        // Allocate memory for the new element
        Node *newNode = new Node(val);
        // The new node must point to previously topmost item in stack
        newNode->next = top;
        // The updated top of stack is the new node
        top = newNode;
        size++;  // Increment size after insertion
    }

    // Get the topmost element in stack (doesn't modify state)
    const int peek () {
        if (isEmpty()) {
            throw underflow_error("Cannot access top element in empty stack");
        }
        return top->data;
    }

    // Remove the topmost element from stack
    void pop () {
        if (isEmpty()) {
            throw underflow_error("Cannot pop element from empty stack");
        }
        Node *nodeToDelete = top;  // Store the topmost node's address
        top = nodeToDelete->next;  // Make top point to the second topmost
        delete nodeToDelete;       // Deallocate the top node's memory
        size--;                    // Decrement size after deletion
    }

    // Destructor to deallocate memory of all items of stack
    ~Stack () {
        // Keep popping items till stack isn't empty
        while (!isEmpty()) {
            pop();
        }
    }
};

int main () {
    try {
        // Create an instance of our 'Stack' class
        Stack stk;
        cout << "Size: " << stk.getSize() << endl;
        // Size: 0
        /*
            Access/Delete operations on empty stack will throw underflow
           exception and exit:

            cout << stk.peek() << endl;
            // UNDERFLOW: Cannot access top element in empty stack

            stk.pop();
            // UNDERFLOW: Cannot pop element from empty stack
        */
        stk.push(15);
        stk.push(48);
        stk.push(23);
        stk.push(37);
        cout << "Size: " << stk.getSize() << ", Top: " << stk.peek() << endl;
        // Size: 4, Top: 37
        stk.pop();
        stk.pop();
        cout << "Size: " << stk.getSize() << ", Top: " << stk.peek() << endl;
        // Size: 2, Top: 48
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

Making `Stack` class as `friend` of `Node` class introduces **tight coupling** between the two. Use getters and setters to avoid this.
