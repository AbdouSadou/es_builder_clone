export type TreeNode = {
  id: string;
  type: "decision" | "outcome";

  // Decision only
  question?: string;

  // Outcome only
  outcome?: string;

  // Children (only for decision nodes)
  children?: {
    label: string; // e.g. "Yes", "No"
    node: TreeNode;
  }[];
};
