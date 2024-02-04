import ConfirmDialog from "../../modal/ConfirmDialog";
import { render, screen, fireEvent} from "@testing-library/react";

describe("ConfirmDialog", () => {

  it("should render layout", () => {
    function confirm() {}
    function cancel() {}

    render(<ConfirmDialog 
        message="Are you sure to delete?"
        onCancel={confirm}
        onConfirm={cancel}
        />);

    const message = screen.getByText("Are you sure to delete?");
    expect(message).toBeInTheDocument();

  })

  it("should be able to click buttons", () => {
    function confirm() {}
    function cancel() {}

    render(<ConfirmDialog 
        message="Are you sure to delete?"
        onCancel={confirm}
        onConfirm={cancel}
        />);

    const confirmBtn = screen.getByRole("button", {name: /confirm/i});
    fireEvent.click(confirmBtn);

    const cancelBtn = screen.getByRole("button", {name: /cancel/i});
    fireEvent.click(cancelBtn);

  })
})