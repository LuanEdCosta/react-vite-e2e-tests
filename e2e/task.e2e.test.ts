import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test.describe("Todo page tests", () => {
  test("create a task and delete it", async ({ page }) => {
    const task = "my new task";

    await page.locator("input").click();
    await page.locator("input").fill(task);
    await page.getByRole("button", { name: "Create Task" }).click();

    await expect(page.locator("ul>li")).toHaveCount(1);
    await expect(page.getByText(task)).toBeVisible();

    await page.getByRole("button", { name: "x" }).click();

    await expect(page.locator("ul>li")).toHaveCount(0);
    await expect(page.locator("ul")).not.toBeVisible();
  });

  test("create multiple tasks", async ({ page }) => {
    const task1 = "first task";
    const task2 = "second task";

    await page.locator("input").click();
    await page.locator("input").fill(task1);
    await page.getByRole("button", { name: "Create Task" }).click();

    await page.locator("input").click();
    await page.locator("input").fill(task2);
    await page.getByRole("button", { name: "Create Task" }).click();

    await expect(page.locator("ul>li")).toHaveCount(2);
    await expect(page.getByText(task1)).toBeVisible();
    await expect(page.getByText(task2)).toBeVisible();
  });

  test("create multiple tasks and delete one", async ({ page }) => {
    const task1 = "first task";
    const task2 = "second task";

    await page.locator("input").click();
    await page.locator("input").fill(task1);
    await page.getByRole("button", { name: "Create Task" }).click();

    await page.locator("input").click();
    await page.locator("input").fill(task2);
    await page.getByRole("button", { name: "Create Task" }).click();

    await expect(page.locator("ul>li")).toHaveCount(2);
    await expect(page.getByText(task1)).toBeVisible();
    await expect(page.getByText(task2)).toBeVisible();

    await page.locator("li", { hasText: task1 }).getByRole("button").click();

    await expect(page.locator("ul>li")).toHaveCount(1);
    await expect(page.getByText(task1)).not.toBeVisible();
    await expect(page.getByText(task2)).toBeVisible();
  });

  test("focus input after creating task", async ({ page }) => {
    const task = "new task";

    await expect(page.locator("input")).not.toBeFocused();
    await page.locator("input").click();
    await page.locator("input").fill(task);
    await expect(page.locator("input")).toBeFocused();
    await page.getByRole("button", { name: "Create Task" }).click();
    await expect(page.locator("input")).toBeFocused();
  });

  test("create a task with enter key", async ({ page }) => {
    const task = "task with enter";

    await page.locator("input").click();
    await page.locator("input").fill(task);
    await page.locator("input").press("Enter");

    await expect(page.locator("ul>li")).toHaveCount(1);
    await expect(page.getByText(task)).toBeVisible();
  });
});
