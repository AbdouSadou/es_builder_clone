ES-Builder (Tree UI Version) – MVP Spec

1\. Goal

A frontend-only web app where users:



Build a hierarchical decision tree (not a freeform graph)

See it as an expandable/collapsible tree

Run an interactive evaluation session

Step through decisions via user input until an outcome is reached



2\. Core Design Change (Important)

❌ Do NOT use:

React Flow

Drag-and-drop graph canvas

✅ Use:

Nested tree structure (like a file explorer)

Expand/collapse nodes

Inline editing

3\. Tech Stack

TypeScript

Next.js static mode

TailwindCSS



4\. Data Model (Tree, Not Graph)

Strict hierarchical structure:



type TreeNode = {

&#x20; id: string;

&#x20; type: "decision" | "outcome";



&#x20; // Decision only

&#x20; question?: string;



&#x20; // Outcome only

&#x20; outcome?: string;



&#x20; // Children (only for decision nodes)

&#x20; children?: {

&#x20;   label: string; // e.g. "Yes", "No"

&#x20;   node: TreeNode;

&#x20; }\[];

};



Key constraint:



Only one root

No cycles possible

5\. Core Features

5.1 Tree Builder (Expandable UI)

Behaviour

Display tree vertically

Each node shows:

Decision: question text

Outcome: result text

Controls per node

Decision Node

Edit question

Add child branch

Delete node

Outcome Node

Edit outcome

Delete node

Example UI

\[Is age > 18?]

&#x20;├── Yes → \[Has income?]

&#x20;│         ├── Yes → \[Approved]

&#x20;│         └── No  → \[Rejected]

&#x20;└── No  → \[Rejected]

5.2 Editing Behaviour

Clicking a node enables inline editing

“Add branch” creates:

label input (e.g. Yes/No)

child node (default = outcome)

5.3 Evaluation Mode (Key Feature)

Trigger

Button: Evaluate

6\. Evaluation Flow (Dialog-Based)



When user clicks Evaluate:



Open a modal/dialog.



Use a step-by-step traversal:



Step 1: Start at root



If node is decision:



Show question

Show buttons for each branch



Example:



Is age > 18?



\[Yes]   \[No]

Step 2: User clicks option

Move to corresponding child node

Step 3: Repeat

Continue until outcome node

Step 4: Show Result

Result: Approved



Button:



Restart

Close

7\. Evaluation Logic (Simple)

function traverse(node: TreeNode, choice: string): TreeNode {

&#x20; if (node.type === "outcome") return node;



&#x20; const branch = node.children!.find(c => c.label === choice);

&#x20; return branch!.node;

}



State needed:



currentNode

history (optional)

8\. UI Layout

\-----------------------------------

Top Bar:

\[Add Root] \[Evaluate]



\-----------------------------------

Main:

Tree View (left-aligned, vertical)



\-----------------------------------

Modal:

Evaluation flow

9\. Minimal Validation



Before evaluation:



Root exists

Every decision node has ≥1 child

No empty questions



If invalid:



Show message:

“Tree is incomplete”

10\. Optional Enhancements (If Time Allows)



Only after MVP works:



Collapse/expand nodes

Rename branch labels inline

Keyboard navigation in evaluation

Breadcrumb trail during evaluation

11\. Folder Structure

src/

&#x20; components/

&#x20;   TreeView.tsx

&#x20;   TreeNode.tsx

&#x20;   NodeEditor.tsx

&#x20;   EvaluationDialog.tsx

&#x20; state/

&#x20;   useTree.ts

&#x20; types/

&#x20;   tree.ts

&#x20; App.tsx

12\. Definition of Done



MVP is complete when:



User can build a nested decision tree

Tree displays cleanly (no overlap, no canvas)

User clicks Evaluate

System walks them through decisions step-by-step

Final outcome is shown correctly

