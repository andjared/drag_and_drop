import React, { useRef, useState } from "react";

export default function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [isDragging, setIsDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    console.log(dragItem.current, "item");
    console.log(dragNode.current, "node");
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
    if (e.target !== dragNode.current) {
      const currentItem = dragItem.current;

      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        let itemToBeReplaced = params.itemIndex;
        let itemToReplacedWith = currentItem.itemIndex;
        //first get the item that is target (not that is dragging)
        //splice params: first is what we want to replace, second how many to delete, and last is with what are we replacing
        newList[params.groupIndex].items.splice(
          itemToBeReplaced,
          0,
          newList[currentItem.groupIndex].items.splice(itemToReplacedWith, 1)[0]
        );
        //current item became target item, so we need to set it back to params
        dragItem.current = params;
        return newList;
      });
    }
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
