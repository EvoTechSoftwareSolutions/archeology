import test from "node:test";
import assert from "node:assert/strict";

import { persistContactMessageAndSendNotification } from "../src/controllers/contact.controller.js";

test("persistContactMessageAndSendNotification waits for the notification step", async () => {
  let notificationCount = 0;
  const createdMessage = { id: 42 };

  const result = await persistContactMessageAndSendNotification({
    createMessage: async () => createdMessage,
    sendNotification: async () => {
      notificationCount += 1;
    },
  });

  assert.equal(notificationCount, 1);
  assert.equal(result, createdMessage);
});
