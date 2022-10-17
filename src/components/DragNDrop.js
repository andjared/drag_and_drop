import React, { useRef, useState } from "react";

export default function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [isDragging, setIsDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
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

  const handleDragEnter = (e, params) => {
    console.log("entering... ", params);
  };

  const styleDraggedItem = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.groupIndex === params.groupIndex &&
      currentItem.itemIndex === params.itemIndex
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
                      ? styleDraggedItem({ groupIndex, itemIndex })
                      : "dnd-item"
                  }
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { groupIndex, itemIndex })
                  }
                  onDragEnter={
                    isDragging
                      ? (e) => handleDragEnter(e, { groupIndex, itemIndex })
                      : null
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
