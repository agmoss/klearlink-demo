import {
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
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

const RecursiveTree: React.FC<IRecursiveTree> = ({ data }: IRecursiveTree) => {
  return (
    <Box>
      <SimpleTreeView
        aria-label="rich object"
        //defaultCollapseIcon={<ExpandMoreIcon />}
        //defaultExpanded={["root"]}
        //defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </SimpleTreeView>
    </Box>
  );
};

export default React.memo(RecursiveTree);
