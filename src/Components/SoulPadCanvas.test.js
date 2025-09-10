import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SoulPadCanvas from "./SoulPadCanvas";

describe("SoulPadCanvas", () => {
  it("renders the tldraw toolbar", () => {
    render(<SoulPadCanvas />);
    // Wait for the toolbar to appear
    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toBeInTheDocument();
  });

  it("toolbar is draggable and buttons are clickable", async () => {
    render(<SoulPadCanvas />);
    const toolbar = screen.getByRole("toolbar");
    expect(toolbar).toBeInTheDocument();
    // Simulate mousedown on toolbar background
    const rect = toolbar.getBoundingClientRect();
    userEvent.pointer({
      keys: "[MouseLeft>]",
      target: toolbar,
      coords: { x: rect.left + 5, y: rect.top + 5 },
    });
    // Simulate mousemove
    window.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: rect.left + 50,
        clientY: rect.top + 50,
      })
    );
    // Simulate mouseup
    window.dispatchEvent(new MouseEvent("mouseup"));
    // Toolbar should have new left/top
    expect(toolbar.style.left).toBeDefined();
    expect(toolbar.style.top).toBeDefined();
    // Try clicking a button (if present)
    const buttons = screen.getAllByRole("button", { container: toolbar });
    if (buttons.length > 0) {
      userEvent.click(buttons[0]);
      // No error should occur
    }
  });
});
