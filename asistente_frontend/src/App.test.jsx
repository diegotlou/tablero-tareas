import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";

describe("Notification functionality", () => {
    beforeAll(() => {
        // Mock the Notification API
        global.Notification = {
            requestPermission: jest.fn(),
            permission: "default",
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("requests notification permission on mount", async () => {
        render(<App />);

        await waitFor(() => {
            expect(Notification.requestPermission).toHaveBeenCalled();
        });
    });

    test("shows notification when permission is granted", async () => {
        Notification.permission = "granted";
        const mockNotification = jest.fn();
        global.Notification = jest.fn().mockImplementation((title, options) => {
            mockNotification(title, options);
        });

        render(<App />);

        // Simulate the condition to show the notification
        // For example, you can call the function that checks the task deadlines

        await waitFor(() => {
            expect(mockNotification).toHaveBeenCalledWith(
                "Recordatorio de Tarea",
                {
                    body: expect.any(String),
                }
            );
        });
    });
});
