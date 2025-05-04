import {
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Button, Divider, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import React from "react";

interface IRecursiveTree {
  data: Record<string, any>;
}

const renderTree = (nodes: Record<string, any>, nodeId: string = "") => {
  return Object.entries(nodes).map(([key, value], index) => {
    const currentId = nodeId ? `${nodeId}-${key}` : key;
    if (value !== null && typeof value === "object") {
      // Object or Array
      return (
        <TreeItem key={currentId} itemId={currentId} label={key}>
          {Array.isArray(value)
            ? value.map((item, idx) => (
                <div key={`${currentId}-${idx}`}>
                  <Divider />
                  {renderTree(item, `${currentId}-${idx}`)}
                </div>
              ))
            : renderTree(value, currentId)}
        </TreeItem>
      );
    } else {
      // Value
      return <TreeItem key={currentId} itemId={currentId} label={`${key}: ${value}`} />;
    }
  });
};

const collectKeys = (nodes: Record<string, any>, nodeId: string = ""): string[] => {
  return Object.entries(nodes).reduce((acc, [key, value]) => {
    const currentId = nodeId ? `${nodeId}-${key}` : key;
    acc.push(currentId);

    if (value !== null && typeof value === "object") {
      if (Array.isArray(value)) {
        value.forEach((item, idx) => {
          acc.push(...collectKeys(item, `${currentId}-${idx}`));
        });
      } else {
        acc.push(...collectKeys(value, currentId));
      }
    }

    return acc;
  }, [] as string[]);
};

const RecursiveTree: React.FC<IRecursiveTree> = ({ data }: IRecursiveTree) => {
  const allKeys = React.useMemo(() => collectKeys(data), [data]);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const handleExpandClick = () => {
    setExpandedItems(prev => (prev.length === 0 ? allKeys : []));
  };

  return (
    <Box>
      <Stack spacing={2}>
        <div>
          <Button onClick={handleExpandClick}>
            {expandedItems.length === 0 ? "Expand all" : "Collapse all"}
          </Button>
        </div>
        <SimpleTreeView aria-label="rich object" expandedItems={expandedItems}>
          {renderTree(data)}
        </SimpleTreeView>
      </Stack>
    </Box>
  );
};

export default React.memo(RecursiveTree);
