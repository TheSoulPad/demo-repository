import React, { useRef, useEffect } from "react";
import { Tldraw } from "tldraw";
import Box from "@mui/material/Box";
import "tldraw/tldraw.css";
import "./SoulPadCanvas.custom.css";

function SoulPadCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Wait for tldraw to render the toolbar

    /*** The MutationObserver method **`observe()`** configures the `MutationObserver` callback to begin receiving notifications of changes to the DOM that match the given options.
     * The `childList: true` option specifies that the observer should watch for the addition or removal of child nodes to the target node.
     * The `subtree: true` option specifies that the observer should also watch for changes to all descendants of the target node.
     */

    const observer = new MutationObserver(() => {
      const toolbar = containerRef.current.querySelector(
        ".tlui-toolbar-container.tlui-toolbar__tools"
      );

      if (!toolbar) return;
      toolbar.style.cursor = "grab";
      let offsetX = 0;
      let offsetY = 0;
      let isDragging = false;

      const onMouseDown = (e) => {
        if (e.target !== toolbar) return;
        isDragging = true;
        toolbar.style.cursor = "grabbing";
        debugger;
        const rect = toolbar.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };

      let lastLeft = toolbar.style.left;
      let lastTop = toolbar.style.top;

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        let newLeft = e.clientX - offsetX - containerRect.left;
        let newTop = e.clientY - offsetY - containerRect.top;

        toolbar.style.left = `${newLeft}px`;
        toolbar.style.top = `${newTop}px`;
        lastLeft = toolbar.style.left;
        lastTop = toolbar.style.top;

        console.log("Toolbar position:", toolbar.style.left, toolbar.style.top);
      };

      const onMouseUp = () => {
        isDragging = false;
        toolbar.style.cursor = "grab";
        // Persist the last position
        toolbar.style.left = lastLeft;
        toolbar.style.top = lastTop;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      toolbar.addEventListener("mousedown", onMouseDown);

      // Clean up
      return () => {
        toolbar.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    });

    observer.observe(containerRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      m={10}
      p={2}
      border={1}
      borderColor="grey.500"
      sx={{
        position: "fixed",
        inset: "0",
        height: "613px",
        width: "807px",
        overflow: "hidden",
      }}
    >
      <Tldraw />
    </Box>
  );
}

export default SoulPadCanvas;
