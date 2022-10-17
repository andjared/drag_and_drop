import React, { useRef, useState } from "react";

export default function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [isDragging, setIsDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log("drag start", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    console.log(dragItem, dragNode);
    //change background asynchronously
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    dragNode.current.removeEventListener("dragend", handleDragEnd);

    dragItem.current = null;
    dragNode.current = null;
    setIsDragging(false);
  };

  const styleDraggedItem = (groupIndex, itemIndex) => {
    if (
      dragItem.current.groupIndex === groupIndex &&
      dragItem.current.itemIndex === itemIndex
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  return (
    <div className="drag-and-drop">
      {list.map((group, groupIndex) => {
        return (
          <div key={groupIndex} className="dnd-group">
            <h2 className="group-title">{group.title}</h2>
            {group.items.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={
                    isDragging
                      ? styleDraggedItem(groupIndex, itemIndex)
                      : "dnd-item"
                  }
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { groupIndex, itemIndex })
                  }
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
